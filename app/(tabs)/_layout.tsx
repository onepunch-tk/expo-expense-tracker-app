import { Tabs } from "expo-router";
import { useThemeContext } from "@/hooks/useThemeContext";
import GradientBackground from "@/components/GradientBackground";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Expenses Tracker",
          headerRight: () => (
            <View
              // style={{
              //   backgroundColor: colors.btnBackground,
              //   borderRadius: 10,
              //   marginRight: 20,
              //   paddingVertical: 10,
              //   paddingHorizontal: 15,
              //   shadowColor: colors.btnBackground,
              //   // shadowOffset: {
              //   //   width: 0,
              //   //   height: 7,
              //   // },
              //   // shadowOpacity: 0.43,
              //   // shadowRadius: 9.51,
              //   elevation: 20,
              // }}
              style={[styles.card, styles.elevation]}
            >
              <TouchableOpacity>
                <Text>Click</Text>
              </TouchableOpacity>
            </View>
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

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    backgroundColor: "#52006A",
    borderRadius: 10,
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
    marginVertical: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },
});

export default Layout;
