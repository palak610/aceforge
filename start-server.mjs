import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 10000;
const HOST = "0.0.0.0";

// Correct path resolution whether run from project root or .output/server
const cwd = process.cwd();
let publicDir = path.resolve(cwd, ".output/public");
if (!fs.existsSync(publicDir)) {
  publicDir = path.resolve(__dirname, "../public");
}
if (!fs.existsSync(publicDir)) {
  publicDir = path.resolve(__dirname, "public");
}

console.log(`[AceForge] Serving static files from: ${publicDir}`);

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

// Locate compiled assets dynamically
function getEntryAssets() {
  const assetsDir = path.join(publicDir, "assets");
  let cssFile = "";
  let jsFile = "";
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    cssFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css")) || "";
    jsFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js")) || "";
  }
  return { cssFile, jsFile };
}

const server = http.createServer((req, res) => {
  try {
    const urlPath = req.url.split("?")[0];
    const cleanPath = decodeURIComponent(urlPath === "/" ? "" : urlPath);
    let filePath = path.join(publicDir, cleanPath);

    // Serve static asset if found
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      res.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // SPA fallback HTML
    const indexPath = path.join(publicDir, "index.html");
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      fs.createReadStream(indexPath).pipe(res);
    } else {
      const { cssFile, jsFile } = getEntryAssets();
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Ace Forge Gaming Lounge | Premium PS5, PC, VR & Sim Racing</title>
  ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}"/>` : ""}
</head>
<body class="bg-[#08080a] text-foreground font-ui">
  <div id="root"></div>
  ${jsFile ? `<script type="module" src="/assets/${jsFile}"></script>` : ""}
</body>
</html>`);
    }
  } catch (err) {
    console.error("[AceForge] Server error:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[AceForge] Server successfully listening on http://${HOST}:${PORT}`);
});

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
