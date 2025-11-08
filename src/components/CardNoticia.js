import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';

const CardNoticia = ({ noticia, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* NOVO: Componente de Imagem no topo */}
      <Image 
        source={{ uri: noticia.imagemUrl }}
        style={styles.imagem}
      />
      
      <View style={styles.infoContainer}>
        {/* Categoria com visual de TAG */}
        <View style={styles.categoriaTag}>
          <Text style={styles.categoriaTexto}>{noticia.categoria}</Text>
        </View>
        
        <Text style={styles.titulo}>{noticia.titulo}</Text>
        <Text style={styles.resumo}>{noticia.resumo}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#FFFFFF', 
    borderRadius: 12,
    overflow: 'hidden', // Importante para que a imagem respeite o borderRadius do card
    elevation: 8, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, 
    shadowRadius: 5.65,
  },
  // NOVO: Estilo para o retângulo da imagem
  imagem: {
    width: '100%',
    height: 180, // Altura fixa para o retângulo
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 18,
  },
  categoriaTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#6A0DAD', 
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  categoriaTexto: { 
    fontSize: 10, 
    fontWeight: '800',
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  titulo: { 
    fontSize: 19,
    fontWeight: 'bold', 
    marginBottom: 8,
    color: '#222222' 
  },
  resumo: { 
    fontSize: 14, 
    color: '#555555'
  },
});

export default CardNoticia;