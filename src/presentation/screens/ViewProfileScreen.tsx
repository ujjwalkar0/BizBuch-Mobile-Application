import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ConnectionRepository } from "../../data/repositories/ConnectionRepository";
import { GetConnections } from "../../domain/user/usecases/GetConnections";
import { Connection } from "../../domain/user/entities/Connection";
import { ViewProfileScreenProps } from "../navigation/network-screen-navigation/NetworkScreenStackParamList";


export const ViewProfileScreen: React.FC<ViewProfileScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;

  const [user, setUser] = useState<Connection | null>(null);

  const repo = new ConnectionRepository();
  const getConnections = new GetConnections(repo);

  useEffect(() => {
    getConnections.execute().then((list) => {
      const found = list.find((u) => u.id === userId);
      setUser(found ?? null);
    });
  }, []);

  if (!user) return <Text style={{ padding: 20 }}>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* User Info */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.title}>{user.title}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user.mutualConnections ?? 0}</Text>
            <Text style={styles.statLabel}>Mutual</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user.isConnected ? "Yes" : "No"}</Text>
            <Text style={styles.statLabel}>Connected</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              {user.isConnected ? "Message" : "Connect"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Follow</Text>
          </TouchableOpacity>
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
  backText: {
    fontSize: 16,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
  },
  username: {
    fontSize: 14,
    color: "#777",
  },
  title: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
    textAlign: "center",
  },

  statsRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "600",
  },
  statLabel: {
    color: "#777",
    fontSize: 12,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 8,
  },
  secondaryButtonText: {
    fontWeight: "600",
  },
});
