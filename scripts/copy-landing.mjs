import { cp, copyFile, mkdir, rename, rm } from "node:fs/promises";

await mkdir("dist", { recursive: true });
await copyFile("index.html", "dist/index.html");
await cp("assets", "dist/assets", { recursive: true });
await cp("images", "dist/images", { recursive: true });

// Vite preserves the source HTML directory when it is used as a Rollup entry.
// Normalize that output so the application is served at /bylaws/.
await rename("dist/bylaws/bylaws/index.html", "dist/bylaws/index.html");
await rm("dist/bylaws/bylaws", { recursive: true, force: true });
