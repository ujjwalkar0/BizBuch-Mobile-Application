import React from 'react';
import { ViewProfileScreenProps } from '../navigation/network-screen-navigation/NetworkScreenStackParamList';
import { ViewProfileScreenTemplate } from '../components/templates/ViewProfileScreenTemplate';
import { useViewProfileScreen } from '../../ui/hooks/useViewProfileScreen';

/**
 * ViewProfileScreen Page
 * Atomic Design: Page - Final screen with real data
 * SOLID Principles:
 * - Single Responsibility: Connect data to template
 * - Open/Closed: Extended through hook and template
 * - Dependency Inversion: Depends on abstractions (useViewProfileScreen, ViewProfileScreenTemplate)
 *
 * Navigation:
 * - From Network tab: userId provided → calls profiles/{id}
 * - From NewsFeed tab profile icon: no userId → calls profiles/me
 */
export const ViewProfileScreen: React.FC<ViewProfileScreenProps> = ({
  route,
}) => {
  const { userId } = route.params ?? {};

  const {
    // State
    user,
    isLoading,
    isError,
    error,
    isRefetching,
    isCurrentUser,

    // Derived data
    primaryLocation,

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
  } = useViewProfileScreen(userId);

  return (
    <ViewProfileScreenTemplate
      // Loading/Error states
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isRefetching={isRefetching}
      // User data
      user={user}
      isCurrentUser={isCurrentUser}
      primaryLocation={primaryLocation?.location}
      // Actions
      onRefresh={refetch}
      onBack={handleGoBack}
      onEditProfile={handleEditProfile}
      onActivityLog={handleActivityLog}
      onMessage={handleMessage}
      onFollow={handleFollow}
      onAddWorkExperience={handleAddWorkExperience}
      onAddEducation={handleAddEducation}
      onLogout={handleLogout}
    />
  );
};
