/**
 * SDK Control Types - TypeScript types for the control protocol.
 *
 * These types mirror the Zod schemas in controlSchemas.ts and are used
 * by SDK implementations for type-safe control protocol communication.
 *
 * Generated from controlSchemas.ts - DO NOT EDIT MANUALLY.
 */

import type { z } from 'zod/v4'
import type {
  AccountInfo,
  AgentDefinition,
  AgentInfo,
  FastModeState,
  HookEvent,
  HookInput,
  McpServerConfigForProcessTransport,
  McpServerStatus,
  ModelInfo,
  PermissionMode,
  PermissionUpdate,
  SDKMessage,
  SDKPostTurnSummaryMessage,
  SDKStreamlinedTextMessage,
  SDKStreamlinedToolUseSummaryMessage,
  SDKUserMessage,
  SlashCommand,
} from './coreSchemas.js'

// ============================================================================
// Hook Callback Types
// ============================================================================

export interface SDKHookCallbackMatcher {
  matcher?: string
  hookCallbackIds: string[]
  timeout?: number
}

// ============================================================================
// Control Request Types
// ============================================================================

export interface SDKControlInitializeRequest {
  subtype: 'initialize'
  hooks?: Record<HookEvent, SDKHookCallbackMatcher[]>
  sdkMcpServers?: string[]
  jsonSchema?: Record<string, unknown>
  systemPrompt?: string
  appendSystemPrompt?: string
  agents?: Record<string, AgentDefinition>
  promptSuggestions?: boolean
  agentProgressSummaries?: boolean
}

export interface SDKControlInitializeResponse {
  commands: SlashCommand[]
  agents: AgentInfo[]
  output_style: string
  available_output_styles: string[]
  models: ModelInfo[]
  account: AccountInfo
  pid?: number
  fast_mode_state?: FastModeState
}

export interface SDKControlInterruptRequest {
  subtype: 'interrupt'
}

export interface SDKControlPermissionRequest {
  subtype: 'can_use_tool'
  tool_name: string
  input: Record<string, unknown>
  permission_suggestions?: PermissionUpdate[]
  blocked_path?: string
  decision_reason?: string
  title?: string
  display_name?: string
  tool_use_id: string
  agent_id?: string
  description?: string
}

export interface SDKControlSetPermissionModeRequest {
  subtype: 'set_permission_mode'
  mode: PermissionMode
  ultraplan?: boolean
}

export interface SDKControlSetModelRequest {
  subtype: 'set_model'
  model?: string
}

export interface SDKControlSetMaxThinkingTokensRequest {
  subtype: 'set_max_thinking_tokens'
  max_thinking_tokens: number | null
}

export interface SDKControlMcpStatusRequest {
  subtype: 'mcp_status'
}

export interface SDKControlMcpStatusResponse {
  mcpServers: McpServerStatus[]
}

export interface ContextCategory {
  name: string
  tokens: number
  color: string
  isDeferred?: boolean
}

export interface ContextGridSquare {
  color: string
  isFilled: boolean
  categoryName: string
  tokens: number
  percentage: number
  squareFullness: number
}

export interface SDKControlGetContextUsageRequest {
  subtype: 'get_context_usage'
}

export interface SDKControlGetContextUsageResponse {
  categories: ContextCategory[]
  totalTokens: number
  maxTokens: number
  rawMaxTokens: number
  percentage: number
  gridRows: ContextGridSquare[][]
  model: string
  memoryFiles: Array<{ path: string; type: string; tokens: number }>
  mcpTools: Array<{
    name: string
    serverName: string
    tokens: number
    isLoaded?: boolean
  }>
  deferredBuiltinTools?: Array<{
    name: string
    tokens: number
    isLoaded: boolean
  }>
  systemTools?: Array<{ name: string; tokens: number }>
  systemPromptSections?: Array<{ name: string; tokens: number }>
  agents: Array<{ agentType: string; source: string; tokens: number }>
  slashCommands?: {
    totalCommands: number
    includedCommands: number
    tokens: number
  }
  skills?: {
    totalSkills: number
    includedSkills: number
    tokens: number
    skillFrontmatter: Array<{ name: string; source: string; tokens: number }>
  }
  autoCompactThreshold?: number
  isAutoCompactEnabled: boolean
  messageBreakdown?: {
    toolCallTokens: number
    toolResultTokens: number
    attachmentTokens: number
    assistantMessageTokens: number
    userMessageTokens: number
    toolCallsByType: Array<{
      name: string
      callTokens: number
      resultTokens: number
    }>
    attachmentsByType: Array<{ name: string; tokens: number }>
  }
  apiUsage?: {
    input_tokens: number
    output_tokens: number
    cache_creation_input_tokens: number
    cache_read_input_tokens: number
  } | null
}

export interface SDKControlRewindFilesRequest {
  subtype: 'rewind_files'
  user_message_id: string
  dry_run?: boolean
}

export interface SDKControlRewindFilesResponse {
  canRewind: boolean
  error?: string
  filesChanged?: string[]
  insertions?: number
  deletions?: number
}

