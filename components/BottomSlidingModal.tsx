import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { PropsWithChildren } from "react";

interface BottomSlidingModalProps extends PropsWithChildren {
  show: boolean;
  onClose: () => void;
}

function BottomSlidingModal({
  children,
  show,
  onClose,
}: BottomSlidingModalProps) {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={show}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>{children}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
});
export default BottomSlidingModal;
