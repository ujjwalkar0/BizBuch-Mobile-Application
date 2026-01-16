// presentation/screens/MessagesScreen.tsx
import React, { useState, useMemo } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Conversation } from "../../domain/chat/entities/Conversation";
import { useConversations } from "../../ui/hooks/useChat";
import { ConversationCard } from "../components/organisms/ConversationCard";
import { EmptyState } from "../components/molecules/EmptyState";
import { ScreenHeader } from '../components/molecules/ScreenHeader';
import { SearchInput } from '../components/molecules/SearchInput';
import { MessagesNavigationProp } from "../navigation/messages-screen-navigation/MessageScreenStackParamList";

const MessagesScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  
  const navigation = useNavigation<MessagesNavigationProp>();
  const { data: conversations = [], isLoading, isError, refetch, isRefetching } = useConversations();

  // Filter conversations by search
  const filteredConversations = useMemo(() => {
    if (!conversations || !Array.isArray(conversations)) return [];
    return conversations.filter(conversation => {
      if (!conversation || !conversation.other_participant) return false;
      if (!search) return true;
      return conversation.other_participant.display_name?.toLowerCase().includes(search.toLowerCase());
    });
  }, [conversations, search]);

  const handleConversationPress = (conversation: Conversation) => {
    navigation.navigate("Chat", { userId: conversation.other_participant.id });
  };

  return (
    <SafeAreaView edges={['top']}>
        <ScreenHeader title="Messages" />

        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search messages..."
        />

        <FlatList 
          data={filteredConversations} 
          renderItem={({ item }) => (
            <ConversationCard
              conversation={item}
              onPress={() => handleConversationPress(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          ListEmptyComponent={
            <EmptyState 
              message="No conversations yet" 
              subMessage="Start chatting with your connections" 
            />
          }
        />
      </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
});