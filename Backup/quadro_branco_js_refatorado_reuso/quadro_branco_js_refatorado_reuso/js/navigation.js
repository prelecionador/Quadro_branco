/*
===============================================================================
NAVIGATION.JS — NAVEGAÇÃO, LISTENERS E AULA ASSÍNCRONA
===============================================================================
Liga os controles do HTML às funções dos demais módulos. Este é o ponto ideal
para registrar novos botões "próximo/anterior" sem misturar essa responsabilidade
com os arquivos de conteúdo.
===============================================================================
*/

// Reinicia a animação dos rabiscos do quadro assíncrono.

function flashAsyncScribbles() {
  asyncWorkspace.classList.remove('flash-scribbles');
  void asyncWorkspace.offsetWidth;
  asyncWorkspace.classList.add('flash-scribbles');
  window.setTimeout(() => asyncWorkspace.classList.remove('flash-scribbles'), 560);
}

// Atualiza explicação, sintaxe e diagrama de fluxo do tópico assíncrono.

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

// Executa a simulação prática do tópico assíncrono atualmente selecionado.

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


/* Listas/tabulações compartilham a mesma navegação acessível. */
QB.bindLinearList(jsFundRows, {
  onSelect: row => renderJsFundTopic(row.dataset.jsfund),
  onPreview: row => {
    const data = jsFundTopics[row.dataset.jsfund];
    if (data) jsFundDetail.innerHTML = `<strong>${data.title}:</strong> ${data.short}`;
  }
});

QB.bindLinearList(jsFuncRows, {
  onSelect: row => renderJsFuncTopic(row.dataset.jsfunc),
  onPreview: row => {
    const data = jsFuncTopics[row.dataset.jsfunc];
    if (data) jsFuncDetail.innerHTML = `<strong>${data.title}:</strong> ${data.short}`;
  }
});

QB.bindLinearList(currentRows, {
  onSelect: row => openCurrentTopic(row.dataset.current, row),
  onPreview: previewCurrentRow
});
currentConceptTriggers.forEach(trigger => trigger.addEventListener('click', () => openCurrentConcept(trigger.dataset.currentConcept, trigger)));
backToCurrentTable.addEventListener('click', closeCurrentTopic);
backToCurrentMain.addEventListener('click', closeCurrentConcept);

QB.bindLinearList(domRows, {
  onSelect: row => renderDomTopic(row.dataset.dom),
  onPreview: row => renderDomTopic(row.dataset.dom)
});

QB.bindLinearList(compareRows, {
  onSelect: row => openCompareTopic(row.dataset.compare, row)
});
backToCompareTable.addEventListener('click', closeCompareTopic);

QB.bindLinearList(asyncRows, {
  onSelect: row => renderAsyncExample(row.dataset.async),
  onPreview: row => {
    const data = asyncExamples[row.dataset.async];
    if (data) asyncDetail.innerHTML = `<strong>${data.label}:</strong> ${data.detail}`;
  }
});
asyncRun.addEventListener('click', runAsyncDemo);

/* Sumário: o número de colunas acompanha o breakpoint usado pelo CSS. */
homeStartCourse.addEventListener('click', () => openFromHome('board-html'));
QB.bindGridList(homeChapterButtons, {
  columns: () => window.matchMedia('(min-width: 1101px)').matches ? 4
    : window.matchMedia('(min-width: 761px)').matches ? 3 : 1,
  onSelect: button => openFromHome(button.dataset.boardTarget)
});

