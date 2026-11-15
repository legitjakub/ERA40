"""Read-only local prototype and its public styling/assets; never serve private data."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, unquote

PROTOTYPE = Path(__file__).resolve().parent
ROOT = PROTOTYPE.parents[3]
PUBLIC = ROOT / "web" / "public"
STYLES = ROOT / "web" / "src" / "styles"


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        requested = unquote(urlsplit(path).path)
        prefixes = {
            "/web/public/": PUBLIC,
            "/fonts/": PUBLIC / "fonts",
            "/web/src/styles/": STYLES,
        }
        for prefix, directory in prefixes.items():
            if requested.startswith(prefix):
                candidate = (directory / requested[len(prefix):]).resolve()
                if candidate.is_relative_to(directory.resolve()) and candidate.is_file():
                    return str(candidate)
                return str(PROTOTYPE / "__missing__")
        name = "index.html" if requested == "/" else requested.lstrip("/")
        if name in {"index.html", "style.css", "scene.js", "favicon.ico"}:
            return str(PROTOTYPE / name)
        return str(PROTOTYPE / "__missing__")

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    print("ERA40 014 prototype: http://127.0.0.1:3073/", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 3073), Handler).serve_forever()
