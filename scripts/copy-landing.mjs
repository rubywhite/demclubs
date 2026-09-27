import { cp, copyFile, mkdir, rename, rm } from "node:fs/promises";

await mkdir("dist", { recursive: true });
await copyFile("index.html", "dist/index.html");
await cp("assets", "dist/assets", { recursive: true });
await cp("images", "dist/images", { recursive: true });
await mkdir("dist/bylaws/skills", { recursive: true });
await mkdir("dist/bylaws/downloads", { recursive: true });
await cp("agent-tools/demclubs-bylaws", "dist/bylaws/skills/demclubs-bylaws", { recursive: true });
await copyFile("agent-tools/demclubs-bylaws-v0.2.1.zip", "dist/bylaws/downloads/demclubs-bylaws-v0.2.1.zip");

// Vite preserves the source HTML directory when it is used as a Rollup entry.
// Normalize that output so the application is served at /bylaws/.
await rename("dist/bylaws/bylaws/index.html", "dist/bylaws/index.html");
await rm("dist/bylaws/bylaws", { recursive: true, force: true });
await mkdir("dist/bylaws/documentation", { recursive: true });
await copyFile("dist/bylaws/index.html", "dist/bylaws/documentation/index.html");
