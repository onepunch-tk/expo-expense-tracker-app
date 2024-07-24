import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren } from "react";

interface GradientBackgroundProps extends PropsWithChildren {
  colors: string[];
}

function GradientBackground({ colors, children }: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={[...colors]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
}

export default GradientBackground;
