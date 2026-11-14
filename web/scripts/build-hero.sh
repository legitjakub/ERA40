#!/usr/bin/env bash
# Requires FFmpeg with libx264, libvpx-vp9, libaom-av1 and AVIF support.
set -euo pipefail
cd "$(dirname "$0")/.."
ffmpeg_bin=${FFMPEG:-ffmpeg}
raw=${ERA40_RAW:-node_modules/.cache/era40-media}
out=public/media/hero
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
mkdir -p "$out"

render() {
  local name=$1 size=$2 rate=$3 limit=$4 poster_time=$5
  local basename="hero-$name" shot start duration frame_count filter grade
  local width=${size%x*} height=${size#*x}
  local number=0
  mkdir "$work/$name"
  local concat="$work/$name/shots.ffconcat"
  local master="$work/$name/master.mp4"
  : > "$concat"
  while read -r shot start duration; do
    number=$((number + 1))
    frame_count=$(awk -v seconds="$duration" 'BEGIN { print int(seconds*24+0.5) }')
    filter="fps=24,scale=$width:$height:force_original_aspect_ratio=increase,crop=$width:$height,setsar=1"
    grade="eq=saturation=0.93:contrast=1.025,format=yuv420p"
    if [[ "$shot" == vm-countryside ]]; then
      # This master is HLG BT.2020. Tone-map before grading with the other SDR shots.
      filter="$filter,zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable,zscale=t=bt709:m=bt709:r=limited"
    fi
    "$ffmpeg_bin" -nostdin -v error -y -threads 3 -ss "$start" -i "$raw/$shot.mp4" \
      -an -map_metadata -1 -frames:v "$frame_count" -filter_threads 2 -vf "$filter,$grade" \
      -c:v libx264 -preset veryfast -crf 17 -threads 3 -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
      "$work/$name/$number.mp4"
    echo "file '$number.mp4'" >> "$concat"
  done
  "$ffmpeg_bin" -nostdin -v error -y -f concat -safe 0 -i "$concat" -c copy "$master"
  "$ffmpeg_bin" -nostdin -v error -y -ss "$poster_time" -i "$master" -frames:v 1 "$work/$basename.jpg"
  node -e 'require("sharp")(process.argv[1]).avif({quality:45}).toFile(process.argv[2])' "$work/$basename.jpg" "$work/$basename.avif"
  "$ffmpeg_bin" -nostdin -v error -y -i "$master" -an -c:v libx264 -threads 4 -preset medium \
    -b:v "${rate}k" -maxrate "$((rate*2))k" -bufsize "$((rate*3))k" -g 48 -movflags +faststart "$work/$basename.mp4"
  "$ffmpeg_bin" -nostdin -v error -y -i "$master" -an -c:v libvpx-vp9 -threads 4 -row-mt 1 \
    -tile-columns 2 -deadline good -cpu-used 5 -g 48 -b:v "$((rate*3/4))k" -maxrate "${rate}k" -bufsize "$((rate*3))k" -crf 42 "$work/$basename.webm"
  for ext in mp4 webm; do
    if (( $(wc -c < "$work/$basename.$ext") > limit )); then
      echo "$basename.$ext exceeds $limit bytes" >&2
      return 1
    fi
  done
  mv "$work/$basename.mp4" "$work/$basename.webm" "$work/$basename.avif" "$out/"
}

# The original station clip is only 2.867 seconds. The tail of the edit returns
# to the opening platform for a continuous loop without a dissolve to black.
render desktop 1920x1080 810 4000000 0 <<'CUT'
v-platform-dawn 2 3
v-packing 4 4
v-station 0 2.5
v-train-window 6 5
vm-train-city 2.5 5
v-library 2 4
v-friends 3 5
v-train-window 21 4
v-platform-dawn 0 3.5
CUT
render mobile 720x1280 455 2000000 0 <<'CUT'
vm-train-night 8.3 3
vm-suitcase 1 4
vm-countryside 3 5
vm-prague-tram 3 4.5
vm-students 1 5
vm-train-city 2.5 5
vm-train-night 4.8 3.5
CUT
