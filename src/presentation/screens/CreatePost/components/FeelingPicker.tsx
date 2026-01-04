import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import { FEELINGS } from './feelings';
import { styles } from '../styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (feeling: { id: string; label: string; emoji: string }) => void;
}

export const FeelingPicker: React.FC<Props> = ({
  visible,
  onClose,
  onSelect,
}) => {
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.bottomSheet}>
        <Text style={styles.sheetTitle}>How are you feeling?</Text>

        <FlatList
          data={FEELINGS}
          keyExtractor={(item) => item.id}
          numColumns={4}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.feelingItem}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={styles.feelingEmoji}>{item.emoji}</Text>
              <Text style={styles.feelingLabel}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};
