// js/main.js

import { configurarInterface } from './ui-utils.js';
import { adicionarPeca, obterPecas, setOnPecasChangeCallback } from './pecas-manager.js'; // Import setOnPecasChangeCallback
import { calcularMelhorCorte } from './corte-logic.js';
import { atualizarChapaAtual, exportarImagemAtual } from './display-utils.js'; // Corrected import
import { obterConfiguracoesChapa, atualizarParametrosChapa, setOnConfigChangeCallback } from './chapa-config.js'; // Import atualizaParametrosChapa and setOnConfigChangeCallback

let chapas = [];
let chapaAtualIndex = 0;

function renderizarChapaAtual() {
  const config = obterConfiguracoesChapa();
  if (chapas.length > 0 && chapaAtualIndex >= 0 && chapaAtualIndex < chapas.length) {
    atualizarChapaAtual(chapas[chapaAtualIndex], config);
  } else {
    // Clear canvas if no chapas or invalid index
    atualizarChapaAtual(null, config); // Pass null for chapa to clear
  }
}

function calcularECarregarCortes() {
  const config = obterConfiguracoesChapa();
  const pecas = obterPecas();
  if (pecas.length === 0) {
    chapas = [];
    chapaAtualIndex = 0;
    renderizarChapaAtual(); // Clear canvas and info
    return;
  }
  chapas = calcularMelhorCorte(config, pecas);
  chapaAtualIndex = 0;
  renderizarChapaAtual();
}

// Eventos
window.adicionarPeca = () => {
  adicionarPeca();
  calcularECarregarCortes(); // Recalculate whenever a piece is added
};

window.calcularCorte = () => {
  calcularECarregarCortes();
};

window.anteriorChapa = () => {
  if (chapaAtualIndex > 0) {
    chapaAtualIndex--;
    renderizarChapaAtual();
  }
};

window.proximaChapa = () => {
  if (chapaAtualIndex < chapas.length - 1) {
    chapaAtualIndex++;
    renderizarChapaAtual();
  }
};

window.exportarImagem = () => {
  exportarImagemAtual();
};

// Listen for changes in sheet configuration
document.getElementById('chapaLargura').addEventListener('change', () => {
    atualizarParametrosChapa();
    calcularECarregarCortes(); // Recalculate cuts when sheet config changes
});
document.getElementById('chapaAltura').addEventListener('change', () => {
    atualizarParametrosChapa();
    calcularECarregarCortes(); // Recalculate cuts when sheet config changes
});
document.getElementById('precoChapa').addEventListener('change', () => {
    atualizarParametrosChapa();
    // No need to recalculate cuts for price change, just update info
});
document.getElementById('tipoMadeira').addEventListener('change', () => {
    atualizarParametrosChapa();
    // No need to recalculate cuts for material type change, just update info
});
document.getElementById('espessuraPeca').addEventListener('change', () => {
    atualizarParametrosChapa();
    // No need to recalculate cuts for piece thickness change
});


// Set callbacks for other modules to trigger recalculation in main.js
setOnPecasChangeCallback(calcularECarregarCortes); // When pieces are removed
setOnConfigChangeCallback(calcularECarregarCortes); // When config changes via inputs

// Initialize the display
configurarInterface();
calcularECarregarCortes(); // Initial calculation and display
