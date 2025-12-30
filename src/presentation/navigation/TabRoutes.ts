import { faHome, faUser, faPlus, faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CreatePostScreen } from '../screens/CreatePostScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { MessageScreenNavigator } from './messages-screen-navigation/MessageScreenNavigator';
import { NewsFeedScreenNavigator } from './news-feed-navigation/NewsFeedScreenNavigator';
import { NetworkScreenNavigator } from './network-screen-navigation/NetworkScreenNavigator';


export const TAB_ROUTES = [
  { key: 'home', title: 'Home', icon: faHome, component: NewsFeedScreenNavigator },
  { key: 'connect', title: 'Connect', icon: faUser, component: NetworkScreenNavigator },
  { key: 'add', title: 'Add New', icon: faPlus, component: CreatePostScreen },
  { key: 'notifications', title: 'Notifications', icon: faBell, component: NotificationsScreen },
  { key: 'messages', title: 'Messages', icon: faEnvelope, component: MessageScreenNavigator },
];
