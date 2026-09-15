/*
===============================================================================
CONTENT.JS — CONTEÚDOS COMPLEMENTARES E RENDERIZAÇÕES ESPECÍFICAS
===============================================================================
Agrupa Atualidades Web, propriedades CSS e interações detalhadas do primeiro
quadro. Em uma evolução futura, este arquivo pode ser dividido por domínio.
===============================================================================
*/

/* DADOS DA AULA 6: recursos modernos de HTML/CSS. */
const currentTopics = {
  popover: {
    title: 'Popover API', color: '#b42318',
    summary: 'O atributo popover permite criar conteúdo sobreposto de forma declarativa. Um botão pode controlar a abertura usando popovertarget, reduzindo a necessidade de JavaScript para menus, dicas e painéis não modais.',
    code: '<button popovertarget="aviso">Abrir</button>\n<div id="aviso" popover>Conteúdo do popover</div>',
    note: 'Popover é não modal. Quando a interação precisa bloquear o restante da página, <dialog> modal costuma ser a escolha mais adequada.',
    demo: 'popover'
  },
  dialog: {
    title: '<dialog>', color: '#6b21a8',
    summary: 'O elemento dialog representa uma caixa de diálogo nativa. Com showModal(), o navegador cria comportamento modal e gerencia a camada superior da interface.',
    code: '<dialog id="janela">\n  <p>Configurações</p>\n  <button>Fechar</button>\n</dialog>\n\njanela.showModal();',
    note: 'Use rótulos claros e devolva o foco de forma previsível ao fechar a janela.',
    demo: 'dialog'
  },
  commands: {
    title: 'command / commandfor', color: '#084f9f',
    summary: 'Atributos de comando modernos permitem ligar um controle a um alvo declarativamente. Eles ampliam a ideia de controles que acionam popovers e dialogs sem criar listeners básicos para cada ação.',
    code: '<button commandfor="painel" command="show-popover">Mostrar</button>\n<div id="painel" popover>Painel</div>',
    note: 'É um recurso moderno: quando compatibilidade com navegadores antigos for requisito, mantenha uma estratégia de fallback.',
    demo: 'commands'
  },
  details: {
    title: '<details> + <summary>', color: '#166534',
    summary: 'details cria uma região expansível nativa e summary fornece seu controle. É uma solução semântica e acessível para conteúdo que pode ser aberto e fechado.',
    code: '<details>\n  <summary>Ver resposta</summary>\n  <p>Conteúdo revelado.</p>\n</details>',
    note: 'O estado aberto pode ser estilizado com seletores modernos como :open, conforme suporte do navegador.',
    demo: 'details'
  },
  container: {
    title: '@container — Container Queries', color: '#084f9f',
    summary: 'Container queries permitem adaptar um componente ao espaço disponível em seu contêiner, em vez de depender apenas do tamanho total da viewport.',
    code: '.card-wrapper {\n  container-type: inline-size;\n}\n\n@container (width > 32rem) {\n  .card { grid-template-columns: 1fr 2fr; }\n}',
    note: 'Isso torna componentes mais reutilizáveis: o mesmo card pode mudar de layout conforme o local onde foi inserido.',
    demo: 'container'
  },
  styleQueries: {
    title: 'Container Style Queries', color: '#6b21a8',
    summary: 'Style queries permitem aplicar regras de acordo com valores de estilo do contêiner, especialmente custom properties. Elas complementam consultas de tamanho.',
    code: '.tema { --modo: escuro; }\n\n@container style(--modo: escuro) {\n  .card { color: white; background: #111827; }\n}',
    note: 'Esse recurso entrou no conjunto Baseline 2026, mas projetos com público muito amplo ainda devem verificar a matriz de suporte.',
    demo: 'styleQueries'
  },
  nesting: {
    title: 'CSS Nesting', color: '#166534',
    summary: 'O CSS moderno permite aninhar regras relacionadas. O símbolo & representa o seletor externo quando é necessário referenciá-lo explicitamente.',
    code: '.card {\n  padding: 1rem;\n\n  & h2 { color: purple; }\n  &:hover { transform: translateY(-2px); }\n}',
    note: 'Aninhamento reduz repetição, mas níveis excessivos dificultam leitura e manutenção.',
    demo: 'nesting'
  },
  has: {
    title: ':has()', color: '#b42318',
    summary: ':has() permite selecionar um elemento de acordo com elementos/estados relacionados. É frequentemente descrito como um seletor relacional.',
    code: '.campo:has(input:invalid) {\n  border-color: red;\n}\n\n.card:has(img) {\n  grid-template-columns: 120px 1fr;\n}',
    note: 'Ele resolve situações antes dependentes de classes extras ou JavaScript para refletir o estado dos filhos no elemento pai.',
    demo: 'has'
  },
  subgrid: {
    title: 'subgrid', color: '#084f9f',
    summary: 'subgrid permite que um grid aninhado reutilize as trilhas definidas pelo grid pai, facilitando alinhamento consistente entre componentes.',
    code: '.lista {\n  display: grid;\n  grid-template-columns: 8rem 1fr 6rem;\n}\n.item {\n  display: grid;\n  grid-template-columns: subgrid;\n  grid-column: 1 / -1;\n}',
    note: 'É especialmente útil quando vários cards precisam alinhar títulos, conteúdo e ações nas mesmas colunas.',
    demo: 'subgrid'
  },
  viewTransitions: {
    title: 'View Transitions', color: '#6b21a8',
    summary: 'A View Transition API permite animar mudanças de estado com snapshots gerenciados pelo navegador. CSS controla a aparência da transição e JavaScript pode dispará-la.',
    code: 'document.startViewTransition(() => {\n  document.body.classList.toggle("compacto");\n});\n\n::view-transition-old(root),\n::view-transition-new(root) {\n  animation-duration: .35s;\n}',
    note: 'View transitions se tornaram amplamente disponíveis no ciclo Baseline 2025; verifique suporte quando precisar atender navegadores antigos.',
    demo: 'viewTransitions'
  },
  fieldSizing: {
    title: 'field-sizing', color: '#166534',
    summary: 'field-sizing: content permite que certos campos de formulário se ajustem ao conteúdo, evitando dimensões rígidas em algumas interfaces.',
    code: 'input, textarea {\n  field-sizing: content;\n  min-width: 8ch;\n  max-width: 28ch;\n}',
    note: 'field-sizing aparece entre os recursos do Baseline 2026. Use limites mínimos/máximos para preservar estabilidade visual.',
    demo: 'fieldSizing'
  },
  contrastColor: {
    title: 'contrast-color()', color: '#b42318',
    summary: 'contrast-color() escolhe uma cor de contraste a partir de uma cor base, ajudando a produzir texto legível sobre fundos variáveis.',
    code: '.badge {\n  --fundo: #6b21a8;\n  background: var(--fundo);\n  color: contrast-color(var(--fundo));\n}',
    note: 'contrast-color() é uma novidade do Baseline 2026. Em navegadores sem suporte, defina uma cor de fallback antes da declaração moderna.',
    demo: 'contrastColor'
  },
  openPseudo: {
    title: ':open', color: '#d97706',
    summary: ':open é uma pseudo-classe para estilizar elementos que possuem estado aberto, como controles expansíveis suportados pelo navegador.',
    code: 'details {\n  border: 2px solid #64748b;\n}\n\ndetails:open {\n  border-color: #166534;\n  background: #f0fdf4;\n}',
    note: ':open aparece entre os recursos do Baseline 2026 e simplifica estilos ligados ao estado de abertura.',
    demo: 'openPseudo'
  }
};

