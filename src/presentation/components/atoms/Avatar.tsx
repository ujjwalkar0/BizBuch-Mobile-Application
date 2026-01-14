import React from 'react';
import { View } from 'react-native';
import { AvatarImage } from './AvatarImage';
import { OnlineIndicator } from './OnlineIndicator';
import { theme } from '../../theme';

interface AvatarProps {
  title: string;
  avatar?: string;
  isOnline: boolean;
  size?: number;
}

/**
 * Avatar Molecule
 * Atomic Design: Molecule - Composed of AvatarImage and OnlineIndicator atoms
 * SOLID: Open/Closed - Styles defined in theme
 */
export const Avatar: React.FC<AvatarProps> = ({
  title,
  avatar,
  isOnline,
  size = theme.components.avatar.defaultSize,
}) => {
  const initial = title?.[0]?.toUpperCase() ?? '?';

  return (
    <View style={theme.components.avatar.container}>
      <AvatarImage uri={avatar} initial={initial} size={size} />
      <OnlineIndicator isOnline={isOnline} />
    </View>
  );
};

