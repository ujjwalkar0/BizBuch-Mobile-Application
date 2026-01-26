import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faServer,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';
import { AdvancedSettingsFormValues } from '../../../ui/form-types/AdvancedSettingsForm.types';
import { AdvancedSettingsValidationRules } from '../../../ui/form-hooks/useAdvancedSettingsForm';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader } from '../molecules/PageHeader';

/**
 * AdvancedSettingsScreenTemplate Props
 * SOLID: Interface Segregation - Only required props
 */
interface AdvancedSettingsScreenTemplateProps {
  // Form
  control: Control<AdvancedSettingsFormValues>;
  errors: FieldErrors<AdvancedSettingsFormValues>;
  rules: AdvancedSettingsValidationRules;

  // Loading states
  isLoading: boolean;
  isSaving: boolean;

  // Computed
  previewUrl: string;
  isSubmitDisabled: boolean;

  // Actions
  onSubmit: () => void;
  onGoBack: () => void;
  onReset: () => void;
}

/**
 * AdvancedSettingsScreenTemplate
 * SOLID: Single Responsibility - Handle UI layout only
 * Atomic Design: Template - Page-level layout composition
 */
export const AdvancedSettingsScreenTemplate: React.FC<
  AdvancedSettingsScreenTemplateProps
> = ({
  control,
  errors,
  rules,
  isLoading,
  isSaving,
  previewUrl,
  isSubmitDisabled,
  onSubmit,
  onGoBack,
  onReset,
}) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PageHeader title="Advanced Settings" leftAction={{ type: 'back', onPress: onGoBack }} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Server Configuration Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesomeIcon
              icon={faServer}
              size={20}
              color={theme.colors.primary}
            />
            <Text style={styles.sectionTitle}>Server Configuration</Text>
          </View>

          <Text style={styles.sectionDescription}>
            Configure the server IP address and port for API connections.
          </Text>

          {/* IP Address Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Server IP Address</Text>
            <Controller
              control={control}
              name="ip"
              rules={rules.ip}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.ip && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="192.168.0.5"
                  placeholderTextColor={theme.colors.gray500}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />
            {errors.ip && (
              <Text style={styles.errorText}>{errors.ip.message}</Text>
            )}
          </View>

          {/* Port Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Port</Text>
            <Controller
              control={control}
              name="port"
              rules={rules.port}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.port && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="8000"
                  placeholderTextColor={theme.colors.gray500}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              )}
            />
            {errors.port && (
              <Text style={styles.errorText}>{errors.port.message}</Text>
            )}
          </View>

          {/* Current URL Preview */}
          <View style={styles.previewContainer}>
            <Text style={styles.previewLabel}>API URL Preview:</Text>
            <Text style={styles.previewUrl}>{previewUrl}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, isSubmitDisabled && styles.disabledButton]}
            onPress={onSubmit}
            disabled={isSubmitDisabled}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Save Settings</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={onReset}>
            <FontAwesomeIcon
              icon={faRotateLeft}
              size={16}
              color={theme.colors.red500}
            />
            <Text style={styles.resetButtonText}>Reset to Defaults</Text>
          </TouchableOpacity>
        </View>

        {/* Info Note */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            ℹ️ Changes will take effect immediately for all new API requests.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.gray900,
  },
  sectionDescription: {
    fontSize: 14,
    color: theme.colors.gray500,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.gray900,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.gray900,
    backgroundColor: theme.colors.background,
  },
  inputError: {
    borderColor: theme.colors.red500,
  },
  errorText: {
    color: theme.colors.red500,
    fontSize: 12,
    marginTop: 4,
  },
  previewContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  previewLabel: {
    fontSize: 12,
    color: theme.colors.gray500,
    marginBottom: 4,
  },
  previewUrl: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: theme.colors.primary,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.red500,
    borderRadius: 8,
  },
  resetButtonText: {
    color: theme.colors.red500,
    fontSize: 14,
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    padding: 12,
    marginBottom: 32,
  },
  infoText: {
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 18,
  },
});
