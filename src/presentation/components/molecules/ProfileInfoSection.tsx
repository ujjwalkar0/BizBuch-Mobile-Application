import React, { useMemo } from 'react';
import { View, Text, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarkerAlt, faCheckCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

interface ProfileInfoSectionProps {
  avatarUri?: string;
  displayName: string;
  headline?: string;
  location?: string;
  bio?: string;
  isVerified?: boolean;
  isPremium?: boolean;
}

/**
 * ProfileInfoSection Molecule
 * Atomic Design: Molecule - Profile avatar, name, headline, location, bio
 * SOLID: Single Responsibility - Display user info section
 */
export const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  avatarUri,
  displayName,
  headline,
  location,
  bio,
  isVerified,
  isPremium,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      alignItems: 'center',
      paddingTop: 0,
      paddingBottom: 20,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.white,
    }),
    [],
  );

  const avatarContainerStyle = useMemo<ViewStyle>(
    () => ({
      marginTop: -64,
      marginBottom: 16,
      borderRadius: 64,
      padding: 4,
      backgroundColor: theme.colors.white,
    }),
    [],
  );

  const avatarStyle = useMemo<ImageStyle>(
    () => ({
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.gray200,
    }),
    [],
  );

  const nameRowStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    }),
    [],
  );

  const nameStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.gray900,
    }),
    [],
  );

  const headlineStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.gray600,
      marginBottom: 8,
      textAlign: 'center',
    }),
    [],
  );

  const locationRowStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    }),
    [],
  );

  const locationTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 14,
      color: theme.colors.gray500,
      marginLeft: 8,
    }),
    [],
  );

  const bioStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 14,
      color: theme.colors.gray600,
      textAlign: 'center',
      marginBottom: 16,
      paddingHorizontal: 20,
      lineHeight: 20,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <View style={avatarContainerStyle}>
        <Image source={{ uri: avatarUri }} style={avatarStyle} />
      </View>

      <View style={nameRowStyle}>
        <Text style={nameStyle}>{displayName}</Text>
        {isVerified && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            size={20}
            color={theme.colors.primary}
            style={{ marginLeft: 8 }}
          />
        )}
        {isPremium && (
          <FontAwesomeIcon
            icon={faStar}
            size={20}
            color="#FFD700"
            style={{ marginLeft: 4 }}
          />
        )}
      </View>

      {headline && <Text style={headlineStyle}>{headline}</Text>}

      {location && (
        <View style={locationRowStyle}>
          <FontAwesomeIcon icon={faMapMarkerAlt} size={14} color={theme.colors.gray500} />
          <Text style={locationTextStyle}>{location}</Text>
        </View>
      )}

      {bio && <Text style={bioStyle}>{bio}</Text>}
    </View>
  );
};
