import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import ThemeProvider from "@/context/ThemeProvider";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { expoDb } from "@/db";
import AuthProvider from "@/context/AuthProvider";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useInitializeDatabase } from "@/hooks/useInitializeDatabase";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [initialized, dbErrorMessage] = useInitializeDatabase();
  const authUser = useAuthContext((s) => s.authUser);

  useEffect(() => {
    if (loaded && initialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, initialized]);

  if (!loaded || !initialized) {
    return null;
  }

  if (!authUser) {
    return <Slot />;
  }

  return (
    <>
      <StatusBar style={"auto"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"index"} />
        <Stack.Screen name={"(tabs)"} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  useDrizzleStudio(expoDb as any);
  return (
    <ThemeProvider>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}
