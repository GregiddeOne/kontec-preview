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
