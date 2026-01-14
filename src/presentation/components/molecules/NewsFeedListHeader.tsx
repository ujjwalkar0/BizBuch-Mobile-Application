import React from 'react';
import { View } from 'react-native';
import { NewsFeedHeader } from '../NewsFeedHeader';

interface NewsFeedListHeaderProps {
  navigation: any;
}

/**
 * NewsFeedListHeader Molecule
 * Atomic Design: Molecule - List header for news feed
 * Single Responsibility: Render the news feed list header content
 */
export const NewsFeedListHeader: React.FC<NewsFeedListHeaderProps> = ({
  navigation,
}) => {
  return (
    <View>
      <NewsFeedHeader navigation={navigation} />
      {/* StoriesSection can be enabled here */}
    </View>
  );
};
