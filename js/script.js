/*
 * Quadro Branco — script principal
 *
 * Este é o único arquivo JavaScript chamado diretamente pelo index.html.
 * Ele carrega, em ordem, os demais scripts da aplicação e só então
 * executa a inicialização geral.
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

  async function loadApplicationScripts() {
    for (const fileName of applicationScripts) {
      await loadScript(fileName);
    }
  }

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
