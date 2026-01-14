import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { HeaderAction } from "../organisms/ChatHeader";

export const HeaderActions: React.FC<{ actions: HeaderAction[] }> = ({ actions }) => {
  return (
    <View style={styles.headerActions}>
      {actions.map(action => (
        <TouchableOpacity
          key={action.key}
          style={styles.actionButton}
          onPress={action.onPress}
          disabled={!action.onPress}
        >
          <FontAwesomeIcon
            icon={action.icon}
            size={action.size ?? 18}
            color={action.color ?? theme.colors.gray600}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButton: {
    padding: 8,
  },
});