const currentConcepts = {
  semantic: {
    kicker: 'acessibilidade • HTML semântico', title: 'Semântica antes de ARIA', color: '#084f9f',
    summary: 'Elementos nativos comunicam função e estrutura ao navegador e às tecnologias assistivas. Um botão deve ser <button>, uma navegação deve usar <nav> e o conteúdo principal deve estar em <main>.',
    practice: 'Comece pela tag que já possui o comportamento e significado desejados. Use div e span quando não houver um elemento semântico apropriado.',
    why: 'Semântica melhora navegação por leitor de tela, atalhos estruturais, manutenção do código e comportamento de teclado.',
    code: '<nav aria-label="Principal">\n  <a href="/">Início</a>\n</nav>\n<main>…</main>'
  },
  aria: {
    kicker: 'acessibilidade • ARIA', title: 'ARIA complementa, não substitui HTML', color: '#b42318',
    summary: 'ARIA descreve papéis, estados e relações quando o HTML nativo não consegue expressar toda a interface. Ela deve ser usada com parcimônia.',
    practice: 'Use aria-label para nomear controles sem texto visível, aria-expanded para indicar expansão e aria-live quando mudanças dinâmicas precisam ser anunciadas.',
    why: 'Estados visuais também precisam existir na árvore de acessibilidade; caso contrário, parte dos usuários não recebe a mesma informação.',
    code: '<button\n  aria-expanded="false"\n  aria-controls="menu">\n  Menu\n</button>'
  },
  focus: {
    kicker: 'acessibilidade • interação', title: 'Teclado e foco visível', color: '#166534',
    summary: 'Toda ação importante deve poder ser alcançada e executada por teclado. O foco precisa indicar claramente qual elemento receberá a próxima ação.',
    practice: 'Preserve a ordem natural do DOM, use elementos interativos nativos e estilize :focus-visible sem remover outline sem alternativa equivalente.',
    why: 'Usuários de teclado, leitores de tela e tecnologias assistivas dependem de uma sequência de foco previsível.',
    code: 'button:focus-visible {\n  outline: 3px dashed #0f766e;\n  outline-offset: 3px;\n}'
  },
  hierarchy: {
    kicker: 'UI/UX • organização visual', title: 'Hierarquia visual', color: '#6b21a8',
    summary: 'Hierarquia visual usa tamanho, peso, cor, espaçamento e posição para mostrar o que é mais importante e em que ordem a interface deve ser lida.',
    practice: 'Tenha um título dominante, grupos bem separados, ações primárias evidentes e texto secundário realmente secundário.',
    why: 'Uma boa hierarquia reduz esforço cognitivo e ajuda o usuário a localizar informação e ação rapidamente.',
    code: '.titulo { font-size: 2rem; font-weight: 800; }\n.secundario { color: #475569; }\n.acao-principal { font-weight: 700; }'
  },
  feedback: {
    kicker: 'UI/UX • resposta do sistema', title: 'Feedback de interação', color: '#d97706',
    summary: 'Depois de uma ação, a interface deve mostrar o que aconteceu: carregando, salvo, erro, sucesso, selecionado ou indisponível.',
    practice: 'Use estados visuais, mensagens curtas e aria-live quando o retorno for dinâmico e relevante para usuários de tecnologia assistiva.',
    why: 'Sem feedback, o usuário não sabe se precisa esperar, tentar de novo ou se a ação já foi concluída.',
    code: '<p role="status" aria-live="polite">\n  Arquivo salvo com sucesso.\n</p>'
  },
  responsive: {
    kicker: 'UI/UX • adaptação', title: 'Responsividade é mais que diminuir a tela', color: '#084f9f',
    summary: 'Uma interface responsiva reorganiza conteúdo, mantém alvos tocáveis, preserva leitura e adapta componentes ao espaço disponível.',
    practice: 'Combine unidades flexíveis, media queries e container queries. Evite depender de uma única largura fixa.',
    why: 'A mesma página pode ser usada em celular, tablet, notebook, zoom elevado, janela dividida ou telas muito grandes.',
    code: '.layout {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 1rem;\n}'
  }
};

