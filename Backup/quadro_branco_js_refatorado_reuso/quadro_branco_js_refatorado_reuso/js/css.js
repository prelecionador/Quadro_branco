/*
===============================================================================
CSS.JS — FUNDAMENTOS, CSS PARTE 2 E REFERÊNCIAS
===============================================================================
Centraliza dados e controladores das aulas de CSS. As chaves dos objetos devem
coincidir com data-css/data-css2 presentes no HTML.
===============================================================================
*/

/* DADOS DE FUNDAMENTOS CSS: data-css → conteúdo do detalhe. */
const cssExamples = {
  backgrounds: {
    title: 'Planos de fundo', color: '#084f9f',
    summary: 'O conjunto background controla a camada visual atrás do conteúdo. Você pode combinar cor, imagem, gradiente, repetição, posição e tamanho sem alterar a estrutura HTML.',
    syntax: `.hero {
  background-color: #eff6ff;
  background-image: linear-gradient(135deg, #dbeafe, #f5d0fe);
  background-size: cover;
  background-position: center;
}`,
    preview: `<div style="min-height:92px;border-radius:14px;padding:16px;display:grid;place-items:center;font-weight:800;color:#1e3a8a;background-color:#eff6ff;background-image:linear-gradient(135deg,#dbeafe,#f5d0fe);">fundo com gradiente</div>`,
    effect: 'define a atmosfera visual de uma região e pode criar contraste, profundidade e identidade sem adicionar novos elementos ao HTML.'
  },
  fonts: {
    title: 'Fontes e tipografia', color: '#6b21a8',
    summary: 'Tipografia em CSS envolve família tipográfica, tamanho, peso, espaçamento e altura de linha. A escolha deve priorizar leitura, hierarquia e adaptação a diferentes telas.',
    syntax: `body {
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}
.titulo { font-weight: 800; }`,
    preview: `<div><p style="margin:0;font:800 1.35rem/1.2 system-ui,sans-serif;color:#6b21a8">Título legível</p><p style="margin:.45rem 0 0;font:400 1rem/1.6 system-ui,sans-serif">A altura de linha melhora a leitura de blocos de texto.</p></div>`,
    effect: 'cria hierarquia entre títulos, textos e informações auxiliares e influencia diretamente conforto de leitura e acessibilidade.'
  },
  links: {
    title: 'Links', color: '#b42318',
    summary: 'Links precisam continuar reconhecíveis como links. CSS pode estilizar seu estado normal e respostas a hover, foco e visita, sem remover pistas importantes para teclado e acessibilidade.',
    syntax: `a { color: #084f9f; }
a:hover,
a:focus-visible {
  color: #b42318;
  text-decoration-thickness: 3px;
}`,
    preview: `<a href="#css-page-title" style="color:#084f9f;font-weight:800;text-decoration:underline 3px;text-underline-offset:4px">Link visível e reconhecível</a><p style="margin:.5rem 0 0">Passe o mouse ou use Tab nos links reais da página para perceber estados.</p>`,
    effect: 'comunica que um texto é navegável e fornece feedback visual quando a pessoa aponta, foca ou visita um destino.'
  },
  lists: {
    title: 'Listas', color: '#166534',
    summary: 'CSS altera marcadores, recuos e disposição de listas. Em menus, uma lista semântica pode ser apresentada horizontalmente sem perder sua estrutura HTML.',
    syntax: `ul {
  list-style-type: square;
  padding-left: 1.5rem;
}
.menu { display: flex; gap: 1rem; }`,
    preview: `<ul style="margin:0;padding-left:1.4rem;list-style-type:square;color:#166534"><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>`,
    effect: 'muda a aparência e o arranjo dos itens mantendo a semântica de lista, útil para etapas, tópicos e navegação.'
  },
  colors: {
    title: 'Cores', color: '#b45309',
    summary: 'Cores podem ser declaradas por nomes, hexadecimal, rgb/rgba, hsl e outros formatos modernos. O uso precisa preservar contraste suficiente entre texto, controles e fundos.',
    syntax: `.aviso {
  color: #7c2d12;
  background-color: #ffedd5;
  border: 2px solid #f97316;
}`,
    preview: `<div style="padding:12px;border:2px solid #f97316;border-radius:12px;color:#7c2d12;background:#ffedd5;font-weight:700">Cor também comunica estado e prioridade.</div>`,
    effect: 'diferencia estados e hierarquias, mas não deve ser o único meio de comunicar erro, sucesso ou seleção.'
  },
  tables: {
    title: 'Tabelas', color: '#084f9f',
    summary: 'CSS organiza a apresentação de dados tabulares por meio de bordas, alinhamento, espaçamento, fundos alternados e adaptação para telas menores.',
    syntax: `table { border-collapse: collapse; }
th, td {
  border: 1px solid #94a3b8;
  padding: .6rem;
}
tbody tr:nth-child(even) { background: #f8fafc; }`,
    preview: `<table style="width:100%;border-collapse:collapse;font-size:.9rem"><tr><th style="border:1px solid #94a3b8;padding:6px;background:#dbeafe">Tecnologia</th><th style="border:1px solid #94a3b8;padding:6px;background:#dbeafe">Papel</th></tr><tr><td style="border:1px solid #94a3b8;padding:6px">CSS</td><td style="border:1px solid #94a3b8;padding:6px">apresentação</td></tr></table>`,
    effect: 'torna relações entre linhas e colunas mais fáceis de examinar sem usar a tabela como ferramenta de layout geral.'
  },
  positioning: {
    title: 'Posicionamento', color: '#6b21a8',
    summary: 'position define como um elemento participa do fluxo e como coordenadas como top, right, bottom e left são interpretadas. relative cria referência; absolute sai do fluxo normal; fixed se prende à viewport; sticky alterna conforme a rolagem.',
    syntax: `.card { position: relative; }
.badge {
  position: absolute;
  top: .5rem;
  right: .5rem;
}`,
    preview: `<div style="position:relative;min-height:92px;border:2px solid #6b21a8;border-radius:12px;padding:16px"><strong>card relativo</strong><span style="position:absolute;top:7px;right:7px;background:#6b21a8;color:white;border-radius:999px;padding:3px 8px;font-size:.75rem">novo</span><p style="margin:.5rem 0 0">o selo usa o card como referência</p></div>`,
    effect: 'permite sobrepor, fixar ou deslocar elementos, mas deve ser usado sem destruir o fluxo natural e a responsividade.'
  },
  dimensions: {
    title: 'Dimensões', color: '#166534',
    summary: 'width, height, min/max e box-sizing controlam o espaço ocupado. Em layouts responsivos, limites flexíveis costumam funcionar melhor que dimensões rígidas.',
    syntax: `.card {
  width: min(100%, 32rem);
  min-height: 10rem;
  padding: 1rem;
  box-sizing: border-box;
}`,
    preview: `<div style="width:min(100%,320px);min-height:92px;padding:14px;border:3px solid #166534;border-radius:13px;box-sizing:border-box;background:#f0fdf4"><strong>width flexível</strong><p style="margin:.4rem 0 0">cabe no espaço disponível sem ultrapassar o limite.</p></div>`,
    effect: 'define quanto espaço um componente pode ocupar e ajuda a evitar estouro horizontal, cortes e layouts frágeis.'
  }
};

