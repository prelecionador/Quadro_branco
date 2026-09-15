/*
===============================================================================
ACCESSIBILITY.JS — TUTORIAL, ESCAPE E FLUXOS DE TECLADO
===============================================================================
Responsável por comportamentos transversais de acessibilidade. Ao adicionar uma
nova visão/modal, verifique se Escape e devolução de foco continuam previsvisíveis.
===============================================================================
*/

// Abre ou fecha o tutorial de acessibilidade e mantém aria-expanded/aria-label sincronizados.

function setA11yTutorial(open) {
  a11yPanel.hidden = !open;
  a11yToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  a11yToggle.setAttribute('aria-label', open ? 'Fechar tutorial de acessibilidade' : 'Abrir tutorial de acessibilidade');
}

a11yToggle.addEventListener('click', () => {
  setA11yTutorial(a11yPanel.hidden);
});

document.addEventListener('click', event => {
  if (a11yPanel.hidden) return;
  if (event.target.closest('.a11y-widget')) return;
  setA11yTutorial(false);
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (!drawOverlay.hidden) {
    closeFreeBoard();
    return;
  }
  if (!a11yPanel.hidden) {
    setA11yTutorial(false);
    a11yToggle.focus({ preventScroll: true });
    return;
  }
  if (!boardDom.hidden) {
    switchBoard(boardDom, boardCompare, compareTitle, 'Quadro de comunicação JavaScript e HTML apagado. Semelhanças entre CSS e JavaScript exibidas novamente.');
    return;
  }
  if (!boardCompare.hidden) {
    if (!compareDetailView.hidden) { closeCompareTopic(); return; }
    switchBoard(boardCompare, boardTwo, asyncTitle, 'Quadro de semelhanças apagado. Funções assíncronas exibidas novamente.');
    return;
  }
  if (!boardTwo.hidden) {
    switchBoard(boardTwo, boardOne, eventTitle, 'Quadro de funções assíncronas apagado. Quadro de eventos exibido novamente.');
    return;
  }
  if (!boardOne.hidden) {
    if (!conceptView.hidden) { closeConcept(); return; }
    switchBoard(boardOne, boardJsFunc, jsFuncTitle, 'Quadro de eventos apagado. Funções em JavaScript exibidas novamente.');
    return;
  }
  if (!boardJsFunc.hidden) {
    switchBoard(boardJsFunc, boardJsFund, jsFundTitle, 'Quadro de funções em JavaScript apagado. Fundamentos de JavaScript exibidos novamente.');
    return;
  }
  if (!boardJsFund.hidden) {
    switchBoard(boardJsFund, boardCurrent, currentTitle, 'Quadro de fundamentos de JavaScript apagado. Atualidades em HTML e CSS exibidas novamente.');
    return;
  }
  if (!boardCurrent.hidden) {
    if (!currentConceptView.hidden) { closeCurrentConcept(); return; }
    if (!currentDetailView.hidden) { closeCurrentTopic(); return; }
    switchBoard(boardCurrent, boardCssProps, cssPropsTitle, 'Quadro de atualidades apagado. Principais propriedades CSS exibidas novamente.');
    return;
  }
  if (!boardCssProps.hidden) {
    if (!cssPropsConceptView.hidden) { closeCssSelectorConcept(); return; }
    if (!cssPropsDetailView.hidden) { closeCssProperty(); return; }
    switchBoard(boardCssProps, boardCss2, css2Title, 'Quadro de propriedades CSS apagado. CSS parte 2 exibido novamente.');
    return;
  }
  if (!boardCss2.hidden) {
    if (!css2ReferenceView.hidden) { closeCss2Reference(); return; }
    switchBoard(boardCss2, boardCss, cssTitle, 'CSS parte 2 apagado. Primeiro quadro de CSS exibido novamente.');
    return;
  }
  if (!boardCss.hidden) {
    if (!cssConceptView.hidden) { closeCssConcept(); return; }
    if (!cssDetailView.hidden) { closeCssDetail(); return; }
    switchBoard(boardCss, boardTags, tagsTitle, 'Quadro de CSS apagado. Quadro de principais tags HTML exibido novamente.');
    return;
  }
  if (!boardTags.hidden) {
    if (!tagDetailView.hidden) { closeTagDetail(); return; }
    switchBoard(boardTags, boardHtml, htmlPageTitle, 'Quadro de principais tags apagado. Primeiro quadro HTML exibido novamente.');
    return;
  }
  if (!boardHtml.hidden) {
    if (!htmlConceptView.hidden) { closeHtmlConcept(); return; }
    switchBoard(boardHtml, boardHome, homePageTitle, 'Sumário do Quadro Branco exibido novamente.');
    return;
  }
});