/* CONCEITOS DE SELEÇÃO: name, class/className e id. */
const cssSelectorConcepts = {
  name: {
    title: 'name', color: '#b42318',
    summary: 'name é um atributo HTML usado principalmente para nomear controles e dados enviados por formulários. Ele não precisa ser único.',
    html: '<input name="email" type="email">',
    css: '[name="email"] {\n  border-color: blue;\n}',
    js: "const campo = document.querySelector('[name=\"email\"]');\nconsole.log(campo.name); // email",
    note: 'No CSS, name costuma ser acessado por seletor de atributo. No JavaScript, você pode buscar pelo atributo ou ler a propriedade .name.'
  },
  className: {
    title: 'class / className', color: '#6b21a8',
    summary: 'No HTML, o atributo é class. Uma mesma classe pode aparecer em vários elementos. No JavaScript, a propriedade correspondente se chama className e classList oferece operações mais seguras para adicionar/remover classes.',
    html: '<button class="botao destaque">Salvar</button>',
    css: '.botao {\n  padding: .75rem 1rem;\n}\n.destaque {\n  color: purple;\n}',
    js: "const botao = document.querySelector('.botao');\nbotao.classList.add('ativo');\n// ou: botao.className = 'botao ativo';",
    note: 'CSS seleciona classes com ponto (.classe). JavaScript pode usar querySelector, className ou classList.'
  },
  id: {
    title: 'id', color: '#166534',
    summary: 'id identifica um elemento específico no documento e deve ser único dentro da página.',
    html: '<section id="inicio">\n  Conteúdo\n</section>',
    css: '#inicio {\n  scroll-margin-top: 2rem;\n}',
    js: "const inicio = document.getElementById('inicio');\n// também: document.querySelector('#inicio');",
    note: 'CSS seleciona IDs com #. Em JavaScript, getElementById é a forma direta de recuperar o elemento pelo identificador.'
  }
};

