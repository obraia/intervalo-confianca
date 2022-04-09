import { IntervaloConfianca } from './lib/intervalo_confianca.js';
import { TabelaDistribuicao } from './lib/tabela_distribuicao.js';

/**
 * Se o intervalo da diferença contém zero, então as soluções não são diferentes, ou seja, precisa de mais testes para diferenciá-las.
 * Se o intervalo da diferença é positivo, neste exemplo, a segunda solução é a melhor.
 * Se o intervalo da diferença é negativo, neste exemplo, a primeira solução é a melhor.
 *
 * @param {Array<number>} amostra_a
 * @param {Array<number>} amostra_b
 * @param {number} casas_decimais
 * @param {'0.600'| '0.700'| '0.800'| '0.900'| '0.950'| '0.975'| '0.990'| '0.995'} nivel_confianca
 *
 * @returns {{
 *  intervalo_confianca_a: Array<number>;
 *  desvio_padrao_a: number;
 *  historico_desvio_padrao_a: Array<string>;
 *  media_a: number;
 *  intervalo_confianca_b: Array<number>;
 *  desvio_padrao_b: number;
 *  historico_desvio_padrao_b: Array<string>;
 *  media_b: number;
 *  intervalo_confianca_diferenca: Array<number>;
 *  desvio_padrao_diferenca: number;
 *  historico_desvio_padrao_diferenca: Array<string>;
 *  media_diferenca: number;
 * }}
 */
function main(amostra_a, amostra_b, nivel_confianca, casas_decimais = 3) {
  const valor_tabela = TabelaDistribuicao.obter_valor(amostra_a.length, nivel_confianca);

  const {
    media: media_a,
    desvio_padrao: desvio_padrao_a,
    historico_desvio_padrao: historico_desvio_padrao_a,
    intervalo_confianca: intervalo_confianca_a,
    historico_intervalo_confianca: historico_intervalo_confianca_a,
  } = IntervaloConfianca.calcular_intervalo(amostra_a, valor_tabela, casas_decimais);

  const {
    media: media_b,
    desvio_padrao: desvio_padrao_b,
    intervalo_confianca: intervalo_confianca_b,
    historico_desvio_padrao: historico_desvio_padrao_b,
    historico_intervalo_confianca: historico_intervalo_confianca_b,
  } = IntervaloConfianca.calcular_intervalo(amostra_b, valor_tabela, casas_decimais);

  const diferenca = IntervaloConfianca.diferenca(amostra_a, amostra_b);

  const {
    media: media_diferenca,
    desvio_padrao: desvio_padrao_diferenca,
    historico_desvio_padrao: historico_desvio_padrao_diferenca,
    intervalo_confianca: intervalo_confianca_diferenca,
    historico_intervalo_confianca: historico_intervalo_confianca_diferenca,
  } = IntervaloConfianca.calcular_intervalo(diferenca, valor_tabela, casas_decimais);

  return {
    media_a,
    desvio_padrao_a,
    historico_desvio_padrao_a,
    intervalo_confianca_a,
    historico_intervalo_confianca_a,

    media_b,
    desvio_padrao_b,
    historico_desvio_padrao_b,
    intervalo_confianca_b,
    historico_intervalo_confianca_b,

    media_diferenca,
    desvio_padrao_diferenca,
    historico_desvio_padrao_diferenca,
    intervalo_confianca_diferenca,
    historico_intervalo_confianca_diferenca,
  };
}

export default main;
