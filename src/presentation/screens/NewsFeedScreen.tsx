import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { PostRepository } from "../../data/repositories/PostRepository";
import { GetNewsFeed } from "../../domain/post/usecases/queries/GetNewsFeed";
import { PostCard } from "../components/PostCard";

export const NewsFeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const getNewsFeed = new GetNewsFeed(new PostRepository());

  useEffect(() => {
    getNewsFeed.execute().then(setPosts);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
          }}
          style={styles.avatar}
        />
        <View style={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} size={16} color="gray" />
          <TextInput placeholder="Search..." style={styles.searchInput} />
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesomeIcon icon={faEllipsisVertical} size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <ScrollView>
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchInput: { flex: 1, height: 40, color: "#000" },
  iconButton: { padding: 6 },
});
