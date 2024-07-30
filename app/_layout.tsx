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
import { useThemeContext } from "@/hooks/useThemeContext";

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
  const theme = useThemeContext((s) => s.theme);
  const segments = useSegments();
  useDrizzleStudio(expoDb as any);

  useEffect(() => {
    if (loaded && initialized) {
      SplashScreen.hideAsync();
      const isAuthGroup = segments[0] === "(tabs)";
      if (isAuthGroup && !authUser) {
        router.replace("/");
      } else if (!isAuthGroup && authUser) {
        router.replace("/(tabs)/home");
      }
    }
  }, [loaded, initialized, authUser, segments]);

  if (!loaded || !initialized) {
    return null;
  }

  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"index"} />
        <Stack.Screen name={"register"} />
        <Stack.Screen name={"(tabs)"} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}