// Constrói a demonstração visual de um recurso moderno HTML/CSS.

function renderCurrentDemo(key, data) {
  currentDemo.replaceChildren();
  const info = document.createElement('p');
  info.style.margin = '0';
  info.style.color = '#334155';

  if (data.demo === 'popover') {
    const button = document.createElement('button');
    button.textContent = 'abrir popover';
    button.setAttribute('popovertarget', 'current-popover-demo');
    const pop = document.createElement('div');
    pop.id = 'current-popover-demo'; pop.setAttribute('popover', '');
    pop.textContent = 'Popover aberto sem listener JavaScript básico.';
    currentDemo.append(button, pop); return;
  }
  if (data.demo === 'dialog') {
    const button = document.createElement('button'); button.textContent = 'abrir <dialog>';
    const dialog = document.createElement('dialog');
    dialog.innerHTML = '<p>Exemplo de diálogo modal nativo.</p><button type="button">fechar</button>';
    button.addEventListener('click', () => dialog.showModal());
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    currentDemo.append(button, dialog); return;
  }
  if (data.demo === 'commands') {
    info.innerHTML = '<strong>Ideia:</strong> o botão declara qual elemento controla. Em navegadores compatíveis, o próprio HTML coordena a ação.';
    const sample = document.createElement('button'); sample.textContent = 'controle declarativo';
    currentDemo.append(sample, info); return;
  }
  if (data.demo === 'details' || data.demo === 'openPseudo') {
    const details = document.createElement('details');
    details.innerHTML = '<summary>Abrir conteúdo</summary><p>O navegador gerencia o estado aberto/fechado.</p>';
    details.style.cssText = 'border:2px solid #64748b;border-radius:9px;padding:.65rem;background:#fff';
    currentDemo.append(details); return;
  }
  if (data.demo === 'container') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'container-type:inline-size;width:100%;resize:horizontal;overflow:auto;border:2px dashed #084f9f;padding:8px;min-width:180px;max-width:100%';
    const card = document.createElement('div'); card.textContent = 'Redimensione horizontalmente esta área';
    card.style.cssText = 'padding:12px;border-radius:8px;background:#dbeafe;font-weight:800';
    wrap.append(card); currentDemo.append(wrap); return;
  }
  if (data.demo === 'styleQueries') {
    const card = document.createElement('div'); card.textContent = 'Componente guiado pelo estilo do contêiner';
    card.style.cssText = 'padding:16px;border-radius:10px;background:#111827;color:white;font-weight:800';
    currentDemo.append(card); return;
  }
  if (data.demo === 'nesting') {
    const card = document.createElement('div');
    card.innerHTML = '<strong>Card</strong><span>regra filha aninhada</span>';
    card.style.cssText = 'display:grid;gap:6px;padding:16px;border:2px solid #166534;border-radius:10px;background:#f0fdf4';
    currentDemo.append(card); return;
  }
  if (data.demo === 'has') {
    const label = document.createElement('label'); label.textContent = 'Digite algo: ';
    const input = document.createElement('input'); input.required = true; input.placeholder = 'campo obrigatório';
    label.style.cssText = 'display:grid;gap:6px;padding:10px;border:3px solid #b42318;border-radius:10px;background:#fff';
    label.append(input); currentDemo.append(label); return;
  }
  if (data.demo === 'subgrid') {
    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:80px 1fr 60px;gap:6px;width:100%';
    ['A','Conteúdo alinhado','OK','B','Outra linha','✓'].forEach((t,i)=>{ const x=document.createElement('span'); x.textContent=t; x.style.cssText='border:1px solid #64748b;padding:6px;background:#fff'; grid.append(x); });
    currentDemo.append(grid); return;
  }
  if (data.demo === 'viewTransitions') {
    const box = document.createElement('div'); box.textContent = 'estado A';
    box.style.cssText = 'padding:18px;border-radius:14px;background:#ede9fe;color:#6b21a8;font-weight:900;transition:.3s';
    const button = document.createElement('button'); button.textContent = 'trocar estado';
    let alt = false;
    button.addEventListener('click', () => {
      const update = () => { alt = !alt; box.textContent = alt ? 'estado B' : 'estado A'; box.style.transform = alt ? 'translateX(28px) rotate(2deg)' : 'none'; box.style.background = alt ? '#fee2e2' : '#ede9fe'; };
      if (document.startViewTransition) document.startViewTransition(update); else update();
    });
    currentDemo.append(box, button); return;
  }
  if (data.demo === 'fieldSizing') {
    const input = document.createElement('input'); input.value = 'edite este texto';
    input.style.cssText = 'field-sizing:content;min-width:8ch;max-width:26ch';
    info.textContent = 'Em navegador compatível, a largura acompanha o conteúdo dentro dos limites.';
    currentDemo.append(input, info); return;
  }
  if (data.demo === 'contrastColor') {
    const badge = document.createElement('div'); badge.textContent = 'contraste automático + fallback';
    badge.style.cssText = 'padding:14px;border-radius:10px;background:#6b21a8;color:white;font-weight:900;text-align:center';
    info.textContent = 'A demonstração mantém branco como fallback; contrast-color() pode substituí-lo em navegadores compatíveis.';
    currentDemo.append(badge, info); return;
  }
  info.textContent = 'Veja a sintaxe ao lado.'; currentDemo.append(info);
}

