import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import test from "node:test";

async function availablePort() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  return port;
}

test("production page presents an honest dive-map prototype", async () => {
  const port = await availablePort();
  const child = spawn("pnpm", ["exec", "vinext", "start", "--port", String(port), "--hostname", "127.0.0.1"], {
    cwd: new URL("../", import.meta.url),
    stdio: "ignore",
  });
  try {
    let response;
    for (let attempt = 0; attempt < 60; attempt += 1) {
      if (child.exitCode !== null) throw new Error(`Production server exited with ${child.exitCode}`);
      try {
        response = await fetch(`http://127.0.0.1:${port}/`);
        break;
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }
    assert.ok(response, "Production server did not start within 15 seconds");
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /潜水目的地探索原型/);
    assert.match(html, /交互原型/);
    assert.match(html, /7 个示例潜点/);
    assert.match(html, /非实时资料/);
    assert.doesNotMatch(html, /数据更新于 12 分钟前|2,847 个潜点|AI 海况判断|128,640 位潜水员/);
  } finally {
    child.kill("SIGTERM");
  }
});
