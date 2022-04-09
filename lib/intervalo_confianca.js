class IntervaloConfianca {
  /**
   * Calcular desvio padrão da amostra
   *
   * @param {Array<number>} amostra
   * @param {number} media
   * @returns {number}
   */
  static desvio_padrao(amostra = [], media = 0) {
    let soma = 0;

    amostra.forEach((i) => {
      soma += Math.pow(i - media, 2);
    });

    return Math.sqrt(soma / amostra.length);
  }

  /**
   * Calcular média da amostra
   * @param {Array<number>} amostra
   * @returns {number}
   */
  static media(amostra = []) {
    return amostra.reduce((a, b) => a + b, 0) / amostra.length;
  }

  /**
   * Obter array com a diferença entre duas amostras
   *
   * @param {Array<number>} amostra_a
   * @param {Array<number>} amostra_b
   * @returns {Array<number>}
   */
  static diferenca(amostra_a = [], amostra_b = []) {
    return amostra_a.map((a, i) => a - amostra_b[i]);
  }

  /**
   * Calcular intervalo de confiança
   *
   * @param {number} media
   * @param {number} valor_tabela
   * @param {number} desvio_padrao
   * @param {number} tamanho_amostra
   * @returns {Array<number>}
   */
  static calcular_confianca(
    media,
    valor_tabela,
    desvio_padrao,
    tamanho_amostra
  ) {
    const x = (valor_tabela * desvio_padrao) / Math.sqrt(tamanho_amostra);
    return [media - x, media + x];
  }

  /**
   * Calcular intervalo de confiança de uma amostra
   *
   * @param {Array<number>} amostra
   * @param {number} valor_tabela
   * @returns {{
   *  intervalo_confianca: Array<number>;
   *  media: number;
   *  desvio_padrao: number;
   * }}
   */
  static calcular_intervalo(amostra = [], valor_tabela = 0) {
    const media = this.media(amostra);

    const desvio_padrao = this.desvio_padrao(amostra, media);

    const intervalo_confianca = this.calcular_confianca(
      media,
      valor_tabela,
      desvio_padrao,
      amostra.length
    );

    return { intervalo_confianca, media, desvio_padrao };
  }
}

export { IntervaloConfianca };
