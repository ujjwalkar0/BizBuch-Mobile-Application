import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { FeedNavigationProp } from '../../navigation/news-feed-navigation/NewsFeedScreenStackParamList';
import { LogoSection } from './LogoSection';
import { ProfileAvatarButton } from './ProfileAvatarButton';
import { useNewsFeedHeader } from '../../../ui/hooks/useNewsFeedHeader';
import { useUserAvatar } from '../../../ui/hooks/useUserAvatar';
import { theme } from '../../theme';

const { newsFeedHeader } = theme.components;

interface NewsFeedHeaderProps {
  navigation: FeedNavigationProp;
}

/**
 * NewsFeedHeader Component
 * Atomic Design: Organism - Composed of LogoSection and ProfileAvatarButton molecules
 * SOLID: Single Responsibility - Header layout orchestration
 * SOLID: Open/Closed - Extensible through molecule composition, styles from theme
 * SOLID: Dependency Inversion - Uses hook for business logic
 */
export const NewsFeedHeader: React.FC<NewsFeedHeaderProps> = ({ navigation }) => {
  const { handleProfilePress } = useNewsFeedHeader({ navigation });
  const { avatarUri } = useUserAvatar();

  const headerStyle = useMemo<ViewStyle>(
    () => ({
      height: newsFeedHeader.height,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: newsFeedHeader.paddingHorizontal,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
    }),
    [],
  );

  return (
    <View style={headerStyle}>
      <LogoSection />
      <ProfileAvatarButton
        imageUri={avatarUri}
        onPress={handleProfilePress}
      />
    </View>
  );
};
