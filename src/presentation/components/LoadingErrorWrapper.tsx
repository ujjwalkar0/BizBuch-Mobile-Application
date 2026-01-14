import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

interface Props {
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  children: React.ReactNode;
}

export const LoadingErrorWrapper: React.FC<Props> = ({ isLoading, isError, onRetry, children }) => {
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load data</Text>
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  errorText: { 
    fontSize: 16, 
    color: '#666', 
    marginBottom: 12 
  },
  retryButton: { 
    backgroundColor: '#2563eb', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 8 
  },
  retryText: { 
    color: '#fff', 
    fontWeight: '600' 
  },
});
