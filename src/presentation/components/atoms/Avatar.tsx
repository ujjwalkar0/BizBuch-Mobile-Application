import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AvatarImage } from './AvatarImage';
import { OnlineIndicator } from './OnlineIndicator';

interface AvatarProps {
  title: string;
  avatar?: string;
  isOnline: boolean;
  size?: number;
}

/**
 * Avatar Molecule
 * Atomic Design: Molecule - Composed of AvatarImage and OnlineIndicator atoms
 */
export const Avatar: React.FC<AvatarProps> = ({
  title,
  avatar,
  isOnline,
  size = 42,
}) => {
  const initial = title?.[0]?.toUpperCase() ?? '?';

  return (
    <View style={styles.avatarContainer}>
      <AvatarImage uri={avatar} initial={initial} size={size} />
      <OnlineIndicator isOnline={isOnline} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
});

