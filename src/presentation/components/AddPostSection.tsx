import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faImage,
  faVideo,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { theme } from "../theme";

type Props = {
  onPress?: () => void;
  userAvatar?: string;
};

export const AddPostSection: React.FC<Props> = ({ onPress, userAvatar }) => {
  return (
    <View style={styles.container}>
      {/* Top Row */}
      <TouchableOpacity
        style={styles.inputRow}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={styles.avatarRing}>
          <Image
            source={{ uri: userAvatar || 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=100' }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.inputPlaceholder}>
          <Text style={styles.placeholderText}>
            What's on your mind?
          </Text>
        </View>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Action Row */}
      <View style={styles.actionsRow}>
        <ActionItem icon={faPen} label="Post" color={theme.colors.primary} />
        <ActionItem icon={faImage} label="Photo" color={theme.colors.green500} />
        <ActionItem icon={faVideo} label="Video" color={theme.colors.red500} />
      </View>
    </View>
  );
};

const ActionItem = ({ icon, label, color }: { icon: any; label: string; color: string }) => (
  <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
    <FontAwesomeIcon icon={icon} size={18} color={color} />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 12,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarRing: {
    padding: 2,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: `${theme.colors.primary}30`,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.gray200,
  },

  inputPlaceholder: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.gray100,
    borderRadius: 24,
  },

  placeholderText: {
    fontSize: 14,
    color: theme.colors.gray500,
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.gray200,
    marginVertical: 12,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  actionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.gray700,
  },
});
