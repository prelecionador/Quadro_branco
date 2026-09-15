/* Eventos Web, funções assíncronas, ajuste responsivo e utilitários de demonstração. */

const eventSyntax = {
  onBlur: `const campo = document.querySelector('#nome');

campo.addEventListener('blur', (event) => {
  console.log('Perdeu o foco:', event.target.value);
});`,
  onChange: `const linguagem = document.querySelector('#linguagem');

linguagem.addEventListener('change', (event) => {
  console.log('Novo valor:', event.target.value);
});`,
  onClick: `const botao = document.querySelector('#salvar');

botao.addEventListener('click', () => {
  console.log('Botão ativado!');
});`,
  onFocus: `const campo = document.querySelector('#email');

campo.addEventListener('focus', () => {
  campo.classList.add('em-foco');
});`,
  onKeyPress: `const campo = document.querySelector('#busca');

// Em código moderno, prefira keydown/keyup.
campo.addEventListener('keydown', (event) => {
  console.log('Tecla:', event.key);
});`,
  onLoad: `const imagem = document.querySelector('#foto');

imagem.addEventListener('load', () => {
  console.log('Imagem carregada por completo');
});`,
  onMouseOver: `const card = document.querySelector('.card');

card.addEventListener('mouseover', () => {
  card.classList.add('destacado');
});`,
  onMouseOut: `const card = document.querySelector('.card');

card.addEventListener('mouseout', () => {
  card.classList.remove('destacado');
});`,
  onSubmit: `const form = document.querySelector('#cadastro');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const dados = new FormData(form);
  console.log(Object.fromEntries(dados));
});`
};

const scribbleSets = [
  [
    `const btn = document.querySelector('#btn');\nbtn.addEventListener('click', abrir);`,
    `document.addEventListener('keydown', e =>\n  console.log(e.key));`,
    `const ativo = true;\nativo && painel.classList.add('on');`,
    `// evento → função → DOM\nlista.appendChild(novoItem);`
  ],
  [
    `async function carregar() {\n  const r = await fetch('/api/dados');\n}`,
    `const { value } = input;\nconsole.log(value);`,
    `window.addEventListener('load', iniciar);`,
    `form.addEventListener('submit', enviar);`
  ],
  [
    `const estado = { aberto: false };\nestado.aberto = !estado.aberto;`,
    `element.classList.toggle('ativo');`,
    `const itens = dados.map(item =>\n  criarCard(item));`,
    `Promise.resolve('ok')\n  .then(console.log);`
  ],
  [
    `// React\n<button onClick={salvar}>Salvar</button>`,
    `// jQuery\n$('#menu').on('click', abrir);`,
    `// AJAX moderno\nfetch('/api').then(r => r.json());`,
    `// ECMAScript\nconst soma = (a, b) => a + b;`
  ]
];
let scribbleIndex = 0;
let autoCyclePaused = false;
let cycleTimer = null;

function paintScribbles(index, animate = true) {
  if (!scribbles.length) return;
  if (animate) scribbles.forEach(el => el.classList.add('is-erasing'));
  window.setTimeout(() => {
    const set = scribbleSets[index % scribbleSets.length];
    scribbles.forEach((el, i) => {
      el.textContent = set[i] || '';
      el.classList.remove('is-erasing');
    });
    workspace.classList.remove('board-cycle-flash');
    void workspace.offsetWidth;
    workspace.classList.add('board-cycle-flash');
    window.setTimeout(() => workspace.classList.remove('board-cycle-flash'), 700);
  }, animate ? 420 : 0);
}

function advanceBoard() {
  if (autoCyclePaused) return;
  let next = scribbleIndex;
  while (next === scribbleIndex && scribbleSets.length > 1) {
    next = Math.floor(Math.random() * scribbleSets.length);
  }
  scribbleIndex = next;
  paintScribbles(scribbleIndex, true);
}

function scheduleBoardCycle() {
  clearInterval(cycleTimer);
  cycleTimer = setInterval(advanceBoard, 15000);
}

