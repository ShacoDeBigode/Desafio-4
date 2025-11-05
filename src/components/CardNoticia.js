// src/components/CardNoticia.js
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const CardNoticia = ({ noticia, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.categoria}>{noticia.categoria}</Text>
      <Text style={styles.titulo}>{noticia.titulo}</Text>
      <Text style={styles.resumo}>{noticia.resumo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  categoria: { fontSize: 12, fontWeight: 'bold', color: '#007bff', marginBottom: 5 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  resumo: { fontSize: 14, color: '#666' },
});

export default CardNoticia;