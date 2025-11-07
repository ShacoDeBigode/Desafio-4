// App.js
// CRÍTICO: Esta linha DEVE ser a primeira para resolver erros nativos de inicialização
import 'react-native-gesture-handler'; 

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// CORREÇÃO: MUDANDO PARA A IMPORTAÇÃO DO EXPO
import { Ionicons } from '@expo/vector-icons'; 

import { SobreScreen, DetalheNoticiaScreen, ListaTecnologiaScreen, ListaEsportesScreen } from './src/screens/Screens'; 

// Cores para o Novo Design
const PRIMARY_COLOR = '#1A5276'; // Azul escuro e profundo (Header, Drawer Ativo)
const ACCENT_COLOR = '#4A90E2'; // Azul claro para destaque (mantido)

// Criação dos Navigators
const Drawer = createDrawerNavigator(); 
const Tab = createBottomTabNavigator(); 
const Stack = createStackNavigator(); 

// Configuração base do Header (aplicada a todos os Stacks)
const stackScreenOptions = {
    headerStyle: {
        backgroundColor: PRIMARY_COLOR, // Cabeçalho escuro
    },
    headerTintColor: '#FFFFFF', // Texto do cabeçalho branco
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

// --- 1. Stack Navigator (Tecnologia) ---
const TecnologiaStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="ListaTecnologia" component={ListaTecnologiaScreen} options={{ title: 'Tecnologia' }} />
    <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);

// --- 1. Stack Navigator (Esportes) ---
const EsportesStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="ListaEsportes" component={ListaEsportesScreen} options={{ title: 'Esportes' }} />
    <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);

// --- 2. Tab Navigator (Abas Inferiores) ---
const TabNews = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, 
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Tecnologia') {
          iconName = 'logo-react'; 
        } else if (route.name === 'Esportes') {
          iconName = 'trophy-outline'; 
        }
        // USO CORRIGIDO DO IONICONS
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      // NOVO ESTILO DA BARRA INFERIOR 
      tabBarActiveTintColor: PRIMARY_COLOR, // Ativo na cor do Header (Elegante)
      tabBarInactiveTintColor: '#A0A0A0', // Cinza suave para inativo
      tabBarStyle: {
        backgroundColor: '#FFFFFF', // Fundo branco puro
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0', // Linha divisória sutil
        paddingBottom: 5, 
        paddingTop: 5,
        height: 60, 
      },
      tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
      }
    })}
  >
    <Tab.Screen name="Tecnologia" component={TecnologiaStack} options={{ title: 'Tecnologia' }} />
    <Tab.Screen name="Esportes" component={EsportesStack} options={{ title: 'Esportes' }} />
  </Tab.Navigator>
);


// --- 3. Drawer Navigator (Raiz do App) ---
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Noticias"
        screenOptions={({ route }) => ({
          drawerIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Noticias') {
              iconName = 'newspaper-outline';
            } else if (route.name === 'Sobre') {
              iconName = 'information-circle-outline';
            }
            // USO CORRIGIDO DO IONICONS
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // Estilo do Drawer
          drawerActiveTintColor: '#FFFFFF', 
          drawerActiveBackgroundColor: PRIMARY_COLOR, 
        })}
      >
        <Drawer.Screen 
          name="Noticias" 
          component={TabNews} 
          options={{ 
            title: 'Notícias',
            headerStyle: { backgroundColor: PRIMARY_COLOR }, 
            headerTintColor: '#FFFFFF'
          }} 
        />
        <Drawer.Screen 
          name="Sobre" 
          component={SobreScreen} 
          options={{ 
            title: 'Sobre o App',
            headerStyle: { backgroundColor: PRIMARY_COLOR }, 
            headerTintColor: '#FFFFFF'
          }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;