/*
===============================================================================
DRAWING.JS — QUADRO BRANCO LIVRE (CANVAS)
===============================================================================
Isola toda a lógica de desenho: tamanho do canvas, cor, coordenadas de ponteiro,
abertura/fechamento e eventos de mouse/toque via Pointer Events.
===============================================================================
*/

const drawContext = drawCanvas.getContext('2d');
let drawing = false;
let drawColor = '#111827';
let lastDrawPoint = null;
let drawPreviousFocus = null;

// Sincroniza resolução interna do canvas com seu tamanho visual e devicePixelRatio.

function resizeFreeBoard() {
  if (drawOverlay.hidden) return;
  const rect = drawCanvasWrap.getBoundingClientRect();
  const ratio = Math.max(1, window.devicePixelRatio || 1);
  drawCanvas.width = Math.max(1, Math.round(rect.width * ratio));
  drawCanvas.height = Math.max(1, Math.round(rect.height * ratio));
  drawContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  drawContext.lineCap = 'round';
  drawContext.lineJoin = 'round';
  drawContext.lineWidth = 4.2;
  drawContext.strokeStyle = drawColor;
}

// Limpa todo o bitmap do canvas sem alterar configurações de desenho.

function clearFreeBoard() {
  drawContext.save();
  drawContext.setTransform(1, 0, 0, 1, 0, 0);
  drawContext.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  drawContext.restore();
}

// Atualiza a cor do marcador e o estado visual/ARIA dos botões de cor.

function setMarkerColor(color, source) {
  drawColor = color;
  drawContext.strokeStyle = drawColor;
  markerChoices.forEach(button => {
    const selected = button === source;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', selected ? 'true' : 'false');
  });
}

// Converte coordenadas do ponteiro para coordenadas locais do canvas.

function canvasPoint(event) {
  const rect = drawCanvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

// Inicia um novo traço a partir da posição atual do ponteiro.

function beginDrawing(event) {
  if (event.button !== undefined && event.button !== 0) return;
  drawing = true;
  lastDrawPoint = canvasPoint(event);
  drawCanvas.setPointerCapture?.(event.pointerId);
  drawContext.beginPath();
  drawContext.arc(lastDrawPoint.x, lastDrawPoint.y, drawContext.lineWidth / 2.2, 0, Math.PI * 2);
  drawContext.fillStyle = drawColor;
  drawContext.fill();
  event.preventDefault();
}

// Desenha o segmento entre o último ponto e o ponto atual enquanto o ponteiro está pressionado.

function continueDrawing(event) {
  if (!drawing || !lastDrawPoint) return;
  const point = canvasPoint(event);
  drawContext.beginPath();
  drawContext.moveTo(lastDrawPoint.x, lastDrawPoint.y);
  drawContext.lineTo(point.x, point.y);
  drawContext.strokeStyle = drawColor;
  drawContext.stroke();
  lastDrawPoint = point;
  event.preventDefault();
}

// Finaliza o traço atual e limpa o estado temporário de desenho.

function endDrawing(event) {
  if (!drawing) return;
  drawing = false;
  lastDrawPoint = null;
  if (event?.pointerId !== undefined && drawCanvas.hasPointerCapture?.(event.pointerId)) {
    drawCanvas.releasePointerCapture(event.pointerId);
  }
}

// Exibe o quadro livre, prepara o canvas e move o foco para o diálogo.

function openFreeBoard() {
  drawPreviousFocus = document.activeElement;
  setA11yTutorial(false);
  drawOverlay.hidden = false;
  drawToggle.setAttribute('aria-expanded', 'true');
  drawToggle.setAttribute('aria-label', 'Quadro branco aberto');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    resizeFreeBoard();
    clearFreeBoard();
    setMarkerColor('#111827', markerChoices[0]);
    drawTitle.focus({ preventScroll: true });
  });
}

// Fecha o quadro livre e devolve foco ao elemento que o abriu.

function closeFreeBoard() {
  endDrawing();
  clearFreeBoard();
  drawOverlay.hidden = true;
  drawToggle.setAttribute('aria-expanded', 'false');
  drawToggle.setAttribute('aria-label', 'Abrir quadro branco para desenhar');
  document.body.style.overflow = '';
  setMarkerColor('#111827', markerChoices[0]);
  const focusTarget = drawPreviousFocus && typeof drawPreviousFocus.focus === 'function' ? drawPreviousFocus : drawToggle;
  focusTarget.focus({ preventScroll: true });
}

drawToggle.addEventListener('click', openFreeBoard);
drawClose.addEventListener('click', closeFreeBoard);
drawClear.addEventListener('click', () => {
  clearFreeBoard();
  drawClear.textContent = 'apagado ✓';
  window.setTimeout(() => { drawClear.textContent = 'apagar tudo'; }, 700);
});
markerChoices.forEach(button => {
  button.addEventListener('click', () => setMarkerColor(button.dataset.drawColor, button));
});
drawCanvas.addEventListener('pointerdown', beginDrawing);
drawCanvas.addEventListener('pointermove', continueDrawing);
drawCanvas.addEventListener('pointerup', endDrawing);
drawCanvas.addEventListener('pointercancel', endDrawing);
drawCanvas.addEventListener('pointerleave', event => {
  if (!drawCanvas.hasPointerCapture?.(event.pointerId)) endDrawing(event);
});
window.addEventListener('resize', () => {
  if (!drawOverlay.hidden) resizeFreeBoard();
  scheduleLessonFit(70);
});

/* Muitos quadros mudam de altura ao clicar em uma linha, abrir uma
   explicação, pesquisar uma referência ou executar uma demonstração.
   Recalcula a escala depois dessas interações. */
document.addEventListener('click', () => scheduleLessonFit(70), true);
document.addEventListener('input', () => scheduleLessonFit(70), true);
document.addEventListener('change', () => scheduleLessonFit(70), true);

drawOverlay.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const focusables = [...drawOverlay.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter(el => !el.hidden && el.offsetParent !== null);
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault(); last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault(); first.focus();
  }
});
