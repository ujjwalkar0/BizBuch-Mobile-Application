import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

interface ProfileSectionProps {
  title: string;
  onAddPress?: () => void;
  showAddButton?: boolean;
  children: React.ReactNode;
}

/**
 * ProfileSection Molecule
 * Atomic Design: Molecule - Reusable section card with title
 * SOLID: Single Responsibility - Section container with optional add button
 * SOLID: Open/Closed - Content passed via children
 */
export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  onAddPress,
  showAddButton = false,
  children,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.white,
      marginBottom: 12,
      paddingHorizontal: 16,
      paddingVertical: 16,
    }),
    [],
  );

  const headerRowStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.gray900,
    }),
    [],
  );

  const addButtonStyle = useMemo<ViewStyle>(
    () => ({
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: `${theme.colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <View style={headerRowStyle}>
        <Text style={titleStyle}>{title}</Text>
        {showAddButton && onAddPress && (
          <TouchableOpacity style={addButtonStyle} onPress={onAddPress}>
            <FontAwesomeIcon icon={faPlus} size={16} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
};
