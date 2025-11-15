import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ViewPostScreen } from '../../screens/shared/ViewPostScreen';
import { NewsFeedScreen } from '../../screens/NewsFeedScreen';
import { RootStackParamList } from '../RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NewsFeedScreenNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="NewsFeed" component={NewsFeedScreen} />
    <Stack.Screen name="ViewPost" component={ViewPostScreen} />
  </Stack.Navigator>
);
