// presentation/screens/shared/ChatScreen.tsx
/**
 * ChatScreen Component (Page)
 *
 * Atomic Design: Page - Connects data layer to template
 * SOLID Principles Applied:
 * - Single Responsibility: Route handling and hook connection only
 * - Open/Closed: Extended through useChatScreen hook and ChatScreenTemplate
 * - Liskov Substitution: Interchangeable message sending (WebSocket vs REST)
 * - Interface Segregation: Focused props passed to template
 * - Dependency Inversion: Depends on abstracted hooks and templates
 */
import React from 'react';
import { ChatScreenProps } from '../navigation/messages-screen-navigation/MessageScreenStackParamList';
import { useChatScreen } from '../../ui/hooks/useChatScreen';
import { ChatScreenTemplate } from '../components/templates/ChatScreenTemplate';

export const ChatScreen: React.FC<ChatScreenProps> = ({
  route,
  navigation,
}) => {
  const { userId } = route.params;

  const {
    flatListRef,
    conversationId,
    otherParticipantName,
    isConversationLoading,
    messages,
    isLoadingMessages,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isWebSocketConnected,
    isWebSocketConnecting,
    wsConnectionError,
    reconnectAttempts,
    reconnectWebSocket,
    messageText,
    handleTextChange,
    handleSend,
    isSending,
    chatActions,
  } = useChatScreen({
    userId,
    onGoBack: () => navigation.goBack(),
  });

  return (
    <ChatScreenTemplate
      // Header
      title={otherParticipantName}
      chatActions={chatActions}
      onBackPress={() => navigation.goBack()}
      isWebSocketConnected={isWebSocketConnected}
      // Banner
      conversationId={conversationId}
      isWebSocketConnecting={isWebSocketConnecting}
      wsConnectionError={wsConnectionError}
      reconnectAttempts={reconnectAttempts}
      onRetry={reconnectWebSocket}
      onGoBack={() => navigation.goBack()}
      // Content
      messages={messages}
      isLoading={isLoadingMessages || isConversationLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onContentSizeChange={() => {
        if (messages.length > 0) {
          flatListRef.current?.scrollToEnd({ animated: false });
        }
      }}
      flatListRef={flatListRef}
      messageText={messageText}
      onTextChange={handleTextChange}
      onSend={handleSend}
      isSending={isSending}
    />
  );
};
