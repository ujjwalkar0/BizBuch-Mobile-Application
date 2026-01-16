import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faImage, faSmile, faMapMarkerAlt, faPoll } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';
import { VerticalIconButton } from '../atoms/VerticalIconButton';

const { addPostOptions } = theme.components;

/**
 * Post option configuration
 * Single Responsibility: Define available post options
 * SOLID: Open/Closed - Easy to extend without modifying component
 */
interface PostOption {
  id: string;
  icon: IconDefinition;
  color: string;
  label: string;
}

const POST_OPTION_CONFIG: Record<string, Omit<PostOption, 'id'>> = {
  photo: { icon: faImage, color: theme.colors.green500, label: 'Photo' },
  poll: { icon: faPoll, color: theme.colors.primary, label: 'Poll' },
  feeling: { icon: faSmile, color: '#F59E0B', label: 'Feeling' },
  location: { icon: faMapMarkerAlt, color: theme.colors.blue500, label: 'Location' },
};

interface AddPostOptionsProps {
  onPhotoPress: () => void;
  onPollPress?: () => void;
  onFeelingPress?: () => void;
  onLocationPress?: () => void;
}

/**
 * AddPostOptions Molecule
 * Atomic Design: Molecule - Composed of VerticalIconButton atoms
 * Single Responsibility: Display post creation options
 * SOLID: Open/Closed - Options defined externally, styles from theme
 * SOLID: Interface Segregation - Only required callbacks are mandatory
 * SOLID: Dependency Inversion - Depends on VerticalIconButton atom abstraction
 */
export const AddPostOptions: React.FC<AddPostOptionsProps> = ({
  onPhotoPress,
  onPollPress,
  onFeelingPress,
  onLocationPress,
}) => {
  const pressHandlers: Record<string, (() => void) | undefined> = useMemo(
    () => ({
      photo: onPhotoPress,
      poll: onPollPress,
      feeling: onFeelingPress,
      location: onLocationPress,
    }),
    [onPhotoPress, onPollPress, onFeelingPress, onLocationPress],
  );

  const options: PostOption[] = useMemo(
    () =>
      Object.entries(POST_OPTION_CONFIG).map(([id, config]) => ({
        id,
        ...config,
      })),
    [],
  );

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      padding: addPostOptions.padding,
    }),
    [],
  );

  const optionsRowStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      justifyContent: 'space-around',
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <View style={optionsRowStyle}>
        {options.map((option) => (
          <VerticalIconButton
            key={option.id}
            icon={option.icon}
            label={option.label}
            iconColor={option.color}
            onPress={pressHandlers[option.id]}
          />
        ))}
      </View>
    </View>
  );
};
