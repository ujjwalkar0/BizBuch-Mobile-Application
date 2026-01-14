import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootStackParamList";


export type FeedNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "NewsFeed"
>;

export type NewsFeedScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "NewsFeed"
>;

export type ViewPostScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ViewPost"
>;