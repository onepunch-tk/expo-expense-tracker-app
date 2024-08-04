import { Switch, Text, View } from "react-native";
import { useThemeContext } from "@/context/ThemeProvider";

function Index() {
  const { colors, setTheme, theme } = useThemeContext((s) => ({
    colors: s.colors(),
    setTheme: s.setTheme,
    theme: s.theme,
  }));
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ color: colors.title }}>Toggle Theme</Text>
        <Switch
          value={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      </View>
    </View>
  );
}

export default Index;
