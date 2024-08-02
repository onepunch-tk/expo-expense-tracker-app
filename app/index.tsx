import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { useThemeContext } from "@/context/ThemeProvider";
import { useAuthContext } from "@/context/AuthProvider";
import { initializeCategories } from "@/db/queries/categories";
import { useDatabase } from "@/context/DatabaseProvider";

function Index() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const colors = useThemeContext((s) => s.colors());
  const onLogin = useAuthContext((s) => s.onLogin);
  const { db, isLoading, error } = useDatabase();

  useEffect(() => {
    (async () => {
      await initializeCategories(db);
    })();
  }, []);
  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    const { error } = await onLogin(db, email, password);
    if (error) {
      console.error(error);
      return;
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={{ uri: "https://galaxies.dev/img/logos/logo--blue.png" }}
        style={styles.image}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Enter your email..."
        value={email}
        onChangeText={setEmail}
        style={[
          styles.inputField,
          { color: colors.title, borderColor: colors.border },
        ]}
        placeholderTextColor={colors.title}
      />
      <TextInput
        placeholder="Enter your password..."
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[
          styles.inputField,
          { color: colors.title, borderColor: colors.border },
        ]}
        placeholderTextColor={colors.title}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          marginTop: 20,
          alignItems: "center",
          padding: 12,
          borderRadius: 4,
        }}
      >
        <Text style={{ color: colors.text }}>Sign in</Text>
      </TouchableOpacity>

      <Link href="/register" asChild>
        <TouchableOpacity
          style={{
            marginVertical: 8,
            alignItems: "center",
            backgroundColor: "transparent",
            padding: 12,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.text }}>Create Account</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  header: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
  subheader: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    color: "#fff",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  button: {},
  outlineButton: {},
});

export default Index;
