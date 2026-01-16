import React, { useMemo } from 'react';
import { Text, Platform, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { theme } from '../../theme';

const { gradientText } = theme.components;

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
 * SOLID: Open/Closed - Styles from theme
 */
export const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors = [theme.colors.primary, theme.colors.primaryDark],
  style,
  fallbackColor = theme.colors.primary,
}) => {
  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: gradientText.fontSize,
      fontWeight: gradientText.fontWeight,
    }),
    [],
  );

  const hiddenTextStyle = useMemo<TextStyle>(
    () => ({ ...textStyle, ...style, opacity: 0 }),
    [textStyle, style],
  );

  const fallbackTextStyle = useMemo<TextStyle>(
    () => ({ ...textStyle, ...style, color: fallbackColor }),
    [textStyle, style, fallbackColor],
  );

  if (Platform.OS === 'ios') {
    return (
      <MaskedView maskElement={<Text style={[textStyle, style]}>{children}</Text>}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={hiddenTextStyle}>{children}</Text>
        </LinearGradient>
      </MaskedView>
    );
  }

  return <Text style={fallbackTextStyle}>{children}</Text>;
};
