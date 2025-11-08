
const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

const CATEGORIAS_VALIDAS = ['TECNOLOGIA', 'ESPORTES', 'MUSICA', 'TENDENCIAS', 'MODA', 'TV'];

// Função utilitária para normalizar (remover acentos) e padronizar
const normalizarCategoria = (categoria) => {
    return categoria
        .toUpperCase()
        .normalize("NFD") // Normaliza (separa o acento da letra)
        .replace(/[\u0300-\u036f]/g, ""); // Remove o acento (caracteres diacríticos)
};

// --- Banco de dados de Notícias Fake ---

const NOTICIAS_POR_CATEGORIA = {
    TECNOLOGIA: {
        TITULOS: [
            "Apple Lança Novo Chip 'M4' Focado em IA Generativa",
            "Meta Anuncia Integração Profunda de IA no WhatsApp",
            "Fim do Suporte: Windows 10 se Despede em 2025",
            "Hacker Ético Descobre Falha Crítica no Google Cloud",
            "O Futuro do Home Office: Realidade Virtual e Metamundo"
        ],
        RESUMOS: [
            "O novo processador promete um salto gigantesco em performance para tarefas de inteligência artificial.",
            "A integração permitirá respostas automáticas e criação de imagens diretamente nas conversas.",
            "Usuários são aconselhados a migrar para o Windows 11 para manter a segurança do sistema.",
            "A falha foi corrigida em tempo recorde e o pesquisador foi recompensado por sua descoberta.",
            "Novas ferramentas VR prometem transformar reuniões virtuais em experiências imersivas."
        ],
        IMAGENS: [
            'https://picsum.photos/id/10/600/300',
            'https://picsum.photos/id/2/600/300',
            'https://picsum.photos/id/1025/600/300',
            'https://picsum.photos/id/237/600/300',
            'https://picsum.photos/id/200/600/300'
        ]
    },
    ESPORTES: {
        TITULOS: [
            "Mbappé No Real Madrid? Novela Chega ao Capítulo Final",
            "Flamengo cai diante do Fluminense e é desclassificado da Copa do Brasil",
            "Skate Brasileiro Domina Etapa Mundial em Tóquio",
            "LeBron James Anuncia Aposentadoria após Próxima Temporada",
            "Análise: Por que a Fórmula 1 está Mais Equilibrada em 2025"
        ],
        RESUMOS: [
            "Após anos de especulação, o astro francês está a um passo de assinar com o time espanhol.",
            "Com gol no último minuto, o Fluzão supera o rival em um clássico eletrizante.",
            "Quatro atletas brasileiros subiram ao pódio, mostrando o crescimento da modalidade.",
            "O maior pontuador da história da NBA diz que é hora de passar o bastão.",
            "Mudanças nas regras e teto de gastos explicam o novo cenário competitivo."
        ],
        IMAGENS: [
            'https://picsum.photos/id/1063/600/300',
            'https://picsum.photos/id/3/600/300',
            'https://picsum.photos/id/1060/600/300',
            'https://picsum.photos/id/25/600/300',
            'https://picsum.photos/id/27/600/300'
        ]
    },
    MUSICA: { // Chave MAIÚSCULA E SEM ACENTO
        TITULOS: [
            "Novo Álbum de Anitta Bate Recorde de Streams no Spotify",
            "Taylor Swift Anuncia Novas Datas da 'The Eras Tour' no Brasil",
            "Rock in Rio 2026 Revela Primeira Grande Atração Internacional",
            "Gênero Sertanejo Inova com Fusão Eletrônica em Novo Hit",
            "Documentário sobre a vida de Bob Marley Ganha Data de Estreia"
        ],
        RESUMOS: [
            "Com sonoridade ousada, o álbum domina paradas mundiais e consolida a artista globalmente.",
            "A cantora adicionou cinco datas extras devido à alta demanda dos fãs brasileiros.",
            "A banda lendária fará um show exclusivo no Palco Mundo, prometendo lotação máxima.",
            "A dupla surpreendeu o público com uma batida futurista, mas manteve a essência do gênero.",
            "O filme, aprovado pela família, promete revelar os bastidores da vida do ícone do Reggae."
        ],
        IMAGENS: [
            'https://picsum.photos/id/35/600/300',
            'https://picsum.photos/id/50/600/300',
            'https://picsum.photos/id/100/600/300',
            'https://picsum.photos/id/101/600/300',
            'https://picsum.photos/id/102/600/300'
        ]
    },
    TENDENCIAS: {
        TITULOS: [
            "O Fenômeno do 'Quiet Quitting' e o Novo Mercado de Trabalho",
            "Beleza 'Clean Girl' Dominam o TikTok: Entenda a Estética",
            "Ascensão dos Jogos Indie com Estética Retrô: Nostalgia Digital",
            "A Volta dos Anos 2000: Y2K Estourando nas Ruas e Redes",
            "Foodies Descobrem a Próxima Grande Culinária: Laosiana"
        ],
        RESUMOS: [
            "O movimento de desengajamento silencioso está remodelando a relação entre empregado e empresa.",
            "A estética minimalista e natural conquistou a geração Z, focando em maquiagem leve e brilho.",
            "Desenvolvedores independentes estão resgatando o visual pixelizado com histórias complexas.",
            "Calças cargo, tops curtos e acessórios coloridos marcam o retorno da moda do início do milênio.",
            "Após o sucesso do Thai, a culinária do Laos promete ser a próxima sensação gastronômica global."
        ],
        IMAGENS: [
            'https://picsum.photos/id/103/600/300',
            'https://picsum.photos/id/104/600/300',
            'https://picsum.photos/id/105/600/300',
            'https://picsum.photos/id/106/600/300',
            'https://picsum.photos/id/107/600/300'
        ]
    },
    MODA: {
        TITULOS: [
            "Semana de Moda de Milão: O que Vimos de Mais Ousado",
            "Sustentabilidade: Marcas Adotam Tecidos de Descarte Marinho",
            "A Influência do Guarda-Roupa Masculino na Moda Feminina Atual",
            "Entrevista com o Estilista Brasileiro que Conquistou Paris",
            "Cores do Inverno: Tons Terrosos e Neons em Destaque"
        ],
        RESUMOS: [
            "Designers apostaram em volumes exagerados e cores vibrantes para a próxima estação de luxo.",
            "A nova tendência ecológica transforma lixo plástico em peças de alta costura.",
            "Blazers oversized, alfaiataria e sapatos pesados viram peças-chave no look feminino.",
            "Ele conta como saiu do interior de Minas Gerais para brilhar nas passarelas francesas.",
            "O contraste entre a paleta natural e os pontos de cor forte será a regra da estação fria."
        ],
        IMAGENS: [
            'https://picsum.photos/id/108/600/300',
            'https://picsum.photos/id/109/600/300',
            'https://picsum.photos/id/110/600/300',
            'https://picsum.photos/id/111/600/300',
            'https://picsum.photos/id/112/600/300'
        ]
    },
    TV: {
        TITULOS: [
            "Netflix: Séries Originais Domésticas Viram Sucesso Global",
            "Globoplay Anuncia Expansão para Mercados Europeus",
            "O Retorno Triunfal das Novelas Clássicas no Horário Nobre",
            "Crítica: O Novo Reality Show de Sobrevivência Vale a Pena?",
            "HBO Max: Próxima Temporada de 'Succession' Traz Reviravolta Inesperada"
        ],
        RESUMOS: [
            "Produções locais de países como Coreia e Espanha lideram o ranking de audiência da plataforma.",
            "A plataforma brasileira planeja disponibilizar seu catálogo em Portugal e Espanha até o fim do ano.",
            "Com remake de sucesso, a Globo comprova a força do seu acervo dramático entre as novas gerações.",
            "Com provas extremas e conflitos reais, o programa está dividindo a opinião dos telespectadores.",
            "Fontes indicam que um personagem central pode morrer logo no primeiro episódio."
        ],
        IMAGENS: [
            'https://picsum.photos/id/113/600/300',
            'https://picsum.photos/id/114/600/300',
            'https://picsum.photos/id/115/600/300',
            'https://picsum.photos/id/116/600/300',
            'https://picsum.photos/id/117/600/300'
        ]
    }
};

