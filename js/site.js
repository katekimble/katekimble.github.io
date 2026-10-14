document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('case-study-modal');
  const closeButton = modal?.querySelector('[data-case-study-close]');
  let lastTrigger = null;

  function openModal(event) {
    event.preventDefault();
    if (!modal) return;
    lastTrigger = event.currentTarget;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeButton?.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastTrigger?.focus();
  }

  document.querySelectorAll('[data-case-study-modal]').forEach(trigger => trigger.addEventListener('click', openModal));
  closeButton?.addEventListener('click', closeModal);
  modal?.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

  document.querySelectorAll('[data-jump]').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.jump === 'top' ? null : document.getElementById(button.dataset.jump);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  const heroJump = document.querySelector('.jump-row .jump, .bio-aside .jump');
  const heroCell = heroJump?.parentElement;
  if (heroJump && heroCell) {
    function placeHeroJump() {
      const cell = heroCell.getBoundingClientRect();
      const mobileOnly = heroCell.classList.contains('bio-aside') && !window.matchMedia('(max-width: 1000px)').matches;
      const hidden = !mobileOnly && cell.top + heroJump.offsetHeight + 16 > window.innerHeight;
      heroJump.classList.toggle('is-floating', hidden);
      heroJump.style.left = hidden ? `${cell.left + (cell.width - heroJump.offsetWidth) / 2}px` : '';
    }
    window.addEventListener('scroll', placeHeroJump, { passive: true });
    window.addEventListener('resize', placeHeroJump);
    placeHeroJump();
  }

  const rosette = document.querySelector('.rosette');
  const tip = document.getElementById('rosette-tip');
  if (rosette && tip) {
    const petals = rosette.querySelectorAll('.petal');
    const leads = document.querySelectorAll('.lead-line');
    function showTip(petal, x, y) {
      const [title, line] = petal.dataset.tip.split(': ');
      tip.innerHTML = '';
      const strong = document.createElement('strong');
      strong.textContent = title;
      tip.appendChild(strong);
      if (line) tip.appendChild(document.createTextNode(line));
      const box = rosette.getBoundingClientRect();
      if (x === undefined) {
        const r = petal.getBoundingClientRect();
        x = r.left + r.width / 2; y = r.top;
      }
      tip.hidden = false;
      const half = tip.offsetWidth / 2;
      const cx = Math.min(Math.max(x, half + 8), document.documentElement.clientWidth - half - 8);
      tip.style.left = `${cx - box.left}px`;
      tip.style.top = `${y - box.top}px`;
      petals.forEach(p => p.classList.toggle('is-active', p === petal));
      leads.forEach(l => l.classList.toggle('is-lit', l.dataset.lead === petal.dataset.petal));
      petal.setAttribute('aria-describedby', 'rosette-tip');
    }
    function hideTip() {
      tip.hidden = true;
      leads.forEach(l => l.classList.remove('is-lit'));
      petals.forEach(p => { p.classList.remove('is-active'); p.removeAttribute('aria-describedby'); });
    }
    petals.forEach(petal => {
      petal.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') showTip(petal, e.clientX, e.clientY); });
      petal.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') hideTip(); });
      petal.addEventListener('click', e => showTip(petal, e.clientX || undefined, e.clientY || undefined));
      petal.addEventListener('focus', () => showTip(petal));
      petal.addEventListener('blur', hideTip);
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hideTip(); });
    document.addEventListener('pointerdown', e => { if (!rosette.contains(e.target)) hideTip(); });
  }
});
