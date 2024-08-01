import { Drawer } from "expo-router/drawer";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import { useAuthContext } from "@/context/AuthProvider";
import { useThemeContext } from "@/context/ThemeProvider";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const onLogout = useAuthContext((s) => s.onLogout);
  const navigation = useNavigation();
  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log out"
        onPress={handleLogout}
        labelStyle={{ color: "red" }}
      />
    </DrawerContentScrollView>
  );
}

function Layout() {
  const colors = useThemeContext((s) => s.colors());
  return (
    <Drawer
      screenOptions={{ headerShown: false, drawerPosition: "right" }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name={"index"} options={{ drawerLabel: "Setting" }} />
    </Drawer>
  );
}

export default Layout;
