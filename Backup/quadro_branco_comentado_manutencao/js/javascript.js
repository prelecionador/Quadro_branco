/*
===============================================================================
JAVASCRIPT.JS — FUNDAMENTOS E FUNÇÕES DA LINGUAGEM
===============================================================================
Mantém conteúdo didático separado da navegação global. Cada tópico possui texto,
código e um identificador de demonstração usado pelas funções render*Demo.
===============================================================================
*/

/* DADOS DA AULA 7: fundamentos JavaScript. */
const jsFundTopics = {
  types: {
    title: 'Tipos de dados',
    short: 'JavaScript associa um tipo ao valor armazenado. Entre os primitivos estão string, number, boolean, undefined, bigint, symbol e null; objetos, arrays e funções pertencem ao universo de object, com particularidades do operador typeof.',
    explanation: 'O tipo define quais operações fazem sentido para um valor. JavaScript é dinamicamente tipado: a variável não fica presa a um tipo para sempre. typeof ajuda a inspecionar valores, mas há detalhes importantes: typeof null retorna "object" por uma herança histórica da linguagem e arrays também são objetos.',
    code: `const nome = 'Ana';       // string\nconst idade = 21;          // number\nconst ativo = true;        // boolean\nconst vazio = null;        // null\nlet indefinido;            // undefined\nconst aluno = { nome };    // object\n\nconsole.log(typeof nome);  // "string"\nconsole.log(typeof idade); // "number"`,
    demo: 'types'
  },
  let: {
    title: 'let',
    short: 'let cria uma variável com escopo de bloco e permite reatribuição. É adequada quando o valor realmente precisa mudar ao longo do programa.',
    explanation: 'Uma variável declarada com let existe dentro do bloco { ... } em que foi criada. Ela pode receber um novo valor, mas não pode ser declarada novamente no mesmo escopo. Antes da linha de declaração, ela está na chamada temporal dead zone.',
    code: `let pontos = 10;\npontos = pontos + 5;\n\nif (pontos > 10) {\n  let mensagem = 'subiu';\n  console.log(mensagem);\n}\n\nconsole.log(pontos); // 15`,
    demo: 'let'
  },
  const: {
    title: 'const',
    short: 'const cria uma ligação de escopo de bloco que precisa ser inicializada e não pode apontar para outro valor depois.',
    explanation: 'Use const como padrão quando não houver necessidade de reatribuição. Em objetos e arrays, const protege a referência, não torna o conteúdo imutável: propriedades e itens ainda podem ser modificados.',
    code: `const curso = 'Desenvolvimento Web';\n// curso = 'Outro'; // TypeError\n\nconst aluno = { nome: 'Lia' };\naluno.nome = 'Lia Silva'; // permitido\n\nconsole.log(aluno.nome);`,
    demo: 'const'
  },
  var: {
    title: 'var',
    short: 'var é a forma mais antiga de declarar variáveis. Possui escopo de função, permite redeclaração e sofre hoisting com valor inicial undefined.',
    explanation: 'Código moderno normalmente prefere let e const porque o escopo de bloco é mais previsível. var ainda aparece em sistemas legados e é importante entendê-la para ler código antigo e compreender diferenças de escopo.',
    code: `function exemplo() {\n  if (true) {\n    var linguagem = 'JavaScript';\n  }\n\n  console.log(linguagem); // funciona\n}\n\nexemplo();`,
    demo: 'var'
  },
  ifElse: {
    title: 'if / else',
    short: 'if testa uma condição. Se ela for verdadeira, executa um bloco; else define o caminho alternativo. else if permite encadear novas condições.',
    explanation: 'A condição é convertida para verdadeiro ou falso. Prefira comparações explícitas e operadores estritos como === e !== quando estiver comparando valores, reduzindo coerções inesperadas.',
    code: `const idade = 18;\n\nif (idade >= 18) {\n  console.log('maior de idade');\n} else {\n  console.log('menor de idade');\n}`,
    demo: 'ifElse'
  },
  for: {
    title: 'for',
    short: 'for repete um bloco quando você consegue expressar inicialização, condição de continuidade e atualização de forma compacta.',
    explanation: 'É comum em contagens e percursos indexados. O fluxo é: inicializa uma vez, testa a condição, executa o corpo, atualiza e volta a testar. Para arrays, também existem for...of e métodos como forEach.',
    code: `for (let i = 1; i <= 5; i++) {\n  console.log('volta', i);\n}`,
    demo: 'for'
  },
  while: {
    title: 'while',
    short: 'while continua executando enquanto a condição for verdadeira. É útil quando não se sabe antecipadamente quantas repetições serão necessárias.',
    explanation: 'A condição é verificada antes de cada repetição. Alguma instrução dentro do laço precisa aproximar o programa do fim da condição; caso contrário, você pode criar um loop infinito.',
    code: `let contador = 3;\n\nwhile (contador > 0) {\n  console.log(contador);\n  contador--;\n}\n\nconsole.log('fim');`,
    demo: 'while'
  }
};

