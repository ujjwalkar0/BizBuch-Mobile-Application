import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme";

export const HeaderInfo: React.FC<{
  title: string;
  subtitle: string;
  isTyping: boolean;
  isOnline: boolean;
}> = ({ title, subtitle, isTyping, isOnline }) => {
  return (
    <View style={styles.headerInfo}>
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>

      {!!subtitle && (
        <Text
          style={[
            styles.subtitle,
            isTyping && styles.typingText,
            isOnline && !isTyping && styles.onlineText,
          ]}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: theme.colors.gray900,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.gray500,
    marginTop: 2,
  },
  typingText: {
    color: theme.colors.primary,
    fontStyle: 'italic',
  },
  onlineText: {
    color: '#22c55e',
  }
});
