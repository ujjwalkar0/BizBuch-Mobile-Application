import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface BadgeProps {
  icon?: IconDefinition;
  text: string;
  iconColor?: string;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  icon,
  text,
  iconColor = "#555",
  style,
}) => (
  <View style={[styles.badge, style]}>
    {icon && <FontAwesomeIcon icon={icon} size={14} color={iconColor} />}
    <Text style={styles.badgeText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badgeText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#555",
  },
});
