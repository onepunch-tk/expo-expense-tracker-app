import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const { height } = Dimensions.get("window");

interface BottomSlidingDatePicker {
  show: boolean;
  onClose: () => void;
  onChange: (data: any) => void;
}

function BottomSlidingDatePicker({
  show,
  onClose,
  onChange,
}: BottomSlidingDatePicker) {
  const [date, setDate] = useState(new Date());
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (show) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [show]);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    onChange(currentDate);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={show}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <RNDateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                display="spinner"
                onChange={handleChange}
                style={styles.datePicker}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  datePicker: {
    width: "100%",
    height: 200,
  },
});

export default BottomSlidingDatePicker;
