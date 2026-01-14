import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMapMarkerAlt,
  faGlobe,
  faLink,
  faPhone,
  faCheckCircle,
  faStar,
  faArrowLeft,
  faEnvelope,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import LinearGradient from "react-native-linear-gradient";
import { useProfile } from "../../../ui/hooks/useProfile";
import { ViewProfileScreenProps } from "../../navigation/network-screen-navigation/NetworkScreenStackParamList";
import { Profile } from "../../../domain/user/entities/Profile";
import { theme } from "../../theme";

export const ViewProfileScreen: React.FC<ViewProfileScreenProps> = ({
  route,
  navigation,
}) => {
  const { userId } = route.params;
  
  console.log("ViewProfileScreen - userId:", userId, "type:", typeof userId);
  
  // Fetch profile by ID
  const { data: user, isLoading, isError, error, refetch, isRefetching } = useProfile(userId!);

  console.log("ViewProfileScreen - isLoading:", isLoading, "isError:", isError, "user:", user, "error:", error);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (isError || !user) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Failed to load profile</Text>
        <Text style={{ marginTop: 10, color: '#666' }}>{error?.message || 'Unknown error'}</Text>
      </SafeAreaView>
    );
  }

  const primaryLocation = user.locations?.find((loc) => loc.is_primary);
  const currentExperience = user.work_experiences?.find(
    (exp) => exp.is_current
  );
  const currentEducation = user.educations?.find((edu) => edu.is_current);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={theme.colors.primary} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} size={18} color={theme.colors.primary} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 70 }} />
        </View>

        {/* Cover Image with Gradient Overlay */}
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryDark, theme.colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.coverGradient}
        >
          {user.cover_image && (
            <Image
              source={{ uri: user.cover_image }}
              style={styles.coverImage}
            />
          )}
        </LinearGradient>

        {/* User Info Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          </View>

          <View style={styles.nameRow}>
            <Text style={styles.name}>{user.display_name}</Text>
            {user.is_verified && (
              <FontAwesomeIcon
                icon={faCheckCircle}
                size={20}
                color={theme.colors.primary}
                style={styles.verifiedIcon}
              />
            )}
            {user.is_premium && (
              <FontAwesomeIcon
                icon={faStar}
                size={20}
                color="#FFD700"
                style={styles.premiumIcon}
              />
            )}
          </View>

          {user.headline && (
            <Text style={styles.headline}>{user.headline}</Text>
          )}

          {primaryLocation && (
            <View style={styles.locationRow}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size={14}
                color={theme.colors.gray500}
              />
              <Text style={styles.location}>{primaryLocation.location}</Text>
            </View>
          )}

          {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {parseInt(user.connections_count) || 0}
              </Text>
              <Text style={styles.statLabel}>Connections</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {parseInt(user.followers_count) || 0}
              </Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {parseInt(user.posts_count) || 0}
              </Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Connect</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Work Experience */}
        {currentExperience && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Position</Text>
            <View style={styles.workCard}>
              {currentExperience.company_logo && (
                <Image
                  source={{ uri: currentExperience.company_logo }}
                  style={styles.companyLogo}
                />
              )}
              <View style={styles.workInfo}>
                <Text style={styles.jobTitle}>
                  {currentExperience.job_title}
                </Text>
                <Text style={styles.companyName}>
                  {currentExperience.company_name}
                </Text>
                {currentExperience.location && (
                  <Text style={styles.workLocation}>
                    📍 {currentExperience.location}
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Current Education */}
        {currentEducation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.educationCard}>
              {currentEducation.school_logo && (
                <Image
                  source={{ uri: currentEducation.school_logo }}
                  style={styles.schoolLogo}
                />
              )}
              <View style={styles.educationInfo}>
                <Text style={styles.schoolName}>{currentEducation.name}</Text>
                <Text style={styles.degree}>{currentEducation.degrees}</Text>
                <Text style={styles.duration}>{currentEducation.duration}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Skills */}
        {user.skills && user.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {user.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Work Experiences */}
        {user.work_experiences && user.work_experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {user.work_experiences.map((exp, index) => (
              <View key={index} style={styles.workCard}>
                {exp.company_logo && (
                  <Image
                    source={{ uri: exp.company_logo }}
                    style={styles.companyLogo}
                  />
                )}
                <View style={styles.workInfo}>
                  <Text style={styles.jobTitle}>{exp.job_title}</Text>
                  <Text style={styles.companyName}>{exp.company_name}</Text>
                  <Text style={styles.workDuration}>{exp.location}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {user.educations && user.educations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {user.educations.map((edu, index) => (
              <View key={index} style={styles.educationCard}>
                {edu.school_logo && (
                  <Image
                    source={{ uri: edu.school_logo }}
                    style={styles.schoolLogo}
                  />
                )}
                <View style={styles.educationInfo}>
                  <Text style={styles.schoolName}>{edu.name}</Text>
                  <Text style={styles.degree}>{edu.degrees}</Text>
                  <Text style={styles.duration}>{edu.duration}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          {user.website && (
            <View style={styles.contactRow}>
              <View style={styles.contactIconContainer}>
                <FontAwesomeIcon
                  icon={faGlobe}
                  size={18}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Website</Text>
                <Text style={styles.contactLink}>{user.website}</Text>
              </View>
            </View>
          )}
          {user.phone && (
            <View style={styles.contactRow}>
              <View style={styles.contactIconContainer}>
                <FontAwesomeIcon
                  icon={faPhone}
                  size={18}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactText}>{user.phone}</Text>
              </View>
            </View>
          )}
          {user.linkedin_url && (
            <View style={styles.contactRow}>
              <View style={styles.contactIconContainer}>
                <FontAwesomeIcon
                  icon={faLink}
                  size={18}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>LinkedIn</Text>
                <Text style={styles.contactLink}>{user.linkedin_url}</Text>
              </View>
            </View>
          )}
          {user.twitter_url && (
            <View style={styles.contactRow}>
              <View style={styles.contactIconContainer}>
                <FontAwesomeIcon
                  icon={faLink}
                  size={18}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Twitter</Text>
                <Text style={styles.contactLink}>{user.twitter_url}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.gray50 },
  scrollContent: { flexGrow: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backText: {
    fontSize: 15,
    color: theme.colors.primary,
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: theme.colors.gray900,
  },

  coverGradient: {
    width: "100%",
    height: 180,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },

  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white,
    marginBottom: 12,
  },
  avatarContainer: {
    marginTop: -64,
    marginBottom: 16,
    borderRadius: 64,
    padding: 4,
    backgroundColor: theme.colors.white,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.gray200,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.gray900,
  },
  verifiedIcon: {
    marginLeft: 8,
  },
  premiumIcon: {
    marginLeft: 4,
  },
  headline: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.gray600,
    marginBottom: 8,
    textAlign: "center",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: theme.colors.gray500,
    marginLeft: 8,
  },
  bio: {
    fontSize: 14,
    color: theme.colors.gray600,
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
    lineHeight: 20,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 16,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.gray200,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.gray900,
  },
  statLabel: {
    fontSize: 13,
    color: theme.colors.gray500,
    marginTop: 4,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontWeight: "600",
    fontSize: 15,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontWeight: "600",
    fontSize: 15,
  },

  section: {
    backgroundColor: theme.colors.white,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.gray900,
    marginBottom: 16,
  },

  workCard: {
    flexDirection: "row",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: theme.colors.gray100,
  },
  workInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.gray900,
  },
  companyName: {
    fontSize: 14,
    color: theme.colors.gray600,
    marginTop: 2,
  },
  workLocation: {
    fontSize: 13,
    color: theme.colors.gray500,
    marginTop: 4,
  },
  workDuration: {
    fontSize: 13,
    color: theme.colors.gray500,
    marginTop: 4,
  },

  educationCard: {
    flexDirection: "row",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  schoolLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: theme.colors.gray100,
  },
  educationInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.gray900,
  },
  degree: {
    fontSize: 14,
    color: theme.colors.gray600,
    marginTop: 2,
  },
  duration: {
    fontSize: 13,
    color: theme.colors.gray500,
    marginTop: 4,
  },

  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillBadge: {
    backgroundColor: `${theme.colors.primary}15`,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  skillText: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: "500",
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  contactIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${theme.colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  contactInfo: {
    marginLeft: 12,
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: theme.colors.gray500,
    marginBottom: 2,
  },
  contactText: {
    fontSize: 14,
    color: theme.colors.gray700,
  },
  contactLink: {
    fontSize: 14,
    color: theme.colors.primary,
  },
});
