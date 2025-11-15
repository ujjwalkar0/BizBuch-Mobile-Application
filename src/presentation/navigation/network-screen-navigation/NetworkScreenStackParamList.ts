import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootStackParamList";

export type NetworkNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ViewProfile"
>;

export type ViewProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ViewProfile"
>;