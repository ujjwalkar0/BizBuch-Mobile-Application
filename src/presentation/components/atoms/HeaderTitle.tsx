import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface HeaderTitleProps {
  children: string;
  numberOfLines?: number;
  style?: TextStyle;
}

/**
 * HeaderTitle Atom
 * Atomic Design: Atom - Basic title text element
 */
export const HeaderTitle: React.FC<HeaderTitleProps> = ({
  children,
  numberOfLines = 1,
  style,
}) => {
  return (
    <Text style={[styles.title, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: theme.colors.gray900,
  },
});