/**

 * Cria a demonstração interativa correspondente ao fundamento JavaScript selecionado.

 *

 * Manutenção: preserve a responsabilidade desta função; se ela começar a

 * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

 */

function renderJsFundDemo(type) {
  jsFundDemo.replaceChildren();

  if (type === 'types') {
    const list = document.createElement('div');
    list.className = 'jsfund-type-list';
    ['string', 'number', 'boolean', 'undefined', 'null', 'bigint', 'symbol', 'object'].forEach(name => {
      const chip = document.createElement('span');
      chip.textContent = name;
      list.appendChild(chip);
    });
    const out = document.createElement('output');
    out.textContent = `typeof "Web" → ${typeof 'Web'} • typeof 42 → ${typeof 42} • typeof true → ${typeof true}`;
    jsFundDemo.append(list, out);
    return;
  }

  if (type === 'let') {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'somar +5 usando let';
    const out = document.createElement('output');
    let value = 10;
    out.textContent = `pontos = ${value}`;
    button.addEventListener('click', () => { value += 5; out.textContent = `pontos = ${value}`; });
    jsFundDemo.append(button, out); return;
  }

  if (type === 'const') {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'alterar propriedade do objeto';
    const out = document.createElement('output');
    const aluno = { nome: 'Lia' };
    out.textContent = `const aluno → ${aluno.nome}`;
    button.addEventListener('click', () => { aluno.nome = aluno.nome === 'Lia' ? 'Lia Silva' : 'Lia'; out.textContent = `referência igual; nome = ${aluno.nome}`; });
    jsFundDemo.append(button, out); return;
  }

  if (type === 'var') {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'mostrar escopo de função';
    const out = document.createElement('output');
    button.addEventListener('click', () => {
      function exemploVar() { if (true) { var linguagem = 'JavaScript'; } return linguagem; }
      out.textContent = `fora do if, dentro da função → ${exemploVar()}`;
    });
    jsFundDemo.append(button, out); return;
  }

  if (type === 'ifElse') {
    const label = document.createElement('label');
    label.textContent = 'Idade: ';
    const input = document.createElement('input');
    input.type = 'number'; input.min = '0'; input.value = '18'; input.inputMode = 'numeric'; input.style.width = '90px';
    label.appendChild(input);
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'testar condição';
    const out = document.createElement('output');
    const check = () => { const age = Number(input.value); out.textContent = Number.isFinite(age) && age >= 18 ? 'if → maior de idade' : 'else → menor de idade'; };
    button.addEventListener('click', check);
    input.addEventListener('input', check);
    check();
    jsFundDemo.append(label, button, out); return;
  }

  if (type === 'for') {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'executar for';
    const out = document.createElement('output');
    button.addEventListener('click', () => { const values = []; for (let i = 1; i <= 5; i += 1) values.push(`volta ${i}`); out.textContent = values.join(' → '); });
    jsFundDemo.append(button, out); return;
  }

  if (type === 'while') {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'executar while';
    const out = document.createElement('output');
    button.addEventListener('click', () => { let n = 3; const values = []; while (n > 0) { values.push(n); n -= 1; } values.push('fim'); out.textContent = values.join(' → '); });
    jsFundDemo.append(button, out); return;
  }
}

/**

 * Atualiza textos, código, seleção e demonstração da Aula 7.

 *

 * Manutenção: preserve a responsabilidade desta função; se ela começar a

 * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

 */

function renderJsFundTopic(key) {
  const data = jsFundTopics[key];
  if (!data) return;
  jsFundRows.forEach(row => row.classList.toggle('is-active', row.dataset.jsfund === key));
  jsFundDetail.innerHTML = `<strong>${data.title}:</strong> ${data.short}`;
  jsFundExplanationTitle.textContent = data.title;
  jsFundExplanation.textContent = data.explanation;
  jsFundCode.textContent = data.code;
  renderJsFundDemo(data.demo);
}

