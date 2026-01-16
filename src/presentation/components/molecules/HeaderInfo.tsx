import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { HeaderTitle } from '../atoms/HeaderTitle';
import { HeaderSubtitle } from '../atoms/HeaderSubtitle';
import { theme } from '../../theme';

const { headerInfo } = theme.components;

interface HeaderInfoProps {
  title: string;
  subtitle: string;
  isTyping: boolean;
  isOnline: boolean;
}

/**
 * HeaderInfo Molecule
 * Atomic Design: Molecule - Composed of HeaderTitle and HeaderSubtitle atoms
 * SOLID: Open/Closed - Styles from theme
 * Reuses: HeaderTitle, HeaderSubtitle atoms
 */
export const HeaderInfo: React.FC<HeaderInfoProps> = ({
  title,
  subtitle,
  isTyping,
  isOnline,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flex: headerInfo.flex,
    }),
    [],
  );

  const subtitleVariant = useMemo(() => {
    if (isTyping) return 'typing';
    if (isOnline) return 'online';
    return 'default';
  }, [isTyping, isOnline]);

  return (
    <View style={containerStyle}>
      <HeaderTitle numberOfLines={1}>{title}</HeaderTitle>
      {!!subtitle && (
        <HeaderSubtitle variant={subtitleVariant}>{subtitle}</HeaderSubtitle>
      )}
    </View>
  );
};