import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "@/global.css";

import { useColorScheme } from '@/hooks/use-color-scheme';
import {Provider} from "react-redux";
import {store} from "@/store";

export const unstable_settings = {
  anchor: '(tabs)',
};

import NetworkLogger from 'react-native-network-logger';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
      <>
          <Provider store={store}>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                  <Stack>
                      <Stack.Screen name="index" options={{ headerShown: false }} />
                      <Stack.Screen name="profile" options={{ headerShown: false }} />
                      <Stack.Screen name="chat" options={{ headerShown: false }} />
                      <Stack.Screen name="(main)" options={{ headerShown: false }} />
                      <Stack.Screen name="register" options={{ headerShown: false }} />
                      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                  </Stack>
                  <StatusBar style="auto" />
              </ThemeProvider>
          </Provider>

          {/*<NetworkLogger/>*/}
      </>

  );
}