const asyncExamples = {
  asyncFunction: {
    label: 'async function',
    detail: 'A palavra async transforma o retorno da função em uma Promise. Se a função retornar 42, externamente o resultado será equivalente a Promise.resolve(42).',
    explanation: 'A função inicia normalmente, pode usar await no corpo e entrega seu resultado através de uma Promise.',
    flow: ['chamada da função', 'execução do corpo', 'Promise retornada'],
    code: `async function obterPerfil() {
  return { nome: 'Ana' };
}

obterPerfil().then(perfil => {
  console.log(perfil.nome);
});`
  },
  await: {
    label: 'await',
    detail: 'await suspende apenas a continuação daquela função async até a Promise ser resolvida ou rejeitada; a página e o restante do JavaScript continuam podendo processar outras tarefas.',
    explanation: 'O fluxo fica legível como código sequencial, mas a espera não congela a interface.',
    flow: ['inicia tarefa', 'await aguarda', 'função continua'],
    code: `async function carregarUsuario() {
  const resposta = await fetch('/api/usuario');
  const usuario = await resposta.json();
  return usuario;
}`
  },
  promise: {
    label: 'Promise',
    detail: 'Uma Promise representa uma operação que ainda pode estar pendente e terminar resolvida (fulfilled) ou rejeitada (rejected).',
    explanation: 'Ela desacopla o momento em que a tarefa começa do momento em que o resultado fica disponível.',
    flow: ['pending', 'trabalho assíncrono', 'fulfilled / rejected'],
    code: `const espera = new Promise((resolve, reject) => {
  setTimeout(() => resolve('pronto'), 1000);
});

espera.then(console.log);`
  },
  fetch: {
    label: 'fetch()',
    detail: 'fetch inicia uma requisição HTTP e retorna imediatamente uma Promise. A resposta pode ser aguardada com await e depois convertida, por exemplo, com response.json().',
    explanation: 'A interface não precisa recarregar: os dados chegam e apenas a região necessária pode ser atualizada.',
    flow: ['fetch()', 'rede / servidor', 'Response → dados'],
    code: `async function listarPosts() {
  const resposta = await fetch('/api/posts');

  if (!resposta.ok) throw new Error('Falha HTTP');
  return await resposta.json();
}`
  },
  thenCatch: {
    label: 'then / catch',
    detail: 'then trata valores resolvidos e devolve uma nova Promise; catch trata rejeições lançadas em qualquer etapa anterior da cadeia.',
    explanation: 'É a forma encadeada de compor operações assíncronas sem usar await.',
    flow: ['Promise', 'then: sucesso', 'catch: erro'],
    code: `fetch('/api/dados')
  .then(resposta => resposta.json())
  .then(dados => renderizar(dados))
  .catch(erro => console.error(erro));`
  },
  promiseAll: {
    label: 'Promise.all()',
    detail: 'Promise.all inicia ou recebe várias Promises e resolve quando todas terminam com sucesso. Se uma rejeitar, o conjunto é rejeitado.',
    explanation: 'É útil quando tarefas independentes podem ocorrer em paralelo em vez de serem aguardadas uma por uma.',
    flow: ['tarefas A + B + C', 'execução paralela', 'todos os resultados'],
    code: `async function carregarTudo() {
  const [usuario, posts] = await Promise.all([
    fetch('/api/usuario').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);

  return { usuario, posts };
}`
  }
};
let activeAsyncKey = 'await';
let boardSwitching = false;


/* Ajuste dinâmico de escala das aulas.
   A capa/sumário fica intacta. Em desktop/tablet horizontal, se o
   conteúdo ultrapassar a altura útil por pouco, reduzimos somente o
   necessário (até um limite de legibilidade) para eliminar a barra. */
let lessonFitTimer = null;

function resetLessonFit(board) {
  if (!board || board.id === 'board-home') return;
  board.style.removeProperty('--lesson-fit');
  board.removeAttribute('data-fit-active');
  board.removeAttribute('data-fit-scroll');
}

