// src/presentation/components/PostCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Post } from "../../domain/post/entities/Post";

interface Props {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{post.author.name}</Text>
        <Text style={styles.username}>{post.author.username}</Text>
      </View>
    </View>

    <Text style={styles.content}>{post.content}</Text>

    {post.image && <Image source={{ uri: post.image }} style={styles.image} />}
    <Text style={styles.timestamp}>{post.timestamp}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", marginBottom: 8, padding: 12 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontWeight: "bold", color: "#000" },
  username: { color: "#555", fontSize: 12 },
  content: { color: "#000", marginBottom: 8 },
  image: { width: "100%", height: 200, borderRadius: 10 },
  timestamp: { color: "#888", fontSize: 12, marginTop: 5 },
});
