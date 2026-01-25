import React, { useMemo } from 'react';
import { View, Image, ViewStyle, ImageStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../../theme';

interface ProfileCoverSectionProps {
  coverImageUri?: string;
}

/**
 * ProfileCoverSection Molecule
 * Atomic Design: Molecule - Cover image with gradient overlay
 * SOLID: Single Responsibility - Display profile cover image
 */
export const ProfileCoverSection: React.FC<ProfileCoverSectionProps> = ({
  coverImageUri,
}) => {
  const gradientStyle = useMemo<ViewStyle>(
    () => ({
      width: '100%',
      height: 180,
    }),
    [],
  );

  const imageStyle = useMemo<ImageStyle>(
    () => ({
      width: '100%',
      height: '100%',
      opacity: 0.6,
    }),
    [],
  );

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.primaryDark, theme.colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={gradientStyle}
    >
      {coverImageUri && (
        <Image source={{ uri: coverImageUri }} style={imageStyle} />
      )}
    </LinearGradient>
  );
};
