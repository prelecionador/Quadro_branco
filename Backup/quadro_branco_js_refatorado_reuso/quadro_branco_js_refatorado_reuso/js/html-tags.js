/*
===============================================================================
HTML-TAGS.JS — CONTEÚDO E INTERAÇÃO DAS AULAS DE HTML/TAGS
===============================================================================
Os objetos de dados descrevem o conteúdo; as funções apenas renderizam/alternam
visões. Essa separação facilita adicionar exemplos sem reescrever a interface.
===============================================================================
*/

/* DADOS DA AULA 1: chave data-html → conteúdo renderizado. */
const htmlExamples = {
  headings: {
    label: 'Cabeçalhos &lt;h1&gt; a &lt;h6&gt;',
    detail: 'Os elementos h1 a h6 descrevem níveis de títulos dentro do conteúdo. O número indica hierarquia, não tamanho visual: h1 representa o nível principal daquele contexto e os demais organizam subseções.',
    source: `<h1>Curso de Desenvolvimento Web</h1>\n<h2>Unidade 1 — HTML</h2>\n<h3>1.1 Estrutura do documento</h3>`,
    preview: `<h1>Curso de Desenvolvimento Web</h1><h2>Unidade 1 — HTML</h2><h3>1.1 Estrutura do documento</h3>`
  },
  title: {
    label: 'Título do documento &lt;title&gt;',
    detail: 'O elemento title fica dentro de head e nomeia o documento. Ele normalmente aparece na aba do navegador, participa do histórico/favoritos e ajuda mecanismos de busca e tecnologias assistivas a identificar a página.',
    source: `<head>\n  <title>Introdução ao HTML | Aula 01</title>\n</head>`,
    preview: `<div class="browser-title">aba do navegador: Introdução ao HTML | Aula 01</div><p>O &lt;title&gt; não aparece como um título dentro do conteúdo da página.</p>`
  },
  paragraph: {
    label: 'Parágrafo &lt;p&gt;',
    detail: 'O elemento p representa um parágrafo. O navegador aplica espaçamento padrão, mas o mais importante é a semântica: leitores de tela e mecanismos de análise reconhecem aquele trecho como uma unidade textual.',
    source: `<p>\n  HTML descreve a estrutura e o significado\n  do conteúdo de uma página Web.\n</p>`,
    preview: `<p>HTML descreve a estrutura e o significado do conteúdo de uma página Web.</p><p>Outro &lt;p&gt; inicia um novo parágrafo.</p>`
  },
  link: {
    label: 'Link &lt;a&gt;',
    detail: 'O elemento a cria um hiperlink. O atributo href informa o destino, que pode ser outra página, um arquivo, um endereço de e-mail ou um identificador dentro do próprio documento.',
    source: `<a href="#historia-web">\n  Ir para História da Web\n</a>`,
    preview: `<a href="#html-page-title">Ir para o início deste quadro</a><p>O texto do link deve explicar o destino — evite “clique aqui” quando houver uma descrição melhor.</p>`
  }
};