const cssConcepts = {
  cssHistory: {
    title: 'CSS • história', color: '#084f9f',
    summary: 'CSS surgiu para separar a estrutura do documento de sua apresentação visual. Håkon Wium Lie propôs uma linguagem de folhas de estilo em 1994, e o CSS1 tornou-se recomendação do W3C em 1996. Desde então, a linguagem ganhou módulos para layout, tipografia, animações, responsividade e muito mais.',
    simple: 'O HTML diz o que o conteúdo é; o CSS descreve como esse conteúdo deve ser apresentado em diferentes contextos.',
    practice: 'A mesma marcação HTML pode receber temas, layouts e adaptações completamente diferentes apenas trocando regras CSS.',
    extra: '<strong>Virada importante:</strong> Flexbox e Grid transformaram o layout moderno ao reduzir a dependência de hacks usados antes para alinhar colunas e componentes.'
  },
  dynamicPages: {
    title: 'CSS em páginas dinâmicas', color: '#b42318',
    summary: 'CSS não executa a lógica de negócio de uma aplicação, mas é essencial para representar visualmente mudanças de estado. Pseudo-classes, media queries, animações e classes adicionadas por JavaScript fazem a interface responder ao contexto.',
    simple: 'Dinâmica visual é a mudança de aparência quando algo acontece: foco, erro, carregamento, seleção, tela menor ou estado da aplicação.',
    practice: 'JavaScript pode adicionar uma classe .is-loading ou .is-open; o CSS decide como esses estados aparecem, sem precisar recriar todo o conteúdo.',
    extra: '<strong>Exemplo:</strong> botão recebe <code>aria-expanded="true"</code> e uma classe; CSS abre o painel com transição e mantém o feedback visual sincronizado com o estado.'
  },
  sassTailwind: {
    title: 'Sass e Tailwind', color: '#6b21a8',
    summary: 'Sass e Tailwind resolvem problemas de organização de estilos de maneiras diferentes. Sass é um pré-processador que adiciona recursos como variáveis, mixins e aninhamento antes de gerar CSS. Tailwind oferece classes utilitárias que são combinadas diretamente no HTML/JSX e transformadas em CSS pelo processo de build.',
    simple: 'Sass amplia a forma de escrever folhas de estilo; Tailwind oferece um vocabulário de utilidades para compor a interface.',
    practice: 'Nenhum dos dois substitui CSS: ambos terminam produzindo regras CSS que o navegador entende.',
    extra: '<strong>Escolha de projeto:</strong> a ferramenta deve reduzir complexidade e aumentar consistência; usar um framework sem convenções claras pode apenas trocar um tipo de desorganização por outro.'
  },
  uiux: {
    title: 'UI / UX', color: '#b45309',
    summary: 'UI trata da interface visível e dos elementos com que a pessoa interage. UX é mais ampla: envolve fluxo, compreensão, eficiência, acessibilidade, expectativas, feedback e percepção de valor durante a experiência.',
    simple: 'CSS participa fortemente da UI e influencia a UX ao tornar estados, hierarquia, foco e responsividade perceptíveis.',
    practice: 'Contraste, tamanho de alvo, espaçamento, estados de foco, legibilidade e adaptação móvel são decisões que aparecem no CSS e afetam diretamente o uso.',
    extra: '<strong>Regra de ouro:</strong> uma interface bonita que esconde foco, reduz contraste ou quebra no celular prejudica a experiência; estética e usabilidade precisam trabalhar juntas.'
  }
};

// Renderiza um tópico de CSS na visão detalhada.

function openCssDetail(key, source) {
  const data = cssExamples[key];
  if (!data) return;
  cssPreviousFocus = source instanceof HTMLElement ? source : document.activeElement;
  QB.toggleActive(cssRows, row => row === source);
  cssConceptView.hidden = true;
  cssTableView.hidden = true;
  cssDetailView.hidden = false;
  cssDetailCard.style.setProperty('--concept-color', data.color);
  cssDetailTitle.textContent = data.title;
  cssDetailSummary.textContent = data.summary;
  cssDetailSyntax.textContent = data.syntax;
  cssDetailPreview.innerHTML = data.preview;
  cssDetailEffect.textContent = data.effect;
  backToCssTable.focus({ preventScroll: true });
}

// Retorna da visão detalhada de CSS para a tabela principal.

function closeCssDetail() {
  if (cssDetailView.hidden) return;
  cssDetailView.hidden = true;
  cssTableView.hidden = false;
  QB.clearClass(cssRows);
  QB.restoreFocus(cssPreviousFocus);
}

// Abre um conceito periférico do mapa mental de CSS.

function openCssConcept(key, source) {
  const data = cssConcepts[key];
  if (!data) return;
  cssConceptPreviousFocus = source instanceof HTMLElement ? source : document.activeElement;
  if (!cssDetailView.hidden) cssDetailView.hidden = true;
  cssTableView.hidden = true;
  cssConceptView.hidden = false;
  cssWorkspace.classList.add('context-mode');
  cssConceptCard.style.setProperty('--concept-color', data.color);
  cssConceptTitle.textContent = data.title;
  cssConceptSummary.textContent = data.summary;
  cssConceptSimple.textContent = data.simple;
  cssConceptPractice.textContent = data.practice;
  cssConceptExtra.innerHTML = data.extra;
  QB.setContextSelection({
    triggers: cssConceptTriggers,
    connectors: cssConnectors,
    key,
    triggerKey: item => item.dataset.cssConcept,
    connectorKey: item => item.dataset.cssConcept
  });
  backToCssContext.focus({ preventScroll: true });
}

