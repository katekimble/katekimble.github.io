const productCaseStudyTrigger = document.querySelector('[data-case-study-modal]');
const caseStudyModal = document.getElementById('case-study-modal');
const caseStudyClose = document.querySelector('[data-case-study-close]');

function openCaseStudyModal() {
  if (!caseStudyModal) return;
  caseStudyModal.hidden = false;
  document.body.classList.add('modal-open');
  caseStudyClose?.focus();
}

function closeCaseStudyModal() {
  if (!caseStudyModal) return;
  caseStudyModal.hidden = true;
  document.body.classList.remove('modal-open');
  productCaseStudyTrigger?.focus();
}

productCaseStudyTrigger?.addEventListener('click', openCaseStudyModal);
caseStudyClose?.addEventListener('click', closeCaseStudyModal);
caseStudyModal?.addEventListener('click', (event) => {
  if (event.target === caseStudyModal) closeCaseStudyModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && caseStudyModal && !caseStudyModal.hidden) closeCaseStudyModal();
});
