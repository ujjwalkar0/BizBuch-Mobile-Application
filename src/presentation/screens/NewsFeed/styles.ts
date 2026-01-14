import { StyleSheet } from "react-native";

export const container = StyleSheet.create({
  /** Full screen wrapper */
  screen: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },

  /** Centered content (loading, empty, error states) */
  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  /** Horizontal + vertical padding */
  padded: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  /** Row layout */
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  /** Space-between row */
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  /** Full screen absolute fill */
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
});
