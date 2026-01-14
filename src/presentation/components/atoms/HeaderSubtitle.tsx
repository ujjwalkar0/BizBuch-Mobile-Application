import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface HeaderSubtitleProps {
  children: string;
  variant?: 'default' | 'typing' | 'online';
  style?: TextStyle;
}

/**
 * HeaderSubtitle Atom
 * Atomic Design: Atom - Basic subtitle text element with variants
 */
export const HeaderSubtitle: React.FC<HeaderSubtitleProps> = ({
  children,
  variant = 'default',
  style,
}) => {
  return (
    <Text
      style={[
        styles.subtitle,
        variant === 'typing' && styles.typingText,
        variant === 'online' && styles.onlineText,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 13,
    color: theme.colors.gray500,
    marginTop: 2,
  },
  typingText: {
    color: theme.colors.primary,
    fontStyle: 'italic',
  },
  onlineText: {
    color: '#22c55e',
  },
});
