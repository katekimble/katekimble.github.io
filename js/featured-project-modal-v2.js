document.addEventListener('DOMContentLoaded', () => {
  const productCaseStudyTrigger = document.querySelector('[data-case-study-modal]');
  const caseStudyModal = document.getElementById('case-study-modal');
  const caseStudyClose = document.querySelector('[data-case-study-close]');
  const scrollIndicator = document.getElementById('scroll-indicator');
  const lastGif = document.querySelector('.featured-project-gifs img:last-child');
  const heroLinks = document.querySelector('.hero-links');
  const resumeLinkedIn = document.querySelector('.resume-linkedin');
  const featuredProjectLink = document.querySelector('.featured-project-link');

  function addRoundedForwardArrow(link) {
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
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrow.setAttribute('class', 'inline-rounded-arrow');
    arrow.setAttribute('viewBox', '0 0 24 24');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.setAttribute('focusable', 'false');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12.29 6.71a.996.996 0 0 0 0 1.41L15.17 11H5a1 1 0 1 0 0 2h10.17l-2.88 2.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L13.7 6.7a.996.996 0 0 0-1.41.01z');
    arrow.appendChild(path);
    link.appendChild(arrow);
    link.dataset.arrowStyled = 'true';
  }

  addRoundedForwardArrow(resumeLinkedIn);
  addRoundedForwardArrow(featuredProjectLink);

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
    if (event.key === 'Escape' && caseStudyModal && !caseStudyModal.hidden) closeCaseStudyModal();
  });
  window.addEventListener('scroll', updateScrollIndicatorPosition, { passive: true });
  window.addEventListener('resize', updateScrollIndicatorPosition);
  updateScrollIndicatorPosition();
});
