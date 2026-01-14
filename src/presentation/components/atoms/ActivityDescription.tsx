import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { activityDescription } = theme.components;

interface ActivityDescriptionProps {
  text: string;
}

/**
 * ActivityDescription Atom
 * Atomic Design: Atom - Activity description text
 * Single Responsibility: Display activity verb/description
 * SOLID: Open/Closed - Styles from theme
 */
export const ActivityDescription: React.FC<ActivityDescriptionProps> = ({ text }) => {
  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: activityDescription.fontSize,
      color: activityDescription.color,
      lineHeight: activityDescription.lineHeight,
    }),
    [],
  );

  return <Text style={textStyle}>{text}</Text>;
};
