import { Tabs } from "expo-router";
import { useThemeContext } from "@/hooks/useThemeContext";
import GradientBackground from "@/components/GradientBackground";
import { Ionicons } from "@expo/vector-icons";
import AddButton from "@/components/AddButton";

function Layout() {
  const colors = useThemeContext((s) => s.colors());
  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: colors.background }}
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.title,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
        },
        tabBarBackground: () => (
          <GradientBackground
            colors={[colors.gradientStart, colors.gradientEnd]}
          />
        ),
        tabBarInactiveTintColor: colors.tabInactiveTint,
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Expenses Tracker",
          headerRight: () => <AddButton title={"New"} />,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Expenses",
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          headerTitle: "Categories",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: "Settings",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default Layout;
