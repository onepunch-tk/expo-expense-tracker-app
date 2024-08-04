import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Picker as RNPickerSelect } from "@react-native-picker/picker";
import { Category, NewExpense } from "@/db/types";
import ModalActionButtons from "@/components/ModalActionButtons";
import { useAuthContext } from "@/context/AuthProvider";

interface ExpenseDataFormProps extends PropsWithChildren {
  categories: Category[];
  onSubmit: (newExpense: NewExpense) => void;
  onClose: () => void;
}

interface ExpenseFormData {
  title: string;
  description?: string;
  amount: string;
}
//todo: modal 버튼 컨테이너 컴포넌트로 만들기(DatePickerModal에 구현되어있음 분리만 시키면됌 - 완료
//todo: input 컴포넌트 따로 분리하고, form 컴포넌트(new expense form 컴포넌트 만들어야함) 안에서 호출하기
//todo: dropdown picker 따로 분리
function ExpenseDataForm({
  children,
  categories,
  onSubmit,
  onClose,
}: ExpenseDataFormProps) {
  const [expenseData, setExpenseData] = useState<ExpenseFormData>({
    title: "",
    description: "",
    amount: "",
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const authUser = useAuthContext((s) => s.authUser);
  useEffect(() => {
    setSelectedCategoryId(categories[0].id);
  }, [categories]);
  const handleChangeExpenseData = <K extends keyof ExpenseFormData>(
    key: K,
    value: string
  ) => {
    if (key === "amount") {
      // 숫자, 소수점, 빈 문자열만 허용
      const regex = /^$|^\d*\.?\d{0,2}$/;
      if (regex.test(value)) {
        setExpenseData((prevData) => ({
          ...prevData,
          [key]: value,
        }));
      }
    } else {
      setExpenseData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };

  const handleChangeCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleSubmit = () => {
    if (expenseData.amount && expenseData.title && selectedCategoryId) {
      const { amount, description, title } = expenseData;
      console.log("selectedCategoryId ", typeof selectedCategoryId);
      onSubmit({
        amount: parseFloat(amount),
        title,
        description,
        categoryId:
          typeof selectedCategoryId === "string"
            ? parseInt(selectedCategoryId)
            : selectedCategoryId,
        userId: authUser?.id as number,
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
      <View style={{ gap: 10 }}>
        <TextInput
          style={styles.input}
          value={expenseData.title}
          placeholder={"Title"}
          onChangeText={(value) => handleChangeExpenseData("title", value)}
        />
        <TextInput
          style={styles.input}
          keyboardType={Platform.OS === "ios" ? "decimal-pad" : "numeric"}
          value={expenseData.amount}
          placeholder={"Amount"}
          onChangeText={(value) => handleChangeExpenseData("amount", value)}
        />
        <TextInput
          style={styles.input}
          value={expenseData.description}
          placeholder={"Description"}
          onChangeText={(value) =>
            handleChangeExpenseData("description", value)
          }
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Select Category</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            selectedValue={selectedCategoryId}
            onValueChange={handleChangeCategory}
            mode="dropdown"
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {categories.map((category) => (
              <RNPickerSelect.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </RNPickerSelect>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A5568",
    marginBottom: 8,
  },
  pickerContainer: {
    ...Platform.select({
      ios: {
        backgroundColor: "#F7FAFC",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
      },
      android: {
        backgroundColor: "#F7FAFC",
        borderRadius: 10,
        elevation: 2,
      },
    }),
  },
  picker: {
    ...Platform.select({
      ios: {
        height: 50,
      },
      android: {
        height: 50,
        color: "#4A5568",
      },
    }),
  },
  pickerItem: {
    color: "#4A5568",
    fontSize: 16,
    height: 50,
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

export default ExpenseDataForm;
