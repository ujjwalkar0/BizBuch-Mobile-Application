import React, { useMemo, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faImage } from '@fortawesome/free-solid-svg-icons';
import { pickFromCamera, pickFromGallery } from '../../utils/imagePicker';
import { theme } from '../../theme';

const { imagePickerModal } = theme.components;

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectImage: (uri: string) => void;
}

/**
 * ImagePickerOption Atom (internal)
 * Atomic Design: Atom - Single option button in modal
 * Single Responsibility: Display image source option
 */
interface ImagePickerOptionProps {
  icon: any;
  label: string;
  onPress: () => void;
  showBorder?: boolean;
}

const ImagePickerOption: React.FC<ImagePickerOptionProps> = ({
  icon,
  label,
  onPress,
  showBorder = true,
}) => {
  const optionStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: imagePickerModal.optionPaddingVertical,
      paddingHorizontal: imagePickerModal.optionPaddingHorizontal,
      borderBottomWidth: showBorder ? imagePickerModal.optionBorderBottomWidth : 0,
      borderBottomColor: theme.colors.gray100,
    }),
    [showBorder],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: imagePickerModal.optionTextFontSize,
      marginLeft: imagePickerModal.optionTextMarginLeft,
      color: theme.colors.gray700,
      fontWeight: imagePickerModal.optionTextFontWeight,
    }),
    [],
  );

  return (
    <TouchableOpacity style={optionStyle} onPress={onPress} activeOpacity={0.7}>
      <FontAwesomeIcon
        icon={icon}
        size={imagePickerModal.optionIconSize}
        color={theme.colors.gray700}
      />
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

/**
 * ImagePickerModal Organism
 * Atomic Design: Organism - Modal with ImagePickerOption atoms
 * Single Responsibility: Display image source selection modal
 * SOLID: Open/Closed - Styles from theme
 * SOLID: Dependency Inversion - Uses image picker utilities
 */
export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  visible,
  onClose,
  onSelectImage,
}) => {
  const overlayStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      backgroundColor: `rgba(0, 0, 0, ${imagePickerModal.overlayOpacity})`,
    }),
    [],
  );

  const sheetStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: imagePickerModal.sheetBorderRadius,
      borderTopRightRadius: imagePickerModal.sheetBorderRadius,
      paddingTop: imagePickerModal.sheetPaddingTop,
      paddingBottom: imagePickerModal.sheetPaddingBottom,
      paddingHorizontal: imagePickerModal.sheetPaddingHorizontal,
    }),
    [],
  );

  const cancelStyle = useMemo<ViewStyle>(
    () => ({
      paddingVertical: imagePickerModal.cancelPaddingVertical,
      alignItems: 'center',
      marginTop: imagePickerModal.cancelMarginTop,
    }),
    [],
  );

  const cancelTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: imagePickerModal.cancelFontSize,
      fontWeight: imagePickerModal.cancelFontWeight,
      color: theme.colors.red500,
    }),
    [],
  );

  const handleCameraPress = useCallback(async () => {
    onClose();
    const uri = await pickFromCamera();
    if (uri) {
      onSelectImage(uri);
    }
  }, [onClose, onSelectImage]);

  const handleGalleryPress = useCallback(async () => {
    onClose();
    const uri = await pickFromGallery();
    if (uri) {
      onSelectImage(uri);
    }
  }, [onClose, onSelectImage]);

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <Pressable style={overlayStyle} onPress={onClose} />
      <View style={sheetStyle}>
        <ImagePickerOption
          icon={faCamera}
          label="Camera"
          onPress={handleCameraPress}
        />
        <ImagePickerOption
          icon={faImage}
          label="Gallery"
          onPress={handleGalleryPress}
          showBorder={false}
        />
        <TouchableOpacity style={cancelStyle} onPress={onClose}>
          <Text style={cancelTextStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
