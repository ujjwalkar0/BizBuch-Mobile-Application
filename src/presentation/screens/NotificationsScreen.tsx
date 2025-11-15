// presentation/screens/NotificationsScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faEnvelope, faUser, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { Notification } from "../../domain/notification/entities/Notification";
import { GetNotificationsHandler } from "../../application/notification/handler/GetNotificationsHandler";
import { MarkAllAsReadHandler } from "../../application/notification/handler/MarkAllAsReadHandler";
import { NotificationRepository } from "../../data/repositories/NotificationRepository";

export const NotificationsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "mentions">("all");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const repo = new NotificationRepository();
  const getHandler = new GetNotificationsHandler(repo);
  const markHandler = new MarkAllAsReadHandler(repo);

  const loadNotifications = async () => {
    const data = await getHandler.handle();
    setNotifications(data);
  };

  const markAllAsRead = async () => {
    await markHandler.handle();
    await loadNotifications();
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = notifications.filter(n =>
    activeTab === "unread"
      ? !n.read
      : activeTab === "mentions"
      ? n.type === "mention"
      : true
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead} style={styles.markReadButton}>
          <FontAwesomeIcon icon={faCheckDouble} size={18} color="#007bff" />
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["all", "unread", "mentions"].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab === "all"
                ? "All"
                : tab === "unread"
                ? `Unread (${unreadCount})`
                : "Mentions"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notification List */}
      <ScrollView style={styles.scrollView}>
        {filtered.map(item => (
          <View
            key={item.id}
            style={[styles.notificationItem, !item.read && styles.unreadItem]}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.notificationContent}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <FontAwesomeIcon
              icon={faBell}
              size={18}
              color={item.read ? "#999" : "#007bff"}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  markReadButton: { flexDirection: 'row', alignItems: 'center' },
  markReadText: { marginLeft: 6, color: '#007bff', fontSize: 14 },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  tabText: { fontSize: 15, color: '#666' },
  activeTabButton: { borderBottomWidth: 2, borderColor: '#007bff' },
  activeTabText: { color: '#007bff', fontWeight: 'bold' },
  scrollView: { flex: 1 },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  unreadItem: { backgroundColor: '#eaf3ff' },
  avatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  notificationContent: { flex: 1 },
  message: { fontSize: 15, color: '#333', marginBottom: 4 },
  time: { fontSize: 13, color: '#999' },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { marginTop: 8, color: '#aaa', fontSize: 16 },
});