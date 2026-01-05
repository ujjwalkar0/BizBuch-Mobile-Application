import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faImage,
  faBook,
  faSmile,
  faMapMarkerAlt,
  faPoll,
} from '@fortawesome/free-solid-svg-icons';
import { styles } from '../styles';

interface Props {
  onPhotoPress: () => void;
  onPollPress?: () => void;
  onFeelingPress?: () => void;
  onLocationPress?: () => void;
}

export const AddPostOptions: React.FC<Props> = ({
  onPhotoPress,
  onPollPress,
  onFeelingPress,
  onLocationPress,
}) => {
  const POST_OPTIONS = [
    {
      id: 'photo',
      icon: faImage,
      color: '#22C55E',
      label: 'Photo',
      onPress: onPhotoPress,
    },
    {
      id: 'poll',
      icon: faPoll,
      color: '#F29520',
      label: 'Poll',
      onPress: onPollPress,
    },
    {
      id: 'feeling',
      icon: faSmile,
      color: '#F59E0B',
      label: 'Feeling',
      onPress: onFeelingPress,
    },
    {
      id: 'location',
      icon: faMapMarkerAlt,
      color: '#3B82F6',
      label: 'Location',
      onPress: onLocationPress,
    },
  ];

  return (
    <View style={styles.addSection}>
      <View style={styles.addOptions}>
        {POST_OPTIONS.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.addOption}
            onPress={option.onPress}
          >
            <FontAwesomeIcon
              icon={option.icon}
              size={28}
              color={option.color}
            />
            <Text style={styles.optionLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
