import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatScreen } from '../../screens/shared/ChatScreen';
import { RootStackParamList } from '../RootStackParamList';
import MessagesScreen from '../../screens/Messages/MessagesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MessageScreenNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} options={{headerShown: false}}/>
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);
