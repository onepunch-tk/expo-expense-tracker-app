import { StyleSheet, Text, View } from "react-native";
import { useThemeContext } from "@/hooks/useThemeContext";

function Register() {
  const colors = useThemeContext((s) => s.colors());

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text>Register</Text>
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
});

export default Register;
