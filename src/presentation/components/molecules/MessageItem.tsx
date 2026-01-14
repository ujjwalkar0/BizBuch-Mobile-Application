import React from 'react';
import { Message } from '../../../domain/chat/entities/Message';
import { MessageBubble } from '../MessageBubble';
import { DateFormatterService } from '../../services/DateFormatterService';

interface MessageItemProps {
  message: Message;
  messages: Message[];
  index: number;
}

/**
 * MessageItem Molecule
 * Atomic Design: Molecule - Single message with date separator logic
 * Single Responsibility: Render individual message with context-aware date separator
 * Dependency Inversion: Uses DateFormatterService for formatting
 */
export const MessageItem: React.FC<MessageItemProps> = React.memo(({
  message,
  messages,
  index,
}) => {
  const isOwnMessage = message.type === 'sent';

  const showDateSeparator =
    index === messages.length - 1
      ? true
      : DateFormatterService.shouldShowDateSeparator(
          messages[index].timestamp,
          messages[index + 1].timestamp,
        );

  const dateSeparatorText = DateFormatterService.formatDateSeparator(
    message.timestamp,
  );

  return (
    <MessageBubble
      message={message}
      isOwnMessage={isOwnMessage}
      showDateSeparator={showDateSeparator}
      dateSeparatorText={dateSeparatorText}
    />
  );
});
