import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ViewProfileScreen } from '../../screens/Profile/ViewProfileScreen';
import { RootStackParamList } from '../RootStackParamList';
import { ChatScreen } from '../../screens/shared/ChatScreen';
import { NetworkScreen } from '../../screens/Network/NetworkScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NetworkScreenNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Network" component={NetworkScreen} />
    <Stack.Screen name="ViewProfile" component={ViewProfileScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);
