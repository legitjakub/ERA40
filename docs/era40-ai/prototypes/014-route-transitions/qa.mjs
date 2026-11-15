// Run with the project's already-installed Playwright (no new dependency).
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(process.env.ERA40_QA_PACKAGE || resolve('web/package.json'));
const { chromium } = require('playwright');
const url = process.env.ERA40_PROTOTYPE_URL || 'http://127.0.0.1:3073/';
const dest = process.env.ERA40_QA_OUT || '/private/tmp/era40-p3-qa';
await mkdir(dest,{recursive:true});
const browser = await chromium.launch({headless:true,channel:process.env.ERA40_BROWSER_CHANNEL || 'chrome'});
const report = {url, matrix:[], interactions:[], limitations:['Standalone prototype, not Next App Router integration','No physical-device FPS or production INP measurement']};
const check = async (name, action) => {
  try { const evidence = await action(); report.interactions.push({name,pass:true,evidence}); }
  catch(error) { report.interactions.push({name,pass:false,error:String(error)}); }
};
const overflow = page => page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-innerWidth));
const inactive = page => page.waitForFunction(()=>!document.querySelector('#transition').hasAttribute('data-active'),{},{timeout:1600});
for (const reduced of [false,true]) {
  // Mobile first, then the rest of the canonical matrix.
  for (const [width,height] of [[360,780],[390,844],[430,932],[1920,1080],[1440,900],[1280,800],[1024,768],[768,1024],[375,812]]) {
    const context = await browser.newContext({viewport:{width,height},reducedMotion:reduced?'reduce':'no-preference'});
    const page = await context.newPage();
    const errors=[]; page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    const result={width,height,reduced,pass:true,errors};
    try {
      await page.goto(url); await page.evaluate(()=>document.fonts.ready);
      assert.equal(await overflow(page),0,'home overflow');
      assert.equal(await page.locator('#transition').getAttribute('data-active'),null,'no initial animation');
      await page.locator('header a[href="?view=about"]').click();
      await page.waitForFunction(()=>document.querySelector('main').dataset.view==='about');
      await inactive(page);
      assert.equal(await overflow(page),0,'about overflow');
      await page.locator('header a[href="?view=archive"]').click();
      await page.waitForFunction(()=>document.querySelector('main').dataset.view==='archive');
      await inactive(page);
      const cards=await page.locator('.story-card').count(); assert.equal(cards,1);
      const images=await page.locator('main img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0));
      assert.ok(images,'local image loaded');
      assert.equal(await overflow(page),0,'archive overflow');
      await page.locator('.story-card').click();
      await page.waitForFunction(()=>document.querySelector('main').dataset.view==='story');
      assert.equal(await page.locator('#transition').getAttribute('data-active'),null,'shared-photo route has no veil');
      await page.waitForTimeout(500);
      assert.equal(await overflow(page),0,'detail overflow');
      if ([360,390,430,1440].includes(width)) {
        await page.screenshot({path:`${dest}/${width}-${reduced?'reduced':'story'}.png`});
        if(!reduced) {
          await page.locator('#progress').evaluate(el=>{el.value='50';el.dispatchEvent(new Event('input',{bubbles:true}));});
          await page.screenshot({path:`${dest}/${width}-transition-50.png`});
          await page.locator('#progress').evaluate(el=>{el.value='80';el.dispatchEvent(new Event('input',{bubbles:true}));});
          await page.screenshot({path:`${dest}/${width}-transition-80.png`});
        }
      }
      assert.equal(errors.length,0,'console/page errors');
      result.overflow=await overflow(page);
    } catch(error) {result.pass=false;result.error=String(error);}
    report.matrix.push(result);
    await context.close();
  }
}
const context=await browser.newContext({viewport:{width:390,height:844}});
const page=await context.newPage(); await page.goto(url);
await check('Rapid requests use the last destination and clear overlay',async()=>{
  await page.evaluate(()=>{
    document.querySelector('header a[href="?view=archive"]').click();
    document.querySelector('header a[href="?view=about"]').click();
    document.querySelector('header a[href="?view=join"]').click();
  });
  await page.waitForFunction(()=>document.querySelector('main').dataset.view==='join');
  await inactive(page);
  assert.equal(new URL(page.url()).searchParams.get('view'),'join');
  return 'join wins; overlay removed';
});
await check('Back / forward restores the correct view',async()=>{
  await page.locator('header a[href="?view=about"]').click();
  await page.waitForFunction(()=>document.querySelector('main').dataset.view==='about');
  await page.goBack(); await page.waitForFunction(()=>document.querySelector('main').dataset.view==='join');
  await page.goForward(); await page.waitForFunction(()=>document.querySelector('main').dataset.view==='about');
  await inactive(page); return 'join → about → back join → forward about';
});
await check('Preference change cancels an active preview immediately',async()=>{
  await page.locator('#progress').evaluate(el=>{el.value='50';el.dispatchEvent(new Event('input',{bubbles:true}));});
  assert.equal(await page.locator('#transition').getAttribute('data-preview'),'');
  await page.locator('#reduced').check();
  assert.equal(await page.locator('#transition').getAttribute('data-active'),null);
  assert.equal(await page.evaluate(()=>document.querySelectorAll('#transition *').length>0&&document.getAnimations().length),0);
  return 'no overlay or running animation after toggle';
});
await check('Keyboard navigation has focus and 44px controls',async()=>{
  await page.locator('header a[href="?view=archive"]').focus(); await page.keyboard.press('Enter');
  await page.waitForFunction(()=>document.querySelector('main').dataset.view==='archive');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'content');
  const heights=await page.locator('header a,button,.toggle,.scrubber').evaluateAll(nodes=>nodes.map(node=>node.getBoundingClientRect().height));
  assert.ok(heights.every(height=>height>=44)); return {minHeight:Math.min(...heights)};
});
await context.close();
await check('Native API genuinely unavailable, fallback still navigates',async()=>{
  const fallbackContext=await browser.newContext({viewport:{width:390,height:844}});
  await fallbackContext.addInitScript(()=>{document.startViewTransition=undefined;});
  const fallbackPage=await fallbackContext.newPage();await fallbackPage.goto(url);
  await fallbackPage.locator('header a[href="?view=about"]').click();
  await fallbackPage.waitForFunction(()=>document.querySelector('main').dataset.view==='about');
  await inactive(fallbackPage);assert.equal(await overflow(fallbackPage),0);
  await fallbackPage.screenshot({path:`${dest}/390-fallback.png`});
  await fallbackContext.close();return 'DOM navigation + SVG completes without native API';
});
await check('No JavaScript: prototype explains its limitation',async()=>{
  const plain=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const plainPage=await plain.newPage();await plainPage.goto(url);
  assert.ok(await plainPage.locator('main h1').isVisible());
  assert.ok((await plainPage.locator('main').innerText()).includes('izolovaný návrh animace'));
  await plain.close();return 'Visible static explanation; actual site SSR is not verified by this prototype';
});
await browser.close();
report.pass=report.matrix.every(result=>result.pass)&&report.interactions.every(result=>result.pass);
await writeFile(`${dest}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({pass:report.pass,matrix:report.matrix.length,interactions:report.interactions.length,failures:[...report.matrix,...report.interactions].filter(item=>!item.pass)},null,2));
process.exitCode=report.pass?0:1;
