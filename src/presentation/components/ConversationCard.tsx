import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Conversation, Participant } from "../../domain/chat/entities/Conversation";
import { theme } from "../theme";

interface Props {
  conversation: Conversation;
  onPress: () => void;
}

export const ConversationCard: React.FC<Props> = ({ conversation, onPress }) => {
  const otherParticipant = conversation.other_participant;

  // Format timestamp
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  if (!otherParticipant) return null;

  return (
    <TouchableOpacity style={styles.chatItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarRing}>
          <Image 
            source={{ uri: otherParticipant.avatar || 'https://via.placeholder.com/56' }} 
            style={styles.avatar} 
          />
        </View>
        {/* Online indicator can be added here */}
      </View>

      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.name} numberOfLines={1}>
            {otherParticipant.first_name} {otherParticipant.last_name}
          </Text>
          {conversation.last_message && (
            <Text style={[
              styles.time,
              conversation.unread_count > 0 && styles.timeUnread
            ]}>
              {formatTime(conversation.last_message.timestamp)}
            </Text>
          )}
        </View>

        <View style={styles.chatFooter}>
          <Text 
            style={[
              styles.lastMessage,
              conversation.unread_count > 0 && styles.lastMessageUnread
            ]} 
            numberOfLines={1}
          >
            {conversation.last_message?.content || "No messages yet"}
          </Text>
          {conversation.unread_count > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>
                {conversation.unread_count > 99 ? '99+' : conversation.unread_count}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.gray100,
    borderBottomWidth: 1,
  },
  avatarContainer: { 
    position: 'relative',
  },
  avatarRing: {
    padding: 2,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: `${theme.colors.primary}30`,
  },
  avatar: { 
    width: 52, 
    height: 52, 
    borderRadius: 26, 
    backgroundColor: theme.colors.gray200,
  },
  chatInfo: { 
    flex: 1, 
    marginLeft: 14,
  },
  chatHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  chatFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 4,
  },
  name: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: theme.colors.gray900,
    flex: 1, 
    marginRight: 8,
  },
  time: { 
    fontSize: 12, 
    color: theme.colors.gray400,
  },
  timeUnread: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  lastMessage: { 
    fontSize: 14, 
    color: theme.colors.gray500, 
    flex: 1, 
    marginRight: 8,
  },
  lastMessageUnread: {
    color: theme.colors.gray700,
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
  },
  unreadText: { 
    color: theme.colors.white, 
    fontSize: 11, 
    fontWeight: '700',
  },
});