function fitVisibleLesson() {
  const lesson = [...document.querySelectorAll('.board-screen:not(#board-home)')]
    .find(screen => !screen.hidden);

  /* Em celular o conteúdo continua em fluxo vertical normal. */
  if (window.innerWidth <= 760) {
    document.querySelectorAll('.board-screen:not(#board-home)').forEach(resetLessonFit);
    return;
  }
  if (!lesson) return;

  const viewport = lesson.parentElement;
  if (!viewport) return;

  /* Sempre mede a aula em 100% antes de calcular o fator. */
  lesson.style.setProperty('--lesson-fit', '1');
  lesson.removeAttribute('data-fit-active');
  lesson.removeAttribute('data-fit-scroll');
  lesson.style.removeProperty('margin-left');
  lesson.style.removeProperty('margin-right');
  void lesson.offsetHeight;

  const availableH = Math.max(1, viewport.clientHeight - 6);
  const availableW = Math.max(1, viewport.clientWidth - 6);
  const requiredH = Math.max(1, lesson.scrollHeight);
  const requiredW = Math.max(1, lesson.scrollWidth);

  const heightRatio = availableH / requiredH;
  const widthRatio = availableW / requiredW;
  let needed = Math.min(1, heightRatio, widthRatio);

  /* Folga contra arredondamento de fonte, borda e zoom do navegador. */
  if (needed < 0.999) needed *= 0.975;

  /* Em tablets/netbooks aceitamos uma redução maior para manter o
     quadro completo, exatamente como uma lousa vista de mais longe. */
  const minScale = window.innerWidth <= 900 ? 0.50 :
                   window.innerHeight <= 650 ? 0.54 :
                   window.innerWidth <= 1120 ? 0.58 : 0.64;

  let scale = Math.min(1, needed);
  if (scale < minScale) scale = minScale;

  lesson.style.setProperty('--lesson-fit', scale.toFixed(4));
  if (scale < 0.998) lesson.setAttribute('data-fit-active', 'true');

  /* Segunda passada: zoom altera métricas de alguns componentes.
     Se ainda houver risco de corte, reduz em pequenos passos; nunca
     cria barra interna nos quadros de aula. */
  window.requestAnimationFrame(() => {
    const viewportRect = viewport.getBoundingClientRect();
    const lessonRect = lesson.getBoundingClientRect();
    const bottomOverflow = lessonRect.bottom - viewportRect.bottom + 4;
    const rightOverflow = lessonRect.right - viewportRect.right + 4;

    if (bottomOverflow > 1 || rightOverflow > 1) {
      const current = parseFloat(getComputedStyle(lesson).getPropertyValue('--lesson-fit')) || scale;
      const hCorrection = bottomOverflow > 1 ? Math.max(0.88, availableH / Math.max(availableH + bottomOverflow, 1)) : 1;
      const wCorrection = rightOverflow > 1 ? Math.max(0.88, availableW / Math.max(availableW + rightOverflow, 1)) : 1;
      const corrected = Math.max(0.46, current * Math.min(hCorrection, wCorrection) * 0.985);
      lesson.style.setProperty('--lesson-fit', corrected.toFixed(4));
      lesson.setAttribute('data-fit-active', 'true');
    }
  });
}

function scheduleLessonFit(delay = 40) {
  window.clearTimeout(lessonFitTimer);
  lessonFitTimer = window.setTimeout(() => {
    window.requestAnimationFrame(() => fitVisibleLesson());
  }, delay);
}

const homeBoardMap = {
  'board-html': [boardHtml, htmlPageTitle, 'Aula 1: HTML básico exibida.'],
  'board-tags': [boardTags, tagsTitle, 'Aula 2: principais tags HTML exibida.'],
  'board-css': [boardCss, cssTitle, 'Aula 3: fundamentos de CSS exibida.'],
  'board-css2': [boardCss2, css2Title, 'Aula 4: CSS parte 2 exibida.'],
  'board-cssprops': [boardCssProps, cssPropsTitle, 'Aula 5: principais propriedades CSS exibida.'],
  'board-current': [boardCurrent, currentTitle, 'Aula 6: atualidades em HTML e CSS exibida.'],
  'board-jsfund': [boardJsFund, jsFundTitle, 'Aula 7: fundamentos de JavaScript exibida.'],
  'board-jsfunc': [boardJsFunc, jsFuncTitle, 'Aula 8: funções em JavaScript exibida.'],
  'board-one': [boardOne, eventTitle, 'Aula 9: eventos Web exibida.'],
  'board-two': [boardTwo, asyncTitle, 'Aula 10: funções assíncronas exibida.'],
  'board-compare': [boardCompare, compareTitle, 'Aula 11: semelhanças entre CSS e JavaScript exibida.'],
  'board-dom': [boardDom, domTitle, 'Aula 12: comunicação entre HTML e JavaScript exibida.']
};

