// src/data.js

// URL da API que vamos usar (JSONPlaceholder continua fornecendo a estrutura)
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// CONTEÚDOS FIXOS PARA SIMULAR A RESPOSTA EM PORTUGUÊS 

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
 * Busca notícias e substitui o conteúdo para Português.
 * @param {string} categoria - A categoria para simular a busca.
 * @returns {Array} Lista de notícias formatadas em português.
 */
export const buscarNoticiasDaAPI = async (categoria) => {
  try {
    // Busca posts (apenas para garantir a estrutura de 10 itens)
    const response = await fetch(API_URL + '?_limit=10'); 
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const posts = await response.json();

    // Mapeia os dados da API substituindo os títulos e resumos
    const noticiasFormatadas = posts.map((post, index) => ({
      id: post.id,
      categoria: categoria.toUpperCase(), 
      titulo: TITULOS_PT[index % TITULOS_PT.length], // Pega um título em Português da nossa lista
      resumo: RESUMOS_PT[index % RESUMOS_PT.length], // Pega um resumo em Português
      conteudo: `Estes são os detalhes da notícia: ${TITULOS_PT[index % TITULOS_PT.length]}. O conteúdo completo da matéria foi gerado para simular o dinamismo de uma API em Português. Na vida real, o seu servidor Backend (onde estaria a IA) geraria este texto. O título original da API era: "${post.title}".`,
    }));

    return noticiasFormatadas;

  } catch (error) {
    console.error("Falha ao buscar notícias:", error);
    // Retorna uma notícia mockada em caso de erro
    return [{ 
        id: 999, 
        categoria: categoria.toUpperCase(), 
        titulo: 'ERRO: Falha ao carregar notícias (Português)', 
        resumo: 'Não foi possível buscar as notícias da API. Verifique a conexão.',
        conteudo: 'A simulação da API falhou. Verifique se o dispositivo tem acesso à internet ou se a URL da API está correta.' 
    }];
  }
};