import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ComponentProps, useState } from "react";
import { useCategoryStore } from "@/store/category/categoryStore";
import DashBorder from "@/components/DashBorder";
import { Ionicons } from "@expo/vector-icons";
import { useAuthContext } from "@/context/AuthProvider";
import { useThemeContext } from "@/context/ThemeProvider";
import { Tabs } from "expo-router";
import HeaderShadowBtn from "@/components/HeaderShadowBtn";
import BottomSlidingModal from "@/components/BottomSlidingModal";
import CategoryDataForm from "@/components/CategoryDataForm";
import { NewCategory } from "@/db/types";
import { createCategory, deleteCategory } from "@/db/queries/categories";
import { useDatabase } from "@/context/DatabaseProvider";
import { useExpenseStore } from "@/store/expense/expenseStore";

type IonIconName = ComponentProps<typeof Ionicons>["name"];

function Categories() {
  const { categories, addCategory, removeCategory } = useCategoryStore();
  const deleteExpenseFromCategoryId = useExpenseStore(
    (s) => s.deleteExpenseFromCategoryId
  );
  const authUser = useAuthContext((s) => s.authUser);
  const colors = useThemeContext((s) => s.colors());
  const [showNewCategory, setShowNewCategory] = useState(false);
  const { db } = useDatabase();
  const handleModalClose = () => {
    setShowNewCategory(false);
  };

  const handleSubmitCategory = async (newCategory: NewCategory) => {
    const { data: createdCategory, error } = await createCategory(
      db,
      newCategory,
      authUser?.id as number
    );

    if (!createdCategory) {
      console.error(error);
      return;
    }

    addCategory(createdCategory);
  };

  const handleDeleteCategory = async (categoryId: number) => {
    await deleteCategory(db, authUser?.id as number, categoryId);
    removeCategory(categoryId);
    deleteExpenseFromCategoryId(categoryId);
  };
  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <HeaderShadowBtn
              backgroundColor={colors.btnBackground}
              shadowColor={colors.shadowColor}
              title="New"
              onPress={() => setShowNewCategory(true)}
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
                name={item.ionIconName as IonIconName}
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
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Text style={{ color: colors.title }}>
                    expenses: {item.expenseCount}
                  </Text>
                  {!item.isDefault ? (
                    <TouchableOpacity
                      onPress={() => handleDeleteCategory(item.id)}
                      style={{
                        backgroundColor: "red",
                        padding: 5,
                        alignItems: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Delete</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        )}
      />
      <BottomSlidingModal show={showNewCategory} onClose={handleModalClose}>
        <CategoryDataForm
          onSubmit={handleSubmitCategory}
          onClose={handleModalClose}
          colors={colors}
        />
      </BottomSlidingModal>
    </View>
  );
}

export default Categories;
