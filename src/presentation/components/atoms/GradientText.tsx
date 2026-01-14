import React from 'react';
import { Text, StyleSheet, Platform, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { theme } from '../../theme';

interface GradientTextProps {
  children: string;
  colors?: string[];
  style?: TextStyle;
  fallbackColor?: string;
}

/**
 * GradientText Atom
 * Atomic Design: Atom - Text with gradient fill (iOS only, fallback on Android)
 * Single Responsibility: Display text with gradient or solid color
 */
export const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors = [theme.colors.primary, theme.colors.primaryDark],
  style,
  fallbackColor = theme.colors.primary,
}) => {
  if (Platform.OS === 'ios') {
    return (
      <MaskedView maskElement={<Text style={[styles.text, style]}>{children}</Text>}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.text, style, { opacity: 0 }]}>{children}</Text>
        </LinearGradient>
      </MaskedView>
    );
  }

  return (
    <Text style={[styles.text, style, { color: fallbackColor }]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: '700',
  },
});
