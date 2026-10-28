(function(){
let ctx;
function sound(type){try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();
const o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime;
const f={thud:[110,40,'sine'],boom:[80,20,'sawtooth'],ding:[880,1320,'triangle'],brr:[200,60,'square'],dance:[440,660,'square']}[type]||[110,40,'sine'];
o.type=f[2];o.frequency.setValueAtTime(f[0],t);o.frequency.exponentialRampToValueAtTime(f[1],t+.3);
g.gain.setValueAtTime(.4,t);g.gain.exponentialRampToValueAtTime(.001,t+.4);o.connect(g).connect(ctx.destination);o.start();o.stop(t+.4)}catch(e){}}
function pop(x,y,txt){const s=document.createElement('span');s.className='pop';s.textContent=txt;s.style.left=x+'px';s.style.top=y+'px';document.body.appendChild(s);setTimeout(()=>s.remove(),900)}
document.querySelectorAll('[data-bang]').forEach(el=>{let n=0;const words=el.dataset.bang.split('|'),c=document.querySelector('.count');
el.addEventListener('click',e=>{n++;sound(el.dataset.sound);const r=el.getBoundingClientRect();
pop((e.clientX||r.left+r.width/2)-40+Math.random()*60,(e.clientY||r.top)-20,words[n%words.length]);
document.body.classList.remove('shake');void document.body.offsetWidth;document.body.classList.add('shake');
if(c)c.textContent=c.dataset.label.replace('#',n)})});
const p=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('nav a').forEach(a=>{if(a.getAttribute('href')===p)a.setAttribute('aria-current','page')});
})();
