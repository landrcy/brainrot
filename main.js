// Shared: nav highlight, Web Audio sfx, popups, toast, global Easter eggs. No deps.
(function(){
  const here=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('nav.council a').forEach(a=>{if(a.getAttribute('href')===here)a.classList.add('here')});
  let ctx;
  const ac=()=>ctx||(ctx=new (window.AudioContext||window.webkitAudioContext)());
  function tone(f,d,type,vol,slide){try{const c=ac(),o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,c.currentTime);if(slide)o.frequency.exponentialRampToValueAtTime(slide,c.currentTime+d);g.gain.setValueAtTime(vol||.3,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+d);o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+d)}catch(e){}}
  function noise(d,vol){try{const c=ac(),b=c.createBuffer(1,c.sampleRate*d,c.sampleRate),x=b.getChannelData(0);for(let i=0;i<x.length;i++)x[i]=(Math.random()*2-1)*(1-i/x.length);const s=c.createBufferSource(),g=c.createGain();g.gain.value=vol||.4;s.buffer=b;s.connect(g).connect(c.destination);s.start()}catch(e){}}
  const S={thud:()=>{tone(110,.25,'sine',.6,45);noise(.05,.3)},
    boom:()=>{tone(900,.6,'square',.12,80);setTimeout(()=>{noise(.9,.6);tone(60,.8,'sine',.7,25)},550)},
    bloop:()=>tone(300+Math.random()*500,.15,'triangle',.3,900),
    chime:()=>{tone(1046,.5,'sine',.2);setTimeout(()=>tone(1318,.6,'sine',.15),120)},
    brr:()=>{for(let i=0;i<6;i++)setTimeout(()=>tone(2400-i*150,.05,'square',.05),i*40)},
    stamp:()=>{noise(.08,.7);tone(80,.15,'sine',.5)},
    buzz:()=>tone(120,.3,'sawtooth',.2)};
  window.BR={sfx:n=>S[n]&&S[n](),tone,
    pop(x,y,t,color){const e=document.createElement('div');e.className='pop';e.textContent=t;e.style.left=x+'px';e.style.top=y+'px';if(color)e.style.color=color;document.body.appendChild(e);setTimeout(()=>e.remove(),1000)},
    toast(t){let e=document.getElementById('toast');if(!e){e=document.createElement('div');e.id='toast';document.body.appendChild(e)}e.textContent=t;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),2600)},
    store(k,v){try{if(v===undefined)return +localStorage.getItem('br_'+k)||0;localStorage.setItem('br_'+k,v)}catch(e){return 0}}};
  // Easter egg: type "sahur" anywhere
  let buf='';addEventListener('keydown',e=>{buf=(buf+e.key.toLowerCase()).slice(-12);
    if(buf.endsWith('sahur')){BR.sfx('thud');BR.toast('🪵 he heard you. he is coming. (3 AM)');document.body.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:200,iterations:4})}
    if(buf.endsWith('verity')){BR.sfx('stamp');BR.toast('✅ VERIFIED: you know the word.')}});
  console.log('%cBRAINROT NIGHT COUNCIL','font:900 20px monospace;color:#f5b041','\nverity is watching the console too. type "sahur" or "verity" on any page.');
})();
// Compat: [data-bang] elements (used by patapim.html) — click pops a word, plays data-sound, bumps .count[data-label]
(function(){let n=0;document.querySelectorAll('[data-bang]').forEach(el=>el.addEventListener('click',e=>{
  const w=el.dataset.bang.split('|');BR.pop(e.clientX,e.clientY,w[Math.random()*w.length|0]);BR.sfx(el.dataset.sound||'bloop');n++;
  document.querySelectorAll('.count[data-label]').forEach(c=>c.textContent=c.dataset.label.replace('#',n))}))})();
