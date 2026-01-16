import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

const { notificationMessage } = theme.components;

interface NotificationMessageProps {
  text: string;
  isRead: boolean;
}

/**
 * NotificationMessage Atom
 * Atomic Design: Atom - Notification message text
 * Single Responsibility: Display notification message with read/unread styling
 * SOLID: Open/Closed - Styles from theme
 */
export const NotificationMessage: React.FC<NotificationMessageProps> = ({
  text,
  isRead,
}) => {
  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: notificationMessage.fontSize,
      color: isRead ? notificationMessage.readColor : notificationMessage.unreadColor,
      fontWeight: isRead ? 'normal' : notificationMessage.unreadFontWeight,
      lineHeight: notificationMessage.lineHeight,
    }),
    [isRead],
  );

  return <Text style={textStyle}>{text}</Text>;
};