/* CATÁLOGO DE TAGS: chave data-tag → título, sintaxe, exemplo e interação. */
const tagExamples = {
  html: { title: '<html>', summary: 'É o elemento raiz do documento. Todo o conteúdo HTML da página fica dentro dele, exceto a declaração do tipo de documento.', syntax: '<html lang="pt-BR">\n  ...\n</html>', example: '<code>&lt;html lang="pt-BR"&gt;…&lt;/html&gt;</code>', event: 'não possui um evento específico; eventos do documento podem propagar por seus descendentes.' },
  head: { title: '<head>', summary: 'Reúne metadados e recursos que descrevem ou configuram a página, como título, codificação, folhas de estilo e scripts.', syntax: '<head>\n  <meta charset="UTF-8">\n  <title>Aula</title>\n</head>', example: '<p>Configura a página, mas normalmente não aparece como conteúdo visual.</p>', event: 'não é um elemento usado para interação direta do usuário.' },
  body: { title: '<body>', summary: 'Contém o conteúdo que é apresentado ao usuário: textos, imagens, navegação, formulários e demais elementos visíveis.', syntax: '<body>\n  <main>Conteúdo</main>\n</body>', example: '<main><strong>Conteúdo visível da página</strong></main>', event: 'pode receber eventos globais como load, keydown e click, embora normalmente os listeners sejam ligados a elementos mais específicos.' },
  meta: { title: '<meta>', summary: 'Define metadados do documento, como codificação, viewport, descrição e outras informações que não são conteúdo principal da página.', syntax: '<meta name="viewport" content="width=device-width, initial-scale=1">', example: '<p>Ajuda o navegador a interpretar e adaptar a página; não gera conteúdo visual por si só.</p>', event: 'não possui interação direta.' },
  title: { title: '<title>', summary: 'Define o nome do documento mostrado na aba do navegador e usado em favoritos, histórico e vários contextos de acessibilidade.', syntax: '<title>Introdução ao HTML</title>', example: '<div class="browser-title">aba: Introdução ao HTML</div>', event: 'não possui evento de interface próprio.' },
  link: { title: '<link>', summary: 'Relaciona o documento a um recurso externo. É muito usado para carregar folhas de estilo, ícones e outros recursos.', syntax: '<link rel="stylesheet" href="estilos.css">', example: '<p>Exemplo clássico: conectar a página a um arquivo CSS externo.</p>', event: 'load e error podem indicar se o recurso externo foi carregado ou falhou.' },
  style: { title: '<style>', summary: 'Permite escrever regras CSS diretamente dentro do documento HTML.', syntax: '<style>\n  p { font-weight: 700; }\n</style>', example: '<p style="font-weight:700">O CSS altera a apresentação do conteúdo.</p>', event: 'não recebe interação comum; ele define regras de apresentação.' },
  script: { title: '<script>', summary: 'Inclui ou referencia código JavaScript, permitindo comportamento dinâmico, manipulação do DOM e comunicação com APIs.', syntax: '<script defer src="app.js"><\/script>', example: '<button type="button" onclick="this.textContent=\'executado ✓\'">executar exemplo</button>', event: 'load e error no próprio script; o código carregado pode registrar qualquer evento da interface.' },
  header: { title: '<header>', summary: 'Representa conteúdo introdutório de uma página ou seção, geralmente com título, identidade e controles iniciais.', syntax: '<header>\n  <h1>Portal da disciplina</h1>\n</header>', example: '<header><strong>Portal da disciplina</strong></header>', event: 'não possui evento específico; pode conter links e botões interativos.' },
  nav: { title: '<nav>', summary: 'Identifica uma região de navegação com links importantes para partes da página ou outros documentos.', syntax: '<nav aria-label="Principal">\n  <a href="/">Início</a>\n</nav>', example: '<nav><a href="#tags-page-title">voltar ao título</a></nav>', event: 'os links internos normalmente respondem a click e teclado.' },
  main: { title: '<main>', summary: 'Marca o conteúdo principal e único do documento, ajudando navegação semântica e tecnologias assistivas.', syntax: '<main>\n  <h1>Conteúdo principal</h1>\n</main>', example: '<main><strong>Esta é a região principal.</strong></main>', event: 'não possui evento específico; organiza semanticamente o conteúdo.' },
  section: { title: '<section>', summary: 'Agrupa um tema ou seção do documento. Em geral deve ter um título que identifique seu assunto.', syntax: '<section>\n  <h2>Resultados</h2>\n  <p>...</p>\n</section>', example: '<section><strong>Resultados</strong><p>Conteúdo relacionado.</p></section>', event: 'não possui evento próprio; seus descendentes podem ser interativos.' },
  article: { title: '<article>', summary: 'Representa conteúdo autocontido que poderia ser distribuído ou reutilizado de forma independente, como notícia, postagem ou card editorial.', syntax: '<article>\n  <h2>Notícia</h2>\n  <p>Texto...</p>\n</article>', example: '<article><strong>Notícia</strong><p>Um conteúdo independente.</p></article>', event: 'não possui evento específico.' },
  aside: { title: '<aside>', summary: 'Contém informação complementar ao conteúdo principal, como observações, links relacionados ou uma barra lateral.', syntax: '<aside>\n  <p>Leitura complementar</p>\n</aside>', example: '<aside><em>Leitura complementar</em></aside>', event: 'não possui evento específico.' },
  footer: { title: '<footer>', summary: 'Representa o rodapé de uma página ou seção, geralmente com autoria, direitos, contato ou navegação complementar.', syntax: '<footer>\n  <small>© 2026</small>\n</footer>', example: '<footer><small>© 2026 • Aula Web</small></footer>', event: 'não possui evento específico.' },
  div: { title: '<div>', summary: 'É um contêiner genérico em bloco. Use quando não houver um elemento semântico mais adequado para agrupar conteúdo.', syntax: '<div class="card">\n  Conteúdo\n</div>', example: '<div style="border:1px dashed currentColor;padding:6px">Bloco genérico</div>', event: 'pode receber click, mouseover, drag e outros eventos quando transformado em região interativa; prefira elementos semânticos para controles.' },
  h1: { title: '<h1>', summary: 'Cabeçalho de nível 1. Expressa o título principal daquele contexto e faz parte da hierarquia de títulos do documento.', syntax: '<h1>Introdução ao HTML</h1>', example: '<h1 style="font-size:1.35rem">Introdução ao HTML</h1>', event: 'não possui evento específico.' },
  p: { title: '<p>', summary: 'Representa um parágrafo, isto é, uma unidade textual de conteúdo corrido.', syntax: '<p>HTML estrutura o conteúdo da Web.</p>', example: '<p>HTML estrutura o conteúdo da Web.</p>', event: 'não possui evento específico.' },
  span: { title: '<span>', summary: 'É um contêiner genérico em linha, útil para marcar pequenos trechos sem criar um novo bloco.', syntax: '<p>Use <span class="destaque">semântica</span>.</p>', example: '<p>Use <span style="font-weight:900">semântica</span>.</p>', event: 'pode receber eventos, mas não é um controle nativo; para ações, prefira button ou a.' },
  a: { title: '<a>', summary: 'Cria um hiperlink. O atributo href define o destino e transforma o texto ou conteúdo em uma ligação navegável.', syntax: '<a href="https://example.com">Abrir site</a>', example: '<a href="#tags-page-title">ir para o título do quadro</a>', event: 'click é o mais comum; também responde naturalmente a Enter quando focado.' },
  img: { title: '<img>', summary: 'Insere uma imagem no documento. O atributo alt fornece uma alternativa textual quando a imagem comunica informação.', syntax: '<img src="foto.jpg" alt="Descrição da imagem">', example: '<div role="img" aria-label="Exemplo visual de imagem" style="width:110px;height:54px;border:2px dashed currentColor;display:grid;place-items:center">imagem</div>', event: 'load quando a imagem carrega e error quando falha.' },
  figure: { title: '<figure>', summary: 'Agrupa conteúdo autocontido, como imagem, diagrama ou código, geralmente acompanhado por figcaption.', syntax: '<figure>\n  <img src="grafico.png" alt="...">\n  <figcaption>Figura 1</figcaption>\n</figure>', example: '<figure><div style="border:1px dashed currentColor;padding:4px">figura</div><figcaption>Figura 1</figcaption></figure>', event: 'não possui evento específico.' },
  figcaption: { title: '<figcaption>', summary: 'Fornece a legenda de um elemento figure.', syntax: '<figcaption>Figura 1 — Arquitetura da aplicação</figcaption>', example: '<figcaption>Figura 1 — Exemplo de legenda</figcaption>', event: 'não possui evento específico.' },
  br: { title: '<br>', summary: 'Força uma quebra de linha dentro do texto. Deve ser usado quando a quebra faz parte do conteúdo, não para criar espaçamento visual.', syntax: 'Linha 1<br>\nLinha 2', example: '<p>Linha 1<br>Linha 2</p>', event: 'não possui evento específico.' },
  ul: { title: '<ul>', summary: 'Cria uma lista não ordenada, geralmente apresentada com marcadores.', syntax: '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>', example: '<ul><li>HTML</li><li>CSS</li></ul>', event: 'não possui evento específico.' },
  ol: { title: '<ol>', summary: 'Cria uma lista ordenada, adequada quando a sequência ou posição dos itens importa.', syntax: '<ol>\n  <li>Estruturar</li>\n  <li>Estilizar</li>\n</ol>', example: '<ol><li>Estruturar</li><li>Estilizar</li></ol>', event: 'não possui evento específico.' },
  li: { title: '<li>', summary: 'Representa um item dentro de uma lista ul, ol ou menu.', syntax: '<li>JavaScript</li>', example: '<ul><li>JavaScript</li></ul>', event: 'não possui evento específico; controles dentro do item podem ser interativos.' },
  strong: { title: '<strong>', summary: 'Marca conteúdo de forte importância. Normalmente aparece em negrito, mas seu valor principal é semântico.', syntax: '<strong>Atenção:</strong> salve o arquivo.', example: '<p><strong>Atenção:</strong> salve o arquivo.</p>', event: 'não possui evento específico.' },
  form: { title: '<form>', summary: 'Agrupa controles para entrada e envio de dados. Pode ser associado a uma URL e método HTTP ou tratado completamente por JavaScript.', syntax: '<form id="cadastro">\n  <input name="nome">\n  <button>Enviar</button>\n</form>', example: '<form onsubmit="event.preventDefault();this.querySelector(\'button\').textContent=\'enviado ✓\'"><input aria-label="nome" placeholder="nome"><button>enviar</button></form>', event: 'submit é o evento central; reset e eventos dos campos também são comuns.' },
  label: { title: '<label>', summary: 'Associa um texto descritivo a um controle de formulário. Essa ligação melhora clique, compreensão e acessibilidade.', syntax: '<label for="email">E-mail</label>\n<input id="email" type="email">', example: '<label for="demo-email">E-mail </label><input id="demo-email" type="email" placeholder="nome@site.com">', event: 'clicar no label transfere foco/ativação ao controle associado.' },
  input: { title: '<input>', summary: 'Cria diferentes tipos de entrada de dados: texto, e-mail, senha, número, checkbox, radio, arquivo e outros.', syntax: '<input id="nome" name="nome" type="text" required>', example: '<input aria-label="Digite algo" placeholder="digite algo">', event: 'input acompanha alterações em tempo real; change confirma mudanças em vários tipos de campo; focus e blur controlam foco.' },
  button: { title: '<button>', summary: 'Cria um botão nativo, acessível por teclado e adequado para disparar ações.', syntax: '<button type="button" id="salvar">Salvar</button>', example: '<button type="button" onclick="this.textContent=\'clicado ✓\'">clique em mim</button>', event: 'click é o principal; também pode receber focus, blur, keydown e outros eventos.' },
  textarea: { title: '<textarea>', summary: 'Cria um campo de texto multilinha, útil para mensagens, descrições e conteúdo mais longo.', syntax: '<textarea name="mensagem" rows="4"></textarea>', example: '<textarea aria-label="mensagem" rows="2" placeholder="escreva aqui"></textarea>', event: 'input, change, focus e blur são comuns.' },
  select: { title: '<select>', summary: 'Cria uma lista de opções selecionáveis, normalmente preenchida com elementos option.', syntax: '<select name="curso">\n  <option>HTML</option>\n  <option>CSS</option>\n</select>', example: '<select aria-label="curso"><option>HTML</option><option>CSS</option></select>', event: 'change é o evento mais comum ao trocar a opção selecionada.' },
  option: { title: '<option>', summary: 'Representa uma opção dentro de select, datalist ou optgroup.', syntax: '<option value="js">JavaScript</option>', example: '<select aria-label="tecnologia"><option>JavaScript</option><option>HTML</option></select>', event: 'a mudança é normalmente observada no select por meio do evento change.' },
  table: { title: '<table>', summary: 'Representa dados tabulares organizados em linhas e colunas. Não deve ser usada apenas para montar layout.', syntax: '<table>\n  <tr><th>Nome</th></tr>\n  <tr><td>Ana</td></tr>\n</table>', example: '<table style="width:auto"><tr><th>Nome</th><th>Nota</th></tr><tr><td>Ana</td><td>9</td></tr></table>', event: 'não possui evento específico; células e controles internos podem receber eventos.' },
  tr: { title: '<tr>', summary: 'Representa uma linha dentro de uma tabela.', syntax: '<tr>\n  <td>Ana</td>\n  <td>9,0</td>\n</tr>', example: '<table style="width:auto"><tr><td>Ana</td><td>9,0</td></tr></table>', event: 'não possui evento específico.' },
  th: { title: '<th>', summary: 'Representa uma célula de cabeçalho em uma tabela. O atributo scope pode esclarecer a relação com linhas ou colunas.', syntax: '<th scope="col">Nota</th>', example: '<table style="width:auto"><tr><th scope="col">Nota</th></tr><tr><td>9,0</td></tr></table>', event: 'não possui evento específico.' },
  td: { title: '<td>', summary: 'Representa uma célula de dados em uma tabela.', syntax: '<td>9,0</td>', example: '<table style="width:auto"><tr><td>9,0</td></tr></table>', event: 'não possui evento específico.' },
  video: { title: '<video>', summary: 'Incorpora vídeo com recursos nativos do navegador, controles e múltiplas fontes.', syntax: '<video controls>\n  <source src="aula.mp4" type="video/mp4">\n</video>', example: '<div style="border:2px solid currentColor;padding:7px">▶ vídeo com controles nativos</div>', event: 'play, pause, ended, timeupdate, volumechange e loadeddata são exemplos.' },
  audio: { title: '<audio>', summary: 'Incorpora áudio com reprodução nativa e suporte a controles.', syntax: '<audio controls>\n  <source src="fala.mp3" type="audio/mpeg">\n</audio>', example: '<div style="border:2px solid currentColor;padding:7px">♪ áudio com controles nativos</div>', event: 'play, pause, ended, timeupdate e loadeddata são comuns.' },
  source: { title: '<source>', summary: 'Define fontes alternativas para elementos de mídia, permitindo ao navegador escolher um formato compatível.', syntax: '<video controls>\n  <source src="aula.webm" type="video/webm">\n  <source src="aula.mp4" type="video/mp4">\n</video>', example: '<p>O navegador tenta as fontes disponíveis até encontrar uma compatível.</p>', event: 'error pode indicar falha da fonte; eventos de reprodução ficam no elemento de mídia.' },
  canvas: { title: '<canvas>', summary: 'Fornece uma superfície de desenho controlada por JavaScript. O conteúdo gráfico é criado por uma API, não por elementos HTML internos tradicionais.', syntax: '<canvas id="grafico" width="300" height="150"></canvas>', example: '<div style="width:150px;height:70px;border:2px solid currentColor;display:grid;place-items:center">canvas → JS desenha aqui</div>', event: 'pointerdown, pointermove, click e eventos de teclado podem ser usados para criar ferramentas de desenho.' },
  iframe: { title: '<iframe>', summary: 'Incorpora outro documento ou aplicação dentro da página. Deve ser usado com atenção a segurança, permissões, título acessível e políticas de origem.', syntax: '<iframe src="pagina.html" title="Exemplo incorporado"></iframe>', example: '<div style="border:2px inset #94a3b8;padding:8px">conteúdo externo incorporado</div>', event: 'load indica que o documento incorporado terminou de carregar.' }
};

