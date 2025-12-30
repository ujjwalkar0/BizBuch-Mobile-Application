import { TextStyle } from "react-native";

interface Typography {
  header1: TextStyle;
  header2: TextStyle;
  // Add more variants as needed
}

export const typography: Typography = {
  header1: {
    backgroundColor: "#636e72",
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    padding: 5,
  },
  header2: {
    backgroundColor: "#636e72",
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    padding: 4,
  },
};

export type TypographyVariant = keyof Typography;