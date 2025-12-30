import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootStackParamList";


export type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export type RegisterNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

export type OtpValidationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OtpValidation"
>;

export type WelcomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "WelcomeScreen"
>;

export type SplashNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SplashScreen"
>;