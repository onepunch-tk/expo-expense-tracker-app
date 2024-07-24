const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export interface Theme {
  title: string;
  background: string;
  btnBackground: string;
  text: string;
  tagText: string;
  navTitle: string;
  navBarLinearOne: string;
  navBarLinearTwo: string;
}

export const light: Theme = {
  navBarLinearOne: "#7269FF",
  navBarLinearTwo: "#5046EC",
  navTitle: "#CDC6F8",
  title: "#0f0b21",
  background: "#fff",
  text: "#0f0b21",
  tagText: "#6d64ff",
  btnBackground: "#6c63ff",
};

export const dark: Theme = {
  navBarLinearOne: "#322C54",
  navBarLinearTwo: "#231D49",
  navTitle: "#7F78A7",
  title: "#fff",
  background: "#0f0b21",
  text: "#b2a8ee",
  tagText: "#6d64ff",
  btnBackground: "#6c63ff",
};
