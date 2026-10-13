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
});
