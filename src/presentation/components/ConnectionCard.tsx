import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import { Connection } from "../../domain/user/entities/Connection";

interface Props {
  item: Connection;
  isSuggestion: boolean;
  onToggle: (id: number) => void;
}

export const ConnectionCard: React.FC<Props> = ({ item, isSuggestion, onToggle }) => (
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
            {isSuggestion ? (
              <>
                <Button mode="contained" onPress={() => onToggle(item.id)}>
                  Connect
                </Button>
                <Button mode="outlined">View Profile</Button>
              </>
            ) : (
              <>
                <Button mode="outlined">Message</Button>
                <Button mode="outlined" onPress={() => onToggle(item.id)}>
                  Disconnect
                </Button>
              </>
            )}
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
