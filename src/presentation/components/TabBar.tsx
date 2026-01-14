import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Tab {
  key: string;
  label: string;
  icon?: IconDefinition;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  style?: ViewStyle;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  style,
}) => (
  <View style={[styles.tabs, style]}>
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab.key}
        style={[styles.tabButton, activeTab === tab.key && styles.activeTab]}
        onPress={() => onTabChange(tab.key)}
      >
        {tab.icon && (
          <FontAwesomeIcon
            icon={tab.icon}
            size={16}
            color={activeTab === tab.key ? "#2563EB" : "#666"}
          />
        )}
        <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
          {tab.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  tabs: { flexDirection: "row", justifyContent: "space-around" },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: { backgroundColor: "#EBF5FF" },
  tabText: { marginLeft: 6, fontSize: 14, color: "#666" },
  activeTabText: { color: "#2563EB", fontWeight: "500" },
});
