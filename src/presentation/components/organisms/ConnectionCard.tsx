import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { Connection } from '../../../domain/user/entities/Connection';
import { ConnectionInfo } from '../molecules/ConnectionInfo';
import { ConnectionActions } from '../molecules/ConnectionActions';
import { ConnectionSubtitleService } from '../../../ui/services/ConnectionSubtitleService';
import { theme } from '../../theme';

const { connectionCard } = theme.components;

interface ConnectionCardProps {
  item: Connection;
  isSuggestion: boolean;
  isConnecting?: boolean;
  onToggle: (id: number) => void;
  onClickViewProfile: (user: Connection) => void;
  onClickChat: (chat: Connection) => void;
}

/**
 * ConnectionCard Component (Organism)
 * Atomic Design: Organism - Composed of ConnectionInfo + ConnectionActions molecules
 * SOLID: Single Responsibility - Connection card layout orchestration
 * SOLID: Open/Closed - Styles from theme, extended through molecule composition
 * SOLID: Dependency Inversion - Uses ConnectionSubtitleService
 */
export const ConnectionCard: React.FC<ConnectionCardProps> = ({
  item,
  isSuggestion,
  isConnecting = false,
  onToggle,
  onClickViewProfile,
  onClickChat,
}) => {
  const cardStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.white,
      borderRadius: connectionCard.borderRadius,
      marginBottom: connectionCard.marginBottom,
      padding: connectionCard.padding,
      borderWidth: connectionCard.borderWidth,
      borderColor: theme.colors.gray200,
      shadowColor: connectionCard.shadowColor,
      shadowOffset: connectionCard.shadowOffset,
      shadowOpacity: connectionCard.shadowOpacity,
      shadowRadius: connectionCard.shadowRadius,
      elevation: connectionCard.elevation,
    }),
    [],
  );

  const subtitle = ConnectionSubtitleService.getSubtitle(item);

  return (
    <View style={cardStyle}>
      <ConnectionInfo
        avatarUri={item.avatar}
        displayName={item.display_name}
        subtitle={subtitle}
        onPress={() => onClickViewProfile(item)}
      />

      <ConnectionActions
        isSuggestion={isSuggestion}
        isConnecting={isConnecting}
        onConnect={() => onToggle(item.id)}
        onMessage={() => onClickChat(item)}
        onViewProfile={() => onClickViewProfile(item)}
      />
    </View>
  );
};
