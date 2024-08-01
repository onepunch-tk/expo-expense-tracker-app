import { Tabs, useNavigation } from "expo-router";
import GradientBackground from "@/components/GradientBackground";
import { Ionicons } from "@expo/vector-icons";
import HeaderShadowBtn from "@/components/HeaderShadowBtn";
import { DrawerActions } from "@react-navigation/native";
import { useThemeContext } from "@/context/ThemeProvider";

function Layout() {
  const colors = useThemeContext((s) => s.colors());
  const navigation = useNavigation();
  return (
    <Tabs
      initialRouteName={"home"}
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
        name="home"
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
          tabBarLabel: "Categories",
        }}
      />
      <Tabs.Screen
        name="(drawer)"
        options={{
          headerTitle: "Settings",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
          headerRight: () => (
            <Ionicons
              name="menu"
              size={24}
              color={colors.title}
              style={{ marginRight: 15 }}
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            />
          ),
          tabBarLabel: "Settings",
        }}
      />
    </Tabs>
  );
}

export default Layout;
