import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

const { commentSheetHeader } = theme.components;

interface CommentSheetHeaderProps {
  commentsCount: number;
  onClose: () => void;
}

/**
 * CommentSheetHeader Molecule
 * Atomic Design: Molecule - Header for the comment bottom sheet
 * Single Responsibility: Display title and close button
 * SOLID: Open/Closed - Styles from theme
 */
export const CommentSheetHeader: React.FC<CommentSheetHeaderProps> = ({
  commentsCount,
  onClose,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: commentSheetHeader.paddingHorizontal,
      paddingVertical: commentSheetHeader.paddingVertical,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    }),
    [],
  );

  const handleStyle = useMemo<ViewStyle>(
    () => ({
      width: commentSheetHeader.handleWidth,
      height: commentSheetHeader.handleHeight,
      backgroundColor: theme.colors.gray300,
      borderRadius: commentSheetHeader.handleBorderRadius,
      alignSelf: 'center',
      marginBottom: commentSheetHeader.handleMarginBottom,
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: commentSheetHeader.titleFontSize,
      fontWeight: commentSheetHeader.titleFontWeight,
      color: theme.colors.gray900,
    }),
    [],
  );

  const closeButtonStyle = useMemo<ViewStyle>(
    () => ({
      padding: commentSheetHeader.closeButtonPadding,
    }),
    [],
  );

  return (
    <View>
      <View style={handleStyle} />
      <View style={containerStyle}>
        <Text style={titleStyle}>
          Comments {commentsCount > 0 ? `(${commentsCount})` : ''}
        </Text>
        <TouchableOpacity style={closeButtonStyle} onPress={onClose}>
          <FontAwesomeIcon
            icon={faTimes}
            size={commentSheetHeader.closeIconSize}
            color={theme.colors.gray600}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
