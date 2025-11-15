// src/presentation/screens/CreatePostScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faUsers,
  faImage,
  faVideo,
  faSmile,
  faMapMarkerAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { PostRepository } from "../../data/repositories/PostRepository";
import { NavigableScreenProps } from "../../domain/contracts/ScreenContracts";
import { CreatePostHandler } from "../../application/post/handler/CreatePostHandler";

export const CreatePostScreen: React.FC = (
//  { onNavigate }
) => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [audience, setAudience] = useState<"Public" | "Friends" | "Only Me">("Public");

  const repo = new PostRepository();
  const handler = new CreatePostHandler(repo);

  // Todo: Use IMediator pattern for handling commands
  const handlePost = async () => {
    try {
      await handler.handle(content, "123", audience, selectedImage || undefined);
      // onNavigate("feed");
    } catch (error: any) {
      console.log("Error:", error.message);
    }
  };

  const mockSelectImage = () =>
    setSelectedImage(
      "https://images.unsplash.com/photo-1588856122867-363b0aa7f598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
          //onPress={() => onNavigate("feed")} 
          style={styles.iconButton}>
            <FontAwesomeIcon icon={faArrowLeft} size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Post</Text>
        </View>
        <TouchableOpacity
          onPress={handlePost}
          disabled={!content.trim() && !selectedImage}
          style={[
            styles.postButton,
            (!content.trim() && !selectedImage) && styles.disabledButton,
          ]}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView>
        <View style={styles.userSection}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <TouchableOpacity style={styles.audienceButton}>
              <FontAwesomeIcon icon={faUsers} size={12} color="#000" />
              <Text style={styles.audienceText}>{audience}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Post content */}
        <TextInput
          placeholder="What's on your mind?"
          style={styles.textArea}
          multiline
          value={content}
          onChangeText={setContent}
        />

        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => setSelectedImage(null)}
            >
              <FontAwesomeIcon icon={faXmark} size={14} color="#000" />
            </TouchableOpacity>
          </View>
        )}

        {/* Add to Post */}
        <View style={styles.addSection}>
          <Text style={styles.sectionTitle}>Add to your post</Text>
          <View style={styles.addOptions}>
            <TouchableOpacity style={styles.addOption} onPress={mockSelectImage}>
              <FontAwesomeIcon icon={faImage} size={18} color="#059669" />
              <Text style={styles.optionLabel}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addOption}>
              <FontAwesomeIcon icon={faVideo} size={18} color="#DC2626" />
              <Text style={styles.optionLabel}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addOption}>
              <FontAwesomeIcon icon={faSmile} size={18} color="#D97706" />
              <Text style={styles.optionLabel}>Feeling</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addOption}>
              <FontAwesomeIcon icon={faMapMarkerAlt} size={18} color="#2563EB" />
              <Text style={styles.optionLabel}>Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 6,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  postButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#93C5FD",
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  scrollContent: {
    paddingBottom: 80,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userInfo: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
  },
  audienceButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  audienceText: {
    marginLeft: 4,
    fontSize: 12,
  },
  textArea: {
    minHeight: 120,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#000",
    textAlignVertical: "top",
  },
  imageContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    position: "relative",
  },
  selectedImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  removeImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    padding: 6,
  },
  addSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: "#374151",
  },
  addOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addOption: {
    alignItems: "center",
    width: "22%",
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  optionLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  hashtagSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  hashtagList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 12,
    color: "#374151",
  },
});