export interface SDKControlCancelAsyncMessageRequest {
  subtype: 'cancel_async_message'
  message_uuid: string
}

export interface SDKControlCancelAsyncMessageResponse {
  cancelled: boolean
}

export interface SDKControlSeedReadStateRequest {
  subtype: 'seed_read_state'
  path: string
  mtime: number
}

export interface SDKHookCallbackRequest {
  subtype: 'hook_callback'
  callback_id: string
  input: HookInput
  tool_use_id?: string
}

export interface SDKControlMcpMessageRequest {
  subtype: 'mcp_message'
  server_name: string
  message: unknown // JSONRPCMessage from @modelcontextprotocol/sdk
}

export interface SDKControlMcpSetServersRequest {
  subtype: 'mcp_set_servers'
  servers: Record<string, McpServerConfigForProcessTransport>
}

export interface SDKControlMcpSetServersResponse {
  added: string[]
  removed: string[]
  errors: Record<string, string>
}

export interface SDKControlReloadPluginsRequest {
  subtype: 'reload_plugins'
}

export interface SDKControlReloadPluginsResponse {
  commands: SlashCommand[]
  agents: AgentInfo[]
  plugins: Array<{ name: string; path: string; source?: string }>
  mcpServers: McpServerStatus[]
  error_count: number
}

export interface SDKControlMcpReconnectRequest {
  subtype: 'mcp_reconnect'
  serverName: string
}

export interface SDKControlMcpToggleRequest {
  subtype: 'mcp_toggle'
  serverName: string
  enabled: boolean
}

export interface SDKControlStopTaskRequest {
  subtype: 'stop_task'
  task_id: string
}

export interface SDKControlApplyFlagSettingsRequest {
  subtype: 'apply_flag_settings'
  settings: Record<string, unknown>
}

export interface SDKControlGetSettingsRequest {
  subtype: 'get_settings'
}

export interface SDKControlGetSettingsResponse {
  effective: Record<string, unknown>
  sources: Array<{
    source:
      | 'userSettings'
      | 'projectSettings'
      | 'localSettings'
      | 'flagSettings'
      | 'policySettings'
    settings: Record<string, unknown>
  }>
  applied?: {
    model: string
    effort: 'low' | 'medium' | 'high' | 'max' | null
  }
}

export interface SDKControlElicitationRequest {
  subtype: 'elicitation'
  mcp_server_name: string
  message: string
  mode?: 'form' | 'url'
  url?: string
  elicitation_id?: string
  requested_schema?: Record<string, unknown>
}

export interface SDKControlElicitationResponse {
  action: 'accept' | 'decline' | 'cancel'
  content?: Record<string, unknown>
}

// ============================================================================
// Control Request/Response Wrappers
// ============================================================================

export type SDKControlRequestInner =
  | SDKControlInterruptRequest
  | SDKControlPermissionRequest
  | SDKControlInitializeRequest
  | SDKControlSetPermissionModeRequest
  | SDKControlSetModelRequest
  | SDKControlSetMaxThinkingTokensRequest
  | SDKControlMcpStatusRequest
  | SDKControlGetContextUsageRequest
  | SDKHookCallbackRequest
  | SDKControlMcpMessageRequest
  | SDKControlRewindFilesRequest
  | SDKControlCancelAsyncMessageRequest
  | SDKControlSeedReadStateRequest
  | SDKControlMcpSetServersRequest
  | SDKControlReloadPluginsRequest
  | SDKControlMcpReconnectRequest
  | SDKControlMcpToggleRequest
  | SDKControlStopTaskRequest
  | SDKControlApplyFlagSettingsRequest
  | SDKControlGetSettingsRequest
  | SDKControlElicitationRequest

export interface SDKControlRequest {
  type: 'control_request'
  request_id: string
  request: SDKControlRequestInner
}

export interface ControlResponse {
  subtype: 'success'
  request_id: string
  response?: Record<string, unknown>
}

export interface ControlErrorResponse {
  subtype: 'error'
  request_id: string
  error: string
  pending_permission_requests?: SDKControlRequest[]
}

export interface SDKControlResponse {
  type: 'control_response'
  response: ControlResponse | ControlErrorResponse
}

export interface SDKControlCancelRequest {
  type: 'control_cancel_request'
  request_id: string
}

export interface SDKKeepAliveMessage {
  type: 'keep_alive'
}

export interface SDKUpdateEnvironmentVariablesMessage {
  type: 'update_environment_variables'
  variables: Record<string, string>
}

// ============================================================================
// Aggregate Message Types
// ============================================================================

export type StdoutMessage =
  | SDKMessage
  | SDKStreamlinedTextMessage
  | SDKStreamlinedToolUseSummaryMessage
  | SDKPostTurnSummaryMessage
  | SDKControlResponse
  | SDKControlRequest
  | SDKControlCancelRequest
  | SDKKeepAliveMessage

export type StdinMessage =
  | SDKUserMessage
  | SDKControlRequest
  | SDKControlResponse
  | SDKKeepAliveMessage
  | SDKUpdateEnvironmentVariablesMessage
