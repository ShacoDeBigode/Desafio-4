// src/components/CardNoticia.js
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const CardNoticia = ({ noticia, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Categoria com visual de TAG */}
      <View style={styles.categoriaTag}>
        <Text style={styles.categoriaTexto}>{noticia.categoria}</Text>
      </View>
      
      <Text style={styles.titulo}>{noticia.titulo}</Text>
      <Text style={styles.resumo}>{noticia.resumo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 18,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    
    elevation: 6, 
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
  },
  categoriaTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF5733', 
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