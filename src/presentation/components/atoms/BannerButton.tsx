import React, { useMemo } from 'react';
import { TouchableOpacity, Text, TextStyle, ViewStyle } from 'react-native';
import { theme } from '../../theme';

const { bannerButton } = theme.components;

interface BannerButtonProps {
  onPress: () => void;
  label: string;
}

/**
 * BannerButton Atom
 * Atomic Design: Atom - Basic button element for banners
 * SOLID: Open/Closed - Styles from theme
 */
export const BannerButton: React.FC<BannerButtonProps> = ({
  onPress,
  label,
}) => {
  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: bannerButton.backgroundColor,
      paddingHorizontal: bannerButton.paddingHorizontal,
      paddingVertical: bannerButton.paddingVertical,
      borderRadius: bannerButton.borderRadius,
      marginLeft: bannerButton.marginLeft,
    }),
    [],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      color: theme.colors.white,
      fontSize: bannerButton.fontSize,
      fontWeight: bannerButton.fontWeight,
    }),
    [],
  );

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};
