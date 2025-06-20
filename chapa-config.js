// js/chapa-config.js

import { DOMElements, mostrarMensagemStatus } from './ui-utils.js';
// import { chapas } from './display-utils.js'; // REMOVE THIS IMPORT - chapas is managed by main.js
// import { desenharChapa } from './display-utils.js'; // REMOVE THIS IMPORT - use a clear canvas function or main's update

// Add a parameter to allow main.js to pass a function for recalculation/clearing
let onConfigChangeCallback = null;

export function setOnConfigChangeCallback(callback) {
    onConfigChangeCallback = callback;
}

// Variáveis globais para os parâmetros da chapa e peças
export let LARGURA_CHAPA_ATUAL = 2750;
export let ALTURA_CHAPA_ATUAL = 1850;
export let PRECO_CHAPA_ATUAL = 100.00;
export let TIPO_MADEIRA_ATUAL = "MDF";
export let ESPESSURA_PECA_ATUAL = 15;

// Função para atualizar os parâmetros da chapa e das peças, e limpar resultados
export function atualizarParametrosChapa() {
    const { chapaLarguraInput, chapaAlturaInput, precoChapaInput, tipoMadeiraSelect, espessuraPecaInput } = DOMElements;

    const novaLargura = parseInt(chapaLarguraInput.value);
    const novaAltura = parseInt(chapaAlturaInput.value);
    const novoPreco = parseFloat(precoChapaInput.value);
    const novoTipoMadeira = tipoMadeiraSelect.value;
    const novaEspessuraPeca = parseInt(espessuraPecaInput.value);

    // Validações e atualização das variáveis globais
    if (isNaN(novaLargura) || novaLargura <= 0) {
        mostrarMensagemStatus("Largura da chapa deve ser um número positivo.", 5000);
        chapaLarguraInput.value = LARGURA_CHAPA_ATUAL;
        return;
    }
    LARGURA_CHAPA_ATUAL = novaLargura;

    if (isNaN(novaAltura) || novaAltura <= 0) {
        mostrarMensagemStatus("Altura da chapa deve ser um número positivo.", 5000);
        chapaAlturaInput.value = ALTURA_CHAPA_ATUAL;
        return;
    }
    ALTURA_CHAPA_ATUAL = novaAltura;

    if (isNaN(novoPreco) || novoPreco < 0) {
        mostrarMensagemStatus("Preço da chapa deve ser um número positivo ou zero.", 5000);
        precoChapaInput.value = PRECO_CHAPA_ATUAL;
        return;
    }
    PRECO_CHAPA_ATUAL = novoPreco;

    if (isNaN(novaEspessuraPeca) || novaEspessuraPeca <= 0) {
        mostrarMensagemStatus("Espessura padrão das peças deve ser um número positivo.", 5000);
        espessuraPecaInput.value = ESPESSURA_PECA_ATUAL;
        return;
    }
    ESPESSURA_PECA_ATUAL = novaEspessuraPeca;

    TIPO_MADEIRA_ATUAL = novoTipoMadeira;

    // Atualiza a exibição na tela
    DOMElements.displayLarguraChapaSpan.textContent = LARGURA_CHAPA_ATUAL;
    DOMElements.displayAlturaChapaSpan.textContent = ALTURA_CHAPA_ATUAL;

    // Notify main.js to clear and recalculate
    if (onConfigChangeCallback) {
        onConfigChangeCallback();
    }
}
