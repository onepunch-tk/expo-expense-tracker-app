import { Tabs } from "expo-router";
import { useThemeContext } from "@/hooks/useThemeContext";
import GradientBackground from "@/components/GradientBackground";
import { Ionicons } from "@expo/vector-icons";
import HeaderShadowBtn from "@/components/HeaderShadowBtn";
import { Appearance } from "react-native";

function Layout() {
  const colors = useThemeContext((s) => s.colors());
  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: colors.background }}
      screenOptions={{
        headerStyle: { backgroundColor: colors.background, height: 130 },
        headerTintColor: colors.title,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: "bold",
        },
        tabBarBackground: () => (
          <GradientBackground
            colors={[colors.gradientStart, colors.gradientEnd]}
          />
        ),
        tabBarInactiveTintColor: colors.tabInactiveTint,
        tabBarActiveTintColor: "#fff",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Expenses Tracker",
          headerRight: () => (
            <HeaderShadowBtn
              backgroundColor={colors.btnBackground}
              shadowColor={colors.shadowColor}
              title="New"
            />
          ),
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
          headerRight: () => (
            <HeaderShadowBtn
              backgroundColor={colors.btnBackground}
              shadowColor={colors.shadowColor}
              title="New"
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
