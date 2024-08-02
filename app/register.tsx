import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Stack from "expo-router/stack";
import { useState } from "react";
import { router } from "expo-router";
import { useThemeContext } from "@/context/ThemeProvider";
import { useAuthContext } from "@/context/AuthProvider";
import { useDatabase } from "@/context/DatabaseProvider";

function Register() {
  const colors = useThemeContext((s) => s.colors());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { db } = useDatabase();

  const onRegister = useAuthContext((s) => s.onRegister);

  const handleRegister = async () => {
    if (!email || !password) return;
    const { user, error } = await onRegister(db, email, password);
    if (error) {
      console.error(error);
      return;
    }

    router.replace("/");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Create Account",
          headerBackTitle: "Sing in",
          headerTitleStyle: {
            color: colors.title,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <Image
        source={{ uri: "https://galaxies.dev/img/logos/logo--blue.png" }}
        style={styles.image}
      />

      <TextInput
        autoCapitalize="none"
        placeholder="Enter your Email..."
        value={email}
        onChangeText={setEmail}
        style={[
          styles.inputField,
          { borderColor: colors.border, color: colors.title },
        ]}
        placeholderTextColor={colors.title}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[
          styles.inputField,
          { borderColor: colors.border, color: colors.title },
        ]}
        placeholderTextColor={colors.title}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={[styles.button, { borderColor: colors.border }]}
      >
        <Text style={{ color: colors.title }}>Sign up</Text>
      </TouchableOpacity>

      {loading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.background,
              zIndex: 1,
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color={colors.title} size="large" />
        </View>
      )}
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
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    padding: 12,
    borderRadius: 4,
  },
});

export default Register;
