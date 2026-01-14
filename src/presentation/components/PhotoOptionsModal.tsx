import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faImage } from '@fortawesome/free-solid-svg-icons';
import { styles } from './styles';
import { pickFromCamera, pickFromGallery } from '../utils/imagePicker';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelectImage: (uri: string) => void;
}

export const PhotoOptionsModal: React.FC<Props> = ({
  visible,
  onClose,
  onSelectImage,
}) => (
  <Modal transparent animationType="slide" visible={visible}>
    <Pressable style={styles.overlay} onPress={onClose} />

    <View style={styles.bottomSheet}>
      <TouchableOpacity
        style={styles.sheetOption}
        onPress={async () => {
          onClose();
          const uri = await pickFromCamera();
          if (uri) onSelectImage(uri);
        }}
      >
        <FontAwesomeIcon icon={faCamera} size={18} />
        <Text style={styles.sheetText}>Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sheetOption}
        onPress={async () => {
          onClose();
          const uri = await pickFromGallery();
          if (uri) onSelectImage(uri);
        }}
      >
        <FontAwesomeIcon icon={faImage} size={18} />
        <Text style={styles.sheetText}>Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancel} onPress={onClose}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);
