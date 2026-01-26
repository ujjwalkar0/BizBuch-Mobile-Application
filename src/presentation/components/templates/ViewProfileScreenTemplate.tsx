import React, { useMemo } from 'react';
import { ScrollView, RefreshControl, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Profile } from '../../../domain/user/entities/Profile';
import { theme } from '../../theme';

// Molecules
import { CenteredLoader } from '../molecules/CenteredLoader';
import { CenteredError } from '../molecules/CenteredError';
import { ViewProfileHeader } from '../molecules/ViewProfileHeader';
import { ProfileCoverSection } from '../molecules/ProfileCoverSection';
import { ProfileInfoSection } from '../molecules/ProfileInfoSection';
import { ProfileStatsRow } from '../molecules/ProfileStatsRow';
import { ProfileActionButtons } from '../molecules/ProfileActionButtons';
import { ProfileSection } from '../molecules/ProfileSection';
import { WorkExperienceCard } from '../molecules/WorkExperienceCard';
import { EducationCard } from '../molecules/EducationCard';
import { SkillsList } from '../molecules/SkillsList';
import { ContactInfoSection } from '../molecules/ContactInfoSection';
import { LogoutButton } from '../molecules/LogoutButton';
import { PageHeader } from '../molecules/PageHeader';

interface ViewProfileScreenTemplateProps {
  // Loading/Error states
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  isRefetching: boolean;

  // User data
  user: Profile | null | undefined;
  isCurrentUser: boolean;
  primaryLocation?: string;

  // Actions
  onRefresh: () => void;
  onBack: () => void;
  onEditProfile: () => void;
  onActivityLog: () => void;
  onMessage: () => void;
  onFollow: () => void;
  onAddWorkExperience: () => void;
  onAddEducation: () => void;
  onLogout: () => void;
}

/**
 * ViewProfileScreenTemplate
 * Atomic Design: Template - Defines the layout structure for view profile screen
 * SOLID Principles:
 * - Single Responsibility: Layout orchestration only
 * - Open/Closed: Content passed via props, easily extensible
 * - Dependency Inversion: Depends on abstractions (molecules)
 */
export const ViewProfileScreenTemplate: React.FC<
  ViewProfileScreenTemplateProps
> = ({
  // Loading/Error
  isLoading,
  isError,
  errorMessage,
  isRefetching,

  // User data
  user,
  isCurrentUser,
  primaryLocation,

  // Actions
  onRefresh,
  onBack,
  onEditProfile,
  onActivityLog,
  onMessage,
  onFollow,
  onAddWorkExperience,
  onAddEducation,
  onLogout,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      backgroundColor: theme.colors.gray50,
    }),
    [],
  );

  const scrollContentStyle = useMemo<ViewStyle>(
    () => ({
      flexGrow: 1,
    }),
    [],
  );

  // Loading state
  if (isLoading) {
    return <CenteredLoader />;
  }

  // Error state
  if (isError || !user) {
    return <CenteredError message={errorMessage || 'Failed to load profile'} />;
  }

  // Build contact items
  const contactItems = [];
  if (user.website) {
    contactItems.push({
      type: 'website' as const,
      label: 'Website',
      value: user.website,
    });
  }
  if (user.phone) {
    contactItems.push({
      type: 'phone' as const,
      label: 'Phone',
      value: user.phone,
    });
  }
  if (user.linkedin_url) {
    contactItems.push({
      type: 'linkedin' as const,
      label: 'LinkedIn',
      value: user.linkedin_url,
    });
  }
  if (user.twitter_url) {
    contactItems.push({
      type: 'twitter' as const,
      label: 'Twitter',
      value: user.twitter_url,
    });
  }

  return (
    <SafeAreaView edges={['top']} style={containerStyle}>
      <ScrollView
        contentContainerStyle={scrollContentStyle}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        {/* Header */}
        <PageHeader title="Profile" leftAction={{ type: 'back', onPress: onBack }} />

        {/* Cover Image */}
        <ProfileCoverSection coverImageUri={user.cover_image} />

        {/* User Info */}
        <ProfileInfoSection
          avatarUri={user.avatar}
          displayName={user.display_name}
          headline={user.headline}
          location={primaryLocation}
          bio={user.bio}
          isVerified={user.is_verified}
          isPremium={user.is_premium}
        />

        {/* Stats Row */}
        <ProfileStatsRow
          connectionsCount={parseInt(user.connections_count) || 0}
          followersCount={parseInt(user.followers_count) || 0}
          postsCount={parseInt(user.posts_count) || 0}
        />

        {/* Action Buttons */}
        <ProfileActionButtons
          isCurrentUser={isCurrentUser}
          onEditProfile={onEditProfile}
          onActivityLog={onActivityLog}
          onMessage={onMessage}
          onFollow={onFollow}
        />

        {/* Skills */}
        {user.skills && user.skills.length > 0 && (
          <ProfileSection title="Skills">
            <SkillsList skills={user.skills} />
          </ProfileSection>
        )}

        {/* Work Experience */}
        <ProfileSection
          title="Work Experience"
          showAddButton={isCurrentUser}
          onAddPress={onAddWorkExperience}
        >
          {user.work_experiences.map((exp, index) => (
            <WorkExperienceCard
              key={`work-${index}`}
              jobTitle={exp.job_title}
              companyName={exp.company_name}
              companyLogo={exp.company_logo}
              location={exp.location}
              isLast={index === user.work_experiences.length - 1}
            />
          ))}
        </ProfileSection>

        {/* Education */}
        <ProfileSection
          title="Education"
          showAddButton={isCurrentUser}
          onAddPress={onAddEducation}
        >
          {user.educations.map((edu, index) => (
            <EducationCard
              key={`edu-${index}`}
              schoolName={edu.name}
              degree={edu.degrees}
              schoolLogo={edu.school_logo}
              duration={edu.duration}
              isLast={index === user.educations.length - 1}
            />
          ))}
        </ProfileSection>

        {/* Contact Information */}
        {contactItems.length > 0 && <ContactInfoSection items={contactItems} />}

        {/* Logout Button - Only for current user */}
        {isCurrentUser && <LogoutButton onPress={onLogout} />}
      </ScrollView>
    </SafeAreaView>
  );
};
