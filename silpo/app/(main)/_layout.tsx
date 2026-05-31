import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
      <>
          <Stack>
              <Stack.Screen name="categories" options={{ headerShown: false }} />
              <Stack.Screen name="products" options={{ headerShown: false }} />
          </Stack>

          {/*<NetworkLogger/>*/}
      </>

  );
}
