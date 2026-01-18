import React, { useMemo } from 'react';
import { View, Image, TouchableOpacity, ViewStyle, ImageStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

const { profileImageSection } = theme.components;

interface ProfileImageSectionProps {
  avatarUri?: string | null;
  coverImageUri?: string | null;
  defaultAvatar?: string;
  defaultCoverImage?: string;
  onAvatarPress: () => void;
  onCoverPress: () => void;
}

/**
 * ProfileImageSection Molecule
 * Atomic Design: Molecule - Composed of avatar and cover image with edit buttons
 * Single Responsibility: Display and manage profile image editing
 * SOLID: Open/Closed - Styles from theme, extensible via props
 */
export const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({
  avatarUri,
  coverImageUri,
  defaultAvatar,
  defaultCoverImage,
  onAvatarPress,
  onCoverPress,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.white,
      marginBottom: profileImageSection.marginBottom,
    }),
    [],
  );

  const coverContainerStyle = useMemo<ViewStyle>(
    () => ({
      height: profileImageSection.coverImageHeight,
      backgroundColor: theme.colors.gray200,
    }),
    [],
  );

  const coverImageStyle = useMemo<ImageStyle>(
    () => ({
      width: '100%',
      height: '100%',
    }),
    [],
  );

  const coverButtonStyle = useMemo<ViewStyle>(
    () => ({
      position: 'absolute',
      bottom: profileImageSection.coverButtonBottom,
      right: profileImageSection.coverButtonRight,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      width: profileImageSection.coverButtonSize,
      height: profileImageSection.coverButtonSize,
      borderRadius: profileImageSection.coverButtonBorderRadius,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    [],
  );

  const avatarContainerStyle = useMemo<ViewStyle>(
    () => ({
      alignSelf: 'center',
      marginTop: profileImageSection.avatarMarginTop,
      marginBottom: profileImageSection.avatarMarginBottom,
      position: 'relative',
    }),
    [],
  );

  const avatarStyle = useMemo<ImageStyle>(
    () => ({
      width: profileImageSection.avatarSize,
      height: profileImageSection.avatarSize,
      borderRadius: profileImageSection.avatarBorderRadius,
      borderWidth: profileImageSection.avatarBorderWidth,
      borderColor: theme.colors.white,
    }),
    [],
  );

  const avatarButtonStyle = useMemo<ViewStyle>(
    () => ({
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: theme.colors.blue500,
      width: profileImageSection.avatarButtonSize,
      height: profileImageSection.avatarButtonSize,
      borderRadius: profileImageSection.avatarButtonBorderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: profileImageSection.avatarButtonBorderWidth,
      borderColor: theme.colors.white,
    }),
    [],
  );

  const coverSource = coverImageUri || defaultCoverImage;
  const avatarSource = avatarUri || defaultAvatar;

  return (
    <View style={containerStyle}>
      {/* Cover Image */}
      <View style={coverContainerStyle}>
        {coverSource ? (
          <Image source={{ uri: coverSource }} style={coverImageStyle} />
        ) : (
          <View style={coverImageStyle} />
        )}
        <TouchableOpacity style={coverButtonStyle} onPress={onCoverPress}>
          <FontAwesomeIcon
            icon={faCamera}
            size={profileImageSection.coverIconSize}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View style={avatarContainerStyle}>
        {avatarSource && (
          <Image source={{ uri: avatarSource }} style={avatarStyle} />
        )}
        <TouchableOpacity style={avatarButtonStyle} onPress={onAvatarPress}>
          <FontAwesomeIcon
            icon={faCamera}
            size={profileImageSection.avatarIconSize}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
