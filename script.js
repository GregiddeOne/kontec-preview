// KONTEC protected preview gate
// Client-side presentation lock only. It deters casual access but does not make
// a public GitHub Pages deployment suitable for confidential/NDA material.
const KONTEC_PREVIEW_PASSWORD_HASH = 'b790b071341be967c5b9ff6bcab6fc7007e8576e1ce6e25faf4f89478ff2c18a'; // SHA-256 of current preview password
const KONTEC_AUTH_SESSION_KEY = 'kontec-preview-authorized-v1';

async function kontecSha256(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function kontecUnlockPreview() {
  const gate = document.getElementById('auth-gate');
  if (gate) gate.hidden = true;
  document.body.classList.remove('auth-locked');
}

function kontecInitPreviewGate() {
  const gate = document.getElementById('auth-gate');
  const form = document.getElementById('auth-form');
  const input = document.getElementById('auth-password');
  const error = document.getElementById('auth-error');
  const toggle = document.querySelector('.auth-toggle');
  if (!gate || !form || !input) return;

  try {
    if (sessionStorage.getItem(KONTEC_AUTH_SESSION_KEY) === 'yes') {
      kontecUnlockPreview();
      return;
    }
  } catch (_) {}

  // Keep the preview locked until a valid password is entered.
  requestAnimationFrame(() => input.focus({preventScroll:true}));

  toggle?.addEventListener('click', () => {
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    toggle.textContent = show ? 'Verbergen' : 'Anzeigen';
    toggle.setAttribute('aria-label', show ? 'Passwort verbergen' : 'Passwort anzeigen');
    input.focus();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (error) error.textContent = '';
    const submittedHash = await kontecSha256(input.value);
    if (submittedHash === KONTEC_PREVIEW_PASSWORD_HASH) {
      try { sessionStorage.setItem(KONTEC_AUTH_SESSION_KEY, 'yes'); } catch (_) {}
      kontecUnlockPreview();
      return;
    }
    input.value = '';
    input.classList.remove('auth-shake');
    void input.offsetWidth;
    input.classList.add('auth-shake');
    if (error) error.textContent = 'Passwort nicht korrekt. Bitte erneut versuchen.';
    input.focus();
  });
}

kontecInitPreviewGate();

const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.navlinks');
function closeMenu(){
  nav?.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
  menuBtn?.setAttribute('aria-label','Menü öffnen');
}
if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
  menuBtn.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');
});}
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});

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

// Native dialog keeps keyboard focus inside the gallery and supports Escape.
// Without dialog support or JavaScript, each thumbnail links to its full image.
const lightbox = document.querySelector('.lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  const links = Array.from(document.querySelectorAll('.gallery-link'));
  const viewer = lightbox.querySelector('.lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const count = document.getElementById('lightbox-count');
  let group = [];
  let current = 0;
  let opener = null;
  function showPhoto(index) {
    current = (index + group.length) % group.length;
    const link = group[current];
    viewer.src = link.href;
    viewer.alt = link.querySelector('img').alt;
    caption.textContent = link.dataset.caption;
    count.textContent = `${current + 1} / ${group.length}`;
  }
  links.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    group = links.filter(item => item.dataset.gallery === link.dataset.gallery);
    showPhoto(group.indexOf(link));
    lightbox.showModal();
    document.body.classList.add('gallery-open');
    lightbox.querySelector('.lightbox-close').focus();
  }));
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(current - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(current + 1));
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  lightbox.addEventListener('click', event => {
    if (event.target !== lightbox) return;
    const rect = lightbox.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('gallery-open');
    opener?.focus({preventScroll:true});
  });
}
