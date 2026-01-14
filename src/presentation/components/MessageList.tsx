import React, { useCallback } from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Message } from '../../domain/chat/entities/Message';
import { MessageBubble } from './MessageBubble';
import { EmptyState } from './EmptyState';
import { theme } from '../theme';
import { DateFormatterService } from '../services/DateFormatterService';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onEndReached: () => void;
  onContentSizeChange: () => void;
  flatListRef: React.RefObject<FlatList | null>;
}

/**
 * MessageList Component
 * Single Responsibility: Render message list with pagination
 */
export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  onEndReached,
  onContentSizeChange,
  flatListRef,
}) => {
  const renderMessage = useCallback(
    ({ item, index }: { item: Message; index: number }) => {
      const isOwnMessage = item.type === 'sent';
      const showDateSeparator =
        index === messages.length - 1
          ? true
          : DateFormatterService.shouldShowDateSeparator(
              messages[index].timestamp,
              messages[index + 1].timestamp,
            );

      return (
        <MessageBubble
          message={item}
          isOwnMessage={isOwnMessage}
          showDateSeparator={showDateSeparator}
          dateSeparatorText={DateFormatterService.formatDateSeparator(
            item.timestamp,
          )}
        />
      );
    },
    [messages],
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={item => item.id.toString()}
      inverted={false}
      contentContainerStyle={styles.messagesList}
      onEndReached={() => {
        if (hasNextPage) {
          onEndReached();
        }
      }}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={
        isFetchingNextPage ? (
          <View style={styles.loadingMore}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
        ) : null
      }
      ListEmptyComponent={
        <EmptyState
          message="No messages yet"
          subMessage="Send a message to start the conversation"
          style={styles.emptyContainer}
        />
      }
      onContentSizeChange={onContentSizeChange}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray50,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexGrow: 1,
  },
  loadingMore: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  emptyContainer: {
    paddingTop: 100,
  },
});
