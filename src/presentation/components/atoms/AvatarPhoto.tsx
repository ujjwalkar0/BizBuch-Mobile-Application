import React from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';
import { theme } from '../../theme';

interface AvatarPhotoProps {
  uri: string;
  size?: number;
}

/**
 * AvatarPhoto Atom
 * Atomic Design: Atom - Pure image element for avatar
 * Single Responsibility: Display circular photo
 */
export const AvatarPhoto: React.FC<AvatarPhotoProps> = ({ uri, size = 42 }) => {
  const borderRadius = size / 2;

  return (
    <Image
      source={{ uri }}
      style={[
        styles.photo,
        { width: size, height: size, borderRadius } as ImageStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  photo: {
    backgroundColor: theme.colors.gray200,
  },
});
