import { View } from "react-native";
import { useThemeContext } from "@/context/ThemeProvider";

interface DashBorderProps {
  marginVertical?: number;
}

function DashBorder({ marginVertical = 10 }: DashBorderProps) {
  const colors = useThemeContext((s) => s.colors());
  return (
    <View
      style={{
        marginVertical,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: 200,
        }}
      >
        {[...Array(10)].map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 2.5,
              backgroundColor: colors.dashBorderColor,
              marginHorizontal: 3,
              borderRadius: 2,
            }}
          />
        ))}
      </View>
    </View>
  );
}

export default DashBorder;