function openFromHome(boardId) {
  const destination = homeBoardMap[boardId];
  if (!destination || boardSwitching) return;
  const [board, title, announcement] = destination;
  switchBoard(boardHome, board, title, announcement);
  if (boardId === 'board-dom' && !domRows.some(row => row.classList.contains('is-active'))) {
    renderDomTopic('querySelector');
  }
}

const concepts = {
  events: {
    title: 'Eventos', color: '#b42318',
    summary: 'Eventos fazem parte do modelo de interação do navegador. Eles representam mudanças de estado ou ações do usuário e entram em uma fila de tarefas; quando o JavaScript pode executá-las, funções registradas como listeners são chamadas.',
    simple: 'Acontecimento → objeto Event → listener → alteração do DOM, validação, cálculo ou requisição.',
    dynamic: 'A página reage localmente: um evento pode alterar classes, criar ou remover nós do DOM, atualizar estado, validar entradas ou iniciar comunicação assíncrona.',
    relation: '<strong>Conexão:</strong> JavaScript trata eventos; React os usa nos componentes; jQuery simplificou seu tratamento; AJAX pode ser iniciado por um evento.'
  },
  javascript: {
    title: 'JavaScript', color: '#084f9f',
    summary: 'JavaScript é a linguagem de programação nativa do navegador para comportamento de alto nível. Ele trabalha com DOM, Web APIs, eventos, armazenamento, rede e tarefas assíncronas.',
    simple: 'HTML descreve a estrutura; CSS define a apresentação; JavaScript implementa regras, estado e comportamento.',
    dynamic: 'A partir de um evento, o código pode consultar o DOM, alterar atributos/classes, inserir novos componentes e buscar dados com fetch sem recarregar o documento inteiro.',
    relation: '<strong>Conexão:</strong> ECMAScript define a linguagem; os eventos acionam o código; AJAX e APIs fornecem dados; frameworks organizam a interface.'
  },
  ecmascript: {
    title: 'ECMAScript', color: '#6b21a8',
    summary: 'ECMAScript é a especificação padronizada pela ECMA-262 que define a linguagem: tipos, operadores, objetos, funções, classes, módulos, Promises e outros recursos. JavaScript implementa esse padrão junto às APIs do navegador.',
    simple: 'ECMAScript define a linguagem; o navegador acrescenta APIs como DOM, fetch, storage e eventos.',
    dynamic: 'Recursos modernos como classes, módulos, async/await, promises e sintaxe de funções ajudam a construir interfaces dinâmicas mais organizadas.',
    relation: '<strong>Conexão:</strong> quando o JavaScript evolui com novas funcionalidades padronizadas, essa evolução passa pelas especificações ECMAScript.'
  },
  react: {
    title: 'React', color: '#b45309',
    summary: 'React modela a interface como uma árvore de componentes. Manipuladores como onClick recebem eventos; ao alterar o estado, o React calcula quais partes da árvore precisam refletir a nova informação.',
    simple: 'Evento → handler → setState/useState → nova renderização declarativa.',
    dynamic: 'Um componente pode desaparecer e outro surgir porque o estado mudou, sem recriar a página inteira.',
    relation: '<strong>Conexão:</strong> usa JavaScript/ECMAScript e cria uma camada declarativa sobre eventos e atualizações do DOM.'
  },
  jquery: {
    title: 'jQuery', color: '#166534',
    summary: 'jQuery criou uma API uniforme para selecionar elementos, registrar eventos, alterar o DOM, produzir efeitos e fazer requisições assíncronas em uma época de grandes diferenças entre navegadores.',
    simple: '$() seleciona; .on() registra eventos; métodos como .addClass() e .html() alteram a interface.',
    dynamic: 'Foi muito usado para esconder, exibir, animar e carregar partes de uma página sob demanda.',
    relation: '<strong>Conexão:</strong> trabalha sobre JavaScript; hoje muitas de suas facilidades existem diretamente nas APIs modernas do navegador.'
  },
  ajax: {
    title: 'AJAX', color: '#b42318',
    summary: 'AJAX é um padrão de arquitetura de interação no qual JavaScript troca dados com o servidor em segundo plano e atualiza apenas parte da interface. Hoje é comum realizá-lo com fetch, Promises e async/await.',
    simple: 'Evento → fetch() → resposta → conversão dos dados → atualização do DOM.',
    dynamic: 'Um clique pode buscar conteúdo, inserir novos elementos e atualizar apenas uma área da tela. Hoje isso é comum com fetch e APIs.',
    relation: '<strong>Conexão:</strong> eventos frequentemente iniciam a requisição; JavaScript recebe a resposta e atualiza o DOM.'
  }
};

