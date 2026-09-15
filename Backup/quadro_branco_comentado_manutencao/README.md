# Quadro Branco — versão comentada para manutenção e escalabilidade

Esta versão preserva o comportamento da aplicação e acrescenta comentários de arquitetura, manutenção e lógica diretamente no HTML, CSS e JavaScript.

## Estrutura

```text
index.html
├── global.css
├── style.css
└── js/
    ├── script.js          # bootstrap: único JS chamado pelo HTML
    ├── elements.js        # referências DOM + estado compartilhado
    ├── html-tags.js       # HTML básico e catálogo de tags
    ├── css.js             # CSS, CSS Parte 2 e referências
    ├── javascript.js      # fundamentos e funções JavaScript
    ├── content.js         # atualidades, propriedades CSS e conteúdo auxiliar
    ├── events-async.js    # eventos + responsividade dinâmica
    ├── dom-compare.js     # DOM, comparação CSS×JS e switchBoard
    ├── navigation.js      # listeners/navegação + aula assíncrona
    ├── drawing.js         # quadro livre em canvas
    └── accessibility.js   # teclado, Escape e tutorial acessível
```

## Como a aplicação inicia

O `index.html` referencia somente `js/script.js`. O bootstrap lê `applicationScripts`, carrega os módulos um a um e só depois executa `initializeApplication()`. A ordem é importante porque os arquivos são scripts clássicos e compartilham nomes no escopo global.

## Regra prática para manutenção

- Mudança visual global → `global.css`.
- Mudança visual de uma aula → `style.css`.
- Novo elemento com `id` utilizado em JS → registre em `elements.js`.
- Conteúdo de uma aula → arquivo de domínio correspondente.
- Botões próximo/anterior e listeners globais → `navigation.js`.
- Comportamento responsivo por medição/escala → `events-async.js`.
- Inicialização/carga de módulos → `script.js`.

## Como adicionar uma nova aula

1. Crie um novo `<section class="board-screen" id="board-nova-aula" hidden>` em `index.html`.
2. Adicione o cartão no sumário com `data-board-target="board-nova-aula"`.
3. Crie referências DOM em `elements.js` se precisar acessar elementos internos por JS.
4. Coloque os dados e funções da aula em um arquivo próprio, por exemplo `nova-aula.js`.
5. Acrescente `nova-aula.js` à lista `applicationScripts` em `script.js`, respeitando dependências.
6. Registre navegação/listeners em `navigation.js`.
7. Adicione estilos específicos em `style.css`; só leve regras para `global.css` se forem realmente reutilizáveis.
8. Teste celular, tablet, notebook de pouca altura, monitor e TV.

## Pontos de atenção

### IDs são contratos
O JavaScript procura muitos elementos por `id`. Renomear um `id` apenas no HTML pode quebrar uma funcionalidade sem alterar a aparência inicial.

### Chaves `data-*` também são contratos
Valores como `data-html="headings"`, `data-css="fonts"` e `data-dom="querySelector"` precisam existir nos objetos de dados correspondentes.

### Responsividade
A aplicação combina CSS responsivo com medição dinâmica em JavaScript. Antes de aumentar `min-height`, `width` fixa ou usar `position:absolute` em novos componentes, teste se o conteúdo continua cabendo no quadro.

### Crescimento futuro
A arquitetura atual usa scripts clássicos carregados pelo bootstrap para permitir que o HTML tenha apenas uma tag `<script>`. Se o número de módulos crescer muito, vale migrar para ES Modules (`import`/`export`) com Vite, mantendo a mesma separação de responsabilidades.
