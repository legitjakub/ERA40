/* Isolated choreography proof. History here is a local simulation; production
 * must let React own ViewTransition and Next own routing (spec 014). */
(() => {
  const content = document.getElementById('content');
  const overlay = document.getElementById('transition');
  const veil = overlay.querySelector('.veil');
  const trail = overlay.querySelector('.trail');
  const type = overlay.querySelector('.anniversary');
  const progress = document.getElementById('progress');
  const percent = document.getElementById('percent');
  const reduced = document.getElementById('reduced');
  const fallback = document.getElementById('fallback');
  const status = document.getElementById('status');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const views = new Set(['home','archive','story','about','join']);
  let view = new URL(location.href).searchParams.get('view') || 'home';
  if (!views.has(view)) view = 'home';
  let desiredView = view, navigationSequence = 0;
  let animations = [], deadline = 0, sequence = 0, nativeTransition;
  const easing = getComputedStyle(document.documentElement).getPropertyValue('--ease-out').trim();
  const motionReduced = () => reduced.checked || media.matches;
  const photoTransition = (from, to) =>
    (from === 'archive' && to === 'story') || (from === 'story' && to === 'archive');

  function reset() {
    clearTimeout(deadline);
    animations.forEach(animation => animation.cancel());
    animations = [];
    overlay.removeAttribute('data-active');
    overlay.removeAttribute('data-preview');
    delete document.documentElement.dataset.preview;
    progress.value = '0'; percent.value = '0 %';
  }

  function makeAnimations() {
    return [
      veil.animate([
        {transform:'translateY(100%)',offset:0,easing},
        {transform:'translateY(0)',offset:.16},
        {transform:'translateY(0)',offset:.7,easing},
        {transform:'translateY(-100%)',offset:1}
      ], {duration:1000,fill:'both'}),
      trail.animate([
        {strokeDashoffset:1000,offset:0},
        {strokeDashoffset:1000,offset:.12,easing},
        {strokeDashoffset:0,offset:.64},
        {strokeDashoffset:0,offset:1}
      ], {duration:1000,fill:'both'}),
      type.animate([
        {opacity:0,offset:0}, {opacity:0,offset:.2,easing},
        {opacity:1,offset:.38}, {opacity:1,offset:.74}, {opacity:0,offset:.9}, {opacity:0,offset:1}
      ], {duration:1000,fill:'both'})
    ];
  }

  function play(shared = false) {
    reset();
    const id = ++sequence;
    const quiet = motionReduced() || shared;
    if (quiet) {
      const animation = content.animate([{opacity:.72},{opacity:1}],{duration:160,easing});
      animations = [animation];
      animation.finished.then(() => {if(id===sequence)reset();}).catch(() => {});
      status.textContent = shared ? 'Sdílená fotografie: bez modré předávky; nativní foto má přednost.' : 'Omezený pohyb: pouze fade 160 ms.';
      return;
    }
    overlay.setAttribute('data-active','');
    animations = makeAnimations();
    // Independent deadline also clears a paused/cancelled animation.
    deadline = setTimeout(() => { if(id===sequence) reset(); }, 1200);
    animations[0].finished.then(() => {if(id===sequence)reset();}).catch(() => {});
    status.textContent = 'Trasa pokračuje · 1 s · navigace nečeká na dokončení.';
  }

  function render(to, focus = true) {
    content.replaceChildren(document.getElementById(to).content.cloneNode(true));
    content.dataset.view = to;
    view = to;
    document.querySelectorAll('.site-header a').forEach(link => {
      if (new URL(link.href).searchParams.get('view') === to) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
    if(focus) content.focus({preventScroll:true});
  }

  function navigate(to, historyEntry = true) {
    if(!views.has(to) || to===desiredView) return;
    desiredView = to;
    const request = ++navigationSequence;
    const from = view;
    const shared = photoTransition(from,to);
    nativeTransition?.skipTransition();
    reset();
    const commit = () => {
      if(request !== navigationSequence) return;
      if(historyEntry) {
        const url = new URL(location.href); url.searchParams.set('view',to); history.pushState({view:to},'',url);
      }
      render(to); scrollTo({top:0,behavior:'instant'});
    };
    // Only this standalone non-React prototype owns the native API.
    if(document.startViewTransition && !fallback.checked) {
      nativeTransition = document.startViewTransition(commit);
      nativeTransition.ready.catch(() => {});
      nativeTransition.finished.catch(() => {});
    } else commit();
    play(shared);
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if(!link || event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target!=='_self')) return;
    const url = new URL(link.href);
    if(url.origin!==location.origin || url.pathname!==location.pathname || url.hash) return;
    const to = url.searchParams.get('view');
    if(!views.has(to)) return;
    event.preventDefault(); navigate(to);
  });

  addEventListener('popstate', () => navigate(new URL(location.href).searchParams.get('view') || 'home', false));
  document.getElementById('replay').addEventListener('click', () => play());
  progress.addEventListener('input', () => {
    if(motionReduced()) { reset(); status.textContent='Omezený pohyb: kreslení je vypnuté.'; return; }
    const value = Number(progress.value);
    if(!overlay.hasAttribute('data-preview')) {
      reset(); sequence++;
      overlay.setAttribute('data-active',''); overlay.setAttribute('data-preview','');
      animations = makeAnimations(); animations.forEach(animation => animation.pause());
    }
    animations.forEach(animation => {animation.currentTime = value * 10;});
    progress.value = String(value); percent.value = `${value} %`;
    status.textContent = `Zastavený frame ${value} % · přehrání nebo navigace náhled ukončí.`;
  });
  function preferenceChanged() {
    reset(); sequence++;
    nativeTransition?.skipTransition();
    document.documentElement.dataset.reduced=String(motionReduced());
    status.textContent = motionReduced() ? 'Omezený pohyb zapnutý; SVG předávka vypnutá.' : 'Pohyb povolen.';
  }
  reduced.addEventListener('change',preferenceChanged);
  fallback.addEventListener('change',()=>{nativeTransition?.skipTransition();reset();});
  media.addEventListener('change',preferenceChanged);
  addEventListener('visibilitychange',()=>{if(document.hidden){sequence++;reset();nativeTransition?.skipTransition();}});
  addEventListener('pagehide',()=>{sequence++;reset();nativeTransition?.skipTransition();});
  render(view,false);
  document.documentElement.dataset.reduced=String(motionReduced());
})();