// Fecha o conceito de CSS e restaura mapa, seleção e foco.

function closeCssConcept() {
  if (cssConceptView.hidden) return;
  cssConceptView.hidden = true;
  cssTableView.hidden = false;
  cssWorkspace.classList.remove('context-mode');
  QB.clearContextSelection(cssConceptTriggers, cssConnectors);
  QB.restoreFocus(cssConceptPreviousFocus);
}

QB.bindLinearList(cssRows, {
  onSelect: row => openCssDetail(row.dataset.css, row)
});
cssConceptTriggers.forEach(trigger => trigger.addEventListener('click', () => openCssConcept(trigger.dataset.cssConcept, trigger)));
QB.bindActivation(cssConnectors, {
  getKey: line => line.dataset.cssConcept,
  onActivate: (key, line) => openCssConcept(key, line)
});
backToCssTable.addEventListener('click', closeCssDetail);
backToCssContext.addEventListener('click', closeCssConcept);


/* DADOS DE CSS PARTE 2: data-css2 → explicação, código e tipo de referência. */
const css2Topics = {
  pseudoClasses: {
    title: 'Pseudo-classes',
    explanation: 'Pseudo-classes selecionam um elemento quando ele está em determinado estado, posição ou condição. Elas não criam um novo elemento: refinam o seletor existente.',
    trigger: 'estado/interação/estrutura — por exemplo, ponteiro sobre o elemento, foco do teclado, campo marcado ou posição entre irmãos.',
    code: `a:hover {\n  color: #b42318;\n}\n\ninput:focus-visible {\n  outline: 3px solid #084f9f;\n}\n\ninput:checked + label {\n  font-weight: 700;\n}`,
    reference: 'pseudoClasses'
  },
  pseudoElements: {
    title: 'Pseudo-elementos',
    explanation: 'Pseudo-elementos permitem estilizar uma parte específica de um elemento ou criar conteúdo puramente visual sem adicionar outro nó HTML para aquele detalhe.',
    trigger: 'parte virtual/fragmento do elemento — como primeira letra, marcador de lista, placeholder ou conteúdo gerado antes/depois.',
    code: `.aviso::before {\n  content: "⚠ ";\n  color: #b45309;\n}\n\nli::marker {\n  color: #166534;\n}`,
    reference: 'pseudoElements'
  },
  mediaQueries: {
    title: 'Responsividade (Media Queries)',
    explanation: 'Media queries aplicam regras CSS somente quando uma condição do ambiente é verdadeira. São usadas para adaptar layout, tipografia e densidade visual a diferentes telas e preferências.',
    trigger: 'característica do dispositivo ou viewport, como largura, orientação, resolução e prefers-reduced-motion.',
    code: `@media (max-width: 768px) {\n  .conteudo {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  * { animation: none !important; }\n}`
  },
  motion: {
    title: 'Animações e Transições',
    explanation: 'Transições interpolam uma mudança de estado entre dois valores; animações usam @keyframes para definir várias etapas ao longo do tempo. O movimento deve apoiar feedback e compreensão, não distrair.',
    trigger: 'mudança de propriedade, classe, pseudo-classe ou execução automática de uma animação.',
    code: `.cartao {\n  transition: transform .35s ease;\n}\n.cartao:hover {\n  transform: translateY(-6px);\n}\n\n@keyframes aparecer {\n  from { opacity: 0; transform: translateY(8px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n.painel { animation: aparecer .5s ease both; }`
  }
};

