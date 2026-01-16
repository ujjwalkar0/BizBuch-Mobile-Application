import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { useSubtitleText } from '../../../ui/hooks/useSubtitleText';
import { BackButton } from '../atoms/BackButton';
import { Avatar } from '../atoms/Avatar';
import { HeaderInfo } from '../molecules/HeaderInfo';
import { HeaderActions } from '../molecules/HeaderActions';

interface Props {
  title: string;
  avatar?: string;
  onBackPress: () => void;
  isOnline?: boolean;
  isTyping?: boolean;
  isWebSocketConnected?: boolean;
  actions?: HeaderAction[];
}

export type HeaderAction = {
  key: string;
  icon: any;
  onPress?: () => void;
  color?: string;
  size?: number;
};

export const ChatHeader: React.FC<Props> = ({
  title,
  avatar,
  onBackPress,
  isOnline = false,
  isTyping = false,
  isWebSocketConnected = false,
  actions,
}) => {
  const subtitleText = useSubtitleText({
    isOnline,
    isTyping,
    isWebSocketConnected,
  });

  return (
    <View style={styles.header}>
      <BackButton onPress={onBackPress} />
      <Avatar title={title} avatar={avatar} isOnline={isOnline} />
      <HeaderInfo
        title={title}
        subtitle={subtitleText}
        isTyping={isTyping}
        isOnline={isOnline}
      />
      <HeaderActions actions={actions ?? []} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  }
});
