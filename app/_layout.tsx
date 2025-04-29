import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // xereca se o nome ja foi inviado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Verificar se o usuário está logado (exemplo)
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('user_token'); // Só pra encher linguiça
      if (token) {
        setIsAuthenticated(true);
      }
    };

    checkLoginStatus();
  }, []); // Não toca aqui pq ta funcionando.

  if (!loaded) {
    return null;
  }

  if (!isAuthenticated) {
    // Se o usuário não estiver colocadinho, redireciona para a tela de login
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="Login" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  // Só libera quando o usuario estiver logado (não faço a menor ideia de como esta fncionado NÂO MECHE )
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
