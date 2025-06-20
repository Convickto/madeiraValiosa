// js/pecas-manager.js

import { DOMElements, mostrarMensagemStatus } from './ui-utils.js';
import { LARGURA_CHAPA_ATUAL, ALTURA_CHAPA_ATUAL, ESPESSURA_PECA_ATUAL, TIPO_MADEIRA_ATUAL } from './chapa-config.js';
// Removed import for 'calcularCorte' from corte-logic.js
// Removed import for 'chapas' from display-utils.js

export let pecas = []; // Armazena as peças a serem cortadas

let onPecasChangeCallback = null;

export function setOnPecasChangeCallback(callback) {
    onPecasChangeCallback = callback;
}

export function obterPecas() {
    return pecas;
}

export function adicionarPeca() {
    const { larguraPecaInput, alturaPecaInput, quantidadePecaInput } = DOMElements;

    const largura = parseInt(larguraPecaInput.value);
    const altura = parseInt(alturaPecaInput.value);
    const quantidade = parseInt(quantidadePecaInput.value);

    if (isNaN(largura) || isNaN(altura) || isNaN(quantidade)) {
        mostrarMensagemStatus("Por favor, preencha todos os campos da peça com números válidos.", 5000);
        return;
    }

    if (largura <= 0 || altura <= 0 || quantidade <= 0) {
        mostrarMensagemStatus("Largura, altura e quantidade da peça devem ser valores positivos.", 5000);
        return;
    }

    if (largura > LARGURA_CHAPA_ATUAL || altura > ALTURA_CHAPA_ATUAL) {
        mostrarMensagemStatus(`Uma peça (${largura}x${altura}mm) não pode ser maior que a chapa atual (${LARGURA_CHAPA_ATUAL}x${ALTURA_CHAPA_ATUAL}mm) em nenhuma dimensão.`, 8000);
        return;
    }

    // Adiciona a peça com a espessura e tipo de madeira ATUAIS no momento da adição
    pecas.push({
        largura,
        altura,
        quantidade,
        espessura: ESPESSURA_PECA_ATUAL,
        tipo: TIPO_MADEIRA_ATUAL
    });
    atualizarLista();

    larguraPecaInput.value = '';
    alturaPecaInput.value = '';
    quantidadePecaInput.value = '';
    larguraPecaInput.focus();
    if (onPecasChangeCallback) {
        onPecasChangeCallback(); // Notify main.js about piece change
    }
}

export function atualizarLista() {
    DOMElements.listaPecasUl.innerHTML = "";
    pecas.forEach((p, index) => {
        const item = document.createElement("li");

        const spanText = document.createElement("span"); // Cria um span para o texto da peça
        spanText.textContent = `${p.quantidade}x ${p.largura}x${p.altura}x${p.espessura}mm (${p.tipo})`;
        item.appendChild(spanText);

        const deleteButton = document.createElement("button"); // Cria o botão de lixeira
        deleteButton.textContent = "🗑️";
        deleteButton.addEventListener('click', () => removerPeca(index)); // Adiciona o evento de clique via JS
        item.appendChild(deleteButton);

        DOMElements.listaPecasUl.appendChild(item);
    });
}

export function removerPeca(index) {
    pecas.splice(index, 1);
    atualizarLista();
    if (onPecasChangeCallback) { // Notify main.js about piece removal
        onPecasChangeCallback();
    }
}
