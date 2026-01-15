import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../../theme';

const { storiesSection } = theme.components;

interface Story {
  id: number;
  username: string;
  avatar: string;
  hasStory: boolean;
}

const stories: Story[] = [
  {
    id: 0,
    username: 'Your Story',
    avatar:
      'https://images.unsplash.com/photo-1649433658557-54cf58577c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    hasStory: false,
  },
  {
    id: 1,
    username: 'sarah_j',
    avatar:
      'https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    hasStory: true,
  },
  {
    id: 2,
    username: 'mike_chen',
    avatar:
      'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    hasStory: true,
  },
  {
    id: 3,
    username: 'emma_w',
    avatar:
      'https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    hasStory: true,
  },
  {
    id: 4,
    username: 'alex_t',
    avatar:
      'https://images.unsplash.com/photo-1649433658557-54cf58577c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    hasStory: true,
  },
  {
    id: 5,
    username: 'jordan_p',
    avatar:
      'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    hasStory: true,
  },
];

interface StoriesSectionProps {
  onStoryPress?: (storyId: number) => void;
  onAddStory?: () => void;
}

/**
 * StoriesSection Organism
 * Atomic Design: Organism - Complex stories carousel with multiple story items
 * Single Responsibility: Display and manage stories horizontal list
 * SOLID: Open/Closed - Extensible via callbacks, styles from theme
 */
export const StoriesSection: React.FC<StoriesSectionProps> = ({
  onStoryPress,
  onAddStory,
}) => {
  // Memoized styles
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.white,
      paddingVertical: storiesSection.paddingVertical,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    }),
    [],
  );

  const scrollContentStyle = useMemo<ViewStyle>(
    () => ({
      paddingHorizontal: storiesSection.scrollPaddingHorizontal,
      gap: storiesSection.scrollGap,
    }),
    [],
  );

  const storyItemStyle = useMemo<ViewStyle>(
    () => ({
      alignItems: 'center',
      width: storiesSection.storyItemWidth,
    }),
    [],
  );

  const avatarWrapperStyle = useMemo<ViewStyle>(
    () => ({
      marginBottom: storiesSection.storyItemMarginBottom,
    }),
    [],
  );

  const avatarStyle = useMemo<ImageStyle>(
    () => ({
      width: storiesSection.avatarSize,
      height: storiesSection.avatarSize,
      borderRadius: storiesSection.avatarBorderRadius,
      backgroundColor: theme.colors.gray200,
    }),
    [],
  );

  const gradientRingStyle = useMemo<ViewStyle>(
    () => ({
      padding: storiesSection.gradientPadding,
      borderRadius: storiesSection.gradientRingBorderRadius,
    }),
    [],
  );

  const avatarBorderStyle = useMemo<ViewStyle>(
    () => ({
      padding: storiesSection.avatarBorderPadding,
      backgroundColor: theme.colors.white,
      borderRadius: storiesSection.avatarBorderRadius34,
    }),
    [],
  );

  const addButtonStyle = useMemo<ViewStyle>(
    () => ({
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: storiesSection.addButtonSize,
      height: storiesSection.addButtonSize,
      borderRadius: storiesSection.addButtonBorderRadius,
      backgroundColor: theme.colors.primary,
      borderWidth: storiesSection.addButtonBorderWidth,
      borderColor: theme.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [],
  );

  const usernameStyle = useMemo<TextStyle>(
    () => ({
      fontSize: storiesSection.usernameFontSize,
      color: theme.colors.gray600,
      textAlign: 'center',
      maxWidth: storiesSection.storyItemWidth,
    }),
    [],
  );

  const renderStoryItem = useCallback(
    (story: Story) => {
      const isYourStory = story.id === 0;

      return (
        <TouchableOpacity
          key={story.id}
          style={storyItemStyle}
          onPress={() => (isYourStory ? onAddStory?.() : onStoryPress?.(story.id))}
          activeOpacity={0.8}
        >
          <View style={avatarWrapperStyle}>
            {isYourStory ? (
              <View style={{ position: 'relative' }}>
                <Image source={{ uri: story.avatar }} style={avatarStyle} />
                <View style={addButtonStyle}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    size={storiesSection.addButtonIconSize}
                    color={theme.colors.white}
                  />
                </View>
              </View>
            ) : (
              <LinearGradient
                colors={[
                  theme.colors.primary,
                  theme.colors.primaryDark,
                  theme.colors.primary,
                ]}
                style={gradientRingStyle}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={avatarBorderStyle}>
                  <Image source={{ uri: story.avatar }} style={avatarStyle} />
                </View>
              </LinearGradient>
            )}
          </View>
          <Text style={usernameStyle} numberOfLines={1}>
            {story.username}
          </Text>
        </TouchableOpacity>
      );
    },
    [
      storyItemStyle,
      avatarWrapperStyle,
      avatarStyle,
      addButtonStyle,
      gradientRingStyle,
      avatarBorderStyle,
      usernameStyle,
      onAddStory,
      onStoryPress,
    ],
  );

  return (
    <View style={containerStyle}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={scrollContentStyle}
      >
        {stories.map(renderStoryItem)}
      </ScrollView>
    </View>
  );
};
