import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAdvancedSettingsForm } from '../form-hooks/useAdvancedSettingsForm';
import { AdvancedSettingsFormValues } from '../form-types/AdvancedSettingsForm.types';
import { configManager } from '../../core/config';

/**
 * useAdvancedSettingsScreen Hook
 * SOLID: Single Responsibility - Handle all advanced settings screen business logic
 * SOLID: Dependency Inversion - Depends on abstractions (configManager, navigation)
 */
export const useAdvancedSettingsScreen = () => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [defaultValues, setDefaultValues] = useState<AdvancedSettingsFormValues>({
    ip: '',
    port: '',
  });

  // Initialize form after loading config
  const form = useAdvancedSettingsForm(defaultValues);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
    rules,
  } = form;

  // Watch form values for preview
  const watchedIp = watch('ip');
  const watchedPort = watch('port');

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      await configManager.initialize();
      const ip = configManager.getIp();
      const port = configManager.getPort();
      
      setDefaultValues({ ip, port });
      reset({ ip, port });
      setIsLoading(false);
    };
    loadSettings();
  }, [reset]);

  // Navigation handlers
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Form submission
  const handleSave = useCallback(
    async (data: AdvancedSettingsFormValues) => {
      setIsSaving(true);
      try {
        await configManager.setIp(data.ip);
        await configManager.setPort(data.port);
        Alert.alert(
          'Settings Saved',
          'Server configuration updated successfully.',
          [{ text: 'OK', onPress: handleGoBack }],
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to save settings. Please try again.');
      } finally {
        setIsSaving(false);
      }
    },
    [handleGoBack],
  );

  // Reset to defaults
  const handleReset = useCallback(() => {
    Alert.alert(
      'Reset to Defaults',
      'Are you sure you want to reset server settings to defaults?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await configManager.resetToDefaults();
            const ip = configManager.getIp();
            const port = configManager.getPort();
            reset({ ip, port });
            Alert.alert('Reset Complete', 'Settings have been reset to defaults.');
          },
        },
      ],
    );
  }, [reset]);

  // Submit handler
  const onSubmit = handleSubmit(handleSave);

  // Computed values
  const previewUrl = `http://${watchedIp || '...'}:${watchedPort || '...'}/`;
  const isSubmitDisabled = !isValid || isSaving;

  return {
    // Form state
    control,
    errors,
    rules,
    
    // Loading states
    isLoading,
    isSaving,
    
    // Computed
    previewUrl,
    isSubmitDisabled,
    
    // Actions
    onSubmit,
    handleGoBack,
    handleReset,
  };
};
