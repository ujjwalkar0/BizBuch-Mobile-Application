import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

interface NewsFeedScreenProps {
  onNavigate: (page: string) => void;
}

export function NewsFeedScreen({ onNavigate }: NewsFeedScreenProps) {
  const posts = [
    {
      author: {
        name: 'Alex Thompson',
        username: '@alexthompson',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        title: 'CEO at TechVision Inc.',
      },
      content:
        "Excited to announce our new AI-powered platform! 🚀\n\n#AI #Innovation #TechLaunch",
      image:
        'https://images.unsplash.com/photo-1582192904915-d89c7250b235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      timestamp: '2 hours ago',
      likes: 1247,
      comments: 89,
      shares: 45,
    },
    {
      author: {
        name: 'Maria Garcia',
        username: '@mariagarcia',
        avatar:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
        title: 'Product Manager at Innovate Labs',
      },
      content:
        "Working with an amazing team makes the difference 💼✨",
      image:
        'https://images.unsplash.com/photo-1690264421892-46e3af5c3455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      timestamp: '5 hours ago',
      likes: 892,
      comments: 56,
      shares: 23,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            }}
            style={styles.avatar}
          />
          <View style={styles.searchContainer}>
            <FontAwesomeIcon
              icon={faSearch}
              size={16}
              color="gray"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#777"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesomeIcon icon={faEllipsisVertical} size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {['For You', 'Following', 'Trending'].map((tab, index) => (
            <TouchableOpacity key={index} style={styles.tabButton}>
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Post
      <TouchableOpacity
        style={styles.quickPost}
        onPress={() => onNavigate('create')}
      >
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
          }}
          style={styles.avatar}
        />
        <View style={styles.quickPostBox}>
          <Text style={styles.quickPostText}>What's on your mind?</Text>
        </View>
      </TouchableOpacity> */}

      {/* Feed */}
      <ScrollView>
        {posts.map((post, index) => (
          <View key={index} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image
                source={{ uri: post.author.avatar }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.authorName}>{post.author.name}</Text>
                <Text style={styles.authorUsername}>{post.author.username}</Text>
              </View>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            )}

            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  searchContainer: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, height: 40, color: '#000' },
  iconButton: { padding: 6 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around' },
  tabButton: { paddingVertical: 8 },
  tabText: { fontWeight: '500', color: '#333' },
  quickPost: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  quickPostBox: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 10,
  },
  quickPostText: { color: '#777' },
  postCard: {
    backgroundColor: '#fff',
    marginBottom: 8,
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  authorName: { fontWeight: 'bold', color: '#000' },
  authorUsername: { color: '#555', fontSize: 12 },
  postContent: { color: '#000', marginBottom: 8 },
  postImage: { width: '100%', height: 200, borderRadius: 10 },
  timestamp: { color: '#888', fontSize: 12, marginTop: 5 },
});

export default NewsFeedScreen;
