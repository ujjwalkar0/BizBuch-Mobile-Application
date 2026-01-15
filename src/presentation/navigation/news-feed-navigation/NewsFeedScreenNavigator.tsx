import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../RootStackParamList';
import NewsFeedScreen from '../../screens/NewsFeedScreen';
import { ViewProfileScreen } from '../../screens/ViewProfileScreen';
import { EditProfileScreen } from '../../screens/EditProfileScreen';
import { ActivityLogScreen } from '../../screens/ActivityLogScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NewsFeedScreenNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="NewsFeed" component={NewsFeedScreen} />
    <Stack.Screen name="ViewProfile" component={ViewProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="ActivityLog" component={ActivityLogScreen} />
  </Stack.Navigator>
);
