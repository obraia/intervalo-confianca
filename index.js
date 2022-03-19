import { IntervaloConfianca } from "./intervalo_confianca.js";
import { TabelaProbabilidade } from "./tabela.js";

/**
 * Se o intervalo contém zero, então as soluções não são diferentes, ou seja, precisa de mais testes para diferenciá-las.
 * Se o intervalo é positivo, neste exemplo, a segunda solução é a melhor.
 * Se o intervalo é negativo, neste exemplo, a primeira solução é a melhor.
 */
function main() {
  const amostra_a = [25, 27, 33, 32, 25, 26, 31, 28];
  const amostra_b = [28, 21, 19, 20, 26, 28, 19, 20];

  const tabela = new TabelaProbabilidade("./dados/tabela-probabilidade.csv");

  // 0.600,0.700,0.800,0.900,0.950,0.975,0.990,0.995
  const nivel_confianca = "0.900";
  const valor_tabela = tabela.obter_valor(amostra_a.length, nivel_confianca);

  const { 
    intervalo_confianca: intervalo_confianca_a ,
  } = calcular_intervalo(
    amostra_a,
    valor_tabela
  );
  const { 
    intervalo_confianca: intervalo_confianca_b 
  } = calcular_intervalo(
    amostra_b,
    valor_tabela
  );

  const diferenca = IntervaloConfianca.diferenca(amostra_a, amostra_b);

  const { 
    intervalo_confianca: intervalo_confianca_diferenca 
  } = calcular_intervalo(
    diferenca, 
    valor_tabela
  );

  console.table({
    intervalo_confianca_a,
    intervalo_confianca_b,
    intervalo_confianca_diferenca,
    nivel_confianca,
  });
}

function calcular_intervalo(amostra = [], valor_tabela = 0) {
  const media = IntervaloConfianca.media(amostra);

  const desvio_padrao = IntervaloConfianca.desvio_padrao(amostra, media);

  const intervalo_confianca = IntervaloConfianca.calcular_confianca(
    media,
    valor_tabela,
    desvio_padrao,
    amostra.length
  );

  return { intervalo_confianca, media, desvio_padrao };
}

console.clear();
main();
