import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import { Connection } from "../../domain/user/entities/Connection";
import { Chat } from "../../domain/chat/entities/Chat";

interface Props {
  item: Connection;
  isSuggestion: boolean;
  onToggle: (id: number) => void;
  onClickViewProfile: (user: Connection) => void;
  onClickChat: (chat: Connection) => void;
}

export const ConnectionCard: React.FC<Props> = ({ item, isSuggestion, onToggle, onClickViewProfile, onClickChat }) => (
  <Card style={styles.card}>
    <Card.Content>
      <View style={styles.row}>
        <Avatar.Image size={56} source={{ uri: item.avatar }} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.title}>{item.title}</Text>
          {item.mutualConnections && (
            <Text style={styles.mutual}>
              {item.mutualConnections} mutual connections
            </Text>
          )}
          <View style={styles.actions}>
            {isSuggestion ? <Button mode="contained" onPress={() => onToggle(item.id)}> Connect </Button>
              :
            <TouchableOpacity onPress={() => onClickChat(item)} activeOpacity={0.7}> 
              <Button mode="outlined">Message</Button></TouchableOpacity>}
            <TouchableOpacity onPress={() => onClickViewProfile(item)} activeOpacity={0.7}>
              <Button mode="outlined">View Profile</Button>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  row: { flexDirection: "row", gap: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "500" },
  title: { fontSize: 13, color: "#666" },
  mutual: { fontSize: 12, color: "#999", marginTop: 4 },
  actions: { flexDirection: "row", gap: 8, marginTop: 8, flexWrap: "wrap" },
});
