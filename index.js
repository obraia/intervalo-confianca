import { IntervaloConfianca } from "./lib/intervalo_confianca.js";
import { TabelaProbabilidades } from "./lib/tabela_probabilidades.js";

/**
 * Se o intervalo da diferença contém zero, então as soluções não são diferentes, ou seja, precisa de mais testes para diferenciá-las.
 * Se o intervalo da diferença é positivo, neste exemplo, a segunda solução é a melhor.
 * Se o intervalo da diferença é negativo, neste exemplo, a primeira solução é a melhor.
 *
 * @param {Array<number>} amostra_a
 * @param {Array<number>} amostra_b
 * @param {'0.600'| '0.700'| '0.800'| '0.900'| '0.950'| '0.975'| '0.990'| '0.995'} nivel_confianca
 *
 * @returns {{
 *  intervalo_confianca_a: Array<number>;
 *  desvio_padrao_a: number;
 *  media_a: number;
 *  intervalo_confianca_b: Array<number>;
 *  desvio_padrao_b: number;
 *  media_b: number;
 *  intervalo_confianca_diferenca: Array<number>;
 *  desvio_padrao_diferenca: number;
 *  media_diferenca: number;
 * }}
 */
function main(amostra_a, amostra_b, nivel_confianca) {
  const valor_tabela = TabelaProbabilidades.obter_valor(
    amostra_a.length,
    nivel_confianca
  );

  const {
    intervalo_confianca: intervalo_confianca_a,
    desvio_padrao: desvio_padrao_a,
    media: media_a,
  } = IntervaloConfianca.calcular_intervalo(amostra_a, valor_tabela);

  const {
    intervalo_confianca: intervalo_confianca_b,
    desvio_padrao: desvio_padrao_b,
    media: media_b,
  } = IntervaloConfianca.calcular_intervalo(amostra_b, valor_tabela);

  const diferenca = IntervaloConfianca.diferenca(amostra_a, amostra_b);

  const {
    intervalo_confianca: intervalo_confianca_diferenca,
    desvio_padrao: desvio_padrao_diferenca,
    media: media_diferenca,
  } = IntervaloConfianca.calcular_intervalo(diferenca, valor_tabela);

  return {
    intervalo_confianca_a,
    desvio_padrao_a,
    media_a,
    intervalo_confianca_b,
    desvio_padrao_b,
    media_b,
    intervalo_confianca_diferenca,
    desvio_padrao_diferenca,
    media_diferenca,
  };
}

export default main;

console.clear();

const amostra_a = [13, 12, 8, 18, 3, 12, 19, 6];
const amostra_b = [11, 15, 5, 7, 2, 20, 21, 6];
const nivel_confianca = "0.950";

const {
  intervalo_confianca_a,
  intervalo_confianca_b,
  desvio_padrao_a,
  desvio_padrao_b,
  intervalo_confianca_diferenca,
} = main(amostra_a, amostra_b, nivel_confianca);

console.table({
  intervalo_confianca_a,
  intervalo_confianca_b,
  desvio_padrao_a,
  desvio_padrao_b,
  intervalo_confianca_diferenca,
  nivel_confianca,
});
