// index.js (Crie este arquivo na raiz do seu projeto)

// Esta linha força a importação do handler ANTES de qualquer coisa nativa
import 'react-native-gesture-handler';

// Importa o componente App do seu App.js
import { registerRootComponent } from 'expo';
import App from './App';

// Registra o componente principal (App)
registerRootComponent(App);