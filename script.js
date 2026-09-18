const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.navlinks');
if(menuBtn&&nav){menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));}
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));

const form=document.querySelector('#contact-form');
if(form){form.addEventListener('submit',e=>{
  e.preventDefault();
  const fd=new FormData(form);
  const subject=encodeURIComponent('Projektanfrage über kontec-bau.de – '+(fd.get('projekt')||'Bauvorhaben'));
  const body=encodeURIComponent(`Name: ${fd.get('name')}\nUnternehmen: ${fd.get('company')}\nTelefon: ${fd.get('phone')}\nE-Mail: ${fd.get('email')}\nProjektart: ${fd.get('projekt')}\n\nNachricht:\n${fd.get('message')}`);
  window.location.href=`mailto:info@kontec-bau.de?subject=${subject}&body=${body}`;
  const s=document.querySelector('.success'); if(s){s.style.display='block'}
});}

// subtle reveal for the homepage; content remains fully visible without JS
if ('IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('.service-card, .sector-card, .why-card, .number-card, .case-card, .process-step, .company-manifesto');
  revealTargets.forEach(el => el.classList.add('reveal-ready'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('reveal-in'); io.unobserve(entry.target); }
    });
  }, {threshold: 0.08});
  revealTargets.forEach(el => io.observe(el));
}
