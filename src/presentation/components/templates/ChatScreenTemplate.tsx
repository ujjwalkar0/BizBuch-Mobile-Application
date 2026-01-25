import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatHeader, HeaderAction } from '../organisms/ChatHeader';
import { ConnectionBanner } from '../organisms/ConnectionBanner';
import { ChatContent } from '../organisms/ChatContent';
import { Message } from '../../../domain/chat/entities/Message';
import { WebSocketConnectionError } from '../../../ui/hooks/useChatWebSocket';
import { theme } from '../../theme';

interface ChatScreenTemplateProps {
  // Header props
  title: string;
  chatActions: HeaderAction[];
  onBackPress: () => void;
  isWebSocketConnected: boolean;

  // Banner props
  conversationId: number | null;
  isWebSocketConnecting: boolean;
  wsConnectionError: WebSocketConnectionError | null;
  reconnectAttempts: number;
  onRetry: () => void;
  onGoBack: () => void;

  // Content props
  messages: Message[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onEndReached: () => void;
  onContentSizeChange: () => void;
  flatListRef: React.RefObject<FlatList | null>;
  messageText: string;
  onTextChange: (text: string) => void;
  onSend: () => void;
  isSending: boolean;
}

/**
 * ChatScreenTemplate
 * Atomic Design: Template - Defines the layout structure for chat screen
 * SOLID: Single Responsibility - Layout orchestration only
 * SOLID: Open/Closed - Content passed via props, easily extensible
 */
export const ChatScreenTemplate: React.FC<ChatScreenTemplateProps> = ({
  // Header
  title,
  chatActions,
  onBackPress,
  isWebSocketConnected,

  // Banner
  conversationId,
  isWebSocketConnecting,
  wsConnectionError,
  reconnectAttempts,
  onRetry,
  onGoBack,

  // Content
  messages,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  onEndReached,
  onContentSizeChange,
  flatListRef,
  messageText,
  onTextChange,
  onSend,
  isSending,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader
        actions={chatActions}
        title={title}
        onBackPress={onBackPress}
        isOnline={false}
        isTyping={false}
        isWebSocketConnected={isWebSocketConnected}
      />

      <ConnectionBanner
        conversationId={conversationId}
        isConnecting={isWebSocketConnecting}
        isConnected={isWebSocketConnected}
        connectionError={wsConnectionError}
        reconnectAttempts={reconnectAttempts}
        onRetry={onRetry}
        onGoBack={onGoBack}
      />

      <ChatContent
        messages={messages}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        onEndReached={onEndReached}
        onContentSizeChange={onContentSizeChange}
        flatListRef={flatListRef}
        messageText={messageText}
        onTextChange={onTextChange}
        onSend={onSend}
        isSending={isSending}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray50,
  },
});