/* TABELAS DE REFERÊNCIA: dados filtráveis usados na visão completa. */
const css2References = {
  pseudoClasses: [
    [':any-link','Seleciona links que possuem href, visitados ou não.','a:any-link { text-decoration-thickness: 2px; }','Uniformizar o estilo base de todos os links navegáveis.'],
    [':link','Seleciona links ainda não visitados.','a:link { color: blue; }','Um link novo aparece azul.'],
    [':visited','Seleciona links que o navegador considera visitados; há restrições de privacidade nas propriedades permitidas.','a:visited { color: purple; }','Diferenciar visualmente um link já acessado.'],
    [':target','Seleciona o elemento cujo id corresponde ao fragmento atual da URL.','#faq:target { outline: 3px solid orange; }','Ao abrir pagina.html#faq, a seção #faq recebe destaque.'],
    [':scope','Representa o elemento de escopo de uma consulta/seletor.','section:scope > h2 { color: navy; }','Útil em querySelector() e seletores relativos.'],
    [':hover','Ativa quando o ponteiro está sobre o elemento.','button:hover { transform: scale(1.04); }','Ao passar o mouse, o botão cresce levemente.'],
    [':active','Ativa enquanto um elemento está sendo pressionado/ativado.','button:active { transform: scale(.97); }','Durante o clique o botão parece afundar.'],
    [':focus','Seleciona o elemento que recebeu foco.','input:focus { border-color: blue; }','Ao entrar no campo, a borda muda.'],
    [':focus-visible','Mostra estilo de foco quando o navegador entende que o indicador é necessário, especialmente via teclado.','button:focus-visible { outline: 3px solid blue; }','Navegação por Tab mantém um foco claro sem poluir cliques do mouse.'],
    [':focus-within','Seleciona um elemento quando ele ou algum descendente possui foco.','.campo:focus-within { box-shadow: 0 0 0 3px #bfdbfe; }','O bloco inteiro do formulário destaca quando o input interno recebe foco.'],
    [':enabled','Seleciona controles habilitados.','input:enabled { background: white; }','Campos utilizáveis mantêm aparência normal.'],
    [':disabled','Seleciona controles desabilitados.','button:disabled { opacity: .45; }','Botão indisponível fica visualmente atenuado.'],
    [':read-only','Seleciona campos que não podem ser editados.','input:read-only { background: #f1f5f9; }','Um campo somente leitura ganha fundo neutro.'],
    [':read-write','Seleciona campos editáveis pelo usuário.','input:read-write { border-color: green; }','Campos editáveis recebem indicação visual.'],
    [':placeholder-shown','Ativa enquanto o placeholder está sendo exibido.','input:placeholder-shown { border-style: dashed; }','Campo ainda vazio recebe borda tracejada.'],
    [':default','Seleciona a opção/controle padrão de um grupo.','input:default + label { font-weight: 700; }','A opção padrão pode ser destacada.'],
    [':checked','Seleciona checkbox/radio marcado e opções selecionadas quando aplicável.','input:checked + label { color: green; }','Ao marcar a caixa, o rótulo muda de cor.'],
    [':indeterminate','Seleciona controles em estado indeterminado.','input:indeterminate + label { opacity: .7; }','Checkbox mestre mostra estado parcial.'],
    [':valid','Seleciona campos que passam nas regras de validação HTML.','input:valid { border-color: green; }','E-mail válido recebe borda verde.'],
    [':invalid','Seleciona campos que falham na validação HTML.','input:invalid { border-color: red; }','Campo obrigatório vazio pode receber borda vermelha.'],
    [':user-valid','Indica um controle considerado válido após interação do usuário.','input:user-valid { outline: 2px solid green; }','Evita feedback positivo antes da pessoa interagir.'],
    [':user-invalid','Indica um controle inválido após interação do usuário.','input:user-invalid { outline: 2px solid red; }','Mostra erro depois da tentativa de preenchimento.'],
    [':in-range','Seleciona input numérico/data dentro de min e max.','input:in-range { border-color: green; }','Valor 7 em range 1–10 fica válido.'],
    [':out-of-range','Seleciona input fora de min e max.','input:out-of-range { border-color: red; }','Valor 15 em range 1–10 recebe alerta.'],
    [':required','Seleciona controles com atributo required.','input:required { border-left: 4px solid orange; }','Campos obrigatórios recebem marca visual.'],
    [':optional','Seleciona controles que não são obrigatórios.','input:optional { border-left: 4px solid #94a3b8; }','Campos opcionais ficam visualmente distintos.'],
    [':root','Seleciona a raiz do documento; em HTML, normalmente <html>.',':root { --cor-principal: #084f9f; }','É o lugar comum para variáveis CSS globais.'],
    [':empty','Seleciona elementos sem filhos nem texto.','.mensagem:empty { display: none; }','Caixa vazia some até receber conteúdo.'],
    [':first-child','Seleciona o primeiro filho entre irmãos.','li:first-child { font-weight: 700; }','Primeiro item da lista recebe destaque.'],
    [':last-child','Seleciona o último filho entre irmãos.','li:last-child { border-bottom: 0; }','Remove a borda do último item.'],
    [':only-child','Seleciona um elemento que é o único filho do pai.','.card:only-child { max-width: 700px; }','Um único card pode ocupar mais espaço.'],
    [':first-of-type','Seleciona o primeiro irmão daquele tipo de elemento.','p:first-of-type { font-size: 1.1em; }','Primeiro parágrafo de uma seção ganha destaque.'],
    [':last-of-type','Seleciona o último irmão daquele tipo.','p:last-of-type { margin-bottom: 0; }','Último parágrafo não deixa margem extra.'],
    [':only-of-type','Seleciona o único elemento daquele tipo entre irmãos.','img:only-of-type { margin-inline: auto; }','Imagem única pode ser centralizada automaticamente.'],
    [':nth-child()','Seleciona filhos por posição/fórmula.','tr:nth-child(even) { background: #f8fafc; }','Cria linhas zebradas em uma tabela.'],
    [':nth-last-child()','Como nth-child(), mas conta a partir do fim.','li:nth-last-child(-n+2) { color: red; }','Destaca os dois últimos itens.'],
    [':nth-of-type()','Seleciona posição considerando apenas irmãos do mesmo tipo.','p:nth-of-type(2) { color: purple; }','Seleciona o segundo parágrafo, ignorando outros elementos.'],
    [':nth-last-of-type()','Conta elementos do mesmo tipo a partir do final.','p:nth-last-of-type(1) { font-style: italic; }','Seleciona o último parágrafo daquele tipo.'],
    [':not()','Exclui elementos que correspondem ao seletor informado.','button:not(.primario) { opacity: .8; }','Aplica estilo a todos os botões menos o principal.'],
    [':is()','Agrupa alternativas de seletor reduzindo repetição e preservando a maior especificidade interna.','article :is(h2, h3, h4) { color: navy; }','Estiliza vários níveis de título com uma regra.'],
    [':where()','Agrupa seletores como :is(), mas com especificidade zero.','.conteudo :where(h2, h3) { margin-block: 1em; }','Define padrões fáceis de sobrescrever.'],
    [':has()','Seleciona um elemento com base em descendentes/relativos correspondentes.','.card:has(img) { padding-top: 0; }','Card muda de layout quando contém imagem.'],
    [':lang()','Seleciona conteúdo conforme o idioma declarado/herdado.','q:lang(pt) { quotes: "“" "”"; }','Citações podem variar conforme o idioma.'],
    [':dir()','Seleciona direção de escrita ltr ou rtl.','p:dir(rtl) { text-align: right; }','Ajusta apresentação para idiomas escritos da direita para a esquerda.'],
    [':fullscreen','Seleciona o elemento exibido em modo tela cheia.','video:fullscreen { object-fit: contain; }','Vídeo muda seu ajuste ao entrar em tela cheia.'],
    [':modal','Seleciona elemento que está em estado modal, como dialog.showModal().','dialog:modal { border-color: purple; }','Diálogo modal recebe destaque específico.'],
    [':picture-in-picture','Seleciona elemento atualmente em Picture-in-Picture quando suportado.','video:picture-in-picture { outline: 3px solid blue; }','Vídeo ganha indicação durante PiP.'],
    [':popover-open','Seleciona um elemento popover enquanto ele está aberto.','[popover]:popover-open { opacity: 1; }','Popover pode animar seu estado aberto.'],
    [':defined','Seleciona elementos definidos pelo navegador, útil com custom elements.','meu-card:defined { opacity: 1; }','Web Component aparece plenamente após ser definido.'],
    [':host','Dentro de Shadow DOM, seleciona o elemento hospedeiro.',' :host { display: block; }','Componente define seu próprio display externo.'],
    [':host()','Filtra o host por uma condição.',' :host(.compacto) { padding: 4px; }','Variação compacta de um Web Component.']
  ],
  pseudoElements: [
    ['::before','Cria um pseudo-elemento como primeiro filho visual do elemento; normalmente usa content.','.aviso::before { content: "⚠ "; }','Insere um ícone decorativo antes do texto.'],
    ['::after','Cria um pseudo-elemento como último filho visual do elemento.','a.externo::after { content: " ↗"; }','Marca links externos sem outro elemento HTML.'],
    ['::first-letter','Seleciona a primeira letra da primeira linha de um bloco.','p::first-letter { font-size: 2.5em; }','Cria uma capitular no início do parágrafo.'],
    ['::first-line','Seleciona a primeira linha formatada de um bloco.','p::first-line { font-weight: 700; }','A primeira linha do parágrafo recebe destaque.'],
    ['::selection','Estiliza a parte do documento selecionada pelo usuário.','::selection { background: #fde68a; color: #111827; }','Texto selecionado ganha marcação personalizada.'],
    ['::placeholder','Estiliza o texto de placeholder de campos.','input::placeholder { color: #64748b; }','Placeholder fica visualmente secundário.'],
    ['::marker','Estiliza marcador de itens de lista.','li::marker { color: green; font-size: 1.2em; }','Bolinha/número da lista muda sem alterar o texto.'],
    ['::file-selector-button','Seleciona o botão interno de input type=file.','input::file-selector-button { border-radius: 8px; }','Personaliza o botão “Escolher arquivo”.'],
    ['::backdrop','Estiliza a camada atrás de elementos em top layer, como dialog modal.','dialog::backdrop { background: rgb(0 0 0 / .45); }','Escurece o fundo atrás de um modal.'],
    ['::cue','Estiliza legendas WebVTT de mídia.','video::cue { color: yellow; background: black; }','Legendas de vídeo ganham alto contraste.'],
    ['::part()','Permite estilizar partes explicitamente expostas por um Web Component.','meu-card::part(titulo) { color: blue; }','Página externa estiliza a parte “titulo” exposta pelo componente.'],
    ['::slotted()','Dentro de Shadow DOM, seleciona elementos distribuídos em um slot.','::slotted(img) { border-radius: 12px; }','Imagens inseridas via slot recebem estilo do componente.'],
    ['::target-text','Estiliza texto alvo de fragmento textual quando suportado.','::target-text { background: #fef08a; }','Trecho aberto por text fragment recebe destaque.'],
    ['::spelling-error','Destina-se à estilização de trechos marcados pelo navegador como erro ortográfico; suporte é limitado.','::spelling-error { text-decoration-color: red; }','Erro ortográfico pode receber sublinhado personalizado.'],
    ['::grammar-error','Destina-se a trechos considerados erro gramatical; suporte é limitado.','::grammar-error { text-decoration-color: orange; }','Erro gramatical recebe indicação distinta.'],
    ['::highlight()','Estiliza ranges registrados pela CSS Custom Highlight API.','::highlight(busca) { background: yellow; }','Resultados encontrados na página podem ser realçados sem envolver spans extras.'],
    ['::view-transition','Pseudo-elemento raiz gerado durante View Transitions.','::view-transition { pointer-events: none; }','Controla a camada geral da transição entre estados.'],
    ['::view-transition-group()','Representa um grupo nomeado de conteúdo em View Transitions.','::view-transition-group(card) { animation-duration: .4s; }','Define duração do grupo “card”.'],
    ['::view-transition-image-pair()','Agrupa snapshots antigo e novo de um item em View Transitions.','::view-transition-image-pair(card) { isolation: auto; }','Ajusta composição entre as duas imagens de transição.'],
    ['::view-transition-old()','Representa o snapshot antigo de um item em View Transitions.','::view-transition-old(card) { animation: sair .3s; }','Personaliza como o estado anterior desaparece.'],
    ['::view-transition-new()','Representa o snapshot novo de um item em View Transitions.','::view-transition-new(card) { animation: entrar .3s; }','Personaliza como o novo estado aparece.']
  ]
};

