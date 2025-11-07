// src/screens/Screens.js
import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, Button, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';

// CORREÇÃO DO CAMINHO: Agora o 'data.js' está no mesmo nível de 'screens' (dentro de src)
import { buscarNoticiasDaAPI } from '../data.js'; 
import CardNoticia from '../components/CardNoticia'; 

// Importa a imagem local da pasta src/assets/
import logoImage from '../assets/logo.png'; 

// Cores para o Novo Design
const ACCENT_COLOR = '#4A90E2'; 
const PRIMARY_COLOR = '#1A5276';


// --- Tela de Detalhes da Notícia (Sem alterações) ---
export const DetalheNoticiaScreen = ({ route, navigation }) => {
  const { noticia } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: noticia.titulo,
    });
  }, [noticia.titulo, navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.detalheCategoria}>{noticia.categoria}</Text>
      <Text style={styles.detalheTitulo}>{noticia.titulo}</Text>
      {/* CONTEÚDO AGORA MAIOR E MAIS BONITO PARA LEITURA */}
      <Text style={styles.detalheConteudo}>{noticia.conteudo}</Text>
    </ScrollView>
  );
};

// --- Tela Sobre (Drawer) (Sem alterações) ---
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

// --- Telas de Lista (COM BUSCA ASSÍNCRONA) ---
const ListaNoticiasBase = ({ navigation, tituloLista }) => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    // Função que chama a API
    const carregarNoticias = async () => {
      setLoading(true); // Inicia o carregamento
      const dados = await buscarNoticiasDaAPI(tituloLista);
      setNoticias(dados);
      setLoading(false); // Finaliza o carregamento
    };

    carregarNoticias();
  }, [tituloLista]); // Roda a cada vez que a aba for selecionada/montada

  const renderItem = ({ item }) => (
    <CardNoticia 
      noticia={item} 
      onPress={() => navigation.navigate('DetalheNoticia', { noticia: item })} 
    />
  );
  
  return (
    <FlatList 
      ListHeaderComponent={() => (
        // Título da Seção
        <Text style={styles.secaoTitulo}>{tituloLista}</Text>
      )}
      data={noticias}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      style={styles.listaContainer}
      // Mostra o spinner de carregamento se estiver buscando
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


// Estilos (Com estilização aplicada e fundo escuro)
const styles = StyleSheet.create({
    // Estilos para a Tela DetalheNoticiaScreen
    container: { 
      flex: 1, 
      padding: 15,
      backgroundColor: '#153F6B' 
    },
    // Estilo para o título de seção (aplicado nas listas de Tecnologia e Esportes)
    secaoTitulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: ACCENT_COLOR, 
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 5,
        marginTop: 5,
    },
    // Estilo para o fundo das listas
    listaContainer: {
        flex: 1,
        backgroundColor: '#153F6B' 
    },
    // Estilos da Tela DetalheNoticiaScreen 
    detalheCategoria: { 
      fontSize: 14, 
      fontWeight: '600', 
      color: '#007bff', 
      marginTop: 10,
      textTransform: 'uppercase'
    },
    detalheTitulo: { 
      fontSize: 28, 
      fontWeight: 'bold', 
      marginVertical: 15,
      color: '#FFFFFF' 
    },
    detalheConteudo: { 
      fontSize: 18, 
      lineHeight: 30, 
      color: '#E0E0E0', 
      marginBottom: 20
    },
    erroTexto: {
        fontSize: 16,
        color: '#E0E0E0',
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