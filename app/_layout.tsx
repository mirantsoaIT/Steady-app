import { useState } from 'react';
import { Stack } from 'expo-router';
import SplashScreenComponent from '../components/screens/splashScreen';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_500Medium, Montserrat_300Light, Montserrat_200ExtraLight, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { AnnieUseYourTelescope_400Regular } from '@expo-google-fonts/annie-use-your-telescope/400Regular';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_300Light,
    Montserrat_200ExtraLight,
    Montserrat_600SemiBold,
    AnnieUseYourTelescope_400Regular
  });

  if (!fontsLoaded) return null;

  if (!isReady) {
    return <SplashScreenComponent onFinish={() => setIsReady(true)} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}