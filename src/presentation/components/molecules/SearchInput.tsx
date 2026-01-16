import React, { useMemo } from 'react';
import { View, TextInput, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

const { searchInput } = theme.components;

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

/**
 * SearchInput Molecule
 * Atomic Design: Molecule - Icon + TextInput combination
 * Single Responsibility: Handle search input with icon
 * SOLID: Open/Closed - Extensible via placeholder and style props, styles from theme
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  style,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.gray100,
      borderRadius: searchInput.borderRadius,
      paddingHorizontal: searchInput.paddingHorizontal,
      ...((style as object) || {}),
    }),
    [style],
  );

  const iconStyle = useMemo<ViewStyle>(
    () => ({
      marginRight: searchInput.iconMarginRight,
    }),
    [],
  );

  const inputStyle = useMemo<TextStyle>(
    () => ({
      flex: 1,
      height: searchInput.inputHeight,
      color: theme.colors.gray900,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <FontAwesomeIcon
        icon={faSearch}
        size={searchInput.iconSize}
        color={theme.colors.gray400}
        style={iconStyle}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
        placeholderTextColor={theme.colors.gray400}
      />
    </View>
  );
};
