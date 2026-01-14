// src/presentation/screens/NetworkScreen.tsx
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { faUsers, faUserPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { Connection } from "../../../domain/user/entities/Connection";
import { ConnectionCard } from "../../components/ConnectionCard";
import { SearchInput } from "../../components/SearchInput";
import { TabBar } from "../../components/TabBar";
import { Badge } from "../../components/Badge";
import { EmptyState } from "../../components/EmptyState";
import { ScreenHeader } from "../../components/ScreenHeader";
import { NetworkScreenProps } from "../../navigation/network-screen-navigation/NetworkScreenStackParamList";
import { useProfiles, useMyConnections } from "../../../ui/hooks/useConnections";
import { useSendConnectionRequest } from "../../../ui/hooks/useToggleConnection";

const TABS = [
  { key: "suggestions", label: "Suggestions", icon: faUserPlus },
  { key: "connections", label: "My Network", icon: faUserCheck },
];

export const NetworkScreen: React.FC<NetworkScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState<"suggestions" | "connections">("suggestions");
  const [connectingUserId, setConnectingUserId] = useState<number | null>(null);
  
  const { data: profiles = [], isLoading: isLoadingProfiles, isError: isErrorProfiles, refetch: refetchProfiles, isRefetching: isRefetchingProfiles } = useProfiles();
  const { data: myConnections = [], isLoading: isLoadingConnections, isError: isErrorConnections, refetch: refetchConnections, isRefetching: isRefetchingConnections } = useMyConnections();
  const sendConnectionRequestMutation = useSendConnectionRequest();

  const isLoading = isLoadingProfiles || isLoadingConnections;
  const isError = isErrorProfiles || isErrorConnections;
  const isRefetching = isRefetchingProfiles || isRefetchingConnections;

  const handleRefetch = () => {
    refetchProfiles();
    refetchConnections();
  };

  const handleConnect = async (userId: number) => {
    setConnectingUserId(userId);
    sendConnectionRequestMutation.mutate(userId, {
      onSuccess: () => {
        setConnectingUserId(null);
      },
      onError: () => {
        setConnectingUserId(null);
      },
    });
  };

  // Filter suggestions (profiles not connected)
  const suggestions = profiles.filter((p: Connection) => p.is_connected !== "true");
  
  // Use myConnections for the connections tab
  const currentData = tab === "suggestions" ? suggestions : myConnections;
  
  const filtered = currentData.filter((c: Connection) => {
    const matchesSearch = searchQuery
      ? c.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.headline && c.headline.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesSearch;
  });

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text>Failed to load connections</Text>
      </SafeAreaView>
    );
  }

  const connectedCount = myConnections.length;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isRefetching}
        onRefresh={handleRefetch}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <ScreenHeader title="Network">
            <Badge 
              icon={faUsers} 
              text={`${connectedCount} connections`} 
              style={styles.badge}
            />
            <SearchInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search connections..."
              style={styles.searchBox}
            />
            <TabBar
              tabs={TABS}
              activeTab={tab}
              onTabChange={(key) => setTab(key as "suggestions" | "connections")}
              style={styles.tabs}
            />
          </ScreenHeader>
        }
        stickyHeaderIndices={[0]}
        renderItem={({ item }) => (
          <ConnectionCard
            item={item}
            isSuggestion={tab === "suggestions"}
            isConnecting={connectingUserId === item.id}
            onToggle={handleConnect}
            onClickViewProfile={() => navigation.navigate("ViewProfile", { userId: item.id })}
            onClickChat={() => navigation.navigate("Chat", { userId: item.id })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            message={
              tab === "suggestions"
                ? "No suggestions available"
                : "You don't have any connections yet"
            }
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  centerContent: { justifyContent: "center", alignItems: "center" },
  badge: { marginBottom: 12 },
  searchBox: { marginBottom: 12 },
  tabs: { marginTop: 4 },
  list: { padding: 16 },
});
