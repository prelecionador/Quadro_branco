/* Comunicação HTML/JavaScript pelo DOM e comparação CSS × JavaScript. */

const domTopics = {
  querySelector: {
    label: 'querySelector()',
    detail: 'Seleciona o primeiro elemento do DOM que corresponde a um seletor CSS. É uma das formas mais comuns de o JavaScript encontrar um elemento escrito no HTML.',
    html: '<h2 class="titulo">Olá, Web!</h2>',
    js: "const titulo = document.querySelector('.titulo');\ntitulo.textContent = 'Olá, JavaScript!';",
    preview: '<span class="demo-card">.titulo → primeiro elemento encontrado</span>'
  },
  querySelectorAll: {
    label: 'querySelectorAll()',
    detail: 'Seleciona todos os elementos que correspondem ao seletor e retorna uma NodeList. É útil quando o mesmo comportamento deve ser aplicado a vários elementos.',
    html: '<li class="item">HTML</li>\n<li class="item">CSS</li>\n<li class="item">JavaScript</li>',
    js: "const itens = document.querySelectorAll('.item');\nitens.forEach(item => item.classList.add('ativo'));",
    preview: '<span class="demo-card ativo">HTML</span><span class="demo-card ativo">CSS</span><span class="demo-card ativo">JavaScript</span>'
  },
  getElementById: {
    label: 'getElementById()',
    detail: 'Procura diretamente um elemento pelo valor do atributo id. Como o id deve identificar um elemento único, o método retorna um elemento ou null.',
    html: '<p id="mensagem">Aguardando...</p>',
    js: "const msg = document.getElementById('mensagem');\nmsg.textContent = 'Elemento encontrado!';",
    preview: '<span class="demo-card">#mensagem → Elemento encontrado!</span>'
  },
  getElementsByClassName: {
    label: 'getElementsByClassName()',
    detail: 'Obtém uma coleção viva de elementos que possuem determinada classe. Diferentemente de querySelectorAll(), a coleção pode refletir mudanças posteriores no DOM.',
    html: '<p class="aviso">Aviso A</p>\n<p class="aviso">Aviso B</p>',
    js: "const avisos = document.getElementsByClassName('aviso');\nfor (const aviso of avisos) {\n  aviso.hidden = false;\n}",
    preview: '<span class="demo-card">2 elementos com class="aviso"</span>'
  },
  addEventListener: {
    label: 'addEventListener()',
    detail: 'Liga uma função JavaScript a um evento produzido por um elemento do DOM. Assim, uma ação no HTML — clique, digitação, foco, envio de formulário — dispara código JavaScript.',
    html: '<button id="salvar">Salvar</button>',
    js: "const botao = document.querySelector('#salvar');\nbotao.addEventListener('click', () => {\n  console.log('clicou!');\n});",
    preview: '<button type="button" class="demo-card">clique → evento → função JavaScript</button>'
  },
  textContent: {
    label: 'textContent',
    detail: 'Permite ler ou substituir o conteúdo textual de um elemento. O valor é tratado como texto, portanto tags escritas nele não são interpretadas como HTML.',
    html: '<p id="status">Carregando...</p>',
    js: "const status = document.querySelector('#status');\nstatus.textContent = 'Concluído ✓';",
    preview: '<span class="demo-card">Concluído ✓</span>'
  },
  innerHTML: {
    label: 'innerHTML',
    detail: 'Lê ou substitui a marcação HTML dentro de um elemento. Como o navegador interpreta a string como HTML, conteúdo vindo do usuário não deve ser inserido sem tratamento adequado.',
    html: '<div id="resultado"></div>',
    js: "const box = document.querySelector('#resultado');\nbox.innerHTML = '<strong>Resposta pronta</strong>';",
    preview: '<span class="demo-card"><strong>Resposta pronta</strong></span>'
  },
  value: {
    label: 'value',
    detail: 'É a ponte mais comum entre JavaScript e campos de formulário. O JS pode ler aquilo que a pessoa digitou e também alterar o valor exibido pelo controle.',
    html: '<input id="nome" value="Ana">',
    js: "const campo = document.querySelector('#nome');\nconsole.log(campo.value); // Ana\ncampo.value = 'Pedro';",
    preview: '<label>valor atual: <input value="Pedro" aria-label="Exemplo de valor do campo"></label>'
  },
  classList: {
    label: 'classList',
    detail: 'Permite ao JavaScript manipular as classes de um elemento. É uma integração importante entre HTML, JavaScript e CSS: o JS muda a classe e o CSS define a aparência daquela classe.',
    html: '<article id="card" class="card">Conteúdo</article>',
    js: "const card = document.querySelector('#card');\ncard.classList.add('ativo');\ncard.classList.toggle('destaque');",
    preview: '<span class="demo-card ativo">classe .ativo adicionada</span>'
  },
  style: {
    label: 'style',
    detail: 'A propriedade style permite alterar estilos inline diretamente pelo objeto DOM do elemento. Para mudanças maiores, classList costuma produzir código mais organizado.',
    html: '<p id="texto">Texto</p>',
    js: "const texto = document.querySelector('#texto');\ntexto.style.color = 'blue';\ntexto.style.fontSize = '1.5rem';",
    preview: '<span style="color:#075fa7;font-size:1.25rem;font-weight:800">estilo alterado pelo JS</span>'
  },
  attributes: {
    label: 'getAttribute() / setAttribute()',
    detail: 'Esses métodos fazem o JavaScript ler e alterar atributos do elemento HTML, como href, src, title, aria-label e vários outros.',
    html: '<a id="site" href="/inicio">Início</a>',
    js: "const link = document.querySelector('#site');\nconst destino = link.getAttribute('href');\nlink.setAttribute('title', 'Ir para o início');",
    preview: '<span class="demo-card">href lido + title definido</span>'
  },
  dataset: {
    label: 'dataset',
    detail: 'Atributos data-* armazenam informações personalizadas no próprio HTML. No JavaScript, esses dados aparecem em element.dataset e podem orientar comportamento sem inventar atributos fora do padrão.',
    html: '<button data-produto-id="42">Comprar</button>',
    js: "const botao = document.querySelector('button');\nconsole.log(botao.dataset.produtoId); // '42'",
    preview: '<span class="demo-card">data-produto-id="42" ↔ dataset.produtoId</span>'
  },
  createElement: {
    label: 'createElement() + append()',
    detail: 'O JavaScript pode construir novos elementos DOM e inseri-los na estrutura já criada pelo HTML. Isso permite listas, mensagens e componentes surgirem dinamicamente.',
    html: '<ul id="lista"></ul>',
    js: "const li = document.createElement('li');\nli.textContent = 'Novo item';\ndocument.querySelector('#lista').append(li);",
    preview: '<ul><li>Novo item criado pelo JavaScript</li></ul>'
  },
  formData: {
    label: 'FormData',
    detail: 'Lê campos de um formulário usando seus atributos name. É uma forma prática de transportar valores do HTML para o JavaScript antes de validar, enviar ou processar os dados.',
    html: '<form id="cadastro">\n  <input name="email" value="aluno@exemplo.com">\n</form>',
    js: "const form = document.querySelector('#cadastro');\nconst dados = new FormData(form);\nconsole.log(dados.get('email'));",
    preview: '<span class="demo-card">name="email" → aluno@exemplo.com</span>'
  }
};