/* Rotas entre quadros. Alterar a sequência da disciplina exige editar só este mapa. */
QB.bindRoutes([
  { control: backToHomeBoard, from: boardHtml, to: boardHome, title: homePageTitle, announcement: 'Sumário do Quadro Branco exibido novamente.' },
  { control: openTagsBoard, from: boardHtml, to: boardTags, title: tagsTitle, announcement: 'Primeiro quadro apagado. Quadro de principais tags HTML exibido.' },
  { control: backToHtmlBoard, from: boardTags, to: boardHtml, title: htmlPageTitle, announcement: 'Quadro de principais tags apagado. Primeiro quadro HTML exibido novamente.' },
  { control: openCssBoard, from: boardTags, to: boardCss, title: cssTitle, announcement: 'Quadro de principais tags apagado. Terceiro quadro, fundamentos de CSS, exibido.' },
  { control: backToTagsBoardCss, from: boardCss, to: boardTags, title: tagsTitle, announcement: 'Quadro de CSS apagado. Quadro de principais tags HTML exibido novamente.' },
  { control: openCss2Board, from: boardCss, to: boardCss2, title: css2Title, announcement: 'Primeiro quadro de CSS apagado. Quarto quadro, CSS parte 2, exibido.' },
  { control: backToCss1Board, from: boardCss2, to: boardCss, title: cssTitle, announcement: 'CSS parte 2 apagado. Primeiro quadro de CSS exibido novamente.' },
  { control: openCssPropsBoard, from: boardCss2, to: boardCssProps, title: cssPropsTitle, announcement: 'CSS parte 2 apagado. Quinto quadro, principais propriedades CSS, exibido.' },
  { control: backToCss2FromProps, from: boardCssProps, to: boardCss2, title: css2Title, announcement: 'Quadro de propriedades CSS apagado. CSS parte 2 exibido novamente.' },
  { control: openCurrentBoard, from: boardCssProps, to: boardCurrent, title: currentTitle, announcement: 'Quadro de propriedades CSS apagado. Sexto quadro, atualidades em HTML e CSS, exibido.' },
  { control: backToCssPropsFromCurrent, from: boardCurrent, to: boardCssProps, title: cssPropsTitle, announcement: 'Quadro de atualidades apagado. Principais propriedades CSS exibidas novamente.' },
  { control: openJsFundBoard, from: boardCurrent, to: boardJsFund, title: jsFundTitle, announcement: 'Quadro de atualidades apagado. Sétimo quadro, fundamentos de JavaScript, exibido.' },
  { control: backToCurrentFromJsFund, from: boardJsFund, to: boardCurrent, title: currentTitle, announcement: 'Quadro de fundamentos de JavaScript apagado. Atualidades em HTML e CSS exibidas novamente.' },
  { control: openJsFuncBoard, from: boardJsFund, to: boardJsFunc, title: jsFuncTitle, announcement: 'Quadro de fundamentos de JavaScript apagado. Oitavo quadro, funções em JavaScript, exibido.' },
  { control: backToJsFundFromJsFunc, from: boardJsFunc, to: boardJsFund, title: jsFundTitle, announcement: 'Quadro de funções em JavaScript apagado. Fundamentos de JavaScript exibidos novamente.' },
  { control: openEventBoard, from: boardJsFunc, to: boardOne, title: eventTitle, announcement: 'Quadro de funções em JavaScript apagado. Quadro de eventos Web exibido.' },
  { control: backToJsFuncBoard, from: boardOne, to: boardJsFunc, title: jsFuncTitle, announcement: 'Quadro de eventos apagado. Funções em JavaScript exibidas novamente.' },
  { control: openAsyncBoard, from: boardOne, to: boardTwo, title: asyncTitle, announcement: 'Quadro de eventos apagado. Quadro de funções assíncronas exibido.' },
  { control: backToEventBoard, from: boardTwo, to: boardOne, title: eventTitle, announcement: 'Quadro de funções assíncronas apagado. Quadro de eventos exibido novamente.' },
  { control: openCompareBoard, from: boardTwo, to: boardCompare, title: compareTitle, announcement: 'Quadro de funções assíncronas apagado. Último quadro, semelhanças entre CSS e JavaScript, exibido.' },
  { control: backToAsyncFromCompare, from: boardCompare, to: boardTwo, title: asyncTitle, announcement: 'Quadro de semelhanças apagado. Funções assíncronas exibidas novamente.' },
  {
    control: openDomBoard, from: boardCompare, to: boardDom, title: domTitle,
    announcement: 'Quadro de semelhanças apagado. Último quadro, comunicação entre JavaScript e HTML pelo DOM, exibido.',
    after: () => { if (!domRows.some(row => row.classList.contains('is-active'))) renderDomTopic('querySelector'); }
  },
  { control: backToCompareFromDom, from: boardDom, to: boardCompare, title: compareTitle, announcement: 'Quadro de comunicação JavaScript e HTML apagado. Semelhanças entre CSS e JavaScript exibidas novamente.' }
], switchBoard);

QB.bindLinearList(rows, {
  onPreview: previewRow,
  onSelect: row => {
    previewRow(row);
    renderDemo(row.dataset.event);
  }
});

// Abre um conceito periférico do quadro de Eventos.

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

  QB.setContextSelection({
    triggers: noteTriggers,
    connectors,
    key,
    triggerKey: item => item.dataset.concept,
    connectorKey: item => item.dataset.concept
  });
  backButton.focus({ preventScroll: true });
}

// Fecha o conceito periférico do quadro de Eventos e restaura o estado.

function closeConcept() {
  workspace.classList.remove('context-mode');
  conceptView.hidden = true;
  eventsView.hidden = false;
  QB.clearContextSelection(noteTriggers, connectors);
  QB.restoreFocus(previousFocus);
}

noteTriggers.forEach(note => note.addEventListener('click', () => openConcept(note.dataset.concept, note)));
QB.bindActivation(connectors, {
  getKey: line => line.dataset.concept,
  onActivate: (key, line) => openConcept(key, line)
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
