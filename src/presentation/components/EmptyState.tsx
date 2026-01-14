import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface EmptyStateProps {
  message: string;
  subMessage?: string;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, subMessage, style }) => (
  <View style={[styles.emptyContainer, style]}>
    <Text style={styles.emptyText}>{message}</Text>
    {subMessage && <Text style={styles.emptySubtext}>{subMessage}</Text>}
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
});
