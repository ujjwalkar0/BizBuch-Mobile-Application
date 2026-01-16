import React, { useMemo } from 'react';
import { View, Image, TouchableOpacity, ViewStyle, ImageStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

const { selectedImagePreview } = theme.components;

interface SelectedImagePreviewProps {
  uri: string;
  onRemove: () => void;
}

/**
 * SelectedImagePreview Molecule
 * Atomic Design: Molecule - Image with remove action button
 * Single Responsibility: Display selected image with remove capability
 * SOLID: Open/Closed - Styles from theme, extensible via props
 */
export const SelectedImagePreview: React.FC<SelectedImagePreviewProps> = ({
  uri,
  onRemove,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      marginHorizontal: selectedImagePreview.marginHorizontal,
      marginTop: selectedImagePreview.marginTop,
      position: 'relative',
    }),
    [],
  );

  const imageStyle = useMemo<ImageStyle>(
    () => ({
      width: '100%',
      height: selectedImagePreview.imageHeight,
      borderRadius: selectedImagePreview.imageBorderRadius,
    }),
    [],
  );

  const removeButtonStyle = useMemo<ViewStyle>(
    () => ({
      position: 'absolute',
      top: selectedImagePreview.removeButtonTop,
      right: selectedImagePreview.removeButtonRight,
      backgroundColor: theme.colors.gray100,
      borderRadius: selectedImagePreview.removeButtonBorderRadius,
      padding: selectedImagePreview.removeButtonPadding,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <Image source={{ uri }} style={imageStyle} />
      <TouchableOpacity style={removeButtonStyle} onPress={onRemove}>
        <FontAwesomeIcon
          icon={faXmark}
          size={selectedImagePreview.removeIconSize}
          color={theme.colors.gray600}
        />
      </TouchableOpacity>
    </View>
  );
};