// Atualiza a descrição resumida durante a navegação pela tabela de atualidades.

function previewCurrentRow(row) {
  const data = currentTopics[row.dataset.current];
  if (!data) return;
  currentDetail.innerHTML = `<strong>${data.title}:</strong> ${data.summary}`;
}

// Abre a visão detalhada do recurso moderno selecionado.

function openCurrentTopic(key, source = null) {
  const data = currentTopics[key];
  if (!data) return;
  if (!currentConceptView.hidden) closeCurrentConcept();
  currentPreviousFocus = source instanceof HTMLElement ? source : document.activeElement;
  currentTableView.hidden = true;
  currentDetailView.hidden = false;
  QB.toggleActive(currentRows, row => row.dataset.current === key);
  currentDetailCard.style.setProperty('--concept-color', data.color);
  currentDetailTitle.textContent = data.title;
  currentDetailSummary.textContent = data.summary;
  currentDetailCode.textContent = data.code;
  currentDetailNote.textContent = data.note;
  renderCurrentDemo(key, data);
  backToCurrentTable.focus({ preventScroll: true });
}

// Fecha o detalhe de atualidades e restaura a tabela/foco.

function closeCurrentTopic() {
  if (currentDetailView.hidden) return;
  currentDetailView.hidden = true;
  currentTableView.hidden = false;
  QB.clearClass(currentRows);
  QB.restoreFocus(currentPreviousFocus);
}

// Abre um conceito periférico de acessibilidade/UI/UX.

function openCurrentConcept(key, source = null) {
  const data = currentConcepts[key];
  if (!data) return;
  if (!currentDetailView.hidden) closeCurrentTopic();
  currentConceptPreviousFocus = source instanceof HTMLElement ? source : document.activeElement;
  currentTableView.hidden = true;
  currentConceptView.hidden = false;
  currentWorkspace.classList.add('context-mode');
  QB.setContextSelection({
    triggers: currentConceptTriggers,
    key,
    triggerKey: item => item.dataset.currentConcept,
    connectorKey: () => null
  });
  currentConceptCard.style.setProperty('--concept-color', data.color);
  currentConceptKicker.textContent = data.kicker;
  currentConceptTitle.textContent = data.title;
  currentConceptSummary.textContent = data.summary;
  currentConceptPractice.textContent = data.practice;
  currentConceptWhy.textContent = data.why;
  currentConceptCode.textContent = data.code;
  backToCurrentMain.focus({ preventScroll: true });
}

// Fecha o conceito periférico e restaura o estado anterior.

function closeCurrentConcept() {
  if (currentConceptView.hidden) return;
  currentConceptView.hidden = true;
  currentTableView.hidden = false;
  currentWorkspace.classList.remove('context-mode');
  QB.clearContextSelection(currentConceptTriggers);
  QB.restoreFocus(currentConceptPreviousFocus);
}

// Monta um exemplo visual para a propriedade CSS selecionada.

