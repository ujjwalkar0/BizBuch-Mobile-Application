import React, { useCallback, useMemo } from 'react';
import { FlatList, ViewStyle } from 'react-native';
import { Message } from '../../../domain/chat/entities/Message';
import { CenteredLoader } from './CenteredLoader';
import { PaginationLoader } from './PaginationLoader';
import { EmptyMessages } from './EmptyMessages';
import { MessageItem } from './MessageItem';
import { theme } from '../../theme';

const { messageList } = theme.components;

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
 * MessageList Organism
 * Atomic Design: Organism - Composed of CenteredLoader, PaginationLoader, EmptyMessages, MessageItem molecules
 * SOLID: Single Responsibility - Message list orchestration with pagination
 * SOLID: Open/Closed - Styles from theme, extensible via props
 * SOLID: Dependency Inversion - Depends on abstractions (molecules)
 * Reuses: CenteredLoader, PaginationLoader, EmptyMessages, MessageItem molecules
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
  const contentContainerStyle = useMemo<ViewStyle>(
    () => ({
      paddingHorizontal: messageList.paddingHorizontal,
      paddingVertical: messageList.paddingVertical,
      flexGrow: 1,
    }),
    [],
  );

  const renderMessage = useCallback(
    ({ item, index }: { item: Message; index: number }) => (
      <MessageItem message={item} messages={messages} index={index} />
    ),
    [messages],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      onEndReached();
    }
  }, [hasNextPage, onEndReached]);

  const ListHeaderComponent = useMemo(
    () => <PaginationLoader isLoading={isFetchingNextPage} />,
    [isFetchingNextPage],
  );

  const ListEmptyComponent = useMemo(() => <EmptyMessages />, []);

  if (isLoading) {
    return <CenteredLoader />;
  }

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={item => item.id.toString()}
      inverted={false}
      contentContainerStyle={contentContainerStyle}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      onContentSizeChange={onContentSizeChange}
    />
  );
};
