import { FlatList, StyleSheet, Text, View } from "react-native";
import { Category } from "@/db/types";
import { ExpenseGroup } from "@/store/expense/expenseStore";
import { Theme } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface ExpenseListProps {
  expenses: ExpenseGroup[];
  categories: Category[];
  colors: Theme; // ThemeColors 타입을 정의하고 사용하는 것이 좋습니다
}

function ExpenseList({ expenses, categories, colors }: ExpenseListProps) {
  const renderExpenseItem = ({ item }: { item: ExpenseGroup }) => (
    <View>
      <View style={styles.dateHeader}>
        <Text style={[styles.dateHeaderText, { color: colors.title }]}>
          {`${item.sortDate.year}-${String(item.sortDate.month).padStart(
            2,
            "0"
          )}`}
        </Text>
      </View>
      {item.expenses.map((ex) => (
        <View
          key={ex.id.toString()}
          style={[
            styles.expenseItem,
            { backgroundColor: colors.btnBackground },
          ]}
        >
          <View
            style={[
              styles.categoryIcon,
              { backgroundColor: colors.background },
            ]}
          >
            <Ionicons
              name={
                categories.find((cat) => cat.id === ex.categoryId)
                  ?.ionIconName as any
              }
              size={23}
              color={colors.tagText}
            />
          </View>
          <View style={styles.expenseDetails}>
            <Text style={[styles.expenseTitle, { color: colors.background }]}>
              {ex.title}
            </Text>
            <Text
              style={[styles.expenseCategory, { color: colors.background }]}
            >
              {categories.find((cat) => cat.id === ex.categoryId)?.name}
            </Text>
          </View>
          <View style={styles.expenseAmount}>
            <Text
              style={[styles.expenseAmountText, { color: colors.background }]}
            >
              - ${ex.amount.toFixed(2)}
            </Text>
            <Text style={[styles.expenseDate, { color: colors.background }]}>
              {ex.createdAt}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => `${item.sortDate.year}-${item.sortDate.month}`}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      windowSize={3}
      removeClippedSubviews={true}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  dateHeader: {
    paddingVertical: 10,
  },
  dateHeaderText: {
    fontWeight: "bold",
    opacity: 0.4,
  },
  expenseItem: {
    gap: 10,
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  categoryIcon: {
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
  expenseDetails: {
    flex: 2,
    justifyContent: "center",
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expenseCategory: {
    opacity: 0.4,
    fontSize: 14,
  },
  expenseAmount: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  expenseAmountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expenseDate: {
    opacity: 0.4,
    fontSize: 14,
  },
});

export default ExpenseList;