function buildCssPropertyDemo(data) {
  cssPropDemoStage.replaceChildren();
  if (data.mode === 'stack') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative;width:220px;height:125px';
    const back = document.createElement('div');
    back.textContent = 'z-index: 1';
    back.style.cssText = 'position:absolute;left:20px;top:35px;width:130px;height:70px;background:#fecaca;border:2px solid #b42318;display:grid;place-items:center;border-radius:8px;z-index:1';
    const front = document.createElement('div');
    front.textContent = 'z-index: 2';
    front.style.cssText = 'position:absolute;left:70px;top:10px;width:130px;height:70px;background:#dbeafe;border:2px solid #084f9f;display:grid;place-items:center;border-radius:8px;z-index:2';
    wrap.append(back, front); cssPropDemoStage.append(wrap); return;
  }
  if (data.mode === 'object') {
    const frame = document.createElement('div');
    frame.style.cssText = 'width:190px;height:105px;border:3px solid #084f9f;border-radius:9px;overflow:hidden;background:#e2e8f0;display:grid;place-items:center';
    const visual = document.createElement('div');
    visual.textContent = 'IMAGEM';
    visual.style.cssText = 'width:240px;height:82px;background:linear-gradient(90deg,#bae6fd,#fde68a,#fecaca);display:grid;place-items:center;font-weight:900;object-fit:cover;transform:scale(1.1)';
    frame.append(visual); cssPropDemoStage.append(frame); return;
  }
  if (data.ghost) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:220px;border:2px dashed #64748b;padding:8px;text-align:center';
    const label = document.createElement('small'); label.textContent = 'o espaço continua aqui ↓';
    const target = document.createElement('div');
    target.className = 'css-prop-demo-target';
    target.textContent = 'invisível';
    target.setAttribute('style', data.style);
    wrap.append(label, target); cssPropDemoStage.append(wrap); return;
  }
  const target = document.createElement('div');
  target.className = 'css-prop-demo-target' + (data.transition ? ' transition-example' : '');
  target.setAttribute('style', data.style || '');
  if (data.children) {
    const total = data.manyChildren ? 6 : 3;
    for (let i = 1; i <= total; i += 1) {
      const child = document.createElement('span'); child.textContent = String(i); target.append(child);
    }
  } else {
    target.textContent = data.demoText || 'Exemplo CSS';
  }
  cssPropDemoStage.append(target);
}

// Abre a visão detalhada de uma propriedade CSS.

function openCssProperty(key, source = null) {
  const data = cssPropertyExamples[key];
  if (!data) return;
  cssPropsPreviousFocus = source instanceof HTMLElement ? source : document.activeElement;
  cssPropsTableView.hidden = true;
  cssPropsConceptView.hidden = true;
  cssPropsDetailView.hidden = false;
  cssPropsWorkspace.classList.remove('context-mode');
  QB.clearContextSelection(cssPropsConceptTriggers);
  QB.toggleActive(cssPropButtons, btn => btn.dataset.cssprop === key);
  const colors = ['#084f9f','#b42318','#166534','#6b21a8','#b45309'];
  const idx = Math.max(0, cssPropButtons.findIndex(btn => btn.dataset.cssprop === key));
  cssPropDetailCard.style.setProperty('--concept-color', colors[idx % colors.length]);
  cssPropDetailTitle.textContent = data.title;
  cssPropDetailDescription.textContent = data.description;
  cssPropDetailCode.textContent = data.code;
  cssPropDetailNote.textContent = data.note;
  buildCssPropertyDemo(data);
  backToCssPropsTable.focus({ preventScroll: true });
}

// Fecha o detalhe da propriedade e retorna à grade.

function closeCssProperty() {
  if (cssPropsDetailView.hidden) return;
  cssPropsDetailView.hidden = true;
  cssPropsTableView.hidden = false;
  QB.clearClass(cssPropButtons);
  QB.restoreFocus(cssPropsPreviousFocus);
}

// Abre a explicação comparativa de name/class/id entre HTML, CSS e JavaScript.

function openCssSelectorConcept(key, source = null) {
  const data = cssSelectorConcepts[key];
  if (!data) return;
  if (!cssPropsDetailView.hidden) closeCssProperty();
  cssPropsConceptPreviousFocus = source instanceof HTMLElement ? source : document.activeElement;
  cssPropsTableView.hidden = true;
  cssPropsDetailView.hidden = true;
  cssPropsConceptView.hidden = false;
  cssPropsWorkspace.classList.add('context-mode');
  QB.setContextSelection({
    triggers: cssPropsConceptTriggers,
    key,
    triggerKey: item => item.dataset.csspropsConcept,
    connectorKey: () => null
  });
  cssPropsConceptCard.style.setProperty('--concept-color', data.color);
  cssPropsConceptTitle.textContent = data.title;
  cssPropsConceptSummary.textContent = data.summary;
  cssPropsConceptHtml.textContent = data.html;
  cssPropsConceptCss.textContent = data.css;
  cssPropsConceptJs.textContent = data.js;
  cssPropsConceptNote.textContent = data.note;
  backToCssPropsMain.focus({ preventScroll: true });
}

