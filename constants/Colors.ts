const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export interface Theme {
  title: string;
  background: string;
  btnBackground: string;
  text: string;
  tagText: string;
  tabInactiveTint: string;
  gradientStart: string;
  gradientEnd: string;
}

export const light: Theme = {
  gradientStart: "#7269FF",
  gradientEnd: "#5046EC",
  tabInactiveTint: "#CDC6F8",
  title: "#0f0b21",
  background: "#fff",
  text: "#0f0b21",
  tagText: "#6d64ff",
  btnBackground: "#6c63ff",
};

export const dark: Theme = {
  gradientStart: "#322C54",
  gradientEnd: "#231D49",
  tabInactiveTint: "#7F78A7",
  title: "#fff",
  background: "#0f0b21",
  text: "#b2a8ee",
  tagText: "#6d64ff",
  btnBackground: "#6c63ff",
};
