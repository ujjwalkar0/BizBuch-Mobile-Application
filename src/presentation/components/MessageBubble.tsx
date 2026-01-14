import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Message } from "../../domain/chat/entities/Message";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../theme";

interface Props {
  message: Message;
  isOwnMessage: boolean;
  showDateSeparator: boolean;
  dateSeparatorText: string;
}

export const MessageBubble: React.FC<Props> = ({ 
  message, 
  isOwnMessage, 
  showDateSeparator,
  dateSeparatorText,
}) => {
  const formatMessageTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View>
      {showDateSeparator && (
        <View style={styles.dateSeparator}>
          <View style={styles.dateSeparatorLine} />
          <Text style={styles.dateSeparatorText}>{dateSeparatorText}</Text>
          <View style={styles.dateSeparatorLine} />
        </View>
      )}
      <View style={[styles.messageRow, isOwnMessage && styles.messageRowOwn]}>
        {!isOwnMessage && (
          <Image
            source={{ uri: message.sender?.avatar || 'https://via.placeholder.com/32' }}
            style={styles.messageAvatar}
          />
        )}
        <View style={[styles.messageBubble, isOwnMessage ? styles.ownBubble : styles.otherBubble]}>
          <Text style={[styles.messageText, isOwnMessage && styles.ownMessageText]}>
            {message.content}
          </Text>
          <View style={styles.messageFooter}>
            <Text style={[styles.messageTime, isOwnMessage && styles.ownMessageTime]}>
              {formatMessageTime(message.timestamp)}
            </Text>
            {isOwnMessage && (
              <FontAwesomeIcon 
                icon={message.is_read ? faCheckDouble : faCheck} 
                size={12} 
                color={message.is_read ? "#fff" : "rgba(255,255,255,0.6)"} 
                style={styles.readIcon}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateSeparator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  dateSeparatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.gray200,
  },
  dateSeparatorText: {
    fontSize: 12,
    color: theme.colors.gray500,
    paddingHorizontal: 12,
    fontWeight: "500",
  },
  messageRow: {
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "flex-end",
  },
  messageRowOwn: {
    justifyContent: "flex-end",
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: theme.colors.gray200,
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  ownBubble: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 6,
  },
  otherBubble: {
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
  },
  messageText: {
    fontSize: 15,
    color: theme.colors.gray900,
    lineHeight: 21,
  },
  ownMessageText: {
    color: theme.colors.white,
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    justifyContent: "flex-end",
    gap: 4,
  },
  messageTime: {
    fontSize: 11,
    color: theme.colors.gray400,
  },
  ownMessageTime: {
    color: "rgba(255,255,255,0.7)",
  },
  readIcon: {
    marginLeft: 2,
  },
});
