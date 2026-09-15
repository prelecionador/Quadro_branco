/*
===============================================================================
NAVIGATION.JS — NAVEGAÇÃO, LISTENERS E AULA ASSÍNCRONA
===============================================================================
Liga os controles do HTML às funções dos demais módulos. Este é o ponto ideal
para registrar novos botões "próximo/anterior" sem misturar essa responsabilidade
com os arquivos de conteúdo.
===============================================================================
*/

/**

 * Reinicia a animação dos rabiscos do quadro assíncrono.

 *

 * Manutenção: preserve a responsabilidade desta função; se ela começar a

 * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

 */

function flashAsyncScribbles() {
  asyncWorkspace.classList.remove('flash-scribbles');
  void asyncWorkspace.offsetWidth;
  asyncWorkspace.classList.add('flash-scribbles');
  window.setTimeout(() => asyncWorkspace.classList.remove('flash-scribbles'), 560);
}

/**

 * Atualiza explicação, sintaxe e diagrama de fluxo do tópico assíncrono.

 *

 * Manutenção: preserve a responsabilidade desta função; se ela começar a

 * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

 */

function renderAsyncExample(key) {
  const data = asyncExamples[key];
  if (!data) return;
  activeAsyncKey = key;
  asyncRows.forEach(row => row.classList.toggle('is-active', row.dataset.async === key));
  asyncDetail.innerHTML = `<strong>${data.label}:</strong> ${data.detail}`;
  asyncExplanation.textContent = data.explanation;
  asyncSyntaxCode.textContent = data.code;
  asyncFlow.replaceChildren();
  data.flow.forEach((step, index) => {
    const item = document.createElement('span');
    item.className = 'flow-step';
    item.textContent = step;
    asyncFlow.appendChild(item);
    if (index < data.flow.length - 1) {
      const arrow = document.createElement('span');
      arrow.className = 'flow-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      asyncFlow.appendChild(arrow);
    }
  });
  asyncLog.textContent = 'pronto para executar';
  flashAsyncScribbles();
}

/**

 * Executa a simulação prática do tópico assíncrono atualmente selecionado.

 *

 * Manutenção: preserve a responsabilidade desta função; se ela começar a

 * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

 */

async function runAsyncDemo() {
  const data = asyncExamples[activeAsyncKey];
  if (!data || asyncRun.disabled) return;
  asyncRun.disabled = true;
  asyncLog.textContent = 'iniciando…';
  const steps = [...asyncFlow.querySelectorAll('.flow-step')];
  steps.forEach(step => step.classList.remove('is-running'));

  for (let i = 0; i < steps.length; i += 1) {
    steps.forEach(step => step.classList.remove('is-running'));
    steps[i].classList.add('is-running');
    asyncLog.textContent = i === steps.length - 1 ? 'resultado disponível ✓' : 'tarefa pendente…';
    await new Promise(resolve => setTimeout(resolve, 520));
  }

  await new Promise(resolve => setTimeout(resolve, 260));
  steps.forEach(step => step.classList.remove('is-running'));
  asyncRun.disabled = false;
}


jsFundRows.forEach(row => {
  const choose = () => renderJsFundTopic(row.dataset.jsfund);
  row.addEventListener('mouseenter', () => {
    const data = jsFundTopics[row.dataset.jsfund];
    if (data) jsFundDetail.innerHTML = `<strong>${data.title}:</strong> ${data.short}`;
  });
  row.addEventListener('focus', () => {
    const data = jsFundTopics[row.dataset.jsfund];
    if (data) jsFundDetail.innerHTML = `<strong>${data.title}:</strong> ${data.short}`;
  });
  row.addEventListener('click', choose);
  row.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose();
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const index = jsFundRows.indexOf(row);
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      jsFundRows[(index + delta + jsFundRows.length) % jsFundRows.length].focus();
    }
  });
});

jsFuncRows.forEach(row => {
  const choose = () => renderJsFuncTopic(row.dataset.jsfunc);
  row.addEventListener('mouseenter', () => {
    const data = jsFuncTopics[row.dataset.jsfunc];
    if (data) jsFuncDetail.innerHTML = `<strong>${data.title}:</strong> ${data.short}`;
  });
  row.addEventListener('focus', () => {
    const data = jsFuncTopics[row.dataset.jsfunc];
    if (data) jsFuncDetail.innerHTML = `<strong>${data.title}:</strong> ${data.short}`;
  });
  row.addEventListener('click', choose);
  row.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose();
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const index = jsFuncRows.indexOf(row);
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      jsFuncRows[(index + delta + jsFuncRows.length) % jsFuncRows.length].focus();
    }
  });
});

currentRows.forEach(row => {
  const choose = () => openCurrentTopic(row.dataset.current, row);
  row.addEventListener('mouseenter', () => previewCurrentRow(row));
  row.addEventListener('focus', () => previewCurrentRow(row));
  row.addEventListener('click', choose);
  row.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(); }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const index = currentRows.indexOf(row);
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      currentRows[(index + delta + currentRows.length) % currentRows.length].focus();
    }
  });
});
currentConceptTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => openCurrentConcept(trigger.dataset.currentConcept, trigger));
});
backToCurrentTable.addEventListener('click', closeCurrentTopic);
backToCurrentMain.addEventListener('click', closeCurrentConcept);



