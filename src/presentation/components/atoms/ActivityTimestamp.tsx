import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { activityTimestamp } = theme.components;

interface ActivityTimestampProps {
  time: string;
}

/**
 * ActivityTimestamp Atom
 * Atomic Design: Atom - Activity timestamp text
 * Single Responsibility: Display formatted activity time
 * SOLID: Open/Closed - Styles from theme
 */
export const ActivityTimestamp: React.FC<ActivityTimestampProps> = ({ time }) => {
  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: activityTimestamp.fontSize,
      color: activityTimestamp.color,
      marginTop: activityTimestamp.marginTop,
    }),
    [],
  );

  return <Text style={textStyle}>{time}</Text>;
};
