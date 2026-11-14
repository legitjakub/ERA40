#!/usr/bin/env python3
"""Serve the isolated study and a small explicit allowlist of existing assets."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
import argparse

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
ASSETS = {
    "/_fonts/roboto-flex-latin-ext.woff2": ROOT / "web/public/fonts/roboto-flex-latin-ext.woff2",
    "/_fonts/roboto-flex-latin.woff2": ROOT / "web/public/fonts/roboto-flex-latin.woff2",
    "/_map/europe-land.svg": ROOT / "web/public/media/europe-land.svg",
    "/_media/ph-train-window-woman.jpg": ROOT / "web/public/media/placeholders/ph-train-window-woman.jpg",
    "/_media/ph-prague-street.jpg": ROOT / "web/public/media/placeholders/ph-prague-street.jpg",
    "/_vendor/gsap.min.js": ROOT / "web/node_modules/gsap/dist/gsap.min.js",
}
STATIC = {"/": "index.html", "/index.html": "index.html", "/style.css": "style.css", "/scene.js": "scene.js"}

class StudyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = unquote(urlsplit(self.path).path)
        if path not in ASSETS and path not in STATIC:
            self.send_error(404)
            return
        return super().do_GET()

    def translate_path(self, path):
        clean = unquote(urlsplit(path).path)
        return str(ASSETS.get(clean, HERE / STATIC.get(clean, "__not_found__")))

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=3070)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), partial(StudyHandler, directory=str(HERE)))
    print(f"ERA40 isolated proposal: http://127.0.0.1:{args.port}", flush=True)
    server.serve_forever()
