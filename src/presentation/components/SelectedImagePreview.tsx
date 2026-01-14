import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { styles } from './styles';

interface Props {
  uri: string;
  onRemove: () => void;
}

export const SelectedImagePreview: React.FC<Props> = ({ uri, onRemove }) => (
  <View style={styles.imageContainer}>
    <Image source={{ uri }} style={styles.selectedImage} />
    <TouchableOpacity style={styles.removeImageButton} onPress={onRemove}>
      <FontAwesomeIcon icon={faXmark} size={14} />
    </TouchableOpacity>
  </View>
);