function renderDomTopic(key) {
  const data = domTopics[key];
  if (!data) return;
  domRows.forEach(row => row.classList.toggle('is-active', row.dataset.dom === key));
  domDetail.innerHTML = `<strong>${data.label}:</strong> ${data.detail}`;
  domHtmlCode.textContent = data.html;
  domJsCode.textContent = data.js;
  domPreview.innerHTML = data.preview;
}

const compareTopics = {
  selectors: {
    title: 'Selecionar elementos',
    lead: 'CSS e JavaScript usam seletores para alcançar elementos da página, mas com finalidades diferentes.',
    css: `.card {
  border: 2px solid blue;
}`,
    js: `const card = document.querySelector('.card');
card.textContent = 'Encontrado pelo JavaScript';`,
    similarity: 'Nos dois casos, a expressão .card aponta para elementos que possuem a classe card. O seletor funciona como uma forma de localizar o alvo.',
    difference: 'Diferença: CSS seleciona o alvo para aplicar regras de apresentação; JavaScript obtém uma referência do DOM para ler, alterar ou programar o elemento.'
  },
  classes: {
    title: 'Trabalhar com classes',
    lead: 'Uma classe pode conectar a regra visual definida no CSS ao comportamento acionado pelo JavaScript.',
    css: `.ativo {
  background: #dbeafe;
  color: #084f9f;
}`,
    js: `const botao = document.querySelector('#botao');
botao.classList.toggle('ativo');`,
    similarity: 'CSS e JavaScript usam o mesmo nome de classe como ponto de ligação. O CSS define como .ativo deve parecer; o JavaScript pode adicionar, remover ou alternar essa classe.',
    difference: 'Diferença: a regra visual pertence ao CSS; o JavaScript decide quando a classe deve mudar.'
  },
  ids: {
    title: 'Trabalhar com IDs',
    lead: 'O atributo id identifica um elemento específico e pode ser referenciado tanto pelo CSS quanto pelo JavaScript.',
    css: `#menu {
  position: sticky;
  top: 0;
}`,
    js: `const menu = document.getElementById('menu');
menu.setAttribute('aria-label', 'Menu principal');`,
    similarity: 'As duas tecnologias conseguem apontar para o mesmo elemento identificado por id="menu".',
    difference: 'Diferença: no CSS usa-se #menu como seletor; no JavaScript getElementById("menu") retorna o objeto do elemento no DOM.'
  },
  variables: {
    title: 'Guardar valores reutilizáveis',
    lead: 'CSS e JavaScript possuem mecanismos para guardar valores e reutilizá-los, embora sejam sistemas de variáveis diferentes.',
    css: `:root {
  --cor-destaque: #084f9f;
}

a { color: var(--cor-destaque); }`,
    js: `const corDestaque = '#084f9f';
const link = document.querySelector('a');
link.style.color = corDestaque;`,
    similarity: 'Ambos evitam repetir valores literais e permitem dar um nome a um valor que será reutilizado.',
    difference: 'Diferença: propriedades customizadas CSS participam da cascata e podem ser herdadas; let e const são variáveis da linguagem JavaScript e seguem regras de escopo do código.'
  },
  styles: {
    title: 'Alterar aparência',
    lead: 'Os dois podem participar da aparência final de um elemento: CSS define estilos e JavaScript pode alterar estilos ou classes em tempo de execução.',
    css: `.aviso {
  color: #b42318;
  font-weight: 800;
}`,
    js: `const aviso = document.querySelector('.aviso');
aviso.style.fontSize = '1.2rem';
// melhor para conjuntos de estilos:
aviso.classList.add('destacado');`,
    similarity: 'O resultado pode ser a mudança visual do mesmo elemento: cor, tamanho, posição, visibilidade e outras propriedades.',
    difference: 'Diferença: prefira CSS para declarar apresentação. JavaScript é útil quando a mudança depende de dados, eventos ou lógica; muitas vezes ele apenas troca uma classe.'
  },
  states: {
    title: 'Responder a estados e interações',
    lead: 'CSS reage declarativamente a certos estados; JavaScript escuta eventos e executa lógica quando a interação acontece.',
    css: `button:hover {
  transform: scale(1.05);
}

input:focus {
  outline: 3px solid blue;
}`,
    js: `const botao = document.querySelector('button');
botao.addEventListener('click', () => {
  console.log('clicou');
});`,
    similarity: 'Ambos permitem que a interface responda ao usuário. Um hover, foco ou clique pode produzir feedback visual ou comportamental.',
    difference: 'Diferença: pseudo-classes CSS cobrem estados previstos pelo navegador; JavaScript lida com eventos e pode executar lógica arbitrária.'
  },
  responsive: {
    title: 'Responder ao tamanho da tela',
    lead: 'CSS e JavaScript conseguem detectar condições de mídia e adaptar a experiência ao ambiente do usuário.',
    css: `@media (max-width: 700px) {
  .grade {
    grid-template-columns: 1fr;
  }
}`,
    js: `const mobile = matchMedia('(max-width: 700px)');

if (mobile.matches) {
  console.log('layout compacto');
}`,
    similarity: 'Os dois podem usar a mesma condição de mídia, como max-width: 700px, para responder ao tamanho da viewport.',
    difference: 'Diferença: CSS deve resolver a maior parte do layout responsivo; JavaScript é indicado quando a condição precisa alterar comportamento ou lógica, não apenas apresentação.'
  },
  animation: {
    title: 'Criar movimento',
    lead: 'CSS e JavaScript podem animar propriedades visuais ao longo do tempo.',
    css: `.card {
  transition: transform .3s ease;
}
.card:hover {
  transform: translateY(-6px);
}`,
    js: `const card = document.querySelector('.card');
card.animate(
  [{ transform: 'translateY(0)' },
   { transform: 'translateY(-6px)' }],
  { duration: 300, fill: 'forwards' }
);`,
    similarity: 'As duas abordagens descrevem uma mudança visual entre estados e controlam duração e evolução do movimento.',
    difference: 'Diferença: CSS é ótimo para transições e animações ligadas a estilo; JavaScript oferece controle programático, encadeamento e decisões durante a animação.'
  },
  visibility: {
    title: 'Mostrar e ocultar elementos',
    lead: 'CSS define como a visibilidade é apresentada; JavaScript pode mudar o estado que determina se um elemento deve aparecer.',
    css: `.oculto {
  display: none;
}`,
    js: `const painel = document.querySelector('#painel');
painel.hidden = true;
// ou:
painel.classList.add('oculto');`,
    similarity: 'Em ambos os casos o usuário pode deixar de ver o elemento. A combinação mais comum é JavaScript alternar uma classe e CSS definir o efeito visual dessa classe.',
    difference: 'Diferença: hidden possui semântica própria no HTML/DOM; display e visibility são propriedades CSS. A escolha também afeta layout e acessibilidade.'
  }
};