domRows.forEach(row => {
  const choose = () => renderDomTopic(row.dataset.dom);
  row.addEventListener('mouseenter', choose);
  row.addEventListener('focus', choose);
  row.addEventListener('click', choose);
  row.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose();
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const current = domRows.indexOf(row);
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      domRows[(current + delta + domRows.length) % domRows.length].focus();
    }
  });
});

compareRows.forEach(row => {
  const open = () => openCompareTopic(row.dataset.compare, row);
  row.addEventListener('click', open);
  row.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const current = compareRows.indexOf(row);
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      compareRows[(current + delta + compareRows.length) % compareRows.length].focus();
    }
  });
});
backToCompareTable.addEventListener('click', closeCompareTopic);

asyncRows.forEach(row => {
  const choose = () => renderAsyncExample(row.dataset.async);
  row.addEventListener('mouseenter', () => {
    const data = asyncExamples[row.dataset.async];
    if (data) asyncDetail.innerHTML = `<strong>${data.label}:</strong> ${data.detail}`;
  });
  row.addEventListener('focus', () => {
    const data = asyncExamples[row.dataset.async];
    if (data) asyncDetail.innerHTML = `<strong>${data.label}:</strong> ${data.detail}`;
  });
  row.addEventListener('click', choose);
  row.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose();
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const current = asyncRows.indexOf(row);
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      asyncRows[(current + delta + asyncRows.length) % asyncRows.length].focus();
    }
  });
});

asyncRun.addEventListener('click', runAsyncDemo);

homeStartCourse.addEventListener('click', () => openFromHome('board-html'));
homeChapterButtons.forEach(button => {
  button.addEventListener('click', () => openFromHome(button.dataset.boardTarget));
  button.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const index = homeChapterButtons.indexOf(button);
    const columns = window.matchMedia('(min-width: 1101px)').matches ? 4 : window.matchMedia('(min-width: 761px)').matches ? 3 : 1;
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowDown' ? columns : -columns;
    homeChapterButtons[(index + delta + homeChapterButtons.length) % homeChapterButtons.length].focus();
  });
});
backToHomeBoard.addEventListener('click', () => {
  switchBoard(boardHtml, boardHome, homePageTitle, 'Sumário do Quadro Branco exibido novamente.');
});

openTagsBoard.addEventListener('click', () => {
  switchBoard(boardHtml, boardTags, tagsTitle, 'Primeiro quadro apagado. Quadro de principais tags HTML exibido.');
});
backToHtmlBoard.addEventListener('click', () => {
  switchBoard(boardTags, boardHtml, htmlPageTitle, 'Quadro de principais tags apagado. Primeiro quadro HTML exibido novamente.');
});
openCssBoard.addEventListener('click', () => {
  switchBoard(boardTags, boardCss, cssTitle, 'Quadro de principais tags apagado. Terceiro quadro, fundamentos de CSS, exibido.');
});
backToTagsBoardCss.addEventListener('click', () => {
  switchBoard(boardCss, boardTags, tagsTitle, 'Quadro de CSS apagado. Quadro de principais tags HTML exibido novamente.');
});
openCss2Board.addEventListener('click', () => {
  switchBoard(boardCss, boardCss2, css2Title, 'Primeiro quadro de CSS apagado. Quarto quadro, CSS parte 2, exibido.');
});
backToCss1Board.addEventListener('click', () => {
  switchBoard(boardCss2, boardCss, cssTitle, 'CSS parte 2 apagado. Primeiro quadro de CSS exibido novamente.');
});
openCssPropsBoard.addEventListener('click', () => {
  switchBoard(boardCss2, boardCssProps, cssPropsTitle, 'CSS parte 2 apagado. Quinto quadro, principais propriedades CSS, exibido.');
});
backToCss2FromProps.addEventListener('click', () => {
  switchBoard(boardCssProps, boardCss2, css2Title, 'Quadro de propriedades CSS apagado. CSS parte 2 exibido novamente.');
});
openCurrentBoard.addEventListener('click', () => {
  switchBoard(boardCssProps, boardCurrent, currentTitle, 'Quadro de propriedades CSS apagado. Sexto quadro, atualidades em HTML e CSS, exibido.');
});
backToCssPropsFromCurrent.addEventListener('click', () => {
  switchBoard(boardCurrent, boardCssProps, cssPropsTitle, 'Quadro de atualidades apagado. Principais propriedades CSS exibidas novamente.');
});
openJsFundBoard.addEventListener('click', () => {
  switchBoard(boardCurrent, boardJsFund, jsFundTitle, 'Quadro de atualidades apagado. Sétimo quadro, fundamentos de JavaScript, exibido.');
});
backToCurrentFromJsFund.addEventListener('click', () => {
  switchBoard(boardJsFund, boardCurrent, currentTitle, 'Quadro de fundamentos de JavaScript apagado. Atualidades em HTML e CSS exibidas novamente.');
});
openJsFuncBoard.addEventListener('click', () => {
  switchBoard(boardJsFund, boardJsFunc, jsFuncTitle, 'Quadro de fundamentos de JavaScript apagado. Oitavo quadro, funções em JavaScript, exibido.');
});
backToJsFundFromJsFunc.addEventListener('click', () => {
  switchBoard(boardJsFunc, boardJsFund, jsFundTitle, 'Quadro de funções em JavaScript apagado. Fundamentos de JavaScript exibidos novamente.');
});
openEventBoard.addEventListener('click', () => {
  switchBoard(boardJsFunc, boardOne, eventTitle, 'Quadro de funções em JavaScript apagado. Quadro de eventos Web exibido.');
});
backToJsFuncBoard.addEventListener('click', () => {
  switchBoard(boardOne, boardJsFunc, jsFuncTitle, 'Quadro de eventos apagado. Funções em JavaScript exibidas novamente.');
});
openAsyncBoard.addEventListener('click', () => {
  switchBoard(boardOne, boardTwo, asyncTitle, 'Quadro de eventos apagado. Quadro de funções assíncronas exibido.');
});
backToEventBoard.addEventListener('click', () => {
  switchBoard(boardTwo, boardOne, eventTitle, 'Quadro de funções assíncronas apagado. Quadro de eventos exibido novamente.');
});
openCompareBoard.addEventListener('click', () => {
  switchBoard(boardTwo, boardCompare, compareTitle, 'Quadro de funções assíncronas apagado. Último quadro, semelhanças entre CSS e JavaScript, exibido.');
});
backToAsyncFromCompare.addEventListener('click', () => {
  switchBoard(boardCompare, boardTwo, asyncTitle, 'Quadro de semelhanças apagado. Funções assíncronas exibidas novamente.');
});
openDomBoard.addEventListener('click', () => {
  switchBoard(boardCompare, boardDom, domTitle, 'Quadro de semelhanças apagado. Último quadro, comunicação entre JavaScript e HTML pelo DOM, exibido.');
  if (!domRows.some(row => row.classList.contains('is-active'))) renderDomTopic('querySelector');
});
backToCompareFromDom.addEventListener('click', () => {
  switchBoard(boardDom, boardCompare, compareTitle, 'Quadro de comunicação JavaScript e HTML apagado. Semelhanças entre CSS e JavaScript exibidas novamente.');
});

