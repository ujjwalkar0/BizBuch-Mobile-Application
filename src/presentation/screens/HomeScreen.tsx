// src/presentation/screens/HomeScreen.tsx
import React from 'react';
import { BottomNavigationTemplate } from '../components/templates/BottomNavigationTemplate';

/**
 * HomeScreen Page
 * Atomic Design: Page - Wrapper for BottomNavigationTemplate
 * SOLID Principles:
 * - Single Responsibility: Renders the main navigation template
 * - Open/Closed: Extended through BottomNavigationTemplate
 * - Dependency Inversion: Depends on BottomNavigationTemplate abstraction
 *
 * Note: This screen delegates to BottomNavigationTemplate which handles
 * all tab navigation logic, styling (from theme), and TabIcon atom usage.
 */
const HomeScreen: React.FC = () => {
  return <BottomNavigationTemplate />;
};

export default HomeScreen;