function setLog(message) {
  eventLog.innerHTML = `<strong>Status:</strong> ${message}`;
}

function escapeHTML(value) {
  return value.replace(/[&<>]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[char]));
}

function highlightSyntax(source) {
  let html = escapeHTML(source);
  html = html
    .replace(/(\/\/[^\n]*)/g, '<span class="tok-comment">$1</span>')
    .replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, '<span class="tok-string">$1</span>')
    .replace(/\b(const|let|function|async|await|return|new|if|else)\b/g, '<span class="tok-key">$1</span>')
    .replace(/\b(addEventListener|querySelector|preventDefault|classList|FormData|fetch|map|appendChild)\b/g, '<span class="tok-fn">$1</span>')
    .replace(/\b(blur|change|click|focus|keydown|load|mouseover|mouseout|submit)\b/g, '<span class="tok-event">$1</span>');
  return html;
}

function showSyntax(eventName) {
  const source = eventSyntax[eventName] || '// Selecione um evento para ver a sintaxe.';
  syntaxCode.textContent = source;
}

function previewRow(row) {
  rows.forEach(item => item.classList.toggle('is-active', item === row));
  detail.innerHTML = `<strong>${row.dataset.event}:</strong> ${row.dataset.detail}`;
  detail.classList.remove('is-pulsing');
  requestAnimationFrame(() => detail.classList.add('is-pulsing'));
  clearTimeout(pulseTimer);
  pulseTimer = setTimeout(() => detail.classList.remove('is-pulsing'), 260);
}

