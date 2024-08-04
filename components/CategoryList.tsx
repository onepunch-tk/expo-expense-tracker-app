import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Category } from "@/db/types";
import React from "react";
import { Theme } from "@/constants/Colors";

interface CategoryListProps {
  categories: Pick<Category, "id" | "name">[];
  selectedId: number;
  onSelect: (id: number) => void;
  colors: Theme;
}

function CategoryList({
  categories,
  selectedId,
  onSelect,
  colors,
}: CategoryListProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((c) => (
        <TouchableOpacity
          style={[
            styles.categoryButton,
            {
              backgroundColor:
                selectedId === c.id ? colors.tabInactiveTint : "transparent",
              borderColor: colors.border,
            },
          ]}
          key={c.id.toString()}
          onPress={() => onSelect(c.id)}
        >
          <Text style={[styles.categoryText, { color: colors.text }]}>
            {c.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  categoryButton: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  categoryText: {
    fontSize: 15,
  },
});

export default CategoryList;
