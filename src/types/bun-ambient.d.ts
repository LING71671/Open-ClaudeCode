/**
 * Ambient type declarations for Bun-specific features
 * that are used throughout the Claude Code codebase.
 */

// bun:bundle - Bun's built-in module for feature flags and bundle-time features
declare module 'bun:bundle' {
  /**
   * Check if a feature flag is enabled at build time.
   * Used for dead code elimination during bundling.
   * @param featureName - The name of the feature to check
   * @returns boolean indicating if the feature is enabled
   */
  export function feature(featureName: string): boolean;
  
  /**
   * Get the bundle target information.
   */
  export const target: string;
  
  /**
   * Get the bundle mode (production/development).
   */
  export const mode: 'production' | 'development';
}

// MACRO - Bun build-time macro replacement
// This is replaced at build time with actual values
declare const MACRO: {
  [key: string]: any;
};

// React Compiler Runtime - the 'c' export is used by React Compiler
declare module 'react/compiler-runtime' {
  /**
   * React Compiler cache function - used for memoization.
   * This is automatically inserted by the React Compiler.
   */
  export function c(
    id: string,
    fn: () => any,
    deps?: any[],
    arg?: any,
    rest?: any
  ): any;
  
  /**
   * React Compiler cache function with owner info.
   */
  export function $ (
    id: string,
    fn: () => any,
    deps?: any[],
    arg?: any,
    rest?: any
  ): any;
}

// Bun global type extension
interface ImportMeta {
  dirname: string;
}
