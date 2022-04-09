import { cabecalho, tabela } from "../dados/tabela-probabilidade.js";

class TabelaProbabilidades {
  /**
   * Obter valor da tabela de probabilidades
   *
   * @param {number} tamanho_amostra
   * @param {string} precisao
   * @returns
   */
  static obter_valor(tamanho_amostra, precisao) {
    const linha = tamanho_amostra - 2;
    const coluna = cabecalho.findIndex((c) => c === precisao);

    return tabela[linha][coluna];
  }

  /**
   * Exibir tabela de probabilidades
   */
  static exibir() {
    console.table(cabecalho);
    console.table(tabela);
  }
}

export { TabelaProbabilidades };
