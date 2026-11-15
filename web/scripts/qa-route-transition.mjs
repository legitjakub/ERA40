// Spec 014 integration, real Next navigation; never submit/read contacts.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
const { values } = parseArgs({options:{
  url:{type:'string',default:'http://127.0.0.1:3000'},
  out:{type:'string',default:'qa/route-transition'},
  widths:{type:'string',default:'360,390,430,1920,1440,1280,1024,768,375'},
}});
await mkdir(values.out,{recursive:true});
const browser=await chromium.launch();
const report={matrix:[],checks:[],limitations:['Headless Chromium, no physical phone or field INP']};
const heights={360:780,390:844,430:932,375:812,768:1024,1024:768,1280:800,1440:900,1920:1080};
const errors=[];
const idle=page=>page.waitForFunction(()=>document.querySelector('[data-route-transition]')?.dataset.state==='idle',{},{timeout:3000});
async function prepare(width=390,reduced=false,setup) {
  const context=await browser.newContext({viewport:{width,height:heights[width]},isMobile:width<768,hasTouch:width<768,reducedMotion:reduced?'reduce':'no-preference'});
  await context.route('**/api/kontakty',r=>r.abort());
  if(setup)await setup(context);
  const page=await context.newPage();
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  await page.goto(`${values.url}/o-projektu`);
  await page.waitForFunction(wanted=>document.documentElement.dataset.reducedMotion===String(wanted),reduced);
  await page.evaluate(()=>document.fonts.ready);
  return {page,context};
}
async function link(page,path) {
  const target=page.locator(`footer a[href="${path}"]`);
  await target.focus();await page.keyboard.press('Enter');
}
const check=async(name,fn)=>{
  try{report.checks.push({name,pass:true,evidence:await fn()});}
  catch(error){report.checks.push({name,pass:false,error:String(error)});}
};
try {
  for(const width of values.widths.split(',').map(Number))for(const reduced of [false,true]) {
    const startErrors=errors.length;
    const {page,context}=await prepare(width,reduced);
    const row={width,reduced,pass:true};
    try{
      assert.equal(await page.locator('[data-route-transition]').getAttribute('data-state'),'idle','no initial intro');
      await link(page,'/zapojte-se');
      await page.waitForURL('**/zapojte-se');
      row.stateAtRouteChange=await page.locator('[data-route-transition]').getAttribute('data-state');
      if(!reduced){
        await page.waitForFunction(()=>document.querySelector('[data-route-transition]').dataset.state==='full');
        if([390,1440].includes(width)){
          await page.locator('[data-route-transition]').evaluate(root=>root.getAnimations({subtree:true}).forEach(animation=>{animation.pause();animation.currentTime=500;}));
          await page.screenshot({path:`${values.out}/${width}-transition-50.png`});
          await page.locator('[data-route-transition]').evaluate(root=>root.getAnimations({subtree:true}).forEach(animation=>animation.play()));
        }
      }
      await idle(page);
      assert.ok(await page.getByRole('heading',{level:1}).isVisible());
      assert.equal(await page.locator('[data-route-transition]').getAttribute('data-active'),null);
      row.overflow=await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-innerWidth));
      assert.equal(row.overflow,0,'route overflow');
      await page.goBack();await page.waitForURL('**/o-projektu');await idle(page);
      await page.goForward();await page.waitForURL('**/zapojte-se');await idle(page);
      if([390,1440].includes(width))await page.screenshot({path:`${values.out}/${width}-${reduced?'reduced':'settled'}.png`});
      assert.equal(errors.length,startErrors,'no browser errors');
    }catch(error){row.pass=false;row.error=String(error);}
    report.matrix.push(row);await context.close();
  }
  await check('Archive → detail uses React SharedPhoto, not the blue veil',async()=>{
    const {page,context}=await prepare();await link(page,'/pribehy');await page.waitForURL('**/pribehy');await idle(page);
    await page.evaluate(()=>{window.__blueFrames=[];window.__watch=setInterval(()=>{if(document.querySelector('[data-route-transition]').hasAttribute('data-active'))window.__blueFrames.push(performance.now());},10);});
    const card=page.locator('main a[href="/pribehy/praha-in"]').first();await card.focus();await page.keyboard.press('Enter');
    await page.waitForURL('**/pribehy/praha-in');await page.waitForTimeout(600);
    assert.ok(await page.locator('[data-shared-photo="praha-in"]').isVisible());
    const fullFrames=await page.evaluate(()=>{clearInterval(window.__watch);return window.__blueFrames.length;});
    assert.equal(fullFrames,0);await context.close();return {fullFrames};
  });
  await check('Rapid real Next requests keep the last choice and clear the veil',async()=>{
    const {page,context}=await prepare();
    await page.evaluate(()=>{for(const href of ['/pribehy','/o-projektu','/zapojte-se'])document.querySelector(`footer a[href="${href}"]`).click();});
    await page.waitForURL('**/zapojte-se');await idle(page);
    assert.ok(await page.getByRole('heading',{level:1}).isVisible());await context.close();return 'last Next destination wins';
  });
  await check('Menu preference cancels SVG immediately, subsequent navigation is quiet',async()=>{
    const {page,context}=await prepare();await link(page,'/zapojte-se');
    await page.waitForFunction(()=>document.querySelector('[data-route-transition]').dataset.state==='full');
    await page.evaluate(()=>{localStorage.setItem('era40-reduce-motion','1');dispatchEvent(new Event('era40-motion-change'));});
    await page.waitForFunction(()=>document.documentElement.dataset.reducedMotion==='true');
    assert.equal(await page.locator('[data-route-transition]').getAttribute('data-active'),null);
    await page.waitForURL('**/zapojte-se');await link(page,'/o-projektu');await page.waitForURL('**/o-projektu');await idle(page);
    assert.equal(await page.locator('[data-route-transition]').getAttribute('data-active'),null);
    await context.close();return 'menu preference respected during and after animation';
  });
  await check('Menu navigation closes its dialog',async()=>{
    const {page,context}=await prepare();await page.getByRole('button',{name:'Kapitoly',exact:true}).click();
    const dialog=page.locator('#chapter-menu');await dialog.getByRole('link',{name:/Zapoj/}).click();
    await page.waitForURL('**/zapojte-se');await idle(page);assert.equal(await dialog.getAttribute('open'),null);
    await context.close();return 'dialog closed, page accessible';
  });
  await check('Native ViewTransition API absent, same real navigation still works',async()=>{
    const {page,context}=await prepare(390,false,ctx=>ctx.addInitScript(()=>{document.startViewTransition=undefined;}));
    await link(page,'/zapojte-se');await page.waitForURL('**/zapojte-se');await idle(page);
    assert.ok(await page.getByRole('heading',{level:1}).isVisible());
    await link(page,'/pribehy');await page.waitForURL('**/pribehy');await idle(page);
    await page.locator('main a[href="/pribehy/praha-in"]').first().focus();await page.keyboard.press('Enter');
    await page.waitForURL('**/pribehy/praha-in');await idle(page);
    assert.equal(await page.locator('[data-route-transition]').getAttribute('data-active'),null);
    assert.ok(await page.getByRole('heading',{level:1}).isVisible());
    await context.close();return 'DOM/SVG fallback and shared-photo fade on actual Next routes';
  });
  await check('Query-only archive ordering does not invoke the full transition',async()=>{
    const {page,context}=await prepare();await link(page,'/pribehy');await page.waitForURL('**/pribehy');await idle(page);
    await page.getByRole('combobox',{name:/Řadit/}).selectOption('year');await page.waitForURL('**razeni=rok');
    assert.equal(await page.locator('[data-route-transition]').getAttribute('data-active'),null);
    await context.close();return 'archive query and current interaction preserved';
  });
  await check('Without JavaScript, SSR content is visible and the overlay stays hidden',async()=>{
    const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    await context.route('**/api/kontakty',r=>r.abort());
    const page=await context.newPage();await page.goto(`${values.url}/o-projektu`);
    assert.ok(await page.getByRole('heading',{level:1}).isVisible());
    assert.equal(await page.locator('[data-route-transition]').evaluate(root=>getComputedStyle(root).visibility),'hidden');
    await context.close();return 'real SSR heading accessible, no JavaScript veil';
  });
  report.errors=errors;
  report.pass=report.matrix.every(row=>row.pass)&&report.checks.every(row=>row.pass)&&!errors.length;
}finally{await browser.close();}
await writeFile(`${values.out}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({pass:report.pass,matrix:report.matrix.length,checks:report.checks,failures:report.matrix.filter(row=>!row.pass),errors:report.errors},null,2));
process.exitCode=report.pass?0:1;