// Fecha a explicação de seletor e restaura a grade de propriedades.

function closeCssSelectorConcept() {
  if (cssPropsConceptView.hidden) return;
  cssPropsConceptView.hidden = true;
  cssPropsTableView.hidden = false;
  cssPropsWorkspace.classList.remove('context-mode');
  QB.clearContextSelection(cssPropsConceptTriggers);
  QB.restoreFocus(cssPropsConceptPreviousFocus);
}

QB.bindGridList(cssPropButtons, {
  columns: 4,
  onSelect: button => openCssProperty(button.dataset.cssprop, button)
});
cssPropsConceptTriggers.forEach(trigger => trigger.addEventListener('click', () => openCssSelectorConcept(trigger.dataset.csspropsConcept, trigger)));
backToCssPropsTable.addEventListener('click', closeCssProperty);
backToCssPropsMain.addEventListener('click', closeCssSelectorConcept);

const htmlConcepts = {
  webHistory: {
    title: 'Web e história', color: '#084f9f',
    summary: 'A World Wide Web surgiu como uma forma de organizar e conectar documentos em rede. Em 1989, Tim Berners-Lee apresentou no CERN uma proposta baseada em hipertexto; no início da década de 1990, HTML, HTTP e URLs passaram a funcionar em conjunto para publicar e navegar entre documentos.',
    why: 'A grande mudança não foi apenas “mostrar páginas”, mas criar um sistema aberto de documentos identificáveis por endereço e conectados por hiperlinks.',
    relation: 'HTML representa a estrutura dos documentos. O elemento <a> concretiza a ideia de hipertexto ao ligar um recurso a outro.',
    extra: '<strong>Ideia central:</strong> URL localiza o recurso; HTTP transporta a comunicação; HTML descreve o documento; o navegador interpreta e apresenta.'
  },
  browserWars: {
    title: 'Guerra dos navegadores', color: '#b42318',
    summary: 'Nos anos 1990, Netscape Navigator e Internet Explorer disputaram usuários e passaram a introduzir recursos próprios. Isso acelerou a evolução dos navegadores, mas também fez páginas funcionarem de maneira diferente em cada produto.',
    why: 'Quando cada navegador implementa sua própria versão da Web, desenvolvedores precisam escrever alternativas específicas e a interoperabilidade diminui.',
    relation: 'A pressão por compatibilidade fortaleceu padrões de HTML, CSS e DOM. Mais tarde, Firefox, Safari, Chrome e outros continuaram a competição com maior foco em padrões e desempenho.',
    extra: '<strong>Resultado didático:</strong> escrever HTML semântico e seguir padrões reduz dependência de um navegador específico.'
  },
  aiHtml: {
    title: 'IA no HTML', color: '#6b21a8',
    summary: 'HTML, por si só, não executa inteligência artificial. Ele estrutura a interface e o conteúdo que usuários e programas interpretam. Recursos de IA costumam ser integrados por JavaScript, APIs de serviços, modelos executados no navegador ou aplicações no servidor.',
    why: 'Uma estrutura semântica bem escrita melhora acessibilidade, extração de informação e a capacidade de sistemas automatizados entenderem títulos, seções, formulários e relações entre conteúdos.',
    relation: 'HTML entrega a estrutura; CSS apresenta; JavaScript envia dados, chama modelos/APIs e insere resultados na página.',
    extra: '<strong>Exemplo:</strong> um formulário HTML recebe a pergunta, JavaScript envia o texto a um serviço de IA e depois atualiza uma região da página com a resposta.'
  },
  html5: {
    title: 'HTML5', color: '#b45309',
    summary: 'HTML5 marcou a modernização da linguagem com novos elementos semânticos e recursos nativos para mídia e formulários. Elementos como header, nav, main, section, article, audio e video reduziram a dependência de marcações genéricas e plugins para muitos cenários.',
    why: 'Semântica mais clara ajuda manutenção, acessibilidade, mecanismos de busca e integração com CSS e JavaScript.',
    relation: 'A expressão “HTML5” é muito usada para a geração moderna da plataforma Web; atualmente a especificação HTML continua evoluindo como padrão vivo.',
    extra: '<strong>Prática:</strong> prefira o elemento que representa o significado do conteúdo em vez de escolher uma tag apenas pela aparência padrão.'
  },
  css: {
    title: 'CSS', color: '#166534',
    summary: 'CSS é a linguagem de estilos da Web. Ele seleciona elementos do documento e define como serão apresentados: layout, cores, tipografia, espaçamento, responsividade, estados visuais e animações.',
    why: 'Separar estrutura de apresentação evita usar HTML como ferramenta de desenho e torna o conteúdo mais consistente e reutilizável.',
    relation: 'HTML fornece elementos e atributos; CSS aplica regras visuais a esses elementos. Uma mesma estrutura HTML pode receber apresentações completamente diferentes.',
    extra: '<strong>Regra mental:</strong> HTML = significado e estrutura; CSS = apresentação.'
  },
  javascript: {
    title: 'JavaScript', color: '#084f9f',
    summary: 'JavaScript adiciona comportamento programável ao documento. Ele pode responder a eventos, consultar e modificar o DOM, validar formulários, armazenar estado e buscar dados sem reconstruir a página inteira.',
    why: 'Sem JavaScript, HTML continua útil e navegável; com JavaScript, a interface pode reagir e mudar conforme ações e dados.',
    relation: 'O navegador transforma HTML em DOM. JavaScript acessa essa árvore e pode ler, criar, remover ou alterar elementos.',
    extra: '<strong>Exemplo:</strong> clicar em um botão HTML pode disparar JavaScript que muda um texto, abre um painel ou chama uma API.'
  }
};

