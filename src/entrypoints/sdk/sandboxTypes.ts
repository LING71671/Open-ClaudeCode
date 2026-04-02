/**
 * Sandbox Types - Configuration types for sandboxed execution environments.
 *
 * These types define the sandbox settings for file system access, network access,
 * and other security constraints.
 */

// ============================================================================
// Filesystem Configuration
// ============================================================================

export interface SandboxFilesystemConfig {
  type: 'full' | 'restricted' | 'write' | 'none'
  allowedPaths?: string[]
  deniedPaths?: string[]
}

// ============================================================================
// Network Configuration
// ============================================================================

export interface SandboxNetworkConfig {
  type: 'full' | 'restricted' | 'none'
  allowedDomains?: string[]
  deniedDomains?: string[]
}

// ============================================================================
// Sandbox Ignore Violations
// ============================================================================

export type SandboxIgnoreViolations = string[]

// ============================================================================
// Sandbox Settings
// ============================================================================

export interface SandboxSettings {
  enabled: boolean
  network?: SandboxNetworkConfig
  filesystem?: SandboxFilesystemConfig
  ignoreViolations?: SandboxIgnoreViolations
}
