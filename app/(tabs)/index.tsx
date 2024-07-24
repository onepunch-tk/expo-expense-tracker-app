import { Button, Text, View } from "react-native";
import { useThemeContext } from "@/hooks/useThemeContext";

function Expenses() {
  const theme = useThemeContext((s) => s.theme);
  const setTheme = useThemeContext((s) => s.setTheme);
  return (
    <View>
      <Text>Expense</Text>
      <Button
        title={"Change Theme"}
        onPress={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </View>
  );
}

export default Expenses;
