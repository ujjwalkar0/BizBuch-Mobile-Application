export type RootStackParamList = {
  // Login and Registration Screens
  Login: undefined;
  Register: undefined;
  HomeScreen: undefined;
  OtpValidation: { email: string };
  BizBuch: undefined;
  WelcomeScreen: undefined;
  SplashScreen: undefined;

  // Main App Screens
  NewsFeed: undefined;
  ViewPost: { postId: string };
  Network: undefined;
  ViewProfile: { userId: number };
  Messages: undefined;
  Chat: { userId: number };
};
