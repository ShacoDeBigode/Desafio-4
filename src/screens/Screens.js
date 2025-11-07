import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, Button, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';

// Caminho corrigido para o arquivo de dados.
import { buscarNoticiasDaAPI } from '../data.js'; 
import CardNoticia from '../components/CardNoticia'; 

// Importa a imagem local da pasta src/assets/
import logoImage from '../assets/logo.png'; 

// Cores para o Novo Design Minimalista Moderno
const ACCENT_COLOR = '#00C853'; // Verde Vibrante (para destaque e tags)
const PRIMARY_COLOR = '#1A5276'; // Mantido para o Drawer Ativo


// --- Tela de Detalhes da Notícia ---
export const DetalheNoticiaScreen = ({ route, navigation }) => {
  const { noticia } = route.params;

  // Customiza o Header dinamicamente com o título da notícia.
  useEffect(() => {
    navigation.setOptions({
      title: noticia.titulo,
    });
  }, [noticia.titulo, navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.detalheCategoria}>{noticia.categoria}</Text>
      <Text style={styles.detalheTitulo}>{noticia.titulo}</Text>
      {/* Tipografia aprimorada para melhor legibilidade. */}
      <Text style={styles.detalheConteudo}>{noticia.conteudo}</Text>
    </ScrollView>
  );
};

// --- Tela Sobre (Drawer) ---
export const SobreScreen = ({ navigation }) => {
  return (
    <View style={styles.sobreContainer}>
      <Text style={styles.sobreHeader}>Sobre</Text>
      
      <Image 
        source={logoImage} 
        style={styles.sobreImage} 
      />
      
      <Text style={styles.sobreDescricao}>
        Esse é o Mini App de Notícias. Aqui você ficará por dentro das novidades mais quentes do pedaço. 
      </Text>
      
      <View style={styles.sobreBotao}>
        <Button 
          title="VOLTAR" 
          onPress={() => navigation.navigate('Noticias')} 
        />
      </View>
    </View>
  );
};

// --- Telas de Lista (Com Lógica de Fetch) ---
const ListaNoticiasBase = ({ navigation, tituloLista }) => {
  // Estados para armazenar os dados e controlar o loading.
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Função assíncrona para buscar os dados na API estável.
    const carregarNoticias = async () => {
      setLoading(true); 
      const dados = await buscarNoticiasDaAPI(tituloLista);
      setNoticias(dados);
      setLoading(false); 
    };

    carregarNoticias();
  }, [tituloLista]); 

  const renderItem = ({ item }) => (
    <CardNoticia 
      noticia={item} 
      onPress={() => navigation.navigate('DetalheNoticia', { noticia: item })} 
    />
  );
  
  return (
    <FlatList 
      ListHeaderComponent={() => (
        // NOVO: Título da Seção como uma Tag personalizada (o "quadrado")
        <View style={styles.secaoTituloContainer}>
          <Text style={styles.secaoTituloTexto}>{tituloLista}</Text>
        </View>
      )}
      data={noticias}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      style={styles.listaContainer}
      // Componente exibido quando a lista está vazia.
      ListEmptyComponent={() => loading ? (
        <ActivityIndicator size="large" color={ACCENT_COLOR} style={{ marginTop: 50 }} />
      ) : (
        <Text style={styles.erroTexto}>Nenhuma notícia encontrada.</Text>
      )}
    />
  );
};

export const ListaTecnologiaScreen = ({ navigation }) => (
  <ListaNoticiasBase navigation={navigation} tituloLista="Tecnologia" />
);

export const ListaEsportesScreen = ({ navigation }) => (
  <ListaNoticiasBase navigation={navigation} tituloLista="Esportes" />
);


// Estilos
const styles = StyleSheet.create({
    // Estilos de Fundo Geral (Detalhes da Notícia e Container Geral).
    container: { 
      flex: 1, 
      padding: 15,
      // Fundo Quase Branco (Minimalista)
      backgroundColor: '#F8F8F8' 
    },
    // NOVO: Container para o título da seção (o "quadrado personalizado")
    secaoTituloContainer: {
        alignSelf: 'flex-start', // Alinha a "tag" à esquerda
        backgroundColor: ACCENT_COLOR, // Usa a cor de destaque (verde) para o fundo
        paddingVertical: 8, // Preenchimento vertical interno
        paddingHorizontal: 15, // Preenchimento horizontal interno
        borderRadius: 10, // Cantos arredondados para a "tag"
        marginHorizontal: 15, // Margem externa para não grudar na borda
        marginTop: 20, // Espaçamento superior
        marginBottom: 15, // Espaçamento inferior
        elevation: 4, // Sombra para dar um leve efeito 3D
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    // NOVO: Estilo para o texto dentro do título da seção
    secaoTituloTexto: {
        fontSize: 20, // Tamanho da fonte
        fontWeight: 'bold', // Negrito
        color: '#FFFFFF', // Texto branco para contraste no fundo verde
        textTransform: 'uppercase', // Texto em maiúsculas
    },

    // Estilo para o fundo das listas.
    listaContainer: {
        flex: 1,
        backgroundColor: '#F8F8F8' 
    },
    // Estilos da Tela DetalheNoticiaScreen 
    detalheCategoria: { 
      fontSize: 14, 
      fontWeight: '600', 
      // Cor de destaque vibrante (Verde)
      color: ACCENT_COLOR, 
      marginTop: 10,
      textTransform: 'uppercase'
    },
    detalheTitulo: { 
      fontSize: 28, 
      fontWeight: 'bold', 
      marginVertical: 15,
      // Título da Notícia em Preto
      color: '#000000' 
    },
    detalheConteudo: { 
      fontSize: 18, 
      lineHeight: 30, 
      // Conteúdo em Cinza Escuro
      color: '#444444', 
      marginBottom: 20
    },
    erroTexto: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        marginTop: 50
    },
    // Estilos da Tela Sobre 
    sobreContainer: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
    sobreHeader: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    sobreImage: { 
        width: 150, 
        height: 150, 
        resizeMode: 'contain', 
        marginVertical: 20 
    },
    sobreDescricao: { fontSize: 16, textAlign: 'center', marginVertical: 20 },
    sobreBotao: { width: '80%', marginTop: 20 },
});