/* DADOS DA AULA 8: tipos de funções e exemplos. */
const jsFuncTopics = {
  declaration: {
    title: 'Declaração de função',
    short: 'A palavra-chave function cria uma função nomeada que pode ser chamada quantas vezes forem necessárias.',
    explanation: 'Uma declaração de função reúne instruções sob um nome. O nome passa a representar aquele comportamento e pode ser invocado com parênteses. Declarações de função são içadas (hoisting), então normalmente podem ser chamadas antes da linha em que aparecem no código.',
    code: `function saudacao(nome) {
  return 'Olá, ' + nome + '!';
}

const mensagem = saudacao('Maria');
console.log(mensagem);`,
    demo: 'declaration'
  },
  params: {
    title: 'Parâmetros e argumentos',
    short: 'Parâmetros são os nomes definidos pela função; argumentos são os valores enviados quando ela é chamada.',
    explanation: 'Parâmetros funcionam como variáveis locais de entrada. A mesma função pode produzir resultados diferentes porque recebe argumentos diferentes. Também é possível definir valores padrão, por exemplo function somar(a = 0, b = 0).',
    code: `function somar(a, b) {
  return a + b;
}

somar(2, 3);   // 5
somar(10, 4);  // 14`,
    demo: 'params'
  },
  return: {
    title: 'return',
    short: 'return envia um valor de volta para quem chamou a função e encerra a execução daquele bloco.',
    explanation: 'Sem return explícito, uma função devolve undefined. O valor retornado pode ser armazenado em uma variável, usado em outra expressão ou passado para outra função. Linhas colocadas depois de um return executado não são alcançadas.',
    code: `function dobro(numero) {
  return numero * 2;
}

const resultado = dobro(6);
console.log(resultado); // 12`,
    demo: 'return'
  },
  anonymous: {
    title: 'Função anônima',
    short: 'É uma função escrita sem nome próprio, muito usada diretamente em callbacks, eventos e métodos de arrays.',
    explanation: 'Funções anônimas são úteis quando o comportamento só precisa existir naquele ponto. Elas aparecem com frequência em map, filter, setTimeout e addEventListener. Mesmo sem nome textual, continuam sendo valores que podem ser executados.',
    code: `const numeros = [1, 2, 3];

const dobrados = numeros.map(function (numero) {
  return numero * 2;
});

console.log(dobrados); // [2, 4, 6]`,
    demo: 'anonymous'
  },
  expression: {
    title: 'Expressão de função',
    short: 'Uma função pode ser criada como valor e armazenada em uma variável, constante, propriedade ou estrutura de dados.',
    explanation: 'Na expressão de função, a variável recebe a função. Diferentemente de uma declaração de função tradicional, a variável precisa ter sido inicializada antes de ser usada. const é comum quando a referência para a função não será trocada.',
    code: `const multiplicar = function (a, b) {
  return a * b;
};

console.log(multiplicar(4, 5)); // 20`,
    demo: 'expression'
  },
  arrow: {
    title: 'Arrow function',
    short: 'Arrow functions usam => e permitem uma escrita compacta. Quando há uma única expressão, o retorno pode ser implícito.',
    explanation: 'A sintaxe de seta é muito comum em código moderno, especialmente em callbacks. Ela não cria seu próprio this, arguments ou super; por isso, não é simplesmente uma substituição universal para function. Para funções curtas e funcionais, costuma ser bastante conveniente.',
    code: `const quadrado = numero => numero * numero;

const somar = (a, b) => {
  return a + b;
};

console.log(quadrado(5)); // 25`,
    demo: 'arrow'
  },
  callback: {
    title: 'Callback',
    short: 'Callback é uma função entregue a outra função para ser chamada em determinado momento ou condição.',
    explanation: 'Como funções são valores em JavaScript, elas podem ser passadas como argumentos. Esse princípio aparece em eventos, temporizadores, operações assíncronas e métodos de arrays. A função que recebe o callback decide quando executá-lo.',
    code: `function processar(valor, callback) {
  const resultado = valor * 2;
  callback(resultado);
}

processar(5, function (resultado) {
  console.log(resultado);
});`,
    demo: 'callback'
  },
  scope: {
    title: 'Escopo da função',
    short: 'Variáveis declaradas dentro de uma função pertencem ao seu contexto e não ficam automaticamente disponíveis fora dele.',
    explanation: 'O escopo evita que detalhes internos de uma função poluam o restante do programa. Uma função também consegue acessar variáveis de escopos externos, formando closures quando mantém referência a esses valores mesmo depois do contexto externo ter terminado.',
    code: `const curso = 'Web';

function mostrarAula() {
  const aula = 8;
  return curso + ' • aula ' + aula;
}

console.log(mostrarAula());
// console.log(aula); // ReferenceError`,
    demo: 'scope'
  }
};

