import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane, faImage, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../theme";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isSending: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<Props> = ({ 
  value, 
  onChangeText, 
  onSend, 
  isSending,
  placeholder = "Type a message..." 
}) => {
  const isDisabled = !value.trim() || isSending;

  return (
    <View style={styles.inputContainer}>
      {/* Attachment Button */}
      <TouchableOpacity style={styles.attachButton}>
        <FontAwesomeIcon icon={faImage} size={20} color={theme.colors.gray500} />
      </TouchableOpacity>

      {/* Text Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline
          maxLength={1000}
          placeholderTextColor={theme.colors.gray400}
        />
      </View>

      {/* Send or Voice Button */}
      {value.trim() ? (
        <TouchableOpacity
          style={[styles.sendButton, isDisabled && styles.sendButtonDisabled]}
          onPress={onSend}
          disabled={isDisabled}
        >
          {isSending ? (
            <ActivityIndicator size="small" color={theme.colors.white} />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} size={18} color={theme.colors.white} />
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.voiceButton}>
          <FontAwesomeIcon icon={faMicrophone} size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: 8,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: theme.colors.gray100,
    borderRadius: 24,
    paddingHorizontal: 16,
    minHeight: 44,
    justifyContent: "center",
  },
  textInput: {
    maxHeight: 100,
    fontSize: 15,
    color: theme.colors.gray900,
    paddingVertical: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: `${theme.colors.primary}60`,
  },
  voiceButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
  },
});