// Monta no DOM a demonstração interativa do tópico ativo de CSS Parte 2.

function renderCss2LiveExample(key) {
  css2LiveExample.replaceChildren();
  if (key === 'pseudoClasses') {
    const wrap = document.createElement('div');
    wrap.innerHTML = '<label style="display:flex;gap:8px;align-items:center"><input type="checkbox"> marque para ativar <code>:checked</code></label><button type="button" class="css2-demo-btn" style="margin-top:8px">passe o mouse / foque</button>';
    const check = wrap.querySelector('input');
    const label = wrap.querySelector('label');
    check.addEventListener('change', () => { label.style.color = check.checked ? '#166534' : ''; label.style.fontWeight = check.checked ? '800' : ''; });
    css2LiveExample.append(wrap);
    return;
  }
  if (key === 'pseudoElements') {
    const box = document.createElement('div');
    box.style.cssText = 'padding:9px;border-left:5px solid #b45309;background:#fff7ed;border-radius:8px';
    box.innerHTML = '<strong style="color:#b45309">→ conteúdo decorativo</strong><br><span>O símbolo representa o que ::before/::after pode acrescentar visualmente sem criar outro elemento de conteúdo.</span>';
    css2LiveExample.append(box);
    return;
  }
  if (key === 'mediaQueries') {
    const demo = document.createElement('div');
    demo.className = 'css2-responsive-demo';
    demo.innerHTML = '<div class="css2-responsive-card"><div><strong>Arraste a borda direita</strong><br><small>O cartão muda quando o contêiner fica estreito. A lógica é análoga à adaptação por media query.</small></div></div>';
    css2LiveExample.append(demo);
    return;
  }
  if (key === 'motion') {
    const demo = document.createElement('div');
    demo.className = 'css2-motion-demo';
    demo.innerHTML = '<button type="button" class="css2-demo-btn">executar movimento</button><div class="css2-motion-box" aria-label="bloco animado">CSS</div>';
    const btn = demo.querySelector('button');
    const box = demo.querySelector('.css2-motion-box');
    btn.addEventListener('click', () => { box.classList.remove('is-running'); void box.offsetWidth; box.classList.add('is-running'); });
    css2LiveExample.append(demo);
  }
}

