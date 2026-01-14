import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { CircleButton } from '../atoms/CircleButton';
import { theme } from '../../theme';

interface VoiceButtonProps {
  onPress?: () => void;
  size?: number;
  iconSize?: number;
}

/**
 * VoiceButton Molecule
 * Atomic Design: Molecule - Button for voice recording
 * Single Responsibility: Handle voice recording action
 * Reuses: CircleButton atom
 */
export const VoiceButton: React.FC<VoiceButtonProps> = ({
  onPress,
  size = 44,
  iconSize = 20,
}) => {
  return (
    <CircleButton
      onPress={onPress}
      size={size}
      backgroundColor={`${theme.colors.primary}15`}
    >
      <FontAwesomeIcon
        icon={faMicrophone}
        size={iconSize}
        color={theme.colors.primary}
      />
    </CircleButton>
  );
};
