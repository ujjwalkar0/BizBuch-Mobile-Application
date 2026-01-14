import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { AvatarPhoto } from '../atoms/AvatarPhoto';
import { AvatarRing } from '../atoms/AvatarRing';

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
 * Reuses: AvatarPhoto atom, AvatarRing atom
 */
export const ProfileAvatarButton: React.FC<ProfileAvatarButtonProps> = ({
  imageUri,
  onPress,
  size = 32,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <AvatarRing size={size}>
        <AvatarPhoto uri={imageUri} size={size} />
      </AvatarRing>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 2,
  },
});
