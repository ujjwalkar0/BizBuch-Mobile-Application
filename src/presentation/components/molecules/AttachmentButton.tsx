import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { CircleButton } from '../atoms/CircleButton';
import { theme } from '../../theme';

interface AttachmentButtonProps {
  onPress?: () => void;
  size?: number;
  iconSize?: number;
  iconColor?: string;
}

/**
 * AttachmentButton Molecule
 * Atomic Design: Molecule - Button for attaching media
 * Single Responsibility: Handle attachment action
 * Reuses: CircleButton atom
 */
export const AttachmentButton: React.FC<AttachmentButtonProps> = ({
  onPress,
  size = 40,
  iconSize = 20,
  iconColor = theme.colors.gray500,
}) => {
  return (
    <CircleButton onPress={onPress} size={size}>
      <FontAwesomeIcon icon={faImage} size={iconSize} color={iconColor} />
    </CircleButton>
  );
};
