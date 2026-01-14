import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../theme';

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

interface Props {
  onStoryPress?: (storyId: number) => void;
  onAddStory?: () => void;
}

export const StoriesSection: React.FC<Props> = ({ onStoryPress, onAddStory }) => {
  const renderStoryItem = (story: Story) => {
    const isYourStory = story.id === 0;

    return (
      <TouchableOpacity
        key={story.id}
        style={styles.storyItem}
        onPress={() => (isYourStory ? onAddStory?.() : onStoryPress?.(story.id))}
        activeOpacity={0.8}
      >
        <View style={styles.avatarWrapper}>
          {isYourStory ? (
            <View style={styles.yourStoryContainer}>
              <Image source={{ uri: story.avatar }} style={styles.avatar} />
              <View style={styles.addButton}>
                <FontAwesomeIcon icon={faPlus} size={12} color="#fff" />
              </View>
            </View>
          ) : (
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryDark, theme.colors.primary]}
              style={styles.gradientRing}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.avatarBorder}>
                <Image source={{ uri: story.avatar }} style={styles.avatar} />
              </View>
            </LinearGradient>
          )}
        </View>
        <Text style={styles.username} numberOfLines={1}>
          {story.username}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {stories.map(renderStoryItem)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  storyItem: {
    alignItems: 'center',
    width: 72,
  },
  avatarWrapper: {
    marginBottom: 6,
  },
  yourStoryContainer: {
    position: 'relative',
  },
  gradientRing: {
    padding: 2,
    borderRadius: 36,
  },
  avatarBorder: {
    padding: 2,
    backgroundColor: theme.colors.white,
    borderRadius: 34,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.gray200,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 12,
    color: theme.colors.gray600,
    textAlign: 'center',
    maxWidth: 72,
  },
});
