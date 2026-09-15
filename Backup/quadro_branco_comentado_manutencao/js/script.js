/*
===============================================================================
SCRIPT.JS — BOOTSTRAP / PONTO ÚNICO DE ENTRADA
===============================================================================
Este é o ÚNICO JavaScript referenciado diretamente por index.html.

FLUXO DE INICIALIZAÇÃO
1. Descobre a própria pasta usando document.currentScript.
2. Carrega applicationScripts em ordem, sem async concorrente.
3. Só depois chama initializeApplication().
4. Se algum módulo falhar, bootstrap() informa erro sem quebrar silenciosamente.

ESCALABILIDADE
Para adicionar um novo módulo clássico (.js), inclua seu nome em
applicationScripts na posição em que suas dependências já tenham sido carregadas.
Como os arquivos compartilham o escopo global clássico, a ORDEM é um contrato.
Se o projeto crescer muito, uma evolução natural é migrar para ES Modules
(import/export) e um bundler como Vite.
===============================================================================
*/

(() => {
  'use strict';

  const mainScript = document.currentScript;
  const jsBaseUrl = new URL('.', mainScript.src);

  const applicationScripts = [
    'elements.js',
    'html-tags.js',
    'css.js',
    'javascript.js',
    'content.js',
    'events-async.js',
    'dom-compare.js',
    'navigation.js',
    'drawing.js',
    'accessibility.js'
  ];

  /**

   * Carrega um arquivo JavaScript externo e resolve a Promise somente após o navegador concluir o carregamento.

   *

   * Manutenção: preserve a responsabilidade desta função; se ela começar a

   * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

   */

  function loadScript(fileName) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL(fileName, jsBaseUrl).href;
      script.async = false;
      script.dataset.quadroModule = fileName;

      script.addEventListener('load', () => resolve(fileName), { once: true });
      script.addEventListener('error', () => {
        reject(new Error(`Não foi possível carregar ${fileName}.`));
      }, { once: true });

      document.head.appendChild(script);
    });
  }

  /**

   * Percorre os módulos na ordem declarada. A ordem evita que um arquivo use variáveis/funções ainda não definidas.

   *

   * Manutenção: preserve a responsabilidade desta função; se ela começar a

   * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

   */

  async function loadApplicationScripts() {
    for (const fileName of applicationScripts) {
      await loadScript(fileName);
    }
  }

  /**

   * Define o estado visual inicial das aulas e dispara rotinas globais após todos os módulos estarem disponíveis.

   *

   * Manutenção: preserve a responsabilidade desta função; se ela começar a

   * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

   */

  function initializeApplication() {
    renderHtmlExample('headings');
    renderCss2Topic('mediaQueries');
    renderJsFundTopic('types');
    renderJsFuncTopic('declaration');
    paintScribbles(0, false);
    scheduleBoardCycle();
    renderDemo('onClick');
    renderAsyncExample('await');

    const initialEventRow = rows.find(row => row.dataset.event === 'onClick');
    if (initialEventRow) previewRow(initialEventRow);

    scheduleLessonFit(120);
    document.documentElement.dataset.appReady = 'true';
  }

  /**

   * Orquestra o carregamento e captura falhas de inicialização em um único ponto.

   *

   * Manutenção: preserve a responsabilidade desta função; se ela começar a

   * fazer tarefas de outro domínio, prefira extrair uma nova função/módulo.

   */

  async function bootstrap() {
    try {
      await loadApplicationScripts();
      initializeApplication();
    } catch (error) {
      console.error('[Quadro Branco] Falha ao iniciar a aplicação:', error);
      document.documentElement.dataset.appReady = 'error';

      const announcer = document.getElementById('board-announcer');
      if (announcer) {
        announcer.textContent = 'Não foi possível carregar todos os recursos da aplicação.';
      }
    }
  }

  bootstrap();
})();
