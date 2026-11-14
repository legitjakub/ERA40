/* Isolated direction study. No production imports, changes, smooth-scroll owner or WebGL. */
(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const scene = $('#scene'), experience = $('.experience'), range = $('#progress');
  const photo = $('.shared-photo'), map = $('.map-surface');
  const active = $('.route-active'), base = $('.route-base');
  const fromDot = $('.origin'), toDot = $('.destination'), dot = $('.traveller');
  const fromLabel = $('.origin-label'), toLabel = $('.destination-label');
  const portrait = $('#portrait'), play = $('#play'), reduce = $('#reduce');
  const osReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 1023px)');
  const people = {
    tereza: { name:'Tereza', from:'Olomouc', to:'Valencie', a:[17.25,49.59], b:[-.38,39.47], image:'ph-train-window-woman.jpg', alt:'Ilustrační fotografie mladé ženy u okna vlaku', meta:'Architektura · 2019', quote:'„Poprvé jsem musela říct nahlas, co si myslím, a v cizím jazyce.“' },
    ines: { name:'Inês', from:'Lisabon', to:'Praha', a:[-9.14,38.72], b:[14.42,50.08], image:'ph-prague-street.jpg', alt:'Ilustrační fotografie ulice v Praze', meta:'Mezinárodní vztahy · 2023', quote:'„Praha pro mě nebyla zastávka. Stala se z ní adresa.“' }
  };
  let current = 'tereza', progress = 0, timeline, playing, geometry, manualReduce = false;
  let scrollRaf = 0, resizeRaf = 0, resizeProgress = null;
  const clamp = (v) => Math.max(0, Math.min(1,v));
  const mix = (a,b,t) => a+(b-a)*t;
  const reduced = () => osReduce.matches || manualReduce;
  const simplify = () => mobile.matches || reduced();
  function playLabel() { return simplify() ? (progress<.5?'Zobrazit mapu ↗':'Zobrazit příběh ↙') : 'Přehrát přechod ↗'; }
  function stop() { playing?.kill(); playing=null; play.textContent = playLabel(); }
  function scrollBounds() {
    const start=experience.getBoundingClientRect().top+window.scrollY;
    return {start, length:Math.max(1,experience.offsetHeight-$('.sticky').offsetHeight)};
  }
  function moveTo(p, scroll=false) {
    progress=clamp(p);
    const effective=simplify()?(progress<.5?0:1):progress;
    timeline?.progress(effective);
    if(!playing)play.textContent=playLabel();
    scene.classList.toggle('is-end',effective===1);
    $('.source-copy').setAttribute('aria-hidden',String(effective>.3));
    $('.map-heading').setAttribute('aria-hidden',String(effective<.5));
    $('.map-caption').setAttribute('aria-hidden',String(effective<.9));
    range.value=String(Math.round(progress*1000));
    $('#percentage').textContent=`${Math.round(progress*100)} %`;
    range.setAttribute('aria-valuetext',effective<.2?'Příběh, začátek přechodu':effective>.85?'Mapa, konec přechodu':'Předávka fotografie mezi příběhem a mapou');
    document.querySelectorAll('[data-frame]').forEach(el=>el.setAttribute('aria-pressed',String(Math.abs(Number(el.dataset.frame)-effective)<.06)));
    if(scroll && !simplify()) {const {start,length}=scrollBounds();window.scrollTo({top:start+progress*length,behavior:'instant'});}
  }
  function build() {
    stop(); timeline?.kill();
    const w=scene.clientWidth,h=scene.clientHeight;
    gsap.set(map,{scale:1,y:0});
    const r=map.getBoundingClientRect(),s=scene.getBoundingClientRect();
    const fit=Math.min(r.width/840,r.height/870);
    const offset={x:r.left-s.left+(r.width-fit*840)/2,y:r.top-s.top+(r.height-fit*870)/2};
    const project=([lon,lat])=>({x:offset.x+(lon+15)*15*fit,y:offset.y+(71-lat)*24.35*fit});
    const person=people[current],a=project(person.a),b=project(person.b);
    const bend=Math.max(15,Math.abs(b.x-a.x)*.1);
    const q={x:(a.x+b.x)/2+bend,y:(a.y+b.y)/2-bend};
    const c1={x:a.x+(q.x-a.x)*2/3,y:a.y+(q.y-a.y)*2/3},c2={x:b.x+(q.x-b.x)*2/3,y:b.y+(q.y-b.y)*2/3};
    const lineA={x:w*.05,y:h*.86},lineB={x:w*.54,y:h*.86};
    const line=[lineA,{x:mix(lineA.x,lineB.x,1/3),y:lineA.y},{x:mix(lineA.x,lineB.x,2/3),y:lineA.y},lineB];
    const curve=[a,c1,c2,b];
    geometry={w,h,a,b,curve,line};
    $('.route-layer').setAttribute('viewBox',`0 0 ${w} ${h}`);
    const imageStart=mobile.matches?{x:w*.06,y:h*.04,width:w*.88,height:h*.45}:{x:w*.04,y:h*.1,width:w*.52,height:h*.72};
    const target=mobile.matches?{x:w*.06,y:h*.73,scale:.29}:{x:w*.64,y:h*.26,scale:.59};
    const labelStart={x:w*(mobile.matches?.09:.05),y:h*(mobile.matches?.42:.76)};
    const labelEnd={x:target.x+10,y:target.y+imageStart.height*target.scale-30};
    gsap.set(photo,{x:0,y:0,scale:1});
    gsap.set('.photo-label',{x:0,y:0});
    const t={route:0,travel:0};
    function renderRoute() {
      const points=line.map((p,i)=>({x:mix(p.x,curve[i].x,t.route),y:mix(p.y,curve[i].y,t.route)}));
      const d=`M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y} ${points[3].x} ${points[3].y}`;
      base.setAttribute('d',d);active.setAttribute('d',d);
      const draw=t.route<.99?1:t.travel;
      active.style.strokeDashoffset=String(1-draw);
      active.style.opacity=String(t.route<.99?1-t.route:1);
      active.style.stroke=t.route<.45?'#ffffff':'#004494';
      base.style.stroke=t.route<.45?'#ffffff':'#004494';
      fromDot.setAttribute('cx',points[0].x);fromDot.setAttribute('cy',points[0].y);
      toDot.setAttribute('cx',points[3].x);toDot.setAttribute('cy',points[3].y);
      fromDot.style.opacity=String(t.route);toDot.style.opacity=String(t.route);
      const pt=active.getPointAtLength(active.getTotalLength()*(t.route<.99?0:t.travel));
      dot.setAttribute('cx',pt.x);dot.setAttribute('cy',pt.y);
      fromLabel.setAttribute('x',a.x+10);fromLabel.setAttribute('y',a.y-12);
      toLabel.setAttribute('x',b.x+10);toLabel.setAttribute('y',b.y+5);
    }
    fromLabel.textContent=person.from;toLabel.textContent=person.to;
    timeline=gsap.timeline({paused:true,onUpdate:renderRoute,defaults:{ease:'none'}});
    timeline.to({}, {duration:1},0);
    timeline.fromTo('.source-copy',{opacity:1,y:0},{opacity:0,y:-28,duration:.17},.13);
    timeline.fromTo('.source-station',{opacity:.85},{opacity:0,duration:.15},.16);
    timeline.fromTo('.sky',{opacity:0},{opacity:1,duration:.24},.21);
    timeline.fromTo(photo,{x:0,y:0,scale:1},{x:target.x-imageStart.x,y:target.y-imageStart.y,scale:target.scale,duration:.44,ease:'power2.inOut'},.25);
    timeline.fromTo('.photo-label',{x:0,y:0},{x:labelEnd.x-labelStart.x,y:labelEnd.y-labelStart.y,duration:.44,ease:'power2.inOut'},.25);
    timeline.fromTo(map,{opacity:0,scale:1.08,y:24},{opacity:1,scale:1,y:0,duration:.21},.34);
    timeline.fromTo('.map-heading',{opacity:0,y:24},{opacity:1,y:0,duration:.18},.32);
    timeline.fromTo(t,{route:0},{route:1,duration:.27,ease:'power2.inOut'},.35);
    timeline.fromTo(t,{travel:0},{travel:1,duration:.27},.62);
    timeline.fromTo([fromLabel,toLabel],{opacity:0},{opacity:1,duration:.15},.62);
    timeline.fromTo('.map-caption',{opacity:0,y:16},{opacity:1,y:0,duration:.19},.74);
    reduce.setAttribute('aria-pressed',String(reduced()));
    reduce.textContent=reduced()?'Pohyb omezený':'Omezit pohyb';
    reduce.disabled=osReduce.matches;
    moveTo(progress);
    window.__eraPrototype={setProgress:(p)=>{stop();moveTo(p,true);},getState:()=>({progress,effective:simplify()?(progress<.5?0:1):progress,person:current,reduced:reduced(),mobile:mobile.matches,geometry})};
  }
  function choosePerson(id) {
    stop();current=id;const p=people[id];
    const values={...p,journey:`${p.from} → ${p.to}`};
    document.querySelectorAll('[data-copy]').forEach(el=>el.textContent=values[el.dataset.copy]);
    portrait.src=`/_media/${p.image}`;portrait.alt=p.alt;
    document.querySelectorAll('[data-person]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.person===id)));
    build();
  }
  document.querySelectorAll('[data-person]').forEach(el=>el.addEventListener('click',()=>choosePerson(el.dataset.person)));
  document.querySelectorAll('[data-frame]').forEach(el=>el.addEventListener('click',()=>{stop();moveTo(Number(el.dataset.frame),true);}));
  range.addEventListener('input',()=>{stop();moveTo(Number(range.value)/1000,true);});
  play.addEventListener('click',()=>{
    if(playing){stop();return;}
    if(simplify()){moveTo(progress<.5?1:0);play.textContent=progress>.5?'Zobrazit příběh ↙':'Zobrazit mapu ↗';return;}
    if(progress>.98)moveTo(0,true);
    const driver={p:progress};play.textContent='Pozastavit Ⅱ';
    playing=gsap.to(driver,{p:1,duration:5.6*(1-progress),ease:'none',onUpdate:()=>moveTo(driver.p,true),onComplete:stop});
  });
  reduce.addEventListener('click',()=>{manualReduce=!manualReduce;build();});
  osReduce.addEventListener('change',()=>build());
  window.addEventListener('resize',()=>{
    if(resizeProgress===null)resizeProgress=progress;
    cancelAnimationFrame(scrollRaf);cancelAnimationFrame(resizeRaf);
    resizeRaf=requestAnimationFrame(()=>{
      progress=resizeProgress;build();
      resizeRaf=requestAnimationFrame(()=>{
        moveTo(resizeProgress,!simplify());resizeProgress=null;
      });
    });
  });
  window.addEventListener('wheel',stop,{passive:true});window.addEventListener('touchstart',stop,{passive:true});
  window.addEventListener('scroll',()=>{if(simplify()||playing||resizeProgress!==null)return;cancelAnimationFrame(scrollRaf);scrollRaf=requestAnimationFrame(()=>{const {start,length}=scrollBounds();moveTo((window.scrollY-start)/length);});},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  if(!window.gsap)return;
  document.fonts.ready.then(build);
})();
