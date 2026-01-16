import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { AvatarPhoto } from '../atoms/AvatarPhoto';
import { AvatarRing } from '../atoms/AvatarRing';
import { CardTitle } from '../atoms/CardTitle';
import { CardSubtitle } from '../atoms/CardSubtitle';
import { PressableContainer } from '../atoms/PressableContainer';
import { MutualConnectionsBadge } from '../atoms/MutualConnectionsBadge';
import { theme } from '../../theme';

const { connectionInfo } = theme.components;

interface ConnectionInfoProps {
  avatarUri: string;
  displayName: string;
  subtitle: string;
  mutualConnectionsCount?: number;
  onPress: () => void;
}

/**
 * ConnectionInfo Molecule
 * Atomic Design: Molecule - Avatar + name + subtitle + mutual connections
 * SOLID: Single Responsibility - Display connection profile info
 * SOLID: Open/Closed - Styles from theme
 * Reuses: AvatarPhoto, AvatarRing, CardTitle, CardSubtitle, PressableContainer, MutualConnectionsBadge atoms
 */
export const ConnectionInfo: React.FC<ConnectionInfoProps> = ({
  avatarUri,
  displayName,
  subtitle,
  mutualConnectionsCount = 0,
  onPress,
}) => {
  const avatarContainerStyle = useMemo<ViewStyle>(
    () => ({
      marginRight: connectionInfo.avatarMarginRight,
    }),
    [],
  );

  const infoStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
    }),
    [],
  );

  return (
    <PressableContainer onPress={onPress}>
      <View style={avatarContainerStyle}>
        <AvatarRing
          size={connectionInfo.avatarSize}
          borderColor={`${theme.colors.primary}${connectionInfo.ringBorderOpacity}`}
          borderWidth={2}
          padding={2}
        >
          <AvatarPhoto uri={avatarUri} size={connectionInfo.avatarSize} />
        </AvatarRing>
      </View>

      <View style={infoStyle}>
        <CardTitle>{displayName || ''}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <MutualConnectionsBadge count={mutualConnectionsCount} />
      </View>
    </PressableContainer>
  );
};
