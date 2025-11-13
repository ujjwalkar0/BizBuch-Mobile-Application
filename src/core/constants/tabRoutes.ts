import { faHome, faUser, faPlus, faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NewsFeedScreen } from '../../presentation/screens/NewsFeedScreen';
import { NetworkScreen } from '../../presentation/screens/NetworkScreen';

export const TAB_ROUTES = [
  { key: 'home', title: 'Home', icon: faHome, component: NewsFeedScreen },
  { key: 'connect', title: 'Connect', icon: faUser, component: NetworkScreen },
  // { key: 'add', title: 'Add New', icon: faPlus, component: CreatePostScreen },
  // { key: 'notifications', title: 'Notifications', icon: faBell, component: NotificationsScreen },
  // { key: 'messages', title: 'Messages', icon: faEnvelope, component: MessagesScreen },
];
