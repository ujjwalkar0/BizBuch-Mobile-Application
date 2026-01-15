import React, { useMemo } from 'react';
import { Image, TouchableOpacity, ImageStyle, ViewStyle } from 'react-native';
import { theme } from '../../theme';

const { postImage } = theme.components;

interface PostImageProps {
  uri: string;
  onPress?: () => void;
}

/**
 * PostImage Atom
 * Atomic Design: Atom - Post image display
 * Single Responsibility: Display post image with optional press
 * SOLID: Open/Closed - Styles from theme
 */
export const PostImage: React.FC<PostImageProps> = ({ uri, onPress }) => {
  const imageStyle = useMemo<ImageStyle>(
    () => ({
      width: '100%',
      aspectRatio: postImage.aspectRatio,
      backgroundColor: theme.colors.gray100,
    }),
    [],
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
        <Image source={{ uri }} style={imageStyle} />
      </TouchableOpacity>
    );
  }

  return <Image source={{ uri }} style={imageStyle} />;
};