function renderDemo(eventName) {
  activeEvent = eventName;
  demoStage.replaceChildren();
  showSyntax(eventName);
  setLog('aguardando a ação indicada abaixo.');

  const make = (tag, text, className = 'demo-control') => {
    const el = document.createElement(tag);
    el.className = className;
    if (text != null) el.textContent = text;
    return el;
  };

  if (eventName === 'onBlur') {
    demoInstruction.textContent = 'Clique no campo e depois clique fora dele.';
    const input = make('input');
    input.type = 'text'; input.placeholder = 'Entre aqui e depois saia'; input.setAttribute('aria-label', 'Campo para testar onBlur');
    const outside = make('button', 'clique fora do campo'); outside.type = 'button';
    input.addEventListener('blur', () => setLog('onBlur disparou porque o campo perdeu o foco.'));
    demoStage.append(input, outside);
    input.focus();
  }

  if (eventName === 'onChange') {
    demoInstruction.textContent = 'Mude a opção selecionada.';
    const select = make('select'); select.setAttribute('aria-label', 'Seleção para testar onChange');
    ['HTML', 'CSS', 'JavaScript'].forEach(value => { const option = document.createElement('option'); option.value = value; option.textContent = value; select.appendChild(option); });
    select.addEventListener('change', e => setLog(`onChange disparou. Novo valor: ${e.target.value}.`));
    demoStage.append(select);
  }

  if (eventName === 'onClick') {
    demoInstruction.textContent = 'Clique no botão para disparar o evento.';
    const button = make('button', 'clique em mim'); button.type = 'button';
    let count = 0;
    button.addEventListener('click', () => { count += 1; setLog(`onClick disparou ${count} vez${count === 1 ? '' : 'es'}.`); button.textContent = count === 1 ? 'clicado ✓' : `clicado ${count}×`; });
    demoStage.append(button);
  }

  if (eventName === 'onFocus') {
    demoInstruction.textContent = 'Clique ou use Tab para levar o foco ao campo.';
    const input = make('input'); input.placeholder = 'Receba o foco'; input.setAttribute('aria-label', 'Campo para testar onFocus');
    input.addEventListener('focus', () => setLog('onFocus disparou: o campo recebeu foco.'));
    demoStage.append(input);
  }

  if (eventName === 'onKeyPress') {
    demoInstruction.textContent = 'Digite uma tecla. O quadro mostra a tecla detectada; em projetos atuais, prefira keydown/keyup.';
    const input = make('input'); input.placeholder = 'Digite uma tecla'; input.setAttribute('aria-label', 'Campo para testar teclado');
    input.addEventListener('keydown', e => setLog(`Tecla detectada: “${e.key}”. Demonstração moderna via keydown.`));
    demoStage.append(input);
    input.focus();
  }

  if (eventName === 'onLoad') {
    demoInstruction.textContent = 'Clique para criar e carregar um recurso novo dentro do quadro.';
    const button = make('button', 'carregar recurso'); button.type = 'button';
    button.addEventListener('click', () => {
      button.disabled = true; setLog('carregando um recurso novo…');
      setTimeout(() => {
        const img = document.createElement('img');
        img.alt = 'Pequeno desenho indicando recurso carregado';
        img.width = 150; img.height = 58;
        img.style.border = '2px dashed #166534'; img.style.borderRadius = '10px';
        img.onload = () => { setLog('onLoad disparou: o recurso terminou de carregar e apareceu no quadro.'); button.remove(); };
        img.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="150" height="58"><rect width="100%" height="100%" fill="#f0fdf4"/><path d="M14 35 C40 5 60 52 88 20 S130 42 140 14" fill="none" stroke="#166534" stroke-width="4" stroke-linecap="round"/><text x="18" y="51" font-family="sans-serif" font-size="12" fill="#084f9f">recurso carregado</text></svg>');
        demoStage.appendChild(img);
      }, 420);
    });
    demoStage.append(button);
  }

  if (eventName === 'onMouseOver') {
    demoInstruction.textContent = 'Passe o mouse sobre a área roxa. Em dispositivos de toque, toque nela.';
    const target = make('button', 'passe o mouse aqui', 'demo-target'); target.type = 'button';
    const action = () => { target.textContent = 'mouse entrou!'; setLog('onMouseOver disparou quando o ponteiro entrou no elemento.'); };
    target.addEventListener('mouseover', action); target.addEventListener('focus', action); target.addEventListener('click', action);
    demoStage.append(target);
  }

  if (eventName === 'onMouseOut') {
    demoInstruction.textContent = 'Entre com o mouse na área roxa e depois saia dela.';
    const target = make('button', 'entre e depois saia', 'demo-target'); target.type = 'button';
    target.addEventListener('mouseover', () => { target.textContent = 'agora saia'; setLog('ponteiro está dentro; ainda não houve mouseout.'); });
    target.addEventListener('mouseout', () => { target.textContent = 'onMouseOut ✓'; setLog('onMouseOut disparou quando o ponteiro saiu do elemento.'); });
    target.addEventListener('blur', () => setLog('No teclado, a saída de foco cumpre papel semelhante nesta demonstração acessível.'));
    demoStage.append(target);
  }

  if (eventName === 'onSubmit') {
    demoInstruction.textContent = 'Preencha e envie o formulário. O envio real será interceptado para a demonstração.';
    const form = document.createElement('form'); form.className = 'demo-stage'; form.style.margin = '0';
    const input = make('input'); input.required = true; input.placeholder = 'Seu nome'; input.setAttribute('aria-label', 'Nome');
    const button = make('button', 'enviar'); button.type = 'submit';
    form.append(input, button);
    form.addEventListener('submit', e => { e.preventDefault(); setLog(`onSubmit disparou. Dados capturados: “${input.value}”. Nada foi recarregado.`); });
    demoStage.append(form);
  }
}
