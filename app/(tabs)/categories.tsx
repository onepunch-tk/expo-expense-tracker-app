import { Text, View } from "react-native";
import { useEffect } from "react";
import { getCategoriesByUserId } from "@/db/queries/categories";
import { userCategoryStore } from "@/store/category/categoryStore";

function Categories() {
  const { initialCategories, categories, addCategory } = userCategoryStore(
    (s) => ({
      initialCategories: s.initialCategories,
      categories: s.categories,
      addCategory: s.addCategory,
    })
  );
  useEffect(() => {
    (async () => {
      const getCategories = await getCategoriesByUserId()(1);
      initialCategories(getCategories);
    })();
  }, []);
  return (
    <View>
      <Text>Categories</Text>
    </View>
  );
}

export default Categories;
