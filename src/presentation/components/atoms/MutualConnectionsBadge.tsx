import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

const { mutualConnectionsBadge } = theme.components;

interface MutualConnectionsBadgeProps {
  count: number;
}

/**
 * MutualConnectionsBadge Atom
 * Atomic Design: Atom - Displays mutual connections count
 * Single Responsibility: Show mutual connection info
 * SOLID: Open/Closed - Styles from theme
 */
export const MutualConnectionsBadge: React.FC<MutualConnectionsBadgeProps> = ({
  count,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: mutualConnectionsBadge.marginTop,
      gap: mutualConnectionsBadge.gap,
    }),
    [],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: mutualConnectionsBadge.fontSize,
      color: theme.colors.gray400,
    }),
    [],
  );

  if (count <= 0) return null;

  return (
    <View style={containerStyle}>
      <FontAwesomeIcon
        icon={faUsers}
        size={mutualConnectionsBadge.iconSize}
        color={theme.colors.gray400}
      />
      <Text style={textStyle}>{count} mutual connections</Text>
    </View>
  );
};
