import { execFileSync } from "node:child_process";
import { rm } from "node:fs/promises";

const output = "agent-tools/demclubs-bylaws-v0.2.1.zip";
await rm(output, { force: true });
execFileSync("zip", ["-X", "-q", "-r", "demclubs-bylaws-v0.2.1.zip", "demclubs-bylaws"], {
  cwd: "agent-tools",
  stdio: "inherit"
});
console.log(output);
