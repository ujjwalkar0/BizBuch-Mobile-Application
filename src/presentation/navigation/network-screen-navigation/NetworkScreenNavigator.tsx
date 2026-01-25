import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ViewProfileScreen } from '../../screens/ViewProfileScreen';
import { EditProfileScreen } from '../../screens/EditProfileScreen';
import { AddWorkExperienceScreen } from '../../screens/AddWorkExperienceScreen';
import { AddEducationScreen } from '../../screens/AddEducationScreen';
import { RootStackParamList } from '../RootStackParamList';
import { ChatScreen } from '../../screens/ChatScreen';
import { NetworkScreen } from '../../screens/NetworkScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NetworkScreenNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Network">
      {(props) => <NetworkScreen {...props} />}
    </Stack.Screen>
    <Stack.Screen name="ViewProfile" component={ViewProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="AddWorkExperience" component={AddWorkExperienceScreen} />
    <Stack.Screen name="AddEducation" component={AddEducationScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);
