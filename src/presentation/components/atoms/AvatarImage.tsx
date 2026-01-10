import React from 'react';
import { AvatarPhoto } from './AvatarPhoto';
import { AvatarPlaceholder } from './AvatarPlaceholder';

interface AvatarImageProps {
  uri?: string;
  initial: string;
  size?: number;
}

/**
 * AvatarImage Molecule
 * Atomic Design: Molecule - Composed of AvatarPhoto or AvatarPlaceholder atoms
 * Single Responsibility: Choose between photo or placeholder display
 */
export const AvatarImage: React.FC<AvatarImageProps> = ({
  uri,
  initial,
  size = 42,
}) => {
  if (uri) {
    return <AvatarPhoto uri={uri} size={size} />;
  }

  return <AvatarPlaceholder initial={initial} size={size} />;
};
