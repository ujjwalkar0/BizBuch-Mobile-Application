import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ViewPostScreen } from '../../screens/shared/ViewPostScreen';
import { RootStackParamList } from '../RootStackParamList';
import NewsFeedScreen from '../../screens/NewsFeed/NewsFeedScreen';
import { ViewProfileScreen } from '../../screens/Profile/ViewProfileScreen';
import { EditProfileScreen } from '../../screens/Profile/EditProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NewsFeedScreenNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="NewsFeed" component={NewsFeedScreen} />
    <Stack.Screen name="ViewPost" component={ViewPostScreen} />
    <Stack.Screen name="ViewProfile" component={ViewProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
  </Stack.Navigator>
);
