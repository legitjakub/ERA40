import { readFile, writeFile } from "node:fs/promises";
import ts from "../../../../web/node_modules/typescript/lib/typescript.js";

// Read the actual story literals rather than inventing a schematic Europe.
const storyText = await readFile(new URL("../../../../web/src/content/stories.ts", import.meta.url), "utf8");
const ast = ts.createSourceFile("stories.ts", storyText, ts.ScriptTarget.Latest, true);
const routes = [];
const properties = (node) => Object.fromEntries(node.properties.map((p) => [p.name?.text, p.initializer]));
function visit(node) {
  if (ts.isObjectLiteralExpression(node)) {
    const p = properties(node);
    if (p.id && p.name && p.from && p.to && p.coords && ts.isObjectLiteralExpression(p.coords)) {
      const coords = properties(p.coords);
      const tuple = (value) => value.elements.map((item) => Number(item.getText(ast)));
      routes.push({ id: p.id.text, name: p.name.text, from: p.from.text, to: p.to.text, a: tuple(coords.from), b: tuple(coords.to) });
    }
  }
  ts.forEachChild(node, visit);
}
visit(ast);
if (routes.length !== 8) throw new Error(`Expected eight existing routes, received ${routes.length}`);
const geoText = await readFile(new URL("../../../../web/src/lib/geo/europe.ts", import.meta.url), "utf8");
const geoCode = ts.transpileModule(geoText, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { project, routeArc } = await import("data:text/javascript;base64," + Buffer.from(geoCode).toString("base64"));
for (const route of routes) {
  route.a = project(route.a);
  route.b = project(route.b);
  route.path = routeArc(route.a, route.b);
}
const land = (await readFile(new URL("../../../../web/public/media/europe-land-blue.svg", import.meta.url), "utf8"))
  .replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
const html = `<!doctype html><html lang="cs"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ERA40 · 015 B · geografická kamera</title><style>
*{box-sizing:border-box}body{margin:0;background:#fff;color:#0b1b33;font:17px/1.5 Arial,sans-serif}main{max-width:1200px;margin:auto;padding:24px}h1{color:#004494;font-size:clamp(30px,5vw,60px);line-height:1.05;margin:20px 0}p{max-width:65ch}.layout{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:24px}.map{min-width:0;background:#004494}svg{width:100%;height:auto;display:block}.route{fill:none;stroke:#fff;stroke-width:1.5;opacity:.55;vector-effect:non-scaling-stroke}.active{fill:none;stroke:#ffed00;stroke-width:3;vector-effect:non-scaling-stroke}.point{fill:#fff;stroke:#004494;stroke-width:2}text{fill:#fff;stroke:#004494;stroke-width:4;paint-order:stroke;font-size:19px;font-weight:bold}button{min-height:44px;font:inherit;border:1px solid #004494;color:#004494;background:#fff;padding:8px 12px;text-align:left;cursor:pointer}button[aria-pressed=true]{background:#004494;color:#fff}.choices{display:grid;gap:8px}button:focus-visible,input:focus-visible{outline:3px solid #ffed00;outline-offset:3px;box-shadow:0 0 0 5px #004494}.tools{display:flex;gap:16px;flex-wrap:wrap;align-items:center;margin:20px 0}.tools label{display:inline-flex;align-items:center;gap:8px;min-height:44px}output{display:block;margin:16px 0;color:#004494}aside p{font-size:15px}input{width:20px;height:20px}@media(max-width:1023px){.layout{grid-template-columns:minmax(0,1fr)}main{padding:16px}.choices{grid-template-columns:repeat(2,minmax(0,1fr))}.choices button{min-width:0;font-size:15px}.tools{gap:8px}}
</style><main><h1>Trasa v kontextu Evropy</h1><p>Izolovaný prototyp 015 B. Skutečné souřadnice osmi příběhů, stejná projekce jako ERA40. Kamera se pohne jen po výběru. Na mobilu a při omezeném pohybu zůstává celý přehled.</p><div class="tools"><label><input id="follow" type="checkbox">Přiblížit vybranou trasu</label><button id="overview" type="button">Celá Evropa</button><output id="zoom" aria-live="polite">Přehled · 1,00×</output></div><div class="layout"><div class="map"><svg id="map" viewBox="0 0 840 870" role="img" aria-label="Evropa se skutečnými trasami příběhů">${land}${routes.map((r) => `<path class="route" d="${r.path}"/>`).join("")}<path id="active" class="active"/><g id="ends"></g></svg></div><aside><div id="choices" class="choices" aria-label="Výběr skutečné trasy"></div><p id="selected" role="status"></p><p>Žlutá je vybraná trasa. Ostatní cesty zůstávají pro orientaci. Přiblížení je omezené na 1,6× a vždy zahrne oba konce.</p></aside></div></main><script>
const routes=${JSON.stringify(routes)},svg=document.querySelector('#map'),path=document.querySelector('#active'),ends=document.querySelector('#ends'),follow=document.querySelector('#follow'),zoom=document.querySelector('#zoom');
const desktop=matchMedia('(min-width:1024px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)'),base=[0,0,840,870];let current=[...base],selected=0,frame=0;
function allowed(){return desktop.matches&&!reduced.matches}
function paint(box){current=box;svg.setAttribute('viewBox',box.map(n=>n.toFixed(3)).join(' '));zoom.textContent=(box[2]<839?'Vybraná trasa':'Přehled')+' · '+(840/box[2]).toFixed(2).replace('.',',')+'×'}
function move(to){cancelAnimationFrame(frame);if(!allowed()){paint(base);return}const from=[...current],start=performance.now();function tick(now){const p=Math.min(1,(now-start)/450),e=1-Math.pow(1-p,4);paint(to.map((n,i)=>from[i]+(n-from[i])*e));if(p<1)frame=requestAnimationFrame(tick)}frame=requestAnimationFrame(tick)}
function bounds(){const b=path.getBBox(),ratio=840/870,w=Math.min(840,Math.max(840/1.6,b.width+150,(b.height+150)*ratio)),h=w/ratio;return[Math.max(0,Math.min(840-w,b.x+b.width/2-w/2)),Math.max(0,Math.min(870-h,b.y+b.height/2-h/2)),w,h]}
function choose(i,pan=true){selected=i;const r=routes[i];path.setAttribute('d',r.path);ends.replaceChildren();for(const [point,label] of[[r.a,r.from],[r.b,r.to]]){const c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',point[0]);c.setAttribute('cy',point[1]);c.setAttribute('r',7);c.setAttribute('class','point');ends.append(c);const t=document.createElementNS('http://www.w3.org/2000/svg','text');t.setAttribute('x',point[0]+12);t.setAttribute('y',point[1]-12);t.textContent=label;ends.append(t)}document.querySelector('#selected').textContent=r.from+' → '+r.to+' · '+r.name;document.querySelectorAll('[data-route]').forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));if(pan)move(allowed()&&follow.checked?bounds():base)}
routes.forEach((r,i)=>{const b=document.createElement('button');b.type='button';b.dataset.route=r.id;b.textContent=r.from+' → '+r.to;b.onclick=()=>choose(i);document.querySelector('#choices').append(b)});
function resize(){cancelAnimationFrame(frame);follow.disabled=!allowed();if(!allowed())follow.checked=false;paint(base)}desktop.addEventListener('change',resize);reduced.addEventListener('change',resize);document.querySelector('#overview').onclick=()=>{follow.checked=false;move(base)};follow.onchange=()=>choose(selected);resize();choose(0,false);
</script></html>`;
await writeFile(new URL("index.html", import.meta.url), html);
await writeFile(new URL("routes.json", import.meta.url), JSON.stringify(routes, null, 2) + "\n");
console.log(`015 B: ${routes.length} actual routes, shared geography and projection`);
