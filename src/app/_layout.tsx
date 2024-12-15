import '@/global.css';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { JsStack } from '../layouts/js-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { CartProvider } from '../providers/CartProvider';
import AuthProvider from '../providers/AuthProvider';
import QueryProvider from '../providers/QueryProvider';
import { StripeProvider } from '@stripe/stripe-react-native';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}>
      <AuthProvider>
        <QueryProvider>
          <CartProvider>
            <RootLayoutNav />
          </CartProvider>
        </QueryProvider>
      </AuthProvider>
    </StripeProvider>
  );
}

function RootLayoutNav() {
  return (
    <JsStack
      screenOptions={{
        animation: 'slide_from_bottom',
      }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
      <JsStack.Screen
        name="cart"
        options={{
          title: 'Cart',
          presentation: 'modal',
          ...TransitionPresets.ModalPresentationIOS,
          headerTitleAlign: 'center',
        }}
      />
    </JsStack>
  );
}
