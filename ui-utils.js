 
// js/ui-utils.js

// Armazena referências aos elementos DOM para evitar múltiplas seleções
export const DOMElements = {
    mensagemStatus: document.getElementById('mensagemStatus'),
    chapaLarguraInput: document.getElementById('chapaLargura'),
    chapaAlturaInput: document.getElementById('chapaAltura'),
    precoChapaInput: document.getElementById('precoChapa'),
    tipoMadeiraSelect: document.getElementById('tipoMadeira'),
    espessuraPecaInput: document.getElementById('espessuraPeca'),
    larguraPecaInput: document.getElementById('largura'),
    alturaPecaInput: document.getElementById('altura'),
    quantidadePecaInput: document.getElementById('quantidade'),
    listaPecasUl: document.getElementById('listaPecas'),
    resultadoDiv: document.getElementById('resultado'),
    canvas: document.getElementById('canvas'),
    displayLarguraChapaSpan: document.getElementById('displayLarguraChapa'),
    displayAlturaChapaSpan: document.getElementById('displayAlturaChapa'),
};

export function mostrarMensagemStatus(mensagem, duracao = 3000) {
    DOMElements.mensagemStatus.textContent = mensagem;
    DOMElements.mensagemStatus.style.display = 'block';
    if (duracao > 0) {
        setTimeout(() => DOMElements.mensagemStatus.style.display = 'none', duracao);
    }
}
