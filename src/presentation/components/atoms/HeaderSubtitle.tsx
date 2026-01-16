import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { headerSubtitle } = theme.components;

interface HeaderSubtitleProps {
  children: string;
  variant?: 'default' | 'typing' | 'online';
  style?: TextStyle;
}

/**
 * HeaderSubtitle Atom
 * Atomic Design: Atom - Basic subtitle text element with variants
 * SOLID: Open/Closed - Styles from theme
 */
export const HeaderSubtitle: React.FC<HeaderSubtitleProps> = ({
  children,
  variant = 'default',
  style,
}) => {
  const subtitleStyle = useMemo<TextStyle>(() => {
    const base: TextStyle = {
      fontSize: headerSubtitle.fontSize,
      color: theme.colors.gray500,
      marginTop: headerSubtitle.marginTop,
    };

    if (variant === 'typing') {
      return { ...base, color: theme.colors.primary, fontStyle: 'italic' };
    }

    if (variant === 'online') {
      return { ...base, color: headerSubtitle.onlineColor };
    }

    return base;
  }, [variant]);

  return <Text style={[subtitleStyle, style]}>{children}</Text>;
};
