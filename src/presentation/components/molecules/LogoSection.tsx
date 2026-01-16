import React, { useMemo } from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { GradientCircle } from '../atoms/GradientCircle';
import { GradientText } from '../atoms/GradientText';
import { theme } from '../../theme';

const { logoSection } = theme.components;

interface LogoSectionProps {
  title?: string;
  iconSize?: number;
  logoSize?: number;
}

/**
 * LogoSection Molecule
 * Atomic Design: Molecule - App logo with title
 * Single Responsibility: Display branding elements
 * SOLID: Open/Closed - Styles from theme
 * Reuses: GradientCircle atom, GradientText atom
 */
export const LogoSection: React.FC<LogoSectionProps> = ({
  title = 'BizBuch',
  iconSize = logoSection.defaultIconSize,
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
      <GradientCircle size={logoSize}>
        <FontAwesomeIcon icon={faFire} size={iconSize} color="#fff" />
      </GradientCircle>
      <GradientText style={titleStyle}>{title}</GradientText>
    </View>
  );
};
