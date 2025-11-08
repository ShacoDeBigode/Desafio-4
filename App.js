import 'react-native-gesture-handler'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 

import { 
    SobreScreen, 
    DetalheNoticiaScreen, 
    ListaTecnologiaScreen, 
    ListaEsportesScreen,
    ListaMusicaScreen, 
    ListaTendenciasScreen, 
    ListaModaScreen, 
    ListaTVScreen 
} from './src/screens/Screens'; 

const PRIMARY_COLOR = '#6A0DAD'; 
const ACCENT_COLOR = '#8A2BE2'; 

const Drawer = createDrawerNavigator(); 
const Tab = createBottomTabNavigator(); 
const Stack = createStackNavigator(); 

const stackScreenOptions = {
    headerStyle: {
        backgroundColor: PRIMARY_COLOR, 
    },
    headerTintColor: '#FFFFFF', 
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

// Pilhas de Navegação para cada Categoria
const TecnologiaStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="ListaTecnologia" component={ListaTecnologiaScreen} options={{ title: 'Tecnologia' }} />
    <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);

const EsportesStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="ListaEsportes" component={ListaEsportesScreen} options={{ title: 'Esportes' }} />
    <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);

const MusicaStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="ListaMusica" component={ListaMusicaScreen} options={{ title: 'Música' }} />
    <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);

const TendenciasStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="ListaTendencias" component={ListaTendenciasScreen} options={{ title: 'Tendências' }} />
    <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);

const ModaStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="ListaModa" component={ListaModaScreen} options={{ title: 'Moda' }} />
    <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);

const TVStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="ListaTV" component={ListaTVScreen} options={{ title: 'TV' }} />
    <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);


// Tab Navigator para a navegação inferior (6 categorias)
const TabNews = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, 
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Tecnologia') {
          iconName = 'laptop-outline'; 
        } else if (route.name === 'Esportes') {
          iconName = 'football-outline'; 
        } else if (route.name === 'Música') {
          iconName = 'musical-notes-outline'; 
        } else if (route.name === 'Tendências') {
          iconName = 'trending-up-outline'; 
        } else if (route.name === 'Moda') {
          iconName = 'body-outline'; 
        } else if (route.name === 'TV') {
          iconName = 'tv-outline'; 
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: PRIMARY_COLOR, 
      tabBarInactiveTintColor: '#A0A0A0', 
      tabBarStyle: {
        backgroundColor: '#FFFFFF', 
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0', 
        // AUMENTA O PADDING E A ALTURA PARA RESPEITAR A BARRA NATIVA
        paddingBottom: 10, 
        paddingTop: 5,
        height: 70, 
      },
      tabBarLabelStyle: {
          fontSize: 10, 
          fontWeight: '600',
      }
    })}
  >
    <Tab.Screen name="Tecnologia" component={TecnologiaStack} options={{ title: 'Tech' }} />
    <Tab.Screen name="Esportes" component={EsportesStack} options={{ title: 'Esporte' }} />
    <Tab.Screen name="Música" component={MusicaStack} options={{ title: 'Música' }} />
    <Tab.Screen name="Tendências" component={TendenciasStack} options={{ title: 'Trends' }} />
    <Tab.Screen name="Moda" component={ModaStack} options={{ title: 'Moda' }} />
    <Tab.Screen name="TV" component={TVStack} options={{ title: 'TV' }} />
  </Tab.Navigator>
);


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
            return <Ionicons name={iconName} size={size} color={color} />;
          },
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