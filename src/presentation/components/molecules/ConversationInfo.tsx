import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { CardTitle } from '../atoms/CardTitle';
import { TimeText } from '../atoms/TimeText';
import { MessagePreview } from '../atoms/MessagePreview';
import { UnreadBadge } from '../atoms/UnreadBadge';
import { theme } from '../../theme';

const { conversationInfo } = theme.components;

interface ConversationInfoProps {
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

/**
 * ConversationInfo Molecule
 * Atomic Design: Molecule - Name + time + message preview + unread badge
 * SOLID: Single Responsibility - Display conversation metadata
 * SOLID: Open/Closed - Styles from theme
 * Reuses: CardTitle, TimeText, MessagePreview, UnreadBadge atoms
 */
export const ConversationInfo: React.FC<ConversationInfoProps> = ({
  name,
  lastMessage,
  timestamp,
  unreadCount,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      marginLeft: conversationInfo.marginLeft,
    }),
    [],
  );

  const headerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
    [],
  );

  const footerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: conversationInfo.footerMarginTop,
    }),
    [],
  );

  const isUnread = unreadCount > 0;

  return (
    <View style={containerStyle}>
      <View style={headerStyle}>
        <CardTitle numberOfLines={1} style={{ flex: 1, marginRight: 8 }}>
          {name}
        </CardTitle>
        {timestamp && <TimeText isHighlighted={isUnread}>{timestamp}</TimeText>}
      </View>

      <View style={footerStyle}>
        <MessagePreview isUnread={isUnread}>{lastMessage}</MessagePreview>
        <UnreadBadge count={unreadCount} />
      </View>
    </View>
  );
};
