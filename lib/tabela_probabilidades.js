import fs from "fs";

class TabelaProbabilidades {
  cabecalho = [];
  tabela = [];

  /**
   * Carregar a tabela de probabilidades em uma matriz
   *
   * @param {string} caminho_arquivo
   * @returns {TabelaProbabilidades}
   */
  constructor(caminho_arquivo) {
    const linhas = this.ler_csv(caminho_arquivo);

    this.cabecalho = linhas[0].split(",");

    for (let i = 1; i < linhas.length; i++) {
      const linha = linhas[i].split(",");
      this.tabela.push(linha);
    }
  }

  /**
   * Ler um arquivo CSV e retorna vetor de linhas
   *
   * @param {string} caminho_arquivo
   * @returns {Array<string>}
   */
  ler_csv(caminho_arquivo) {
    return fs.readFileSync(caminho_arquivo, "utf-8").split("\r\n");
  }

  /**
   * Obter valor da tabela de probabilidades
   *
   * @param {number} tamanho_amostra
   * @param {string} precisao
   * @returns
   */
  obter_valor(tamanho_amostra, precisao) {
    const linha = tamanho_amostra - 2;
    const coluna = this.cabecalho.findIndex((c) => c === precisao);

    return this.tabela[linha][coluna];
  }

  /**
   * Exibir tabela de probabilidades
   */
  exibir() {
    console.table(this.cabecalho);
    console.table(this.tabela);
  }
}

export { TabelaProbabilidades };
