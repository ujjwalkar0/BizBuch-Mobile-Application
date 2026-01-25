import { useForm, UseFormReturn } from 'react-hook-form';
import { AdvancedSettingsFormValues } from '../form-types/AdvancedSettingsForm.types';

/**
 * Validation rules for advanced settings form
 * SOLID: Single Responsibility - Define validation rules only
 * SOLID: Open/Closed - Easy to extend validation rules
 */
export const advancedSettingsValidationRules = {
  ip: {
    required: 'IP address is required',
    pattern: {
      value: /^(\d{1,3}\.){3}\d{1,3}$/,
      message: 'Please enter a valid IP address (e.g., 192.168.0.5)',
    },
    validate: (value: string) => {
      const parts = value.split('.');
      const isValid = parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
      });
      return isValid || 'Each IP segment must be between 0 and 255';
    },
  },
  port: {
    required: 'Port is required',
    validate: (value: string) => {
      const num = parseInt(value, 10);
      if (isNaN(num)) return 'Port must be a number';
      if (num < 1 || num > 65535) return 'Port must be between 1 and 65535';
      return true;
    },
  },
};

// Type export for validation rules
export type AdvancedSettingsValidationRules = typeof advancedSettingsValidationRules;

/**
 * useAdvancedSettingsForm Hook
 * SOLID: Single Responsibility - Form setup and validation only
 * SOLID: Dependency Inversion - Depends on react-hook-form abstraction
 */
export const useAdvancedSettingsForm = (
  defaultValues: AdvancedSettingsFormValues,
): UseFormReturn<AdvancedSettingsFormValues> & {
  rules: AdvancedSettingsValidationRules;
} => {
  const form = useForm<AdvancedSettingsFormValues>({
    defaultValues,
    mode: 'onChange',
  });

  return {
    ...form,
    rules: advancedSettingsValidationRules,
  };
};
