class IntervaloConfianca {
  static desvio_padrao(amostra = [], media = 0) {
    let soma = 0;

    amostra.forEach((i) => {
      soma += Math.pow(i - media, 2);
    });

    return Math.sqrt(soma / amostra.length);
  }

  static media(amostra = []) {
    return amostra.reduce((a, b) => a + b, 0) / amostra.length;
  }

  static diferenca(amostra_a = [], amostra_b = []) {
    return amostra_a.map((a, i) => a - amostra_b[i]);
  }

  static calcular_confianca(
    media,
    valor_tabela,
    desvio_padrao,
    tamanho_amostra
  ) {
    const x = (valor_tabela * desvio_padrao) / Math.sqrt(tamanho_amostra);
    return [media - x, media + x];
  }
}

export { IntervaloConfianca };
