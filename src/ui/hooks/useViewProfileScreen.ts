import { useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useViewProfile } from './useViewProfile';
import { useFollowUserMutation } from './useFollowUserMutation';

/**
 * useViewProfileScreen Hook
 * SOLID: Single Responsibility - Handle all ViewProfile screen business logic
 * SOLID: Dependency Inversion - Depends on abstractions (useViewProfile, navigation)
 * 
 * @param userId - Optional user ID. If not provided, shows current user's profile
 */
export const useViewProfileScreen = (userId?: number) => {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  
  const isCurrentUser = userId === undefined || userId === null;

  // Fetch profile data
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useViewProfile(userId);

  // Follow mutation
  const { mutate: followUser, isPending: isFollowing } = useFollowUserMutation();

  // Derived data
  const primaryLocation = user?.locations?.find(loc => loc.is_primary);
  const currentExperience = user?.work_experiences?.find(exp => exp.is_current);
  const currentEducation = user?.educations?.find(edu => edu.is_current);

  // Navigation handlers
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleEditProfile = useCallback(() => {
    navigation.navigate('EditProfile');
  }, [navigation]);

  const handleActivityLog = useCallback(() => {
    navigation.navigate('ActivityLog');
  }, [navigation]);

  const handleMessage = useCallback(() => {
    if (!userId) return;
    navigation.navigate('Chat', { userId });
  }, [userId, navigation]);

  const handleFollow = useCallback(() => {
    if (!userId) return;
    followUser(userId, {
      onSuccess: () => {
        Alert.alert('Success', 'You are now following this user');
      },
      onError: () => {
        Alert.alert('Error', 'Failed to follow user. Please try again.');
      },
    });
  }, [userId, followUser]);

  const handleAddWorkExperience = useCallback(() => {
    navigation.navigate('AddWorkExperience');
  }, [navigation]);

  const handleAddEducation = useCallback(() => {
    navigation.navigate('AddEducation');
  }, [navigation]);

  const handleLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.multiRemove([
              'authToken',
              'refreshToken',
              'userProfilePhoto',
            ]);
            queryClient.clear();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'WelcomeScreen' }],
              }),
            );
          } catch (err) {
            console.error('Logout error:', err);
            Alert.alert('Error', 'Failed to logout. Please try again.');
          }
        },
      },
    ]);
  }, [navigation, queryClient]);

  return {
    // State
    user,
    isLoading,
    isError,
    error,
    isRefetching,
    isCurrentUser,
    isFollowing,

    // Derived data
    primaryLocation,
    currentExperience,
    currentEducation,

    // Actions
    refetch,
    handleGoBack,
    handleEditProfile,
    handleActivityLog,
    handleMessage,
    handleFollow,
    handleAddWorkExperience,
    handleAddEducation,
    handleLogout,
  };
};
