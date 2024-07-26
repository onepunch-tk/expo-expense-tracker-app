import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface HeaderShadowBtnProps {
  backgroundColor: string;
  shadowColor: string;
  title: string;
}
function HeaderShadowBtn({
  backgroundColor,
  shadowColor,
  title,
}: HeaderShadowBtnProps) {
  return (
    <View
      style={[
        {
          backgroundColor,
          shadowColor,
        },
        styles.buttonContainer,
      ]}
    >
      <TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 11,
      },
    }),
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
export default HeaderShadowBtn;
