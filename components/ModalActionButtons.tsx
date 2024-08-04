import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface ModalActionButtonsProps {
  primaryText: string;
  onPrimaryAction: () => void;
  onClose: () => void;
}

function ModalActionButtons({
  primaryText,
  onPrimaryAction,
  onClose,
}: ModalActionButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrimaryAction}>
        <Text style={[styles.buttonText, { color: "#00ad43" }]}>
          {primaryText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose}>
        <Text style={[styles.buttonText, { color: "#e32636" }]}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ModalActionButtons;
