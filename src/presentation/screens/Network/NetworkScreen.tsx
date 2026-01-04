// src/presentation/screens/NetworkScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUsers, faSearch, faUserPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { ConnectionRepository } from "../../../data/repositories/ConnectionRepository";
import { Connection } from "../../../domain/user/entities/Connection";
import { GetConnections } from "../../../domain/user/usecases/GetConnections";
import { ToggleConnectionStatus } from "../../../domain/user/usecases/ToggleConnectionStatus";
import { ConnectionCard } from "../../components/ConnectionCard";
import { NetworkNavigationProp } from "../../navigation/network-screen-navigation/NetworkScreenStackParamList";

export const NetworkScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [connections, setConnections] = useState<Connection[]>([]);
  const [tab, setTab] = useState<"suggestions" | "connections">("suggestions");
  const navigation = useNavigation<NetworkNavigationProp>();

  const repo = new ConnectionRepository();
  const getConnections = new GetConnections(repo);
  const toggleConnection = new ToggleConnectionStatus(repo);

  useEffect(() => {
    getConnections.execute().then(setConnections);
  }, []);

  const handleToggle = async (id: number) => {
    const updated = await toggleConnection.execute(id);
    setConnections([...updated]);
  };

  const filtered = connections.filter((c) =>
    tab === "suggestions" ? !c.isConnected : c.isConnected
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Network</Text>
        <View style={styles.badge}>
          <FontAwesomeIcon icon={faUsers} size={14} color="#555" />
          <Text style={styles.badgeText}>
            {connections.filter((c) => c.isConnected).length} connections
          </Text>
        </View>
        <View style={styles.searchBox}>
          <FontAwesomeIcon icon={faSearch} size={16} color="#aaa" style={styles.searchIcon} />
          <TextInput
            placeholder="Search connections..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tabButton, tab === "suggestions" && styles.activeTab]}
            onPress={() => setTab("suggestions")}
          >
            <FontAwesomeIcon icon={faUserPlus} size={16} />
            <Text style={styles.tabText}>Suggestions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, tab === "connections" && styles.activeTab]}
            onPress={() => setTab("connections")}
          >
            <FontAwesomeIcon icon={faUserCheck} size={16} />
            <Text style={styles.tabText}>My Network</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ConnectionCard
            item={item}
            isSuggestion={tab === "suggestions"}
            onToggle={handleToggle}
            onClickViewProfile={() => navigation.navigate("ViewProfile", { userId: item.id })}
            onClickChat={() => navigation.navigate("Chat", { userId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  header: { padding: 16, backgroundColor: "#fff", elevation: 2 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
  badge: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 },
  badgeText: { marginLeft: 6, fontSize: 12, color: "#555" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 40 },
  tabs: { flexDirection: "row", justifyContent: "space-around", marginTop: 4 },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: { backgroundColor: "#ddd" },
  tabText: { marginLeft: 6, fontSize: 14 },
  list: { padding: 16 },
});