const tagColors = ['#b42318', '#084f9f', '#166534', '#6b21a8', '#b45309'];

// Troca a grade de tags pela visão detalhada da tag selecionada.

function openTagDetail(key, source) {
  const data = tagExamples[key];
  if (!data) return;
  tagPreviousFocus = source instanceof HTMLElement ? source : document.activeElement;
  tagsTableView.hidden = true;
  tagDetailView.hidden = false;
  tagDetailCard.style.setProperty('--concept-color', tagColors[Math.max(0, tagButtons.indexOf(source)) % tagColors.length]);
  tagDetailTitle.textContent = data.title;
  tagDetailSummary.textContent = data.summary;
  tagDetailSyntax.textContent = data.syntax;
  tagDetailExample.innerHTML = data.example;
  tagDetailEvent.textContent = data.event;
  QB.toggleActive(tagButtons, button => button === source);
  backToTagsTable.focus({ preventScroll: true });
}

// Fecha a visão de detalhe e devolve o foco ao controle que originou a navegação.

function closeTagDetail() {
  tagDetailView.hidden = true;
  tagsTableView.hidden = false;
  QB.clearClass(tagButtons);
  QB.restoreFocus(tagPreviousFocus);
}

QB.bindGridList(tagButtons, {
  columns: 4,
  onSelect: button => openTagDetail(button.dataset.tag, button)
});
backToTagsTable.addEventListener('click', closeTagDetail);
