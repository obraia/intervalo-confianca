import { round } from '../utils/round.js';

class IntervaloConfianca {
  /**
   * Calcular desvio padrão da amostra
   *
   * @param {Array<number>} amostra
   * @param {number} media
   * @param {number} casas_decimais
   * @returns {{
   *  desvio_padrao: number,
   *  historico: Array<string>
   * }}
   */
  static desvio_padrao(amostra, media, casas_decimais) {
    let soma = 0;
    const historico = [];
    const historico_soma = [];

    amostra.forEach((i) => {
      const resultado = round(Math.pow(i - media, 2), casas_decimais);
      historico.push(`(${i} - ${media})² = ${resultado}`);
      historico_soma.push(resultado);
      soma += resultado;
    });

    soma = round(soma, casas_decimais);

    historico.push(`${historico_soma.join(' + ')} = ${soma}`);

    const divisao = round(soma / amostra.length, casas_decimais);
    historico.push(`${soma} / ${amostra.length} = ${divisao}`);

    const raiz = round(Math.sqrt(divisao), casas_decimais);
    historico.push(`√${divisao} = ${raiz}`);

    return { desvio_padrao: raiz, historico_desvio_padrao: historico };
  }

  /**
   * Calcular média da amostra
   * @param {Array<number>} amostra
   * @param {number} casas_decimais
   * @returns {number}
   */
  static media(amostra, casas_decimais) {
    return round(amostra.reduce((a, b) => a + b, 0) / amostra.length, casas_decimais);
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
   * @param {number} casas_decimais
   * @returns {{
   *  intervalo_confianca: Array<number>;
   *  historico_intervalo_confianca: Array<string>;
   * }}
   */
  static calcular_confianca(media, valor_tabela, desvio_padrao, tamanho_amostra, casas_decimais) {
    const historico = [];

    const s = round(desvio_padrao / Math.sqrt(tamanho_amostra), casas_decimais);
    historico.push(`s = ${desvio_padrao} / √${tamanho_amostra} = ${s}`);

    const limite_inferior = round(media - valor_tabela * s, casas_decimais);
    historico.push(`Limite inferior: ${media} - (${valor_tabela} * ${s}) = ${limite_inferior}`);

    const limite_superior = round(media + valor_tabela * s, casas_decimais);
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
   * @param {number} casas_decimais
   * @returns {{
   *  media: number;
   *  desvio_padrao: number;
   *  historico_desvio_padrao: Array<string>;
   *  intervalo_confianca: Array<number>;
   *  historico_intervalo_confianca: Array<string>;
   * }}
   */
  static calcular_intervalo(amostra, valor_tabela, casas_decimais) {
    const media = this.media(amostra, casas_decimais);

    const { desvio_padrao, historico_desvio_padrao } = this.desvio_padrao(
      amostra,
      media,
      casas_decimais
    );

    const { intervalo_confianca, historico_intervalo_confianca } = this.calcular_confianca(
      media,
      valor_tabela,
      desvio_padrao,
      amostra.length,
      casas_decimais
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
