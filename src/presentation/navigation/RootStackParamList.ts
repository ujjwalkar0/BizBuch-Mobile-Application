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
  ViewProfile: { userId?: number }; // userId is optional - if not provided, shows current user's profile
  EditProfile: undefined;
  ActivityLog: undefined;
  Messages: undefined;
  Chat: { userId: number };

  // Profile Management Screens
  AddWorkExperience: undefined;
  AddEducation: undefined;

  // Settings Screens
  AdvancedSettings: undefined;
};
