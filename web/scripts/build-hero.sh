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
  while read -r shot start duration xpos tone; do
    number=$((number + 1))
    frame_count=$(awk -v seconds="$duration" 'BEGIN { print int(seconds*24+0.5) }')
    # Optional fourth column: horizontal crop position 0..1 (default centre).
    xpos=${xpos:-0.5}
    filter="fps=24,scale=$width:$height:force_original_aspect_ratio=increase,crop=$width:$height:(iw-ow)*$xpos:(ih-oh)/2,setsar=1"
    grade="eq=saturation=0.93:contrast=1.025,format=yuv420p"
    # Optional fifth column pulls cool stock footage towards the shared warm grade.
    case "${tone:-}" in
      warm) grade="colortemperature=temperature=4300:mix=0.8,eq=saturation=0.8:contrast=1.025,format=yuv420p" ;;
      warmer) grade="colortemperature=temperature=3800:mix=0.9,eq=saturation=0.75:contrast=1.04,format=yuv420p" ;;
    esac
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

# Shotlist: docs/orchestration/HERO_VIDEO_PLAN.md. o-* are the approved shots of the
# previous film (packing, Prague tram, students, evening friends); x-* are Mixkit clips
# listed in src/content/media.json. The edit ends on "passing it on" and loops to packing.
render desktop 1920x1080 810 4000000 18 <<'CUT'
o-desktop 3.1 3.8
x-campus-walk 2 4
x-lecture 1 3.5
x-dinner-garden 15.5 4.5
o-desktop 23.7 4.6
x-train-man 2 4 0.5 warm
x-lab 5.5 4.5 0.5 warmer
CUT
render mobile 720x1280 455 2000000 16 <<'CUT'
o-mobile 3.1 3.8
o-mobile 12.2 3.8
x-lecture 1 3.5 0.55
x-dinner-home 5.3 4.5
o-mobile 17.2 4
x-train-man 2 4 0.3 warm
x-lab 5.5 4.5 0.7 warmer
CUT
