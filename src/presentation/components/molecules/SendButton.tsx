import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { CircleButton } from '../atoms/CircleButton';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { theme } from '../../theme';

interface SendButtonProps {
  onPress: () => void;
  disabled?: boolean;
  isSending?: boolean;
  size?: number;
  iconSize?: number;
}

/**
 * SendButton Molecule
 * Atomic Design: Molecule - Button for sending messages
 * Single Responsibility: Handle send action with loading state
 * Reuses: CircleButton atom, LoadingSpinner atom
 */
export const SendButton: React.FC<SendButtonProps> = ({
  onPress,
  disabled = false,
  isSending = false,
  size = 44,
  iconSize = 18,
}) => {
  const isDisabled = disabled || isSending;
  const backgroundColor = isDisabled
    ? `${theme.colors.primary}60`
    : theme.colors.primary;

  return (
    <CircleButton
      onPress={onPress}
      disabled={isDisabled}
      size={size}
      backgroundColor={backgroundColor}
    >
      {isSending ? (
        <LoadingSpinner size="small" color={theme.colors.white} />
      ) : (
        <FontAwesomeIcon
          icon={faPaperPlane}
          size={iconSize}
          color={theme.colors.white}
        />
      )}
    </CircleButton>
  );
};
