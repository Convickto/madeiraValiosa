// js/display-utils.js

let canvas = null;
let ctx = null;

// No longer importing 'chapas' here as it's managed by main.js
// export function atualizarChapaAtual(chapa, config) { // Original signature
export function atualizarChapaAtual(chapa, config) {
  if (!canvas) canvas = document.getElementById("canvas");
  if (!ctx) ctx = canvas.getContext("2d");

  // Ensure config and chapa are valid before proceeding
  if (!config || !chapa) {
      // Clear canvas if no valid chapa/config is provided
      canvas.width = DOMElements.canvas.offsetWidth; // Use current canvas size
      canvas.height = DOMElements.canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#deb887"; // Default MDF color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      document.getElementById("displayLarguraChapa").textContent = config ? config.largura : 'N/A';
      document.getElementById("displayAlturaChapa").textContent = config ? config.altura : 'N/A';
      return;
  }

  const escala = calcularEscala(config.largura, config.altura);

  canvas.width = config.largura * escala;
  canvas.height = config.altura * escala;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#deb887";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const peca of chapa.pecas) {
    desenharPeca(peca, escala);
  }

  document.getElementById("displayLarguraChapa").textContent = config.largura;
  document.getElementById("displayAlturaChapa").textContent = config.altura;
}

function desenharPeca(peca, escala) {
  const x = peca.x * escala;
  const y = peca.y * escala;
  const largura = peca.largura * escala;
  const altura = peca.altura * escala;

  ctx.fillStyle = "rgba(0,255,225,0.3)";
  ctx.strokeStyle = "#00ffe1";
  ctx.lineWidth = 2;

  ctx.fillRect(x, y, largura, altura);
  ctx.strokeRect(x, y, largura, altura);

  // Medidas da peça
  ctx.fillStyle = "#000";
  ctx.font = "12px sans-serif";
  ctx.fillText(
    `${peca.largura}x${peca.altura}${peca.rotacionada ? " (R)" : ""}`,
    x + 4,
    y + 16
  );
}

function calcularEscala(largura, altura) {
  const maxCanvasLargura = 800;
  const maxCanvasAltura = 600;
  return Math.min(maxCanvasLargura / largura, maxCanvasAltura / altura);
}

export function exportarImagemAtual() {
  const link = document.createElement("a");
  link.download = "chapa.png";
  link.href = canvas.toDataURL();
  link.click();
}