// Atualiza explicação, código, estado selecionado e demonstração de CSS Parte 2.

function renderCss2Topic(key, source = null) {
  const data = css2Topics[key];
  if (!data) return;
  activeCss2Key = key;
  QB.toggleActive(css2Rows, row => row.dataset.css2 === key);
  css2ExplanationTitle.textContent = data.title;
  css2ExplanationText.textContent = data.explanation;
  css2TriggerText.innerHTML = `<strong>Gatilho/condição:</strong> ${data.trigger}`;
  css2Code.textContent = data.code;
  css2OpenReference.classList.toggle('is-visible', Boolean(data.reference));
  css2OpenReference.dataset.reference = data.reference || '';
  renderCss2LiveExample(key);
  if (source && data.reference) openCss2Reference(data.reference, source);
}

// Filtra e reconstrói as linhas da tabela de referência sem recarregar a página.

function renderCss2ReferenceRows(type, filter = '') {
  const rowsData = css2References[type] || [];
  const normalized = filter.trim().toLocaleLowerCase('pt-BR');
  const filtered = rowsData.filter(item => !normalized || item.join(' ').toLocaleLowerCase('pt-BR').includes(normalized));
  css2ReferenceBody.replaceChildren();
  filtered.forEach(([selector, explanation, pseudo, example]) => {
    const tr = document.createElement('tr');
    const tdSelector = document.createElement('td');
    const tdExplanation = document.createElement('td');
    const tdPseudo = document.createElement('td');
    const tdExample = document.createElement('td');
    tdSelector.innerHTML = `<span class="css2-selector">${escapeHTML(selector)}</span>`;
    tdExplanation.textContent = explanation;
    const pre = document.createElement('pre');
    pre.className = 'css2-mini-code';
    pre.textContent = pseudo;
    tdPseudo.append(pre);
    const pill = document.createElement('span');
    pill.className = 'css2-example-pill';
    pill.textContent = example;
    tdExample.append(pill);
    tr.append(tdSelector, tdExplanation, tdPseudo, tdExample);
    css2ReferenceBody.append(tr);
  });
  css2ReferenceCount.textContent = `${filtered.length} de ${rowsData.length} seletores`;
}

// Abre a visão completa de referência de pseudo-classes/pseudo-elementos.

function openCss2Reference(type, source = null) {
  if (!css2References[type]) return;
  css2PreviousFocus = source instanceof HTMLElement ? source : document.activeElement;
  css2MainView.hidden = true;
  css2ReferenceView.hidden = false;
  const isClass = type === 'pseudoClasses';
  css2ReferenceCard.style.setProperty('--ref-color', isClass ? '#6b21a8' : '#b45309');
  css2ReferenceTitle.textContent = isClass ? 'Pseudo-classes CSS' : 'Pseudo-elementos CSS';
  css2ReferenceIntro.textContent = isClass
    ? 'Referência ampla dos estados e relações usados em seletores CSS. Cada linha mostra o que seleciona, uma sintaxe mínima e um caso de uso.'
    : 'Referência ampla de pseudo-elementos: partes virtuais, conteúdo gerado e superfícies especiais que podem receber estilo.';
  css2ReferenceSearch.value = '';
  css2ReferenceSearch.dataset.type = type;
  renderCss2ReferenceRows(type);
  backToCss2Main.focus({ preventScroll: true });
}

// Retorna da referência para a visão principal de CSS Parte 2.

function closeCss2Reference() {
  if (css2ReferenceView.hidden) return;
  css2ReferenceView.hidden = true;
  css2MainView.hidden = false;
  QB.restoreFocus(css2PreviousFocus);
}

QB.bindLinearList(css2Rows, {
  onSelect: row => renderCss2Topic(row.dataset.css2, row)
});
css2OpenReference.addEventListener('click', () => openCss2Reference(css2OpenReference.dataset.reference, css2OpenReference));
css2ReferenceSearch.addEventListener('input', () => renderCss2ReferenceRows(css2ReferenceSearch.dataset.type, css2ReferenceSearch.value));
backToCss2Main.addEventListener('click', closeCss2Reference);

