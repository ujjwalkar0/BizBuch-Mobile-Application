// src/presentation/components/PostCard.tsx

/*
<PostCard
  post={post}
  isFollowing={false}
  onFollow={() => console.log("Follow clicked")}
  onMenuPress={() => console.log("Menu pressed")}
  onLike={() => console.log("Liked")}
  onComment={() => console.log("Comment")}
  onShare={() => console.log("Share")}
  onSend={() => console.log("Send")}
/>
*/
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faComment,
  faShare,
  faPaperPlane,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

import { Post } from "../../domain/post/entities/Post";

interface Props {
  post: Post;
  onPostOpen?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSend?: () => void;
  onFollow?: () => void;
  onMenuPress?: () => void;
  isFollowing?: boolean;
}

export const PostCard: React.FC<Props> = ({
  post,
  onPostOpen,
  onLike,
  onComment,
  onShare,
  onSend,
  onFollow,
  onMenuPress,
  isFollowing = false,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPostOpen}>
    {/* Header */}
    <View style={styles.header}>
      <Image source={{ uri: post.author.avatar }} style={styles.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{post.author.name}</Text>
        <Text style={styles.username}>{post.author.username}</Text>
      </View>

      {/* Follow Button */}
      <TouchableOpacity
        style={[styles.followBtn, isFollowing && styles.following]}
        onPress={onFollow}
      >
        <Text style={[styles.followText, isFollowing && styles.followingText]}>
          {isFollowing ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>

      {/* 3 Dot Menu */}
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <FontAwesomeIcon icon={faEllipsisVertical} size={20} color="#444" />
      </TouchableOpacity>
    </View>

    {/* Content */}
    <Text style={styles.content}>{post.content}</Text>

    {post.image && <Image source={{ uri: post.image }} style={styles.image} />}

    <Text style={styles.timestamp}>{post.timestamp}</Text>

    {/* Actions */}
    <View style={styles.actionsRow}>
      <TouchableOpacity style={styles.actionButton} onPress={onLike}>
        <FontAwesomeIcon icon={faHeart} size={18} color="#ef4444" />
        <Text style={styles.actionLabel}>Like</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={onComment}>
        <FontAwesomeIcon icon={faComment} size={18} color="#3b82f6" />
        <Text style={styles.actionLabel}>Comment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={onShare}>
        <FontAwesomeIcon icon={faShare} size={18} color="#10b981" />
        <Text style={styles.actionLabel}>Share</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={onSend}>
        <FontAwesomeIcon icon={faPaperPlane} size={18} color="#7c3aed" />
        <Text style={styles.actionLabel}>Send</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 8,
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#efefef",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontWeight: "bold", color: "#000" },
  username: { color: "#555", fontSize: 12 },

  followBtn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#2563eb",
    marginRight: 8,
  },
  followText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  following: {
    backgroundColor: "#e5e7eb",
  },
  followingText: {
    color: "#333",
  },

  menuButton: {
    padding: 4,
  },

  content: { color: "#000", marginBottom: 8 },
  image: { width: "100%", height: 200, borderRadius: 10, marginTop: 4 },
  timestamp: { color: "#888", fontSize: 12, marginTop: 6 },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    marginTop: 10,
  },
  actionButton: { flexDirection: "row", alignItems: "center", gap: 6 },
  actionLabel: { fontSize: 14, color: "#333", marginLeft: 4 },
});

