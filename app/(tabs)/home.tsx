import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import BottomSlidingModal from "@/components/BottomSlidingModal";
import SpinDatePicker from "@/components/SpinDatePicker";
import DashBorder from "@/components/DashBorder";
import { userCategoryStore } from "@/store/category/categoryStore";
import { Category } from "@/db/types";
import { getCategories } from "@/db/queries/categories";
import { useThemeContext } from "@/context/ThemeProvider";
import { useAuthContext } from "@/context/AuthProvider";
import { useDatabase } from "@/context/DatabaseProvider";
import { Tabs } from "expo-router";
import HeaderShadowBtn from "@/components/HeaderShadowBtn";

const fakeExpenseData = [
  {
    id: "0",
    category: "food/drink",
    description: "맛있는 햄버거와 콜라를 처먹음",
    iconName: "fast-food-outline",
    title: "메가 커피",
    expense: 5.0,
    date: "2024-08-27",
  },
  {
    id: "1",
    category: "clothing/shoes",
    description: "옷이 필요해서 새 티를 장만함",
    iconName: "shirt-outline",
    title: "Nike store",
    expense: 55.0,
    date: "2024-08-27",
  },
  {
    id: "2",
    category: "transport",
    description: "퇴근 길에 다리가 너무 아파서 택시탐",
    iconName: "car-outline",
    title: "카카오 택시",
    expense: 30.0,
    date: "2024-08-27",
  },
  {
    id: "3",
    category: "education",
    description: "모던 리액트 Deep dive 구매",
    iconName: "book-outline",
    title: "교보 문고",
    expense: 40.0,
    date: "2024-08-27",
  },
  {
    id: "4",
    category: "gifts/donations",
    description: "친구 선물로 그래픽카드를 구매함",
    iconName: "gift-outline",
    title: "amazon shop",
    expense: 180.5,
    date: "2024-08-27",
  },
  {
    id: "5",
    category: "entertainment",
    description: "netflix 구독함",
    iconName: "game-controller-outline",
    title: "Netflix",
    expense: 10.0,
    date: "2024-08-27",
  },
  {
    id: "6",
    category: "house",
    description: "벽면 인테리어",
    iconName: "construct-outline",
    title: "Hyphend Design",
    expense: 860.0,
    date: "2024-08-27",
  },
  {
    id: "7",
    category: "house",
    description: "벽면 인테리어",
    iconName: "construct-outline",
    title: "Hyphend Design",
    expense: 860.0,
    date: "2024-08-27",
  },
  {
    id: "8",
    category: "house",
    description: "벽면 인테리어",
    iconName: "construct-outline",
    title: "Hyphend Design",
    expense: 860.0,
    date: "2024-08-27",
  },
];

function Expenses() {
  const colors = useThemeContext((s) => s.colors());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<Pick<Category, "id" | "name">>();
  const { db } = useDatabase();
  const { initialCategories, categories, addCategory } = userCategoryStore(
    (s) => ({
      initialCategories: s.initialCategories,
      categories: s.categories,
      addCategory: s.addCategory,
    })
  );
  const [expenses, setExpenses] = useState(fakeExpenseData);
  const authUser = useAuthContext((s) => s.authUser);
  const scrollViewCategories: Pick<Category, "id" | "name">[] = [
    { id: -1, name: "All" },
    ...categories,
  ];

  useEffect(() => {
    (async () => {
      const { data: dbCategories, error } = await getCategories(
        db,
        authUser?.id as number
      );
      if (dbCategories?.length) {
        initialCategories(dbCategories);
        setSelectedCategory(scrollViewCategories[0]);
      }
    })();
  }, []);

  const handleFilterExpenses = (name: string) => {
    if (name === "All") {
      setExpenses(fakeExpenseData);
    } else {
      setExpenses(fakeExpenseData.filter((e) => e.category === name));
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
              onPress={() => {
                console.log("Hello expo app");
              }}
            />
          ),
        }}
      />
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
          flexDirection: "row",
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {scrollViewCategories &&
            scrollViewCategories.map((c, index) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor:
                    selectedCategory?.id === c.id
                      ? colors.tabInactiveTint
                      : "transparent",
                  borderColor: colors.border,
                  borderStyle: "solid",
                  borderWidth: 0.5,
                  marginRight: 10,
                  borderRadius: 10,
                  justifyContent: "center", // 수직 중앙 정렬
                  alignItems: "center",
                  padding: 10,
                }}
                key={c.id.toString()}
                onPress={() => {
                  setSelectedCategory(c);
                  handleFilterExpenses(c.name);
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 15,
                  }}
                >
                  {c.name}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BottomSlidingModal
            show={showDatePicker}
            onClose={() => setShowDatePicker(false)}
          >
            <SpinDatePicker
              datePickerHeight={300}
              backgroundColor={colors.modalBackground}
              borderTopRadius={20}
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
      <FlatList
        data={expenses}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        renderItem={({ item }) => (
          <View
            key={item.id.toString()}
            style={{
              flexDirection: "row",
              backgroundColor: colors.btnBackground,
              padding: 10,
              borderRadius: 10,
              gap: 10,
              marginBottom: 15,
            }}
          >
            <View
              style={{
                backgroundColor: colors.background,
                padding: 10,
                borderRadius: 15,
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={item.iconName as any}
                size={23}
                color={colors.tagText}
              />
            </View>
            <View style={{ flex: 2, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: colors.background,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  opacity: 0.4,
                  fontSize: 14,
                  color: colors.background,
                }}
              >
                {item.category}
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: colors.background,
                }}
              >
                - ${item.expense.toFixed(2)}
              </Text>
              <Text
                style={{
                  opacity: 0.4,
                  fontSize: 14,
                  color: colors.background,
                }}
              >
                {item.date}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default Expenses;
