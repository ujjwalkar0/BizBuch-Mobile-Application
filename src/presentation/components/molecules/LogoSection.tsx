import React, { useMemo } from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';
import { GradientText } from '../atoms/GradientText';
import { theme } from '../../theme';
import Logo from '../../../assets/images/logo.svg';

const { logoSection } = theme.components;

interface LogoSectionProps {
  title?: string;
  logoSize?: number;
}

/**
 * LogoSection Molecule
 * Atomic Design: Molecule - App logo with title
 * Single Responsibility: Display branding elements
 * SOLID: Open/Closed - Styles from theme
 * Reuses: GradientText atom, Logo SVG
 */
export const LogoSection: React.FC<LogoSectionProps> = ({
  title = 'BizBuch',
  logoSize = logoSection.defaultLogoSize,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: logoSection.gap,
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 22,
      fontWeight: '700',
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <Logo width={logoSize} height={logoSize} />
      <GradientText style={titleStyle}>{title}</GradientText>
    </View>
  );
};
