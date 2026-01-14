import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FeedNavigationProp } from '../navigation/news-feed-navigation/NewsFeedScreenStackParamList';
import { LogoSection } from './molecules/LogoSection';
import { ProfileAvatarButton } from './molecules/ProfileAvatarButton';
import { useNewsFeedHeader } from '../../ui/hooks/useNewsFeedHeader';
import { theme } from '../theme';

interface NewsFeedHeaderProps {
  navigation: FeedNavigationProp;
}

/**
 * NewsFeedHeader Component
 * Atomic Design: Organism - Composed of LogoSection and ProfileAvatarButton molecules
 * SOLID: Single Responsibility - Header layout orchestration
 * SOLID: Open/Closed - Extensible through molecule composition
 * SOLID: Dependency Inversion - Uses hook for business logic
 */
export const NewsFeedHeader: React.FC<NewsFeedHeaderProps> = ({ navigation }) => {
  const { handleProfilePress } = useNewsFeedHeader({ navigation });

  return (
    <View style={styles.header}>
      <LogoSection />
      <ProfileAvatarButton
        imageUri="https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=100"
        onPress={handleProfilePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
});
