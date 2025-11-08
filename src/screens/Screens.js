// src/screens/Screens.js
import React, { useEffect, useState, useCallback } from 'react'; 
import { View, Text, StyleSheet, Button, ScrollView, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native';

import { buscarNoticiasDaAPI } from '../data.js'; 
import CardNoticia from '../components/CardNoticia'; 

import logoImage from '../assets/logo.png'; 

const PRIMARY_COLOR = '#6A0DAD'; 
const ACCENT_COLOR = '#8A2BE2'; 

export const DetalheNoticiaScreen = ({ route, navigation }) => {
  const { noticia } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: noticia.titulo,
    });
  }, [noticia.titulo, navigation]);

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: noticia.imagemUrl }}
        style={styles.detalheImagem}
      />
      <View style={styles.detalheTextoContainer}>
        <Text style={styles.detalheCategoria}>{noticia.categoria}</Text>
        <Text style={styles.detalheTitulo}>{noticia.titulo}</Text>
        <Text style={styles.detalheConteudo}>{noticia.conteudo}</Text>
      </View>
    </ScrollView>
  );
};

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

const ListaNoticiasBase = ({ navigation, tituloLista }) => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true); 
  // NOVO: Estado para o Pull-to-Refresh
  const [refreshing, setRefreshing] = useState(false); 

  // Função para carregar notícias (agora é a base do refresh também)
  const carregarNoticias = useCallback(async () => {
    setLoading(true); 
    const dados = await buscarNoticiasDaAPI(tituloLista);
    setNoticias(dados);
    setLoading(false); 
  }, [tituloLista]);

  // Função chamada no Pull-to-Refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await carregarNoticias();
    setRefreshing(false);
  }, [carregarNoticias]);

  // Carrega as notícias ao montar ou mudar a categoria
  useEffect(() => {
    carregarNoticias();
  }, [carregarNoticias]); 

  const renderItem = ({ item }) => (
    <CardNoticia 
      noticia={item} 
      onPress={() => navigation.navigate('DetalheNoticia', { noticia: item })} 
    />
  );
  
  return (
    <FlatList 
      ListHeaderComponent={() => (
        <View style={styles.secaoTituloContainer}>
          <Text style={styles.secaoTituloTexto}>{tituloLista}</Text>
        </View>
      )}
      data={noticias}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      style={styles.listaContainer}
      // NOVO: Adiciona o RefreshControl
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          tintColor={PRIMARY_COLOR} // Cor do spinner roxo
        />
      }
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

export const ListaMusicaScreen = ({ navigation }) => (
  <ListaNoticiasBase navigation={navigation} tituloLista="Música" />
);

export const ListaTendenciasScreen = ({ navigation }) => (
  <ListaNoticiasBase navigation={navigation} tituloLista="Tendências" />
);

export const ListaModaScreen = ({ navigation }) => (
  <ListaNoticiasBase navigation={navigation} tituloLista="Moda" />
);

export const ListaTVScreen = ({ navigation }) => (
  <ListaNoticiasBase navigation={navigation} tituloLista="TV" />
);


const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: '#FFFFFF' 
    },
    secaoTituloContainer: {
        alignSelf: 'flex-start', 
        backgroundColor: PRIMARY_COLOR, 
        paddingVertical: 8, 
        paddingHorizontal: 15, 
        borderRadius: 10, 
        marginHorizontal: 15, 
        marginTop: 20, 
        marginBottom: 15, 
        elevation: 4, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    secaoTituloTexto: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#FFFFFF', 
        textTransform: 'uppercase', 
    },
    listaContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF' 
    },
    detalheImagem: {
        width: '100%',
        height: 250, 
        resizeMode: 'cover',
        marginBottom: 10,
    },
    detalheTextoContainer: {
        paddingHorizontal: 15,
    },
    detalheCategoria: { 
      fontSize: 14, 
      fontWeight: '600', 
      color: PRIMARY_COLOR, 
      marginTop: 10,
      textTransform: 'uppercase'
    },
    detalheTitulo: { 
      fontSize: 28, 
      fontWeight: 'bold', 
      marginVertical: 15,
      color: '#000000' 
    },
    detalheConteudo: { 
      fontSize: 18, 
      lineHeight: 30, 
      color: '#444444', 
      marginBottom: 20
    },
    erroTexto: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        marginTop: 50
    },
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