rows.forEach(row => {
  row.addEventListener('mouseenter', () => previewRow(row));
  row.addEventListener('focus', () => previewRow(row));
  row.addEventListener('click', () => { previewRow(row); renderDemo(row.dataset.event); });
  row.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); previewRow(row); renderDemo(row.dataset.event);
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const current = rows.indexOf(row);
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      rows[(current + delta + rows.length) % rows.length].focus();
    }
  });
});

/**

 * Abre um conceito periférico do quadro de Eventos.

 *

 * Manutenção: preserve a responsabilidade desta função; se ela começar a

 * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

 */

function openConcept(key, source) {
  const data = concepts[key];
  if (!data) return;
  previousFocus = source instanceof HTMLElement ? source : document.activeElement;
  workspace.classList.add('context-mode');
  eventsView.hidden = true;
  conceptView.hidden = false;
  conceptCard.style.setProperty('--concept-color', data.color);
  conceptTitle.textContent = data.title;
  conceptSummary.textContent = data.summary;
  conceptSimple.textContent = data.simple;
  conceptDynamic.textContent = data.dynamic;
  conceptRelation.innerHTML = data.relation;

  noteTriggers.forEach(note => {
    const selected = note.dataset.concept === key;
    note.classList.toggle('is-selected', selected);
    note.setAttribute('aria-pressed', selected ? 'true' : 'false');
  });
  connectors.forEach(line => line.classList.toggle('is-active', line.dataset.concept === key));
  backButton.focus({ preventScroll: true });
}

/**

 * Fecha o conceito periférico do quadro de Eventos e restaura o estado.

 *

 * Manutenção: preserve a responsabilidade desta função; se ela começar a

 * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

 */

function closeConcept() {
  workspace.classList.remove('context-mode');
  conceptView.hidden = true;
  eventsView.hidden = false;
  noteTriggers.forEach(note => { note.classList.remove('is-selected'); note.setAttribute('aria-pressed', 'false'); });
  connectors.forEach(line => line.classList.remove('is-active'));
  if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus({ preventScroll: true });
}

noteTriggers.forEach(note => note.addEventListener('click', () => openConcept(note.dataset.concept, note)));
connectors.forEach(line => {
  line.addEventListener('click', () => openConcept(line.dataset.concept, line));
  line.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openConcept(line.dataset.concept, line); }
  });
});
backButton.addEventListener('click', closeConcept);

cycleControl.addEventListener('click', () => {
  autoCyclePaused = !autoCyclePaused;
  cycleControl.setAttribute('aria-pressed', autoCyclePaused ? 'true' : 'false');
  cycleControl.textContent = autoCyclePaused ? 'retomar troca automática' : 'pausar troca automática';
  if (autoCyclePaused) {
    clearInterval(cycleTimer);
  } else {
    advanceBoard();
    scheduleBoardCycle();
  }
});
