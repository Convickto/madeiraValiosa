// js/corte-logic.js

/**
 * Estrutura de cada peça: { largura, altura, quantidade }
 * Estrutura de cada chapa: { pecas: [ {x, y, largura, altura, rotacionada} ], largura, altura }
 */

const ESPACAMENTO = 5; // espaçamento mínimo entre peças (mm)

export function calcularMelhorCorte(config, pecas) {
  const larguraChapa = config.largura;
  const alturaChapa = config.altura;
  const todasPecas = expandirPecas(pecas);

  // Ordenar por maior área
  todasPecas.sort((a, b) => (b.largura * b.altura) - (a.largura * a.altura));

  const chapas = [];

  let atual = novaChapa(larguraChapa, alturaChapa);
  chapas.push(atual);

  for (const peca of todasPecas) {
    let colocada = tentarColocarPecaEmChapas(peca, chapas, larguraChapa, alturaChapa);
    if (!colocada) {
      const nova = novaChapa(larguraChapa, alturaChapa);
      chapas.push(nova);
      colocarPeca(nova, peca);
    }
  }

  return chapas;
}

function expandirPecas(pecas) {
  const lista = [];
  for (const peca of pecas) {
    for (let i = 0; i < peca.quantidade; i++) {
      lista.push({ largura: peca.largura, altura: peca.altura });
    }
  }
  return lista;
}

function novaChapa(largura, altura) {
  return {
    largura,
    altura,
    pecas: [],
    espacosLivres: [{ x: 0, y: 0, largura, altura }]
  };
}

function tentarColocarPecaEmChapas(peca, chapas, larguraChapa, alturaChapa) {
  for (const chapa of chapas) {
    if (colocarPeca(chapa, peca)) {
      return true;
    }
  }
  return false;
}

function colocarPeca(chapa, pecaOriginal) {
  for (let i = 0; i < chapa.espacosLivres.length; i++) {
    const espaco = chapa.espacosLivres[i];
    for (const rotacionada of [false, true]) {
      const peca = rotacionada
        ? { largura: pecaOriginal.altura, altura: pecaOriginal.largura }
        : { ...pecaOriginal };

      if (
        peca.largura + ESPACAMENTO <= espaco.largura &&
        peca.altura + ESPACAMENTO <= espaco.altura
      ) {
        const posX = espaco.x;
        const posY = espaco.y;

        // Adiciona peça
        chapa.pecas.push({
          x: posX,
          y: posY,
          largura: peca.largura,
          altura: peca.altura,
          rotacionada
        });

        // Remove espaço atual e adiciona novos espaços livres
        chapa.espacosLivres.splice(i, 1);
        gerarNovosEspacos(chapa, espaco, peca, posX, posY);

        return true;
      }
    }
  }
  return false;
}

function gerarNovosEspacos(chapa, espaco, peca, x, y) {
  const sobraHorizontal = espaco.largura - peca.largura - ESPACAMENTO;
  const sobraVertical = espaco.altura - peca.altura - ESPACAMENTO;

  if (sobraHorizontal > 0) {
    chapa.espacosLivres.push({
      x: x + peca.largura + ESPACAMENTO,
      y: y,
      largura: sobraHorizontal,
      altura: peca.altura
    });
  }

  if (sobraVertical > 0) {
    chapa.espacosLivres.push({
      x: x,
      y: y + peca.altura + ESPACAMENTO,
      largura: peca.largura,
      altura: sobraVertical
    });
  }
}

