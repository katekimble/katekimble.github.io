document.addEventListener('DOMContentLoaded', () => {
  const productCaseStudyTrigger = document.querySelector('[data-case-study-modal]');
  const caseStudyModal = document.getElementById('case-study-modal');
  const caseStudyClose = document.querySelector('[data-case-study-close]');
  const scrollIndicator = document.getElementById('scroll-indicator');
  const lastGif = document.querySelector('.featured-project-gifs img:last-child');
  const heroLinks = document.querySelector('.hero-links');
  const resumeLinkedIn = document.querySelector('.resume-linkedin');
  const featuredProjectLink = document.querySelector('.featured-project-link');

  function addOutlinedArrow(link) {
    if (!link || link.dataset.arrowStyled === 'true') return;
    const label = Array.from(link.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent)
      .join('')
      .replace(/\s*[→›]\s*$/, '')
      .trimEnd();

    Array.from(link.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) link.removeChild(node);
    });

    link.insertBefore(document.createTextNode(label + ' '), link.firstChild);
    const arrow = document.createElement('span');
    arrow.className = 'inline-outline-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    link.appendChild(arrow);
    link.dataset.arrowStyled = 'true';
  }

  addOutlinedArrow(resumeLinkedIn);
  addOutlinedArrow(featuredProjectLink);

  function openCaseStudyModal(event) {
    event?.preventDefault();
    if (!caseStudyModal) return;
    caseStudyModal.hidden = false;
    caseStudyModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    caseStudyClose?.focus();
  }

  function closeCaseStudyModal() {
    if (!caseStudyModal) return;
    caseStudyModal.hidden = true;
    caseStudyModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    productCaseStudyTrigger?.focus();
  }

  function isAtPageBottom() {
    return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
  }

  function updateScrollIndicatorPosition() {
    if (!scrollIndicator) return;

    scrollIndicator.style.marginTop = '0';

    if (isAtPageBottom() && lastGif) {
      const gifBottom = lastGif.getBoundingClientRect().bottom;
      scrollIndicator.style.top = `${Math.max(0, gifBottom - 71)}px`;
      return;
    }

    if (heroLinks) {
      const linksTop = heroLinks.getBoundingClientRect().top;
      scrollIndicator.style.top = `${Math.max(0, linksTop)}px`;
      return;
    }

    scrollIndicator.style.top = '56vh';
  }

  productCaseStudyTrigger?.addEventListener('click', openCaseStudyModal);
  caseStudyClose?.addEventListener('click', closeCaseStudyModal);
  caseStudyModal?.addEventListener('click', (event) => {
    if (event.target === caseStudyModal) closeCaseStudyModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && caseStudyModal && !caseStudyModal.hidden) {
      closeCaseStudyModal();
    }
  });

  window.addEventListener('scroll', updateScrollIndicatorPosition, { passive: true });
  window.addEventListener('resize', updateScrollIndicatorPosition);
  updateScrollIndicatorPosition();
});
