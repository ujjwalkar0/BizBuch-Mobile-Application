import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootStackParamList";


export type FeedNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ViewPost"
>;

export type ViewPostScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ViewPost"
>;