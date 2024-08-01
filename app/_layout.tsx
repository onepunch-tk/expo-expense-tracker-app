import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import ThemeProvider, { useThemeContext } from "@/context/ThemeProvider";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import AuthProvider, { useAuthContext } from "@/context/AuthProvider";
import { router, useSegments } from "expo-router";
import DatabaseProvider from "@/context/DatabaseProvider";
import { useDrizzleStudioHelper, useMigrationHelper } from "@/db/dirzzle";

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
  const authUser = useAuthContext((s) => s.authUser);
  const theme = useThemeContext((s) => s.theme);
  const segments = useSegments();
  const { success, error: migrationsError } = useMigrationHelper();
  useDrizzleStudioHelper();
  // useDrizzleStudio(expoDb as any);
  useEffect(() => {
    if (loaded && success) {
      SplashScreen.hideAsync();
      const isAuthGroup = segments[0] === "(tabs)";
      if (isAuthGroup && !authUser) {
        router.replace("/");
      } else if (!isAuthGroup && authUser) {
        router.replace("/(tabs)/home");
      }
    }
  }, [loaded, success, authUser, segments]);

  if (!loaded || !success) {
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
    <DatabaseProvider>
      <ThemeProvider>
        <AuthProvider>
          <InitialLayout />
        </AuthProvider>
      </ThemeProvider>
    </DatabaseProvider>
  );
}
