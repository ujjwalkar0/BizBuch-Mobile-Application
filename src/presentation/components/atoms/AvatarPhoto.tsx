import React, { useMemo } from 'react';
import { Image, ImageStyle } from 'react-native';
import { theme } from '../../theme';

interface AvatarPhotoProps {
  uri: string;
  size?: number;
}

/**
 * AvatarPhoto Atom
 * Atomic Design: Atom - Pure image element for avatar
 * Single Responsibility: Display circular photo
 * SOLID: Open/Closed - Styles from theme
 */
export const AvatarPhoto: React.FC<AvatarPhotoProps> = ({
  uri,
  size = theme.components.avatar.defaultSize,
}) => {
  const imageStyle = useMemo<ImageStyle>(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: theme.components.avatar.photoBackgroundColor,
    }),
    [size],
  );

  return <Image source={{ uri }} style={imageStyle} />;
};
