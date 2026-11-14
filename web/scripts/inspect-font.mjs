import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 950 } });
await p.goto("http://127.0.0.1:3040/styleguide");
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1500);
await p.evaluate(() => {
  document.body.innerHTML = "<main></main>";
  let main = document.querySelector("main");
  for (const [label, style] of [
    ["Normal bold", "font-weight:800;"],
    ["variation 800 100", 'font-variation-settings:"wght" 800,"wdth" 100;'],
    ["variation 800 60", 'font-variation-settings:"wght" 800,"wdth" 60;'],
    ["CSS stretch60", "font-weight:800;font-stretch:60%;"],
    ["Arial", "font:800 100px Arial;"],
    [
      "font optical none",
      "font-optical-sizing:none;font-weight:800;font-stretch:70%;",
    ],
  ]) {
    main.insertAdjacentHTML(
      "beforeend",
      `<p style="font-size:15px;margin:3px">${label}</p><div style='font-size:100px;line-height:1.1;letter-spacing:0;${style}'>Některé cesty změní</div>`,
    );
  }
});
await p.screenshot({ path: "qa/inspection/font.png" });
await b.close();
