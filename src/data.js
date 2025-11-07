// URL da API mais estável (JSONPlaceholder) que garante a estrutura de 10 posts.
const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

// CONTEÚDOS FIXOS EM PORTUGUÊS PARA PREENCHER O TEMPLATE DA API ESTÁVEL.

const TITULOS_PT = [
    "Brasil Lança Nova Missão Espacial com Foco em Clima",
    "Gigantes Tech Anunciam Fusão Histórica: Impacto Global no Mercado",
    "Campeonato Brasileiro Aquece e Promete Disputa Acirrada até o Fim",
    "Novo Modelo de IA Supera Desempenho Humano em Testes de Linguagem",
    "Recorde de Público no Maracanã para Clássico de Futebol Feminino",
    "Startups Brasileiras de Fintech Recebem Investimento Recorde",
    "Polêmica no VAR Marca Última Rodada da Copa do Brasil",
    "Cientistas Descobrem Nova Forma de Energia Sustentável no Amazônia",
    "Mercado de Games no Brasil Cresce 20% no Último Trimestre",
    "Atletas Brasileiros Brilham em Competição Internacional de Natação"
];

const RESUMOS_PT = [
    "A nova missão da Agência Espacial Brasileira promete dados cruciais sobre as mudanças climáticas na América do Sul.",
    "A fusão deve redefinir o panorama da tecnologia, criando uma superpotência com valor de mercado trilionário.",
    "Com apenas cinco rodadas para o fim, três equipes disputam a liderança com apenas um ponto de diferença.",
    "A empresa por trás do novo modelo afirma que a IA é a mais avançada já criada, com aplicações em diversas áreas.",
    "Mais de 70 mil torcedores lotaram o estádio, mostrando a força e o crescimento da modalidade no país.",
    "O setor financeiro digital no Brasil atrai capital estrangeiro, consolidando o país como hub de inovação.",
    "Decisão do árbitro de vídeo gerou grande controvérsia e deve ser pauta de reunião na CBF nos próximos dias.",
    "O projeto busca desenvolver a tecnologia para uso em comunidades isoladas, com baixo impacto ambiental.",
    "O aumento foi puxado principalmente pelo segmento mobile e pela adoção de novas tecnologias VR.",
    "Com cinco medalhas de ouro, o Brasil garante o melhor desempenho da sua história em Mundiais de Natação."
];


/**
 * Executa a busca assíncrona dos dados na API mais estável e formata a resposta.
 * O conteúdo é em português e a busca é garantida.
 * @param {string} categoria - A categoria de notícia a ser simulada.
 * @returns {Array} Lista de objetos de notícia formatados.
 */
export const buscarNoticiasDaAPI = async (categoria) => {
  try {
    // Executa o fetch na API estável.
    const response = await fetch(API_URL); 
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const posts = await response.json();

    // Mapeia os dados, usando o ID da API estável e o conteúdo fixo em português.
    const noticiasFormatadas = posts.map((post, index) => ({
      // ID da API estável.
      id: post.id, 
      categoria: categoria.toUpperCase(), 
      // Conteúdo fixo em Português.
      titulo: TITULOS_PT[index % TITULOS_PT.length], 
      resumo: RESUMOS_PT[index % RESUMOS_PT.length], 
      conteudo: `Estes são os detalhes da notícia: ${TITULOS_PT[index % TITULOS_PT.length]}. O conteúdo completo da matéria é garantido pela API estável.`,
    }));

    return noticiasFormatadas;

  } catch (error) {
    console.error("Falha ao buscar notícias:", error);
    // Retorna um objeto de erro para ser renderizado na tela em caso de falha no fetch.
    return [{ 
        id: 999, 
        categoria: categoria.toUpperCase(), 
        titulo: 'ERRO: Falha ao carregar notícias', 
        resumo: 'Não foi possível buscar as notícias da API. Verifique sua conexão e a URL.',
        conteudo: 'Falha na busca. O aplicativo está utilizando a API estável, o problema pode ser a ausência de conexão com a internet.' 
    }];
  }
};