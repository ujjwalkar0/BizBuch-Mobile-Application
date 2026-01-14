import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface ScreenHeaderProps {
  title: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  children,
  style,
}) => (
  <View style={[styles.header, style]}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
});
