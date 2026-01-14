import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { messagePreview } = theme.components;

interface MessagePreviewProps {
  children: string;
  isUnread?: boolean;
  numberOfLines?: number;
}

/**
 * MessagePreview Atom
 * Atomic Design: Atom - Displays message preview text
 * Single Responsibility: Show message preview with unread state
 * SOLID: Open/Closed - Styles from theme
 */
export const MessagePreview: React.FC<MessagePreviewProps> = ({
  children,
  isUnread = false,
  numberOfLines = 1,
}) => {
  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: messagePreview.fontSize,
      color: isUnread ? theme.colors.gray700 : theme.colors.gray500,
      fontWeight: isUnread ? messagePreview.unreadFontWeight : 'normal',
      flex: 1,
      marginRight: messagePreview.marginRight,
    }),
    [isUnread],
  );

  return (
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};
