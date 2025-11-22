import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootStackParamList";


export type MessagesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Chat"
>;

export type ChatScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Chat"
>;