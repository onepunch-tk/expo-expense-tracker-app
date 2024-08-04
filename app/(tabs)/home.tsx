import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import BottomSlidingModal from "@/components/BottomSlidingModal";
import SpinDatePicker from "@/components/SpinDatePicker";
import DashBorder from "@/components/DashBorder";
import { useCategoryStore } from "@/store/category/categoryStore";
import { Category, NewExpense } from "@/db/types";
import { useThemeContext } from "@/context/ThemeProvider";
import { useAuthContext } from "@/context/AuthProvider";
import { useDatabase } from "@/context/DatabaseProvider";
import { Tabs } from "expo-router";
import HeaderShadowBtn from "@/components/HeaderShadowBtn";
import { useExpenseStore } from "@/store/expense/expenseStore";
import { useInitialData } from "@/hooks/useInitialData";
import CategoryList from "@/components/CategoryList";
import ExpenseList from "@/components/ExpenseList";
import ExpenseDataForm from "@/components/ExpenseDataForm";
import { createExpense } from "@/db/queries/expenses";

function Expenses() {
  const colors = useThemeContext((s) => s.colors());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showNewExpenseModal, setNewExpenseModal] = useState(false);
  const { db } = useDatabase();
  const { initialCategories, addCategory, categories } = useCategoryStore();
  const {
    getFilteredExpenses,
    addExpense,
    initializeExpenseGroup,
    setSelectedCategoryId,
    selectedCategoryId,
    setSelectedDate,
  } = useExpenseStore();

  const authUser = useAuthContext((s) => s.authUser);
  const { isLoading, error } = useInitialData(
    db,
    authUser?.id as number,
    initialCategories,
    initializeExpenseGroup
  );
  const scrollViewCategories = useMemo<Pick<Category, "id" | "name">[]>(
    () => [{ id: -1, name: "All" }, ...categories],
    [categories]
  );
  const filterExpenseGroup = getFilteredExpenses();

  const handleSubmitExpense = async (newExpense: NewExpense) => {
    console.log("newExpense: ", newExpense);
    const { data: createdExpense, error } = await createExpense(db, newExpense);

    if (error) {
      console.error(error);
      return;
    }

    if (createdExpense) {
      addExpense(createdExpense);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <HeaderShadowBtn
              backgroundColor={colors.btnBackground}
              shadowColor={colors.shadowColor}
              title="New"
              onPress={() => setNewExpenseModal(true)}
            />
          ),
        }}
      />
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.tagText} />
          <Text
            style={{ color: colors.title, fontSize: 24, fontWeight: "bold" }}
          >
            Loading...
          </Text>
        </View>
      ) : (
        <>
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <CategoryList
              categories={scrollViewCategories}
              selectedId={selectedCategoryId}
              onSelect={setSelectedCategoryId}
              colors={colors}
            />
            <View
              style={{
                marginLeft: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BottomSlidingModal
                show={showDatePicker}
                onClose={() => setShowDatePicker(false)}
              >
                <SpinDatePicker
                  colors={colors}
                  onClose={() => setShowDatePicker(false)}
                  onSelectedDate={setSelectedDate}
                />
              </BottomSlidingModal>
              <TouchableOpacity
                onPress={() => setShowDatePicker((prevState) => !prevState)}
              >
                <Ionicons name={"calendar"} size={30} color={colors.title} />
              </TouchableOpacity>
            </View>
          </View>
          <DashBorder marginVertical={20} />
          <ExpenseList
            expenses={filterExpenseGroup}
            categories={categories}
            colors={colors}
          />
          <BottomSlidingModal
            show={showNewExpenseModal}
            onClose={() => setNewExpenseModal(false)}
          >
            <ExpenseDataForm
              categories={categories}
              onSubmit={handleSubmitExpense}
              onClose={() => setNewExpenseModal(false)}
            />
          </BottomSlidingModal>
        </>
      )}
    </View>
  );
}

export default Expenses;
