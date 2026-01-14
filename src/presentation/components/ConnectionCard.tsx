import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserPlus, faMessage, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Connection } from "../../domain/user/entities/Connection";
import { theme } from "../theme";

interface Props {
  item: Connection;
  isSuggestion: boolean;
  isConnecting?: boolean;
  onToggle: (id: number) => void;
  onClickViewProfile: (user: Connection) => void;
  onClickChat: (chat: Connection) => void;
}

export const ConnectionCard: React.FC<Props> = ({ 
  item, 
  isSuggestion, 
  isConnecting, 
  onToggle, 
  onClickViewProfile, 
  onClickChat 
}) => {
  const getSubtitle = () => {
    if (item.headline) return item.headline;
    if (item.current_position && item.company) return `${item.current_position} at ${item.company}`;
    if (item.current_position) return item.current_position;
    if (item.company) return item.company;
    return "";
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.content}
        onPress={() => onClickViewProfile(item)}
        activeOpacity={0.7}
      >
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarRing}>
            <Image 
              source={{ uri: item.avatar }} 
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {item.display_name || ""}
          </Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {getSubtitle()}
          </Text>
          {item.mutual_connections_count && Number(item.mutual_connections_count) > 0 ? (
            <View style={styles.mutualRow}>
              <FontAwesomeIcon icon={faUsers} size={12} color={theme.colors.gray400} />
              <Text style={styles.mutual}>
                {item.mutual_connections_count} mutual connections
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>

      {/* Actions */}
      <View style={styles.actions}>
        {isSuggestion ? (
          <TouchableOpacity
            style={[styles.primaryButton, isConnecting && styles.buttonDisabled]}
            onPress={() => onToggle(item.id)}
            disabled={isConnecting}
            activeOpacity={0.8}
          >
            <FontAwesomeIcon icon={faUserPlus} size={14} color={theme.colors.white} />
            <Text style={styles.primaryButtonText}>
              {isConnecting ? "Connecting..." : "Connect"}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => onClickChat(item)}
            activeOpacity={0.8}
          >
            <FontAwesomeIcon icon={faMessage} size={14} color={theme.colors.primary} />
            <Text style={styles.secondaryButtonText}>Message</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => onClickViewProfile(item)}
          activeOpacity={0.8}
        >
          <FontAwesomeIcon icon={faUser} size={14} color={theme.colors.gray600} />
          <Text style={styles.outlineButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginRight: 14,
  },
  avatarRing: {
    padding: 2,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: `${theme.colors.primary}30`,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.gray200,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.gray900,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.gray600,
    lineHeight: 18,
  },
  mutualRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  mutual: {
    fontSize: 12,
    color: theme.colors.gray400,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray100,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.white,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: `${theme.colors.primary}15`,
    borderWidth: 1,
    borderColor: `${theme.colors.primary}30`,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  outlineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
  },
  outlineButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.gray600,
  },
});
