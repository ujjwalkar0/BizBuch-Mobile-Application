import React, { useMemo } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { AvatarPhoto } from '../atoms/AvatarPhoto';
import { AvatarRing } from '../atoms/AvatarRing';
import { theme } from '../../theme';

const { profileAvatarButton } = theme.components;

interface ProfileAvatarButtonProps {
  imageUri: string;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
}

/**
 * ProfileAvatarButton Molecule
 * Atomic Design: Molecule - Tappable avatar with ring border
 * Single Responsibility: Display profile navigation trigger
 * SOLID: Open/Closed - Styles from theme
 * Reuses: AvatarPhoto atom, AvatarRing atom
 */
export const ProfileAvatarButton: React.FC<ProfileAvatarButtonProps> = ({
  imageUri,
  onPress,
  size = profileAvatarButton.defaultSize,
  style,
}) => {
  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      padding: profileAvatarButton.padding,
    }),
    [],
  );

  return (
    <TouchableOpacity style={[buttonStyle, style]} onPress={onPress}>
      <AvatarRing size={size}>
        <AvatarPhoto uri={imageUri} size={size} />
      </AvatarRing>
    </TouchableOpacity>
  );
};
