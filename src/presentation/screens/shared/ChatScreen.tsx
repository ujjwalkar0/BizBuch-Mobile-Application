// presentation/screens/ChatScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ChatScreenProps } from "../../navigation/messages-screen-navigation/MessageScreenStackParamList";

export const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
  const { chatId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat ID: {chatId}</Text>
      <Text style={styles.text}>Welcome to chat window</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18 },
});
