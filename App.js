import 'react-native-gesture-handler'; 

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// Correção: Utilização do pacote nativo do Expo para ícones para garantir a renderização.
import { Ionicons } from '@expo/vector-icons'; 

import { SobreScreen, DetalheNoticiaScreen, ListaTecnologiaScreen, ListaEsportesScreen } from './src/screens/Screens'; 

// Definição das cores para consistência visual.
const PRIMARY_COLOR = '#1A5276'; // Mantido para o Drawer Ativo
const ACCENT_COLOR = '#00C853'; // Verde Vibrante

// Inicialização dos Navigators.
const Drawer = createDrawerNavigator(); 
const Tab = createBottomTabNavigator(); 
const Stack = createStackNavigator(); 

// Configuração padrão dos Headers de todas as Stacks.
const stackScreenOptions = {
    // NOVO: Header Fundo Branco
    headerStyle: {
        backgroundColor: '#FFFFFF', 
    },
    // NOVO: Texto do Header Preto
    headerTintColor: '#000000', 
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

// Stack Navigator para a seção Tecnologia.
const TecnologiaStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="ListaTecnologia" component={ListaTecnologiaScreen} options={{ title: 'Notícias' }} />
    <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);

// Stack Navigator para a seção Esportes.
const EsportesStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="ListaEsportes" component={ListaEsportesScreen} options={{ title: 'Esportes' }} />
    <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);

// Tab Navigator para a navegação inferior das Notícias.
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
        // Uso do componente Ionicons importado do Expo.
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      // Estilização do Tab Bar.
      tabBarActiveTintColor: ACCENT_COLOR, // Ativo na cor de destaque (verde)
      tabBarInactiveTintColor: '#A0A0A0', 
      tabBarStyle: {
        backgroundColor: '#FFFFFF', 
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0', 
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


// Drawer Navigator como estrutura raiz do aplicativo.
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
            // Uso do componente Ionicons importado do Expo.
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // Estilo do Drawer.
          drawerActiveTintColor: '#FFFFFF', 
          drawerActiveBackgroundColor: PRIMARY_COLOR, 
        })}
      >
        <Drawer.Screen 
          name="Noticias" 
          component={TabNews} 
          options={{ 
            title: 'Notícias',
            // O Drawer Header usa a cor primária para maior destaque.
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