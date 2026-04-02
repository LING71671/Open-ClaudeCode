/**
 * SDK Tool Types - Types for tool definitions and tool-related interfaces.
 *
 * These types define the structure of tool inputs and outputs used by the SDK.
 */

import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js'

// ============================================================================
// Tool Input Types
// ============================================================================

export interface ToolInputJSONSchema {
  type: 'object'
  properties?: Record<string, unknown>
  required?: string[]
  additionalProperties?: boolean
}

// ============================================================================
// Tool Definition Types
// ============================================================================

export interface ToolDefinition {
  name: string
  description: string
  inputSchema: ToolInputJSONSchema
  handler: (input: Record<string, unknown>) => Promise<CallToolResult>
}

// ============================================================================
// Tool Result Types
// ============================================================================

export interface ToolResult {
  type: 'tool_result'
  tool_use_id: string
  content: string
  is_error?: boolean
}
