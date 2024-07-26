import { Animated, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

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
  datePickerHeight: number;
  backgroundColor: string;
  borderTopRadius?: number;
  textColor?: string;
  initialDate?: Date;
}

function SpinDatePicker({
  datePickerHeight,
  backgroundColor,
  borderTopRadius,
  textColor = "#000",
  initialDate,
}: SpinDatePickerProps) {
  const slideAnim = useRef(new Animated.Value(datePickerHeight)).current;
  const [date, setDate] = useState(initialDate || new Date());

  const animateIn = useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const animateOut = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: slideAnim,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  useEffect(() => {
    animateIn();
    return () => {
      animateOut();
    };
  }, []);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <Animated.View
      style={[
        {
          backgroundColor,
          transform: [{ translateY: slideAnim }],
          ...(borderTopRadius && {
            borderTopLeftRadius: borderTopRadius,
            borderTopRightRadius: borderTopRadius,
          }),
        },
      ]}
    >
      <View
        style={{
          paddingTop: 20,
          paddingRight: 20,
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        <Text style={{ color: textColor, fontSize: 15, fontWeight: "600" }}>
          {date.getDate()}
        </Text>
        <Text style={{ color: textColor, fontSize: 15, fontWeight: "600" }}>
          {monthNames[date.getMonth()]}
        </Text>
        <Text style={{ color: textColor, fontSize: 15, fontWeight: "600" }}>
          {date.getFullYear()}
        </Text>
      </View>
      <RNDateTimePicker
        dateFormat={"day month year"}
        value={date}
        mode={"date"}
        display="spinner"
        textColor={textColor}
        style={{ height: datePickerHeight }}
        onChange={handleChange}
      />
    </Animated.View>
  );
}

export default SpinDatePicker;
