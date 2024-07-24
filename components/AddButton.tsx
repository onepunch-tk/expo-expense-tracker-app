import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface AddButtonProps {
  title: string;
}

function AddButton({ title }: AddButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log("Touch!!");
      }}
    >
      <Text>title</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    backgroundColor: "#6c63ff",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    shadowColor: "#6c63ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
});
export default AddButton;
