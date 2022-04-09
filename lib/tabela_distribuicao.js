import { cabecalho, tabela } from '../dados/tabela.js';

class TabelaDistribuicao {
  /**
   * Obter valor da tabela de distribuição
   *
   * @param {number} tamanho_amostra
   * @param {string} precisao
   * @returns
   */
  static obter_valor(tamanho_amostra, precisao) {
    const linha = tamanho_amostra - 2;
    const coluna = cabecalho.indexOf(precisao);

    return parseFloat(tabela[linha][coluna]);
  }

  /**
   * Exibir tabela de distribuição
   */
  static exibir() {
    console.table(cabecalho);
    console.table(tabela);
  }
}

export { TabelaDistribuicao };
