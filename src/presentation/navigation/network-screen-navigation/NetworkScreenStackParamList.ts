import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootStackParamList";

export type NetworkNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Network"
>;

export type NetworkScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Network"
>;

export type ViewProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ViewProfile"
>;