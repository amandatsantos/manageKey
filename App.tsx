// Importa o hook useEffect do React, a função useFonts do expo-font e o módulo SplashScreen do expo-splash-screen
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigation from './src/navigation/AppNavigation';

// Função principal do aplicativo
export default function App() {
  
  // Usa o hook useFonts para carregar fontes personalizadas. 
  // 'loaded' indica se as fontes foram carregadas corretamente.
  // 'error' captura qualquer erro que possa ocorrer durante o carregamento das fontes.
  const [loaded, error] = useFonts({
    'Title': require('./assets/fonts/Title.ttf'), // Fonte personalizada para títulos
    'Text': require('./assets/fonts/Text.ttf'),   // Fonte personalizada para texto padrão
  });

  // Hook useEffect é executado quando o status de 'loaded' ou 'error' muda.
  useEffect(() => {
    // Se as fontes forem carregadas com sucesso ou ocorrer um erro, a splash screen é ocultada
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Verificação inicial: enquanto as fontes não estão carregadas e não há erro, retorna 'null' para não renderizar nada
  if (!loaded && !error) {
    return null;
  }

  // Renderiza a navegação principal do aplicativo após o carregamento das fontes
  return (
    <AppNavigation />
  );
}