// Renderiza código-fonte e prévia visual do elemento HTML selecionado.

function renderHtmlExample(key) {
  const data = htmlExamples[key];
  if (!data) return;
  QB.toggleActive(htmlRows, row => row.dataset.html === key);
  htmlDetail.innerHTML = `<strong>${data.label}:</strong> ${data.detail}`;
  htmlSourceCode.textContent = data.source;
  htmlPreview.innerHTML = data.preview;
}

// Atualiza rapidamente a descrição ao navegar pelas linhas da tabela HTML.

function previewHtmlRow(row) {
  const data = htmlExamples[row.dataset.html];
  if (!data) return;
  QB.toggleActive(htmlRows, item => item === row);
  htmlDetail.innerHTML = `<strong>${data.label}:</strong> ${data.detail}`;
}

// Abre um conceito histórico/tecnológico periférico da Aula 1.

function openHtmlConcept(key, source) {
  const data = htmlConcepts[key];
  if (!data) return;
  htmlPreviousFocus = source instanceof HTMLElement ? source : document.activeElement;
  htmlWorkspace.classList.add('context-mode');
  htmlTableView.hidden = true;
  htmlConceptView.hidden = false;
  htmlConceptCard.style.setProperty('--concept-color', data.color);
  htmlConceptTitle.textContent = data.title;
  htmlConceptSummary.textContent = data.summary;
  htmlConceptWhy.textContent = data.why;
  htmlConceptRelation.textContent = data.relation;
  htmlConceptExtra.innerHTML = data.extra;
  QB.setContextSelection({
    triggers: htmlConceptTriggers,
    connectors: htmlConnectors,
    key,
    triggerKey: item => item.dataset.htmlConcept,
    connectorKey: item => item.dataset.htmlConcept
  });
  backToHtmlTable.focus({ preventScroll: true });
}

// Fecha o conceito da Aula 1 e devolve o foco à origem.

function closeHtmlConcept() {
  if (htmlConceptView.hidden) return;
  htmlConceptView.hidden = true;
  htmlTableView.hidden = false;
  htmlWorkspace.classList.remove('context-mode');
  QB.clearContextSelection(htmlConceptTriggers, htmlConnectors);
  QB.restoreFocus(htmlPreviousFocus);
}

QB.bindLinearList(htmlRows, {
  onSelect: row => renderHtmlExample(row.dataset.html),
  onPreview: previewHtmlRow
});
htmlConceptTriggers.forEach(trigger => trigger.addEventListener('click', () => openHtmlConcept(trigger.dataset.htmlConcept, trigger)));
QB.bindActivation(htmlConnectors, {
  getKey: line => line.dataset.htmlConcept,
  onActivate: (key, line) => openHtmlConcept(key, line)
});
backToHtmlTable.addEventListener('click', closeHtmlConcept);
