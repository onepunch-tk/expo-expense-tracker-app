import { Button, Text, View } from "react-native";
import { useThemeContext } from "@/hooks/useThemeContext";

function TestComponenet() {
  const theme = useThemeContext((s) => s.theme);

  const setTheme = useThemeContext((s) => s.setTheme);
  return (
    <View>
      <Text>TestComponenet</Text>
      <Button
        title={"Change Theme"}
        onPress={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <Text>{theme}</Text>
    </View>
  );
}

export default TestComponenet;
