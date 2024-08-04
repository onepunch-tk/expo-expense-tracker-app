import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "react-native-wheel-pick";
import { Theme } from "@/constants/Colors";
import { SelectedDate } from "@/store/expense/expenseStore";
import ModalActionButtons from "@/components/ModalActionButtons";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface SpinDatePickerProps {
  colors: Theme;
  onClose: () => void;
  onSelectedDate: (date: SelectedDate) => void;
}

function SpinDatePicker({
  colors,
  onClose,
  onSelectedDate,
}: SpinDatePickerProps) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [selectedValue, setSelectedValue] = useState("all");

  const pickerData = [
    { value: "all", label: "All" },
    ...Array.from({ length: 120 }, (_, i) => {
      const date = new Date(currentYear, currentMonth - i, 1);
      return {
        value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`,
        label: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
      };
    }),
  ];

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleSelected = () => {
    onSelectedDate(selectedValue);
    onClose();
  };

  return (
    <View style={styles.container}>
      <ModalActionButtons
        onPrimaryAction={handleSelected}
        onClose={onClose}
        primaryText={"Select"}
      />
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        pickerData={pickerData}
        onValueChange={handleValueChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  picker: {
    backgroundColor: "white",
    width: 400,
    height: 200,
  },
});

export default SpinDatePicker;
