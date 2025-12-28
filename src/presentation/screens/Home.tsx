import React from 'react';
import { View, Text } from 'react-native';
import { Provider, BottomNavigation } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faUser,
  faPlus,
  faBell,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import NetworkScreen from './NetworkScreen';
import CreatePostScreen from './CreatePostScreen';
import NewsFeedScreen from './NewsFeedScreen';
import NotificationsScreen from './NotificationsScreen';
import ChatScreen from './ChatScreen';
import MessagesScreen from './MessageScreen';

const Home: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: 'home', title: 'Home', icon: faHome },
    { key: 'connect', title: 'Connect', icon: faUser },
    { key: 'add', title: 'Add New', icon: faPlus },
    { key: 'notifications', title: 'Notifications', icon: faBell },
    { key: 'messages', title: 'Messages', icon: faEnvelope },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: () => <NewsFeedScreen onNavigate={() => setIndex(0)} />,
    connect: NetworkScreen,
    add: () => <CreatePostScreen onNavigate={() => setIndex(0)} />,
    notifications: NotificationsScreen,
    messages: MessagesScreen,
  });

  return (
    <Provider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        shifting={true}
        labeled={true}
        barStyle={{ backgroundColor: '#fff' }}
        activeColor="tomato"
        inactiveColor="gray"
        renderIcon={({ route, focused, color }) => (
          <FontAwesomeIcon
            icon={route.icon}
            color={color}
            size={focused ? 28 : 22}
          />
        )}
      />
    </Provider>
  );
};

export default Home;