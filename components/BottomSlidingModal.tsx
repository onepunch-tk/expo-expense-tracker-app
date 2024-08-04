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
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default BottomSlidingModal;
