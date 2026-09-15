/*
===============================================================================
CORE.JS — FUNÇÕES REUTILIZÁVEIS DA INTERFACE
===============================================================================
Centraliza padrões que antes apareciam repetidos em vários arquivos:
- navegação por teclado em tabelas e grades;
- ativação por clique / Enter / Espaço;
- marcação de itens ativos;
- seleção de conceitos e conectores;
- restauração segura de foco.

REGRA DE MANUTENÇÃO
Se duas ou mais aulas começarem a repetir a mesma lógica de interação, a lógica
compartilhada deve vir para este arquivo. Os módulos de aula devem conter apenas
o que é específico de cada conteúdo.
===============================================================================
*/

const QB = (() => {
  const activationKeys = new Set(['Enter', ' ']);
  const arrowKeys = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

  function restoreFocus(element) {
    if (element && typeof element.focus === 'function') {
      element.focus({ preventScroll: true });
    }
  }

  function toggleActive(items, predicate, className = 'is-active') {
    items.forEach(item => item.classList.toggle(className, Boolean(predicate(item))));
  }

  function clearClass(items, className = 'is-active') {
    items.forEach(item => item.classList.remove(className));
  }

  function bindLinearList(items, { onSelect, onPreview = null } = {}) {
    items.forEach((item, index) => {
      const select = () => onSelect?.(item, index);
      const preview = () => onPreview?.(item, index);

      if (onPreview) {
        item.addEventListener('mouseenter', preview);
        item.addEventListener('focus', preview);
      }

      item.addEventListener('click', select);
      item.addEventListener('keydown', event => {
        if (activationKeys.has(event.key)) {
          event.preventDefault();
          select();
          return;
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          const delta = event.key === 'ArrowDown' ? 1 : -1;
          items[(index + delta + items.length) % items.length]?.focus();
        }
      });
    });
  }

  function bindGridList(items, { onSelect, columns = 1 } = {}) {
    items.forEach((item, index) => {
      item.addEventListener('click', () => onSelect?.(item, index));
      item.addEventListener('keydown', event => {
        if (!arrowKeys.has(event.key)) return;
        event.preventDefault();

        const columnCount = typeof columns === 'function' ? columns() : columns;
        const delta = event.key === 'ArrowRight' ? 1
          : event.key === 'ArrowLeft' ? -1
          : event.key === 'ArrowDown' ? columnCount
          : -columnCount;

        items[(index + delta + items.length) % items.length]?.focus();
      });
    });
  }

  function bindActivation(items, { getKey, onActivate } = {}) {
    items.forEach(item => {
      const activate = () => onActivate?.(getKey(item), item);
      item.addEventListener('click', activate);
      item.addEventListener('keydown', event => {
        if (!activationKeys.has(event.key)) return;
        event.preventDefault();
        activate();
      });
    });
  }

  function setContextSelection({ triggers = [], connectors = [], key, triggerKey, connectorKey }) {
    triggers.forEach(item => {
      const selected = triggerKey(item) === key;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
    connectors.forEach(item => item.classList.toggle('is-active', connectorKey(item) === key));
  }

  function clearContextSelection(triggers = [], connectors = []) {
    triggers.forEach(item => {
      item.classList.remove('is-selected');
      item.setAttribute('aria-pressed', 'false');
    });
    clearClass(connectors);
  }

  function bindRoutes(routes, switcher) {
    routes.forEach(({ control, from, to, title, announcement, after }) => {
      control?.addEventListener('click', () => {
        switcher(from, to, title, announcement);
        after?.();
      });
    });
  }

  return {
    restoreFocus,
    toggleActive,
    clearClass,
    bindLinearList,
    bindGridList,
    bindActivation,
    setContextSelection,
    clearContextSelection,
    bindRoutes
  };
})();