function openCompareTopic(key, trigger) {
  const data = compareTopics[key];
  if (!data) return;
  comparePreviousFocus = trigger || document.activeElement;
  compareDetailTitle.textContent = data.title;
  compareDetailLead.textContent = data.lead;
  compareCssCode.textContent = data.css;
  compareJsCode.textContent = data.js;
  compareSimilarityText.textContent = data.similarity;
  compareDifferenceText.textContent = data.difference;
  compareTableView.hidden = true;
  compareDetailView.hidden = false;
  compareCard.focus({ preventScroll: true });
}

function closeCompareTopic() {
  if (compareDetailView.hidden) return;
  compareDetailView.hidden = true;
  compareTableView.hidden = false;
  if (comparePreviousFocus && typeof comparePreviousFocus.focus === 'function') {
    comparePreviousFocus.focus({ preventScroll: true });
  }
}

function switchBoard(from, to, destinationTitle, announcement) {
  if (boardSwitching || !from || !to) return;
  boardSwitching = true;
  if (!conceptView.hidden) closeConcept();
  if (!htmlConceptView.hidden) closeHtmlConcept();
  if (!tagDetailView.hidden) closeTagDetail();
  if (!cssDetailView.hidden) closeCssDetail();
  if (!cssConceptView.hidden) closeCssConcept();
  if (!css2ReferenceView.hidden) closeCss2Reference();
  if (!cssPropsDetailView.hidden) closeCssProperty();
  if (!cssPropsConceptView.hidden) closeCssSelectorConcept();
  if (!currentDetailView.hidden) closeCurrentTopic();
  if (!currentConceptView.hidden) closeCurrentConcept();
  if (!compareDetailView.hidden) closeCompareTopic();

  wipeStreak.classList.remove('is-active');
  void wipeStreak.offsetWidth;
  wipeStreak.classList.add('is-active');
  from.classList.add('is-erasing-out');

  window.setTimeout(() => {
    from.hidden = true;
    from.classList.remove('is-erasing-out');
    to.hidden = false;
    if (typeof to.scrollTo === 'function') to.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    else to.scrollTop = 0;
    scheduleLessonFit(20);
    to.classList.remove('is-writing-in');
    void to.offsetWidth;
    to.classList.add('is-writing-in');
    boardAnnouncer.textContent = announcement;
    window.setTimeout(() => {
      to.classList.remove('is-writing-in');
      wipeStreak.classList.remove('is-active');
      boardSwitching = false;
      scheduleLessonFit(20);
      if (destinationTitle) destinationTitle.focus({ preventScroll: true });
    }, 740);
  }, 610);
}
