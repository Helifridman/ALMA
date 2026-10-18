import { chromium } from "@playwright/test";
import fs from "node:fs";
const svg = fs.readFileSync("/home/user/ALMA/public/icons/icon.svg", "utf8");
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const [name, size, pad] of [["icon-192.png", 192, 0], ["icon-512.png", 512, 0], ["icon-512-maskable.png", 512, 60]]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  const inner = size - pad * 2;
  await page.setContent(`<html><body style="margin:0;background:#6d4df2;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center"><div style="width:${inner}px;height:${inner}px">${svg.replace("<svg ", `<svg width="${inner}" height="${inner}" `)}</div></body></html>`);
  await page.screenshot({ path: `/home/user/ALMA/public/icons/${name}`, omitBackground: pad === 0 });
  await page.close();
}
await browser.close();
console.log("icons done");
