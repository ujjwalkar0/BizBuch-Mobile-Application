import React, { useMemo, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FEELINGS } from '../feelings';
import { theme } from '../../theme';

const { feelingPicker } = theme.components;

/**
 * Feeling type definition
 * Single Responsibility: Define feeling data structure
 */
interface Feeling {
  id: string;
  label: string;
  emoji: string;
}

interface FeelingPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (feeling: Feeling) => void;
}

/**
 * FeelingItem Atom (internal)
 * Atomic Design: Atom - Single feeling selection item
 * Single Responsibility: Display single feeling option
 */
interface FeelingItemProps {
  feeling: Feeling;
  onPress: () => void;
}

const FeelingItem: React.FC<FeelingItemProps> = ({ feeling, onPress }) => {
  const itemStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: feelingPicker.itemPadding,
      margin: 4,
      borderRadius: feelingPicker.itemBorderRadius,
      backgroundColor: theme.colors.gray50,
    }),
    [],
  );

  const emojiStyle = useMemo<TextStyle>(
    () => ({
      fontSize: feelingPicker.emojiFontSize,
    }),
    [],
  );

  const labelStyle = useMemo<TextStyle>(
    () => ({
      fontSize: feelingPicker.labelFontSize,
      color: theme.colors.gray700,
      marginTop: feelingPicker.labelMarginTop,
      textAlign: 'center',
    }),
    [],
  );

  return (
    <TouchableOpacity style={itemStyle} onPress={onPress} activeOpacity={0.7}>
      <Text style={emojiStyle}>{feeling.emoji}</Text>
      <Text style={labelStyle}>{feeling.label}</Text>
    </TouchableOpacity>
  );
};

/**
 * FeelingPicker Organism
 * Atomic Design: Organism - Modal with grid of FeelingItem atoms
 * Single Responsibility: Display feeling selection modal
 * SOLID: Open/Closed - Feelings defined externally in FEELINGS constant
 * SOLID: Dependency Inversion - Uses FEELINGS configuration
 */
export const FeelingPicker: React.FC<FeelingPickerProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const overlayStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      backgroundColor: `rgba(0, 0, 0, ${feelingPicker.overlayOpacity})`,
    }),
    [],
  );

  const sheetStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: feelingPicker.sheetBorderRadius,
      borderTopRightRadius: feelingPicker.sheetBorderRadius,
      padding: feelingPicker.sheetPadding,
      maxHeight: '60%',
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: feelingPicker.titleFontSize,
      fontWeight: feelingPicker.titleFontWeight,
      color: theme.colors.gray900,
      marginBottom: feelingPicker.titleMarginBottom,
      textAlign: 'center',
    }),
    [],
  );

  const handleSelect = useCallback(
    (feeling: Feeling) => {
      onSelect(feeling);
      onClose();
    },
    [onSelect, onClose],
  );

  const renderItem = useCallback(
    ({ item }: { item: Feeling }) => (
      <FeelingItem feeling={item} onPress={() => handleSelect(item)} />
    ),
    [handleSelect],
  );

  const keyExtractor = useCallback((item: Feeling) => item.id, []);

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <Pressable style={overlayStyle} onPress={onClose} />

      <View style={sheetStyle}>
        <Text style={titleStyle}>How are you feeling?</Text>

        <FlatList
          data={FEELINGS}
          keyExtractor={keyExtractor}
          numColumns={4}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
};
