import { FlatList, Text, View } from "react-native";
import { ComponentProps } from "react";
import { userCategoryStore } from "@/store/category/categoryStore";
import DashBorder from "@/components/DashBorder";
import { Ionicons } from "@expo/vector-icons";
import { useAuthContext } from "@/context/AuthProvider";
import { useThemeContext } from "@/context/ThemeProvider";
import { Tabs } from "expo-router";
import HeaderShadowBtn from "@/components/HeaderShadowBtn";

type IonicIconName = ComponentProps<typeof Ionicons>["name"];

function Categories() {
  const { categories, addCategory } = userCategoryStore((s) => ({
    categories: s.categories,
    addCategory: s.addCategory,
  }));
  const authUser = useAuthContext((s) => s.authUser);
  const colors = useThemeContext((s) => s.colors());

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <HeaderShadowBtn
              backgroundColor={colors.btnBackground}
              shadowColor={colors.shadowColor}
              title="New"
              onPress={() => {
                console.log("Hello world");
              }}
            />
          ),
        }}
      />
      <Text
        style={{
          color: colors.title,
          fontWeight: "bold",
          fontSize: 24,
        }}
      >
        Current Category List
      </Text>
      <DashBorder marginVertical={20} />
      <FlatList
        data={categories}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              minHeight: 100,
              borderRadius: 20,
              paddingVertical: 20,
              paddingHorizontal: 10,
              borderColor: colors.border,
              borderWidth: 2,
            }}
          >
            <View
              style={{
                width: 100, // 고정 너비 설정
                justifyContent: "center",
                alignItems: "center", // 중앙 정렬로 변경
                gap: 10,
              }}
            >
              <Ionicons
                name={item.ionicIconName as IonicIconName}
                color={colors.title}
                size={30}
              />
              <Text
                style={{
                  color: colors.title,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
                numberOfLines={2}
                ellipsizeMode={"tail"}
              >
                {item.name}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                minHeight: 80,
                flexDirection: "column",
                marginLeft: 5,
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: colors.title }}>
                    expenses: {item.expenseCount}
                  </Text>
                  {!item.isDefault ? <View>삭제</View> : null}
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default Categories;
