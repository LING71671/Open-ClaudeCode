/**
 * Settings Types - Generated from settings JSON schema.
 *
 * DO NOT EDIT MANUALLY. These types are generated from the settings schema.
 * To modify: edit the settings schema and regenerate.
 */

import type { PermissionMode, EffortLevel } from './coreTypes.generated.js'

// ============================================================================
// Settings
// ============================================================================

export interface Settings {
  // Model settings
  model?: string
  effort?: EffortLevel
  max_thinking_tokens?: number | null

  // Permission settings
  permissionMode?: PermissionMode

  // Output settings
  output_style?: string

  // API settings
  api_key?: string
  api_key_source?: string
  base_url?: string

  // MCP settings
  mcpServers?: Record<string, unknown>

  // Hook settings
  hooks?: Record<string, unknown>

  // Plugin settings
  plugins?: Array<{ type: string; path: string }>

  // Sandbox settings
  sandbox?: {
    enabled: boolean
    network?: { type: string; allowedDomains?: string[] }
    filesystem?: { type: string; allowedPaths?: string[] }
  }

  // Feature flags
  features?: Record<string, boolean>

  // Theme settings
  theme?: string

  // Vim mode
  vim?: boolean

  // Other settings
  [key: string]: unknown
}
