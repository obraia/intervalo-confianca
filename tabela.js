import fs from "fs";

class TabelaProbabilidade {
  cabecalho = [];
  tabela = [];

  constructor(caminho_arquivo) {
    const linhas = this.ler_csv(caminho_arquivo);

    this.cabecalho = linhas[0].split(",");

    for (let i = 1; i < linhas.length; i++) {
      const linha = linhas[i].split(",");
      this.tabela.push(linha);
    }
  }

  ler_csv(caminho) {
    return fs.readFileSync(caminho, "utf-8").split("\r\n");
  }

  obter_valor(tamanho_amostra, precisao) {
    const linha = tamanho_amostra - 2;
    const coluna = this.cabecalho.findIndex((c) => c === precisao);

    return this.tabela[linha][coluna];
  }

  exibir() {
    console.table(this.cabecalho);
    console.table(this.tabela);
  }
}

export { TabelaProbabilidade };
