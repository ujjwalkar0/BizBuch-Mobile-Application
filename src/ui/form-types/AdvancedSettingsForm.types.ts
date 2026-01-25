/**
 * AdvancedSettingsForm Types
 * SOLID: Single Responsibility - Define types for advanced settings form
 * SOLID: Interface Segregation - Focused form-specific types
 */

export interface AdvancedSettingsFormValues {
  ip: string;
  port: string;
}

export interface AdvancedSettingsFormDefaults {
  ip: string;
  port: string;
}
