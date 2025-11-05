
import 'react-native-gesture-handler'; 

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Importa as telas da pasta src/screens/Screens.js (caminho ajustado)
import { SobreScreen, DetalheNoticiaScreen, ListaTecnologiaScreen, ListaEsportesScreen } from './src/screens/Screens'; 

// Criação dos Navigators
const Drawer = createDrawerNavigator(); // Raiz do App [cite: 10, 19]
const Tab = createBottomTabNavigator(); // Seção Notícias [cite: 13, 27]
const Stack = createStackNavigator(); // Abas/Categorias [cite: 16]

// --- 1. Stack Navigator (Abas/Categorias) ---
const TecnologiaStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ListaTecnologia" component={ListaTecnologiaScreen} options={{ title: 'Tecnologia' }} />
    <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);

const EsportesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ListaEsportes" component={ListaEsportesScreen} options={{ title: 'Esportes' }} />
    <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);

// --- 2. Tab Navigator (Seção Notícias) ---
const TabNews = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, 
      tabBarIcon: ({ color, size }) => {
        let iconName;
        // Ícones nas Abas (Regra: Ícones nas Abas) [cite: 35]
        if (route.name === 'Tecnologia') {
          iconName = 'logo-react'; 
        } else if (route.name === 'Esportes') {
          iconName = 'trophy-outline'; 
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007bff', 
      tabBarInactiveTintColor: 'gray',
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
            // Ícones no Drawer (Regra: Ícones no Drawer) [cite: 35]
            if (route.name === 'Noticias') {
              iconName = 'newspaper-outline';
            } else if (route.name === 'Sobre') {
              iconName = 'information-circle-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          drawerActiveTintColor: '#007bff',
        })}
      >
        {/* Opções Notícias e Sobre (Regra: Duas opções no menu) [cite: 21] */}
        <Drawer.Screen name="Noticias" component={TabNews} options={{ title: 'Notícias' }} />
        <Drawer.Screen name="Sobre" component={SobreScreen} options={{ title: 'Sobre' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;