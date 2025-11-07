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
    // Fundo branco puro
    backgroundColor: '#FFFFFF', 
    borderRadius: 12,
    
    // NOVO: Sombra Mais Forte para Efeito 3D/Elevado (Estilo Minimalista)
    elevation: 8, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, 
    shadowRadius: 5.65,
  },
  categoriaTag: {
    alignSelf: 'flex-start',
    // Cor de destaque (Verde vibrante do exemplo)
    backgroundColor: '#00C853', 
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
    // Texto Principal Preto
    color: '#222222' 
  },
  resumo: { 
    fontSize: 14, 
    // Texto Secundário Cinza
    color: '#555555'
  },
});

export default CardNoticia;