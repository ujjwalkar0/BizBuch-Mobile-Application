import React, { useMemo } from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { Conversation } from '../../../domain/chat/entities/Conversation';
import { AvatarPhoto } from '../atoms/AvatarPhoto';
import { AvatarRing } from '../atoms/AvatarRing';
import { ConversationInfo } from '../molecules/ConversationInfo';
import { ConversationTimeFormatter } from '../../../ui/services/ConversationTimeFormatter';
import { theme } from '../../theme';

const { conversationCard } = theme.components;

interface ConversationCardProps {
  conversation: Conversation;
  onPress: () => void;
}

/**
 * ConversationCard Organism
 * Atomic Design: Organism - Composed of AvatarPhoto, AvatarRing atoms + ConversationInfo molecule
 * Single Responsibility: Conversation list item layout
 * SOLID: Open/Closed - Styles from theme, extensible via composition
 * SOLID: Dependency Inversion - Uses ConversationTimeFormatter service
 * Reuses: AvatarPhoto, AvatarRing atoms, ConversationInfo molecule
 */
export const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
  onPress,
}) => {
  const otherParticipant = conversation.other_participant;

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: conversationCard.paddingVertical,
      paddingHorizontal: conversationCard.paddingHorizontal,
      backgroundColor: theme.colors.white,
      borderBottomColor: theme.colors.gray100,
      borderBottomWidth: 1,
    }),
    [],
  );

  const avatarContainerStyle = useMemo<ViewStyle>(
    () => ({
      position: 'relative',
    }),
    [],
  );

  if (!otherParticipant) return null;

  const displayName = `${otherParticipant.first_name} ${otherParticipant.last_name}`;
  const lastMessage = conversation.last_message?.content || 'No messages yet';
  const timestamp = conversation.last_message
    ? ConversationTimeFormatter.format(conversation.last_message.timestamp)
    : '';
  const avatarUri = otherParticipant.avatar;

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} activeOpacity={0.7}>
      <View style={avatarContainerStyle}>
        <AvatarRing
          size={conversationCard.avatarSize}
          borderColor={`${theme.colors.primary}${conversationCard.ringBorderOpacity}`}
          borderWidth={conversationCard.ringBorderWidth}
          padding={conversationCard.ringPadding}
        >
          <AvatarPhoto uri={avatarUri} size={conversationCard.avatarSize} />
        </AvatarRing>
      </View>

      <ConversationInfo
        name={displayName}
        lastMessage={lastMessage}
        timestamp={timestamp}
        unreadCount={conversation.unread_count}
      />
    </TouchableOpacity>
  );
};
