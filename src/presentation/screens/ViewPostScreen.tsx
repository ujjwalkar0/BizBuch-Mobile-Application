import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faHeart,
  faComment,
  faShare,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { PostRepository } from "../../data/repositories/PostRepository";
import { PostResponseBody } from "../../domain/post/entities/Post";
import { GetPostById } from "../../domain/post/usecases/queries/GetPostById";
import { ViewPostScreenProps } from "../navigation/news-feed-navigation/NewsFeedScreenStackParamList";


export const ViewPostScreen: React.FC<ViewPostScreenProps> = ({ route, navigation }) => {
  const { postId } = route.params;

  const [post, setPost] = useState<PostResponseBody | null>(null);

  const useCase = new GetPostById(new PostRepository());

  useEffect(() => {
    useCase.execute(postId).then(setPost);
  }, []);

  if (!post) return <Text style={{ padding: 20 }}>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
      </View>

      {/* User Row */}
      <View style={styles.userRow}>
        <Image source={{ uri: post.author }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{post.author}</Text>
          <Text style={styles.username}>{post.author}</Text>
        </View>
      </View>

      {/* Content */}
      <Text style={styles.content}>{post.content}</Text>

      {post.image_url && <Image source={{ uri: post.image_url }} style={styles.postImage} />}

      <Text style={styles.timestamp}>{post.timestamp}</Text>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <View style={styles.actionButton}>
          <FontAwesomeIcon icon={faHeart} size={20} color="#ef4444" />
          <Text style={styles.actionLabel}>Like</Text>
        </View>

        <View style={styles.actionButton}>
          <FontAwesomeIcon icon={faComment} size={20} color="#3b82f6" />
          <Text style={styles.actionLabel}>Comment</Text>
        </View>

        <View style={styles.actionButton}>
          <FontAwesomeIcon icon={faShare} size={20} color="#10b981" />
          <Text style={styles.actionLabel}>Share</Text>
        </View>

        <View style={styles.actionButton}>
          <FontAwesomeIcon icon={faPaperPlane} size={20} color="#7c3aed" />
          <Text style={styles.actionLabel}>Send</Text>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerTitle: { marginLeft: 12, fontWeight: "600", fontSize: 18 },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  name: { fontWeight: "bold", fontSize: 16 },
  username: { color: "#666", fontSize: 13 },

  content: { fontSize: 15, paddingHorizontal: 16, marginBottom: 10 },
  postImage: { width: "100%", height: 300 },
  timestamp: { paddingHorizontal: 16, color: "#999", marginTop: 8 },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionLabel: { fontSize: 14 },
});
