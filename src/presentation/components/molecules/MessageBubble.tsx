import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { Message } from '../../../domain/chat/entities/Message';
import { AvatarPhoto } from '../atoms/AvatarPhoto';
import { theme } from '../../theme';

const { messageBubble } = theme.components;

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  showDateSeparator: boolean;
  dateSeparatorText: string;
}

/**
 * DateSeparator Atom (internal)
 * Atomic Design: Atom - Date divider in message list
 * Single Responsibility: Display date separator
 */
interface DateSeparatorProps {
  text: string;
}

const DateSeparator: React.FC<DateSeparatorProps> = ({ text }) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: messageBubble.dateSeparatorMarginVertical,
      paddingHorizontal: 16,
    }),
    [],
  );

  const lineStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.gray200,
    }),
    [],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: messageBubble.dateSeparatorFontSize,
      color: theme.colors.gray500,
      paddingHorizontal: 12,
      fontWeight: messageBubble.dateSeparatorFontWeight,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <View style={lineStyle} />
      <Text style={textStyle}>{text}</Text>
      <View style={lineStyle} />
    </View>
  );
};

/**
 * MessageBubble Molecule
 * Atomic Design: Molecule - Composed of AvatarPhoto atom + text bubble
 * Single Responsibility: Display single chat message with metadata
 * SOLID: Open/Closed - Styles from theme, extensible via props
 * SOLID: Dependency Inversion - Uses AvatarPhoto atom
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
  showDateSeparator,
  dateSeparatorText,
}) => {
  const formatMessageTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const rowStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      marginVertical: 4,
      alignItems: 'flex-end',
      justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
    }),
    [isOwnMessage],
  );

  const bubbleStyle = useMemo<ViewStyle>(
    () => ({
      maxWidth: messageBubble.maxWidth,
      paddingHorizontal: messageBubble.paddingHorizontal,
      paddingVertical: messageBubble.paddingVertical,
      borderRadius: messageBubble.borderRadius,
      ...(isOwnMessage
        ? {
            backgroundColor: theme.colors.primary,
            borderBottomRightRadius: messageBubble.smallBorderRadius,
          }
        : {
            backgroundColor: theme.colors.white,
            borderBottomLeftRadius: messageBubble.smallBorderRadius,
            borderWidth: 1,
            borderColor: theme.colors.gray200,
          }),
    }),
    [isOwnMessage],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: messageBubble.textFontSize,
      lineHeight: messageBubble.textLineHeight,
      color: isOwnMessage ? theme.colors.white : theme.colors.gray900,
    }),
    [isOwnMessage],
  );

  const footerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: messageBubble.footerMarginTop,
      justifyContent: 'flex-end',
      gap: messageBubble.footerGap,
    }),
    [],
  );

  const timeStyle = useMemo<TextStyle>(
    () => ({
      fontSize: messageBubble.timeFontSize,
      color: isOwnMessage ? 'rgba(255,255,255,0.7)' : theme.colors.gray400,
    }),
    [isOwnMessage],
  );

  const avatarUri = message.sender?.avatar || 'https://via.placeholder.com/32';

  return (
    <View>
      {showDateSeparator && <DateSeparator text={dateSeparatorText} />}

      <View style={rowStyle}>
        {!isOwnMessage && (
          <View style={{ marginRight: messageBubble.avatarMarginRight }}>
            <AvatarPhoto uri={avatarUri} size={messageBubble.avatarSize} />
          </View>
        )}

        <View style={bubbleStyle}>
          <Text style={textStyle}>{message.content}</Text>

          <View style={footerStyle}>
            <Text style={timeStyle}>{formatMessageTime(message.timestamp)}</Text>
            {isOwnMessage && (
              <FontAwesomeIcon
                icon={message.is_read ? faCheckDouble : faCheck}
                size={messageBubble.readIconSize}
                color={message.is_read ? theme.colors.white : 'rgba(255,255,255,0.6)'}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
