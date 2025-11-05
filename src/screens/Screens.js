// src/screens/Screens.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image, FlatList } from 'react-native';

// Caminhos corrigidos para as pastas
import { NOTICIAS_TECNOLOGIA, NOTICIAS_ESPORTES } from '../data'; 
import CardNoticia from '../components/CardNoticia'; 

// Importa a imagem local da pasta src/assets/
import logoImage from '../assets/logo.png'; 

// Cor de destaque usada no App.js
const ACCENT_COLOR = '#4A90E2'; 


// --- Tela de Detalhes da Notícia ---
export const DetalheNoticiaScreen = ({ route, navigation }) => {
  const { noticia } = route.params;

  // Customizar Headers (Regra 32)
  useEffect(() => {
    navigation.setOptions({
      title: noticia.titulo,
    });
  }, [noticia.titulo, navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.detalheCategoria}>{noticia.categoria}</Text>
      <Text style={styles.detalheTitulo}>{noticia.titulo}</Text>
      {/* 🚨 CONTEÚDO AGORA MAIOR E MAIS BONITO PARA LEITURA 🚨 */}
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
        source={logoImage} // Usa a imagem importada
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

// --- Telas de Lista (Rotas iniciais dos Stacks) ---
const ListaNoticiasBase = ({ noticias, navigation, tituloLista }) => {
  const renderItem = ({ item }) => (
    <CardNoticia 
      noticia={item} 
      onPress={() => navigation.navigate('DetalheNoticia', { noticia: item })} 
    />
  );
  
  return (
    <FlatList 
      ListHeaderComponent={() => (
        // 🚨 NOVO TÍTULO DA SEÇÃO (EX: ESPORTES) 🚨
        <Text style={styles.secaoTitulo}>{tituloLista}</Text>
      )}
      data={noticias}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      style={styles.listaContainer} 
    />
  );
};

export const ListaTecnologiaScreen = ({ navigation }) => (
  <ListaNoticiasBase noticias={NOTICIAS_TECNOLOGIA} navigation={navigation} tituloLista="Tecnologia" />
);

export const ListaEsportesScreen = ({ navigation }) => (
  <ListaNoticiasBase noticias={NOTICIAS_ESPORTES} navigation={navigation} tituloLista="Esportes" />
);

// Estilos (Com estilização aplicada, fundo escuro e textos ajustados)
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
        color: ACCENT_COLOR, // Usa a cor de destaque
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
      fontSize: 18, // 🚨 Aumentado para melhor leitura
      lineHeight: 30, // 🚨 Espaçamento entre linhas maior
      color: '#E0E0E0', 
      marginBottom: 20
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