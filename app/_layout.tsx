import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import ThemeProvider from "@/context/ThemeProvider";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { expoDb } from "@/db";
import AuthProvider from "@/context/AuthProvider";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useInitializeDatabase } from "@/hooks/useInitializeDatabase";
import { router, useSegments } from "expo-router";

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
  const segments = useSegments();
  const isAuthGroup = segments[0] === "(tabs)";
  console.log(segments, isAuthGroup);

  useEffect(() => {
    if (loaded && initialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, initialized]);

  if (!loaded || !initialized) {
    return null;
  }

  if (isAuthGroup && authUser) {
    router.replace("/(tabs)");
  } else if (!authUser && isAuthGroup) {
    router.replace("/");
  }

  return (
    <>
      <StatusBar style={"auto"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"index"} />
        <Stack.Screen name={"register"} />
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
