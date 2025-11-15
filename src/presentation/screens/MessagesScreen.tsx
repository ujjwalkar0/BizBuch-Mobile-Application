// presentation/screens/MessagesScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ChatRepository } from "../../data/repositories/ChatRepository";
import { Chat } from "../../domain/chat/entities/Chat";
import { useNavigation } from "@react-navigation/native";
import { MessagesNavigationProp } from "../navigation/messages-screen-navigation/MessageScreenStackParamList";

const MessagesScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  
  const navigation = useNavigation<MessagesNavigationProp>();

  const repo = new ChatRepository();

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    const data = await repo.getChats();
    setChats(data);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

const renderChatItem = ({ item }: { item: Chat }) => (
  <TouchableOpacity
    style={styles.chatItem}
    onPress={() => navigation.navigate("Chat", { userId: item.user.id })}
  >
    <View style={styles.avatarContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      {item.isOnline && <View style={styles.onlineDot} />}
    </View>

    <View style={styles.chatInfo}>
      <View style={styles.chatHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.timestamp}</Text>
      </View>

      <View style={styles.chatFooter}>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>

      <View style={styles.searchContainer}>
        <FontAwesomeIcon icon={faSearch} color="#aaa" size={16} />
        <TextInput
          placeholder="Search messages..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList data={filteredChats} renderItem={renderChatItem} />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 25,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 40, fontSize: 16 },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  avatarContainer: { position: 'relative' },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#22c55e',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  chatInfo: { flex: 1, marginLeft: 12 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  chatFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '500' },
  time: { fontSize: 12, color: '#999' },
  lastMessage: { fontSize: 14, color: '#666', flex: 1, marginRight: 8 },
  unreadBadge: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});