const cssPropertyExamples = {
  color: { title: 'color', description: 'Define a cor do conteúdo textual e também fornece currentColor para bordas, ícones e outros elementos que herdam essa cor.', code: '.texto {\n  color: #b42318;\n}', style: 'color:#b42318;', note: 'A propriedade é herdável: elementos filhos normalmente recebem a cor do elemento pai.' },
  backgroundColor: { title: 'background-color', description: 'Define uma cor de fundo para a caixa do elemento.', code: '.caixa {\n  background-color: #fef3c7;\n}', style: 'background-color:#fef3c7;', note: 'Pode ser combinada com background-image; a cor continua servindo como base ou fallback.' },
  backgroundImage: { title: 'background-image', description: 'Aplica uma ou mais imagens ou gradientes ao fundo do elemento.', code: '.caixa {\n  background-image: linear-gradient(135deg, #dbeafe, #fef3c7);\n}', style: 'background-image:linear-gradient(135deg,#dbeafe,#fef3c7);', note: 'Gradientes CSS contam como imagens de fundo e não exigem arquivo externo.' },
  backgroundSize: { title: 'background-size', description: 'Controla o tamanho da imagem de fundo dentro da caixa.', code: '.caixa {\n  background-image: repeating-linear-gradient(45deg,#dbeafe 0 10px,#fff 10px 20px);\n  background-size: 34px 34px;\n}', style: 'background-image:repeating-linear-gradient(45deg,#dbeafe 0 10px,#fff 10px 20px);background-size:34px 34px;', note: 'Valores comuns: cover, contain ou dimensões explícitas.' },
  fontFamily: { title: 'font-family', description: 'Escolhe a família tipográfica usada para renderizar o texto.', code: '.texto {\n  font-family: Georgia, serif;\n}', style: 'font-family:Georgia,serif;', note: 'É recomendado fornecer uma lista de fallback caso a primeira fonte não esteja disponível.' },
  fontSize: { title: 'font-size', description: 'Controla o tamanho dos caracteres.', code: '.texto {\n  font-size: 1.7rem;\n}', style: 'font-size:1.7rem;', note: 'Unidades relativas como rem e em ajudam a respeitar preferências de tamanho e escalabilidade.' },
  fontWeight: { title: 'font-weight', description: 'Controla a espessura/peso visual da fonte.', code: '.texto {\n  font-weight: 800;\n}', style: 'font-weight:800;', note: 'Valores típicos vão de 100 a 900, além de normal e bold, conforme a fonte suportar.' },
  lineHeight: { title: 'line-height', description: 'Define a altura da linha e o espaço vertical entre linhas de texto.', code: '.texto {\n  line-height: 1.8;\n}', style: 'line-height:1.8;', demoText: 'Linha um\nLinha dois\nLinha três', note: 'Valores sem unidade, como 1.5, costumam se adaptar bem quando o tamanho da fonte muda.' },
  textAlign: { title: 'text-align', description: 'Alinha o conteúdo inline dentro da caixa.', code: '.texto {\n  text-align: center;\n}', style: 'text-align:center;', note: 'Valores frequentes: start, end, left, right, center e justify.' },
  textDecoration: { title: 'text-decoration', description: 'Adiciona decoração ao texto, como sublinhado, linha superior ou risco.', code: '.link {\n  text-decoration: underline wavy #b42318 2px;\n}', style: 'text-decoration:underline wavy #b42318 2px;', note: 'Em links, não dependa apenas da cor para comunicar que o texto é clicável.' },
  letterSpacing: { title: 'letter-spacing', description: 'Ajusta o espaço adicional entre caracteres.', code: '.titulo {\n  letter-spacing: .16em;\n}', style: 'letter-spacing:.16em;', note: 'Excesso de espaçamento pode prejudicar a leitura; use com moderação.' },
  whiteSpace: { title: 'white-space', description: 'Controla como espaços e quebras de linha são tratados.', code: '.codigo {\n  white-space: pre-wrap;\n}', style: 'white-space:pre-wrap;', demoText: 'linha 1    com espaços\nlinha 2 preservada', note: 'pre-wrap preserva quebras e espaços, mas ainda permite quebra automática quando necessário.' },
  width: { title: 'width', description: 'Define a largura preferida da caixa de conteúdo.', code: '.caixa {\n  width: 240px;\n}', style: 'width:240px;', note: 'Em layouts responsivos, combine com max-width para evitar estouro em telas pequenas.' },
  height: { title: 'height', description: 'Define a altura da caixa de conteúdo.', code: '.caixa {\n  height: 120px;\n}', style: 'height:120px;', note: 'Altura fixa pode cortar conteúdo; min-height costuma ser mais flexível em componentes textuais.' },
  minWidth: { title: 'min-width', description: 'Impede que a largura do elemento fique abaixo de um valor mínimo.', code: '.botao {\n  min-width: 180px;\n}', style: 'min-width:180px;', note: 'Útil para controles e componentes que precisam manter uma área mínima.' },
  maxWidth: { title: 'max-width', description: 'Limita a largura máxima sem obrigar o elemento a ocupar todo esse espaço.', code: '.conteudo {\n  width: 100%;\n  max-width: 360px;\n}', style: 'width:100%;max-width:360px;', note: 'É uma técnica comum para conteúdo fluido que não deve ficar largo demais.' },
  margin: { title: 'margin', description: 'Cria espaço externo entre a borda do elemento e elementos vizinhos.', code: '.caixa {\n  margin: 28px;\n}', style: 'margin:28px;', note: 'margin: auto pode distribuir espaço disponível, como na centralização horizontal de blocos com largura definida.' },
  padding: { title: 'padding', description: 'Cria espaço interno entre o conteúdo e a borda.', code: '.caixa {\n  padding: 28px;\n}', style: 'padding:28px;', note: 'Padding faz parte da caixa; com box-sizing: border-box, entra no cálculo da largura definida.' },
  border: { title: 'border', description: 'Desenha a borda da caixa combinando espessura, estilo e cor.', code: '.caixa {\n  border: 5px dashed #6b21a8;\n}', style: 'border:5px dashed #6b21a8;', note: 'A forma abreviada reúne border-width, border-style e border-color.' },
  borderRadius: { title: 'border-radius', description: 'Arredonda os cantos da borda.', code: '.caixa {\n  border-radius: 28px;\n}', style: 'border-radius:28px;', note: '50% é frequentemente usado para transformar uma caixa quadrada em círculo.' },
  boxShadow: { title: 'box-shadow', description: 'Adiciona uma ou várias sombras à caixa do elemento.', code: '.card {\n  box-shadow: 0 14px 30px rgb(15 23 42 / .25);\n}', style: 'box-shadow:0 14px 30px rgb(15 23 42 / .25);', note: 'A sombra não altera o espaço ocupado no layout.' },
  boxSizing: { title: 'box-sizing', description: 'Define como width e height calculam conteúdo, padding e borda.', code: '.caixa {\n  box-sizing: border-box;\n  width: 220px;\n  padding: 24px;\n}', style: 'box-sizing:border-box;width:220px;padding:24px;', note: 'border-box é muito usado porque mantém padding e border dentro da largura/altura declaradas.' },
  opacity: { title: 'opacity', description: 'Controla a transparência do elemento inteiro e de seus descendentes.', code: '.caixa {\n  opacity: .45;\n}', style: 'opacity:.45;', note: 'Para transparência apenas do fundo, prefira uma cor com canal alfa em vez de reduzir a opacidade de todo o elemento.' },
  overflow: { title: 'overflow', description: 'Define o que acontece quando o conteúdo ultrapassa os limites da caixa.', code: '.caixa {\n  width: 190px;\n  height: 80px;\n  overflow: auto;\n}', style: 'width:190px;height:80px;overflow:auto;', demoText: 'Conteúdo maior que a caixa. Role para ver o restante. Conteúdo maior que a caixa. Role para ver o restante.', note: 'Valores comuns: visible, hidden, clip, auto e scroll.' },
  display: { title: 'display', description: 'Define o tipo de caixa e o modelo de layout usado pelo elemento.', code: '.grupo {\n  display: flex;\n  gap: 8px;\n}', style: 'display:flex;gap:8px;', children: true, note: 'Valores centrais incluem block, inline, inline-block, flex, grid e none.' },
  visibility: { title: 'visibility', description: 'Oculta ou mostra o elemento preservando seu espaço no layout quando hidden.', code: '.caixa {\n  visibility: hidden;\n}', style: 'visibility:hidden;', ghost: true, note: 'Diferente de display: none, visibility: hidden mantém a área reservada.' },
  position: { title: 'position', description: 'Escolhe o esquema de posicionamento usado pelo elemento.', code: '.caixa {\n  position: relative;\n  top: 12px;\n}', style: 'position:relative;top:12px;', note: 'Valores comuns: static, relative, absolute, fixed e sticky.' },
  zIndex: { title: 'z-index', description: 'Controla a ordem de empilhamento de elementos em contextos compatíveis.', code: '.frente {\n  position: relative;\n  z-index: 2;\n}', mode: 'stack', note: 'z-index não é uma “profundidade global”; ele funciona dentro de contextos de empilhamento.' },
  top: { title: 'top', description: 'Desloca ou posiciona a borda superior de um elemento posicionado.', code: '.caixa {\n  position: relative;\n  top: 22px;\n}', style: 'position:relative;top:22px;', note: 'Seu comportamento depende do valor de position.' },
  right: { title: 'right', description: 'Define a distância da borda direita para elementos posicionados.', code: '.caixa {\n  position: relative;\n  right: 22px;\n}', style: 'position:relative;right:22px;', note: 'Em position: relative, o elemento é deslocado em relação à posição original.' },
  bottom: { title: 'bottom', description: 'Define a distância da borda inferior para elementos posicionados.', code: '.caixa {\n  position: relative;\n  bottom: 18px;\n}', style: 'position:relative;bottom:18px;', note: 'É muito usado com position: absolute, fixed e sticky dependendo do efeito desejado.' },
  left: { title: 'left', description: 'Define a distância da borda esquerda para elementos posicionados.', code: '.caixa {\n  position: relative;\n  left: 24px;\n}', style: 'position:relative;left:24px;', note: 'Para interfaces internacionais, propriedades lógicas como inset-inline-start podem ser mais adequadas.' },
  gap: { title: 'gap', description: 'Cria espaçamento entre linhas e colunas de layouts flex e grid.', code: '.grupo {\n  display: flex;\n  gap: 18px;\n}', style: 'display:flex;gap:18px;', children: true, note: 'Diferente de margin nos filhos, gap descreve diretamente o espaço entre itens do layout.' },
  flexDirection: { title: 'flex-direction', description: 'Define a direção do eixo principal em um contêiner flex.', code: '.grupo {\n  display: flex;\n  flex-direction: column;\n}', style: 'display:flex;flex-direction:column;gap:5px;', children: true, note: 'Valores comuns: row, row-reverse, column e column-reverse.' },
  justifyContent: { title: 'justify-content', description: 'Distribui itens ao longo do eixo principal de flex/grid.', code: '.grupo {\n  display: flex;\n  justify-content: space-between;\n}', style: 'display:flex;width:100%;justify-content:space-between;', children: true, note: 'O eixo principal depende de flex-direction.' },
  alignItems: { title: 'align-items', description: 'Alinha os itens no eixo transversal do contêiner flex/grid.', code: '.grupo {\n  display: flex;\n  align-items: flex-end;\n  height: 120px;\n}', style: 'display:flex;align-items:flex-end;height:120px;gap:6px;', children: true, note: 'É muito usado junto de justify-content para controlar os dois eixos.' },
  flexWrap: { title: 'flex-wrap', description: 'Permite que itens flex quebrem para novas linhas.', code: '.grupo {\n  display: flex;\n  flex-wrap: wrap;\n  width: 170px;\n}', style: 'display:flex;flex-wrap:wrap;width:170px;gap:5px;', children: true, manyChildren: true, note: 'nowrap é o padrão; wrap cria múltiplas linhas quando o espaço acaba.' },
  gridColumns: { title: 'grid-template-columns', description: 'Define a quantidade e o tamanho das colunas explícitas de uma grade CSS.', code: '.grade {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 6px;\n}', style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:100%;', children: true, manyChildren: true, note: 'Unidades fr distribuem frações do espaço disponível.' },
  transform: { title: 'transform', description: 'Aplica transformações visuais como mover, girar, escalar e inclinar sem refazer o fluxo normal do layout.', code: '.caixa {\n  transform: rotate(-7deg) scale(1.08);\n}', style: 'transform:rotate(-7deg) scale(1.08);', note: 'Transformações são muito usadas em feedback visual e animações.' },
  transition: { title: 'transition', description: 'Faz a mudança entre valores de propriedades acontecer gradualmente.', code: '.caixa {\n  transition: transform .35s ease, background .35s ease;\n}\n.caixa:hover { transform: scale(1.12); }', style: 'transition:transform .35s ease,background .35s ease;', transition: true, note: 'Passe o mouse ou foque visualmente no exemplo para observar a transição.' },
  animation: { title: 'animation', description: 'Executa uma sequência definida por @keyframes, podendo repetir, alternar e controlar duração/temporização.', code: '@keyframes flutuar {\n  50% { transform: translateY(-13px); }\n}\n.caixa {\n  animation: flutuar 1.4s ease-in-out infinite;\n}', style: 'animation:cssPropsFloat 1.4s ease-in-out infinite;', note: 'Respeite prefers-reduced-motion quando movimento não for essencial.' },
  cursor: { title: 'cursor', description: 'Define a aparência do ponteiro quando ele está sobre o elemento.', code: '.acao {\n  cursor: pointer;\n}', style: 'cursor:pointer;', note: 'Passe o mouse sobre o exemplo: pointer comunica que a região se comporta como ação clicável.' },
  objectFit: { title: 'object-fit', description: 'Controla como conteúdo substituído, como imagem ou vídeo, se ajusta às dimensões definidas.', code: 'img {\n  width: 180px;\n  height: 95px;\n  object-fit: cover;\n}', mode: 'object', note: 'cover preenche a caixa e pode recortar; contain preserva todo o conteúdo e pode deixar áreas vazias.' },
  aspectRatio: { title: 'aspect-ratio', description: 'Define uma proporção preferida entre largura e altura.', code: '.video {\n  width: 220px;\n  aspect-ratio: 16 / 9;\n}', style: 'width:220px;min-height:0;aspect-ratio:16/9;', note: 'É útil para mídia, cards e placeholders responsivos.' }
};
