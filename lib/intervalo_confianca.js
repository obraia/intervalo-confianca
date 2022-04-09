class IntervaloConfianca {
  /**
   * Calcular desvio padrão da amostra
   *
   * @param {Array<number>} amostra
   * @param {number} media
   * @returns {{
   *  desvio_padrao: number,
   *  historico: Array<string>
   * }}
   */
  static desvio_padrao(amostra = [], media = 0) {
    let soma = 0;
    const historico = [];
    const historico_soma = [];

    amostra.forEach((i) => {
      const resultado = Math.pow(i - media, 2);
      historico.push(`(${i} - ${media})² = ${resultado}`);
      historico_soma.push(resultado);
      soma += resultado;
    });

    historico.push(`${historico_soma.join(' + ')} = ${soma}`);

    const divisao = soma / amostra.length;
    historico.push(`${soma} / ${amostra.length} = ${divisao}`);

    const raiz = Math.sqrt(divisao);
    historico.push(`√${divisao} = ${raiz}`);

    return { desvio_padrao: raiz, historico_desvio_padrao: historico };
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
   * @returns {{
   *  intervalo_confianca: Array<number>;
   *  historico_intervalo_confianca: Array<string>;
   * }}
   */
  static calcular_confianca(media, valor_tabela, desvio_padrao, tamanho_amostra) {
    const historico = [];

    const s = desvio_padrao / Math.sqrt(tamanho_amostra);
    historico.push(`s = ${desvio_padrao} / √${tamanho_amostra} = ${s}`);

    const limite_inferior = media - valor_tabela * s;
    historico.push(`Limite inferior: ${media} - (${valor_tabela} * ${s}) = ${limite_inferior}`);

    const limite_superior = media + valor_tabela * s;
    historico.push(`Limite superior: ${media} + (${valor_tabela} * ${s}) = ${limite_superior}`);

    return {
      intervalo_confianca: [limite_inferior, limite_superior],
      historico_intervalo_confianca: historico,
    };
  }

  /**
   * Calcular intervalo de confiança de uma amostra
   *
   * @param {Array<number>} amostra
   * @param {number} valor_tabela
   * @returns {{
   *  media: number;
   *  desvio_padrao: number;
   *  historico_desvio_padrao: Array<string>;
   *  intervalo_confianca: Array<number>;
   *  historico_intervalo_confianca: Array<string>;
   * }}
   */
  static calcular_intervalo(amostra = [], valor_tabela = 0) {
    const media = this.media(amostra);

    const { desvio_padrao, historico_desvio_padrao } = this.desvio_padrao(amostra, media);

    const { intervalo_confianca, historico_intervalo_confianca } = this.calcular_confianca(
      media,
      valor_tabela,
      desvio_padrao,
      amostra.length
    );

    return {
      media,
      desvio_padrao,
      historico_desvio_padrao,
      intervalo_confianca,
      historico_intervalo_confianca,
    };
  }
}

export { IntervaloConfianca };
