import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesScreen from '../../screens/MessagesScreen';
import { ChatScreen } from '../../screens/shared/ChatScreen';
import { RootStackParamList } from '../RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MessageScreenNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} options={{headerShown: false}}/>
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);
