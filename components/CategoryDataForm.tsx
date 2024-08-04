import { StyleSheet, Text, TextInput, View } from "react-native";
import ModalActionButtons from "@/components/ModalActionButtons";
import React, { ComponentProps, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { Theme } from "@/constants/Colors";
import { NewCategory } from "@/db/types";

type IonIconName = ComponentProps<typeof Ionicons>["name"];
const ionIcons: IonIconName[] = [
  "fast-food-outline",
  "shirt-outline",
  "car-outline",
  "book-outline",
  "walk-outline",
  "gift-outline",
  "game-controller-outline",
  "construct-outline",
  "ellipsis-horizontal-outline",
  "wifi-outline",
  "subway-outline",
  "settings-outline",
  "rocket-outline",
];

interface CategoryDataFormProps {
  onClose: () => void;
  onSubmit: (newCategory: NewCategory) => Promise<void>;
  colors: Theme;
}

function CategoryDataForm({
  onSubmit,
  onClose,
  colors,
}: CategoryDataFormProps) {
  const [selectedIcon, setSelectedIcon] = useState<IonIconName>(ionIcons[0]);
  const [categoryName, setCategoryName] = useState("");
  const handleSubmit = async () => {
    if (categoryName && selectedIcon) {
      await onSubmit({
        name: categoryName,
        ionIconName: selectedIcon,
        isDefault: false,
      });
      onClose();
    }
  };
  return (
    <View style={{ padding: 40, gap: 20 }}>
      <ModalActionButtons
        primaryText={"Submit"}
        onPrimaryAction={handleSubmit}
        onClose={onClose}
      />
      <TextInput
        style={styles.input}
        value={categoryName}
        placeholder={"Title"}
        onChangeText={(value) => setCategoryName(value)}
      />
      <View>
        <Text style={styles.label}>Select Category Icon</Text>
        <View style={styles.container}>
          {ionIcons.map((iconName) => (
            <View key={iconName} style={styles.iconContainer}>
              <Checkbox
                style={styles.checkbox}
                value={selectedIcon === iconName}
                onValueChange={() => setSelectedIcon(iconName)}
                color={
                  selectedIcon === iconName ? colors.btnBackground : undefined
                }
              />
              <Ionicons
                name={iconName}
                size={24}
                color={
                  selectedIcon === iconName ? colors.btnBackground : "#000"
                }
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
  },
  checkbox: {
    margin: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A5568",
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    backgroundColor: "#F7FAFC",
    color: "#4A5568",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default CategoryDataForm;
