import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';
import { AvatarPhoto } from '../atoms/AvatarPhoto';

const { userSection } = theme.components;

/**
 * Feeling type definition
 * Single Responsibility: Define feeling data structure
 */
interface Feeling {
  id: string;
  label: string;
  emoji: string;
}

interface UserSectionProps {
  audience: string;
  userName: string;
  userAvatar: string;
  feeling?: Feeling | null;
  onAudiencePress?: () => void;
}

/**
 * UserSection Molecule
 * Atomic Design: Molecule - Composed of AvatarPhoto atom and text elements
 * Single Responsibility: Display user info with avatar, name, feeling, and audience
 * SOLID: Open/Closed - Styles from theme, extensible via props
 * SOLID: Dependency Inversion - Depends on AvatarPhoto atom abstraction
 */
export const UserSection: React.FC<UserSectionProps> = ({
  audience,
  userName,
  userAvatar,
  feeling,
  onAudiencePress,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      padding: userSection.padding,
      borderBottomWidth: userSection.borderBottomWidth,
      borderColor: theme.colors.gray200,
    }),
    [],
  );

  const userInfoStyle = useMemo<ViewStyle>(
    () => ({
      marginLeft: userSection.userInfoMarginLeft,
      flex: 1,
    }),
    [],
  );

  const userNameStyle = useMemo<TextStyle>(
    () => ({
      fontSize: userSection.userNameFontSize,
      fontWeight: userSection.userNameFontWeight,
      color: theme.colors.gray800,
    }),
    [],
  );

  const feelingStyle = useMemo<TextStyle>(
    () => ({
      fontSize: userSection.feelingFontSize,
      fontWeight: '400',
      color: theme.colors.gray600,
    }),
    [],
  );

  const audienceButtonStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderColor: theme.colors.gray200,
      borderRadius: userSection.audienceButtonBorderRadius,
      paddingHorizontal: userSection.audienceButtonPaddingHorizontal,
      paddingVertical: userSection.audienceButtonPaddingVertical,
      marginTop: userSection.audienceButtonMarginTop,
    }),
    [],
  );

  const audienceTextStyle = useMemo<TextStyle>(
    () => ({
      marginLeft: userSection.audienceTextMarginLeft,
      fontSize: userSection.audienceTextFontSize,
      color: theme.colors.gray600,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <AvatarPhoto uri={userAvatar} size={userSection.avatarSize} />

      <View style={userInfoStyle}>
        <Text style={userNameStyle}>
          {userName}
          {feeling && (
            <Text style={feelingStyle}>
              {' '}is feeling {feeling.emoji} {feeling.label}
            </Text>
          )}
        </Text>

        {/* Audience selector - will add dropdown in release/3.0 */}
        <TouchableOpacity
          style={audienceButtonStyle}
          onPress={onAudiencePress}
          activeOpacity={0.7}
        >
          <FontAwesomeIcon
            icon={faUsers}
            size={userSection.audienceIconSize}
            color={theme.colors.gray600}
          />
          <Text style={audienceTextStyle}>{audience}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
