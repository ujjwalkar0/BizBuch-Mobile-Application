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

const { photoOptionsModal } = theme.components;

interface PhotoOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectImage: (uri: string) => void;
}

/**
 * PhotoOption Atom (internal)
 * Atomic Design: Atom - Single option button in modal
 * Single Responsibility: Display photo source option
 */
interface PhotoOptionProps {
  icon: any;
  label: string;
  onPress: () => void;
  showBorder?: boolean;
}

const PhotoOption: React.FC<PhotoOptionProps> = ({
  icon,
  label,
  onPress,
  showBorder = true,
}) => {
  const optionStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: photoOptionsModal.optionPaddingVertical,
      borderBottomWidth: showBorder ? photoOptionsModal.optionBorderBottomWidth : 0,
      borderBottomColor: theme.colors.gray200,
    }),
    [showBorder],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: photoOptionsModal.optionTextFontSize,
      marginLeft: photoOptionsModal.optionTextMarginLeft,
      color: theme.colors.gray800,
    }),
    [],
  );

  return (
    <TouchableOpacity style={optionStyle} onPress={onPress} activeOpacity={0.7}>
      <FontAwesomeIcon
        icon={icon}
        size={photoOptionsModal.optionIconSize}
        color={theme.colors.gray700}
      />
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

/**
 * PhotoOptionsModal Organism
 * Atomic Design: Organism - Modal with PhotoOption atoms
 * Single Responsibility: Display photo source selection modal
 * SOLID: Open/Closed - Styles from theme
 * SOLID: Dependency Inversion - Uses image picker utilities
 */
export const PhotoOptionsModal: React.FC<PhotoOptionsModalProps> = ({
  visible,
  onClose,
  onSelectImage,
}) => {
  const overlayStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      backgroundColor: `rgba(0, 0, 0, ${photoOptionsModal.overlayOpacity})`,
    }),
    [],
  );

  const sheetStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: photoOptionsModal.sheetBorderRadius,
      borderTopRightRadius: photoOptionsModal.sheetBorderRadius,
      padding: photoOptionsModal.sheetPadding,
    }),
    [],
  );

  const cancelStyle = useMemo<ViewStyle>(
    () => ({
      alignItems: 'center',
      paddingVertical: photoOptionsModal.cancelPaddingVertical,
      marginTop: 8,
    }),
    [],
  );

  const cancelTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: photoOptionsModal.cancelFontSize,
      fontWeight: photoOptionsModal.cancelFontWeight,
      color: theme.colors.red500,
    }),
    [],
  );

  const handleCameraPress = useCallback(async () => {
    onClose();
    const uri = await pickFromCamera();
    if (uri) onSelectImage(uri);
  }, [onClose, onSelectImage]);

  const handleGalleryPress = useCallback(async () => {
    onClose();
    const uri = await pickFromGallery();
    if (uri) onSelectImage(uri);
  }, [onClose, onSelectImage]);

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <Pressable style={overlayStyle} onPress={onClose} />

      <View style={sheetStyle}>
        <PhotoOption icon={faCamera} label="Camera" onPress={handleCameraPress} />
        <PhotoOption
          icon={faImage}
          label="Gallery"
          onPress={handleGalleryPress}
          showBorder={false}
        />

        <TouchableOpacity style={cancelStyle} onPress={onClose} activeOpacity={0.7}>
          <Text style={cancelTextStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