export const buscarNoticiasDaAPI = async (categoria) => {
  // NOVO: Normaliza a categoria (remove acentos e deixa em maiúsculas)
  const catNormalizada = normalizarCategoria(categoria);
  
  // Garante que o fallback use a chave correta (TECNOLOGIA)
  const dadosCategoria = NOTICIAS_POR_CATEGORIA[catNormalizada] || NOTICIAS_POR_CATEGORIA.TECNOLOGIA;
  
  try {
    const response = await fetch(API_URL); 
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const posts = await response.json();

    const noticiasFormatadas = posts.slice(0, 5).map((post, index) => ({
      id: post.id, 
      categoria: categoria.toUpperCase(), // Mantém o acento para exibição
      titulo: dadosCategoria.TITULOS[index % dadosCategoria.TITULOS.length], 
      resumo: dadosCategoria.RESUMOS[index % dadosCategoria.RESUMOS.length], 
      conteudo: `Estes são os detalhes da notícia: ${dadosCategoria.TITULOS[index % dadosCategoria.TITULOS.length]}. O conteúdo completo da matéria é garantido pela API estável.`,
      imagemUrl: dadosCategoria.IMAGENS[index % dadosCategoria.IMAGENS.length], 
    }));

    return noticiasFormatadas;

  } catch (error) {
    console.error("Falha ao buscar notícias:", error);
    return [{ 
        id: 999, 
        categoria: categoria.toUpperCase(), 
        titulo: `ERRO: Falha ao carregar notícias (${categoria.toUpperCase()})`, 
        resumo: 'Não foi possível buscar os dados da API. Verifique sua conexão e a URL.',
        conteudo: 'Falha na busca. O aplicativo está utilizando a API estável, o problema pode ser a ausência de conexão com a internet.' ,
        imagemUrl: dadosCategoria.IMAGENS[0],
    }];
  }
};