import React from "react";
import { View, TextInput, StyleSheet, ViewStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
  style,
}) => (
  <View style={[styles.searchBox, style]}>
    <FontAwesomeIcon icon={faSearch} size={16} color="#aaa" style={styles.searchIcon} />
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.searchInput}
      placeholderTextColor="#999"
    />
  </View>
);

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 40, color: "#000" },
});
