import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { GradientCircle } from '../atoms/GradientCircle';
import { GradientText } from '../atoms/GradientText';

interface LogoSectionProps {
  title?: string;
  iconSize?: number;
  logoSize?: number;
}

/**
 * LogoSection Molecule
 * Atomic Design: Molecule - App logo with title
 * Single Responsibility: Display branding elements
 * Reuses: GradientCircle atom, GradientText atom
 */
export const LogoSection: React.FC<LogoSectionProps> = ({
  title = 'BizBuch',
  iconSize = 20,
  logoSize = 36,
}) => {
  return (
    <View style={styles.container}>
      <GradientCircle size={logoSize}>
        <FontAwesomeIcon icon={faFire} size={iconSize} color="#fff" />
      </GradientCircle>
      <GradientText style={styles.title}>{title}</GradientText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
});
