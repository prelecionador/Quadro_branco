# Quadro Branco — JavaScript refatorado com reuso

Esta versão preserva a estrutura visual e funcional do projeto, mas reduz duplicação no JavaScript.

## O que mudou

- `js/script.js` continua sendo o único script carregado diretamente pelo HTML.
- Foi criado `js/core.js`, com comportamentos reutilizáveis para:
  - navegação por teclado em tabelas/listas;
  - navegação em grades;
  - ativação por clique / Enter / Espaço;
  - seleção e limpeza de itens ativos;
  - seleção de conceitos/conectores;
  - restauração de foco;
  - registro declarativo das rotas entre quadros.
- Os módulos de conteúdo passaram a chamar essas funções em vez de repetir listeners e regras de teclado.
- A navegação entre aulas passou a ser descrita em um único mapa de rotas.
- Comentários repetitivos de manutenção foram condensados; os comentários arquiteturais e de responsabilidade foram mantidos.

## Resultado da redução

Comparação com a versão comentada anterior:

- JavaScript total: **4118 → 3382 linhas** (aprox. **18% menor**).
- Listeners `keydown` declarados diretamente: **21 → 8**.
- Vários blocos repetidos de ArrowUp/ArrowDown, Enter/Espaço, seleção `is-active` e restauração de foco foram centralizados.

A maior parte das linhas restantes corresponde a conteúdo didático, exemplos e demos específicos das aulas, portanto não é redundância segura de remover.

## Estrutura

```text
index.html
├── global.css
├── style.css
└── js/
    ├── script.js          # bootstrap; único script chamado pelo HTML
    ├── elements.js        # referências do DOM e estado compartilhado
    ├── core.js            # reuso de interação/navegação
    ├── html-tags.js
    ├── css.js
    ├── javascript.js
    ├── content.js
    ├── events-async.js
    ├── dom-compare.js
    ├── navigation.js
    ├── drawing.js
    └── accessibility.js
```

## Regra para crescer o projeto

Antes de criar uma nova função em uma aula, verifique se o comportamento já existe em `core.js`. Se duas aulas repetirem a mesma lógica, mova a regra para `core.js` e deixe nos módulos apenas os dados e particularidades da aula.

## Validações feitas

- Todos os arquivos `.js` passaram em `node --check`.
- O HTML contém 257 IDs e nenhum ID duplicado.
- Todas as 203 referências `getElementById()` de `elements.js` existem no HTML.
- Todos os módulos declarados no loader de `script.js` existem no diretório `js/`.
- O HTML continua carregando apenas `js/script.js` diretamente.