/**

 * Cria uma pequena demonstração executável para o tópico de funções selecionado.

 *

 * Manutenção: preserve a responsabilidade desta função; se ela começar a

 * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

 */

function renderJsFuncDemo(type) {
  jsFuncDemo.replaceChildren();

  const makeOutput = (text = '') => {
    const out = document.createElement('output');
    out.textContent = text;
    return out;
  };

  if (type === 'declaration') {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'chamar saudacao("Maria")';
    const out = makeOutput('aguardando a chamada');
    button.addEventListener('click', () => {
      function saudacao(nome) { return `Olá, ${nome}!`; }
      out.textContent = saudacao('Maria');
    });
    jsFuncDemo.append(button, out); return;
  }

  if (type === 'params') {
    const a = document.createElement('input');
    const b = document.createElement('input');
    a.type = b.type = 'number'; a.value = '2'; b.value = '3';
    a.setAttribute('aria-label', 'Primeiro argumento'); b.setAttribute('aria-label', 'Segundo argumento');
    a.style.width = b.style.width = '82px';
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'somar argumentos';
    const out = makeOutput();
    const run = () => { function somar(x, y) { return x + y; } out.textContent = `resultado → ${somar(Number(a.value), Number(b.value))}`; };
    button.addEventListener('click', run); a.addEventListener('input', run); b.addEventListener('input', run); run();
    jsFuncDemo.append(a, b, button, out); return;
  }

  if (type === 'return') {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'executar dobro(6)';
    const out = makeOutput('return ainda não executado');
    button.addEventListener('click', () => { function dobro(n) { return n * 2; } out.textContent = `valor retornado → ${dobro(6)}`; });
    jsFuncDemo.append(button, out); return;
  }

  if (type === 'anonymous') {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'mapear [1, 2, 3]';
    const out = makeOutput('função anônima pronta');
    button.addEventListener('click', () => { const result = [1, 2, 3].map(function (n) { return n * 2; }); out.textContent = `[${result.join(', ')}]`; });
    jsFuncDemo.append(button, out); return;
  }

  if (type === 'expression') {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'multiplicar 4 × 5';
    const out = makeOutput();
    button.addEventListener('click', () => { const multiplicar = function (a, b) { return a * b; }; out.textContent = `multiplicar(4, 5) → ${multiplicar(4, 5)}`; });
    jsFuncDemo.append(button, out); return;
  }

  if (type === 'arrow') {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'calcular quadrado de 5';
    const out = makeOutput('numero => numero * numero');
    button.addEventListener('click', () => { const quadrado = numero => numero * numero; out.textContent = `quadrado(5) → ${quadrado(5)}`; });
    jsFuncDemo.append(button, out); return;
  }

  if (type === 'callback') {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'executar callback';
    const out = makeOutput('callback aguardando');
    button.addEventListener('click', () => {
      function processar(valor, callback) { callback(valor * 2); }
      processar(5, resultado => { out.textContent = `callback recebeu → ${resultado}`; });
    });
    jsFuncDemo.append(button, out); return;
  }

  if (type === 'scope') {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'ver escopo local';
    const out = makeOutput('aula existe apenas dentro da função');
    button.addEventListener('click', () => {
      const curso = 'Web';
      function mostrarAula() { const aula = 8; return `${curso} • aula ${aula}`; }
      out.textContent = `${mostrarAula()} • fora da função, “aula” não está disponível`;
    });
    jsFuncDemo.append(button, out);
  }
}

/**

 * Atualiza a Aula 8 com o tópico de função selecionado.

 *

 * Manutenção: preserve a responsabilidade desta função; se ela começar a

 * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

 */

function renderJsFuncTopic(key) {
  const data = jsFuncTopics[key];
  if (!data) return;
  jsFuncRows.forEach(row => row.classList.toggle('is-active', row.dataset.jsfunc === key));
  jsFuncDetail.innerHTML = `<strong>${data.title}:</strong> ${data.short}`;
  jsFuncExplanationTitle.textContent = data.title;
  jsFuncExplanation.textContent = data.explanation;
  jsFuncCode.textContent = data.code;
  renderJsFuncDemo(data.demo);
}
