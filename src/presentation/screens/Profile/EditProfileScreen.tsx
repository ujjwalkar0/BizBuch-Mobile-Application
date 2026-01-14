import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useCurrentUserProfile } from '../../../ui/hooks/useCurrentUserProfile';
import { useEditProfileForm } from '../../../ui/form-hooks/useEditProfileForm';
import { useUpdateProfileMutation } from '../../../ui/hooks/useUpdateProfileMutation';
import { Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';
import { pickFromCamera, pickFromGallery } from '../../utils/imagePicker';

type EditProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  navigation,
}) => {
  const { data: user, isLoading } = useCurrentUserProfile();
  const {
    control,
    handleSubmit,
    reset,
    rules,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useEditProfileForm();
  const updateProfileMutation = useUpdateProfileMutation();

  const avatarUri = watch('avatarUri');
  const coverImageUri = watch('coverImageUri');
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [imageType, setImageType] = useState<'avatar' | 'cover'>('avatar');

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      reset({
        display_name: user.display_name || '',
        username: user.username || '',
        bio: user.bio || '',
        headline: user.headline || '',
        current_position: user.current_position || '',
        company: user.company || '',
        industry: user.industry || '',
        phone: user.phone || '',
        website: user.website || '',
        linkedin_url: user.linkedin_url || '',
        twitter_url: user.twitter_url || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    try {
      await updateProfileMutation.mutateAsync({
        ...data,
        avatarUri: data.avatarUri || undefined,
        coverImageUri: data.coverImageUri || undefined,
      });

      Alert.alert('Success', 'Profile updated successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  const handleImageSelect = (type: 'avatar' | 'cover') => {
    setImageType(type);
    setShowImageOptions(true);
  };

  const handleImagePicked = async (uri: string) => {
    if (imageType === 'avatar') {
      setValue('avatarUri', uri);
    } else {
      setValue('coverImageUri', uri);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Failed to load profile</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faTimes} size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || updateProfileMutation.isPending}
        >
          {isSubmitting || updateProfileMutation.isPending ? (
            <ActivityIndicator size="small" color="#2563EB" />
          ) : (
            <Text style={styles.saveButton}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Cover Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.coverImageContainer}>
            {coverImageUri || user.cover_image ? (
              <Image
                source={{ uri: coverImageUri || user.cover_image }}
                style={styles.coverImage}
              />
            ) : (
              <View style={styles.coverImagePlaceholder} />
            )}
            <TouchableOpacity
              style={styles.coverImageButton}
              onPress={() => handleImageSelect('cover')}
            >
              <FontAwesomeIcon icon={faCamera} size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Avatar Section */}
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatarUri || user.avatar }}
              style={styles.avatar}
            />
            <TouchableOpacity
              style={styles.avatarButton}
              onPress={() => handleImageSelect('avatar')}
            >
              <FontAwesomeIcon icon={faCamera} size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Options Modal */}
        <Modal transparent animationType="slide" visible={showImageOptions}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowImageOptions(false)}
          />
          <View style={styles.bottomSheet}>
            <TouchableOpacity
              style={styles.sheetOption}
              onPress={async () => {
                setShowImageOptions(false);
                const uri = await pickFromCamera();
                if (uri) handleImagePicked(uri);
              }}
            >
              <FontAwesomeIcon icon={faCamera} size={18} color="#333" />
              <Text style={styles.sheetText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetOption}
              onPress={async () => {
                setShowImageOptions(false);
                const uri = await pickFromGallery();
                if (uri) handleImagePicked(uri);
              }}
            >
              <FontAwesomeIcon icon={faImage} size={18} color="#333" />
              <Text style={styles.sheetText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelOption}
              onPress={() => setShowImageOptions(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Form Fields */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Display Name *</Text>
            <Controller
              control={control}
              name="display_name"
              rules={rules.display_name}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your display name"
                  placeholderTextColor="#999"
                />
              )}
            />
            {errors.display_name && (
              <Text style={styles.errorText}>
                {errors.display_name.message}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username *</Text>
            <Controller
              control={control}
              name="username"
              rules={rules.username}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="@username"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Headline</Text>
            <Controller
              control={control}
              name="headline"
              rules={rules.headline}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="e.g., Senior Software Engineer at Google"
                  placeholderTextColor="#999"
                />
              )}
            />
            {errors.headline && (
              <Text style={styles.errorText}>{errors.headline.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <Controller
              control={control}
              name="bio"
              rules={rules.bio}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Tell us about yourself..."
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              )}
            />
            {errors.bio && (
              <Text style={styles.errorText}>{errors.bio.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Position</Text>
            <Controller
              control={control}
              name="current_position"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Job title"
                  placeholderTextColor="#999"
                />
              )}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Company</Text>
            <Controller
              control={control}
              name="company"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Company name"
                  placeholderTextColor="#999"
                />
              )}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Industry</Text>
            <Controller
              control={control}
              name="industry"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="e.g., Technology, Finance"
                  placeholderTextColor="#999"
                />
              )}
            />
          </View>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <Controller
              control={control}
              name="phone"
              rules={rules.phone}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="+1 (555) 123-4567"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Website</Text>
            <Controller
              control={control}
              name="website"
              rules={rules.website}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="https://yourwebsite.com"
                  placeholderTextColor="#999"
                  keyboardType="url"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.website && (
              <Text style={styles.errorText}>{errors.website.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>LinkedIn URL</Text>
            <Controller
              control={control}
              name="linkedin_url"
              rules={rules.linkedin_url}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="https://linkedin.com/in/username"
                  placeholderTextColor="#999"
                  keyboardType="url"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.linkedin_url && (
              <Text style={styles.errorText}>
                {errors.linkedin_url.message}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Twitter URL</Text>
            <Controller
              control={control}
              name="twitter_url"
              rules={rules.twitter_url}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="https://twitter.com/username"
                  placeholderTextColor="#999"
                  keyboardType="url"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.twitter_url && (
              <Text style={styles.errorText}>{errors.twitter_url.message}</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  scrollView: {
    flex: 1,
  },

  imageSection: {
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  coverImageContainer: {
    height: 150,
    backgroundColor: '#e0e0e0',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
  },
  coverImageButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: -50,
    marginBottom: 16,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2563EB',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },

  form: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  errorText: {
    fontSize: 12,
    color: '#DC2626',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sheetText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
    fontWeight: '500',
  },
  cancelOption: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '600',
  },
});
