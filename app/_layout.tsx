import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import ThemeProvider from "@/context/ThemeProvider";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { initializeDatabase } from "@/db/initialize";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { db, expoDb } from "@/db";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import AuthProvider from "@/context/AuthProvider";
import useAuthContext from "@/hooks/useAuthContext";

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
  const { success, error: migrationsError } = useMigrations(db, migrations);
  const { initialized } = useAuthContext();
  useEffect(() => {
    async function initializeDb() {
      try {
        await initializeDatabase();
      } catch (e) {
        console.error(e);
      }
    }
    if (loaded) {
      initializeDb();
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || !success || !initialized) {
    return <Slot />;
  }

  console.log(success, migrationsError);

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
