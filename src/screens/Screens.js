// src/screens/Screens.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image, FlatList } from 'react-native';
// Caminhos ajustados para as pastas:
import { NOTICIAS_TECNOLOGIA, NOTICIAS_ESPORTES } from '../data'; 
import CardNoticia from '../components/CardNoticia';

// --- Tela de Detalhes da Notícia ---
export const DetalheNoticiaScreen = ({ route, navigation }) => {
  const { noticia } = route.params;

  // Customizar Headers: altera o título do cabeçalho dinamicamente
  useEffect(() => {
    navigation.setOptions({
      title: noticia.titulo,
    });
  }, [noticia.titulo, navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.detalheCategoria}>{noticia.categoria}</Text>
      <Text style={styles.detalheTitulo}>{noticia.titulo}</Text>
      <Text style={styles.detalheConteudo}>{noticia.conteudo}</Text>
    </ScrollView>
  );
};

// --- Tela Sobre (Drawer) ---
export const SobreScreen = ({ navigation }) => {
  return (
    <View style={styles.sobreContainer}>
      <Text style={styles.sobreHeader}>Sobre</Text>
      {/* Imagem (Regra: Deve conter uma imagem) */}
      <Image 
        source={{ uri: 'https://via.placeholder.com/150/007bff/ffffff?Text=NEWS' }} 
        style={styles.sobreImage} 
      />
      {/* Descrição (Regra: Deve conter uma descrição) */}
      <Text style={styles.sobreDescricao}>
        Esse é o Mini App de Notícias. Você vai praticar diferentes tipos de navegação com React-Native: Drawer (raiz), Tabs (tecnologia/esportes), Stacks (Lista → Detalhes).
      </Text>
      {/* Botão de Voltar (Regra: Deve conter um botão de Voltar para tela inicial) */}
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
const ListaNoticiasBase = ({ noticias, navigation }) => {
  const renderItem = ({ item }) => (
    <CardNoticia 
      noticia={item} 
      // Fluxo: Lista de Notícias -> Detalhes da Notícia
      onPress={() => navigation.navigate('DetalheNoticia', { noticia: item })} 
    />
  );
  
  return (
    <FlatList 
      data={noticias}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export const ListaTecnologiaScreen = ({ navigation }) => (
  <ListaNoticiasBase noticias={NOTICIAS_TECNOLOGIA} navigation={navigation} />
);

export const ListaEsportesScreen = ({ navigation }) => (
  <ListaNoticiasBase noticias={NOTICIAS_ESPORTES} navigation={navigation} />
);

// Estilos
const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#f4f4f4' },
    detalheCategoria: { fontSize: 14, fontWeight: 'bold', color: '#007bff', marginTop: 10 },
    detalheTitulo: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
    detalheConteudo: { fontSize: 16, lineHeight: 24 },
    sobreContainer: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
    sobreHeader: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    sobreImage: { width: 150, height: 150, resizeMode: 'contain', marginVertical: 20 },
    sobreDescricao: { fontSize: 16, textAlign: 'center', marginVertical: 20 },
    sobreBotao: { width: '80%', marginTop: 20 },
});