/**
 * SDK Core Types - Generated from Zod schemas in coreSchemas.ts.
 *
 * DO NOT EDIT MANUALLY. To modify types:
 * 1. Edit Zod schemas in coreSchemas.ts
 * 2. Run: bun scripts/generate-sdk-types.ts
 *
 * This file provides type-safe access to all SDK message types,
 * hook types, session types, and configuration types.
 */

import type { ContentBlock, Message as AnthropicMessage, MessageParam, Usage } from '@anthropic-ai/sdk'
import type { Tool as McpTool, CallToolResult } from '@modelcontextprotocol/sdk/types.js'

// ============================================================================
// Usage & Model Types
// ============================================================================

export interface ModelUsage {
  inputTokens: number
  outputTokens: number
  cacheReadInputTokens: number
  cacheCreationInputTokens: number
  webSearchRequests: number
  costUSD: number
  contextWindow: number
  maxOutputTokens: number
}

export type NonNullableUsage = {
  [K in keyof Usage]: NonNullable<Usage[K]>
}

// ============================================================================
// Output Format Types
// ============================================================================

export type OutputFormat = { type: 'json_schema' } & Record<string, unknown>

// ============================================================================
// MCP Server Types
// ============================================================================

export interface McpStdioServerConfig {
  command: string
  args: string[]
  env?: Record<string, string>
}

export interface McpSSEServerConfig {
  type: 'sse'
  url: string
}

export interface McpHttpServerConfig {
  type: 'http'
  url: string
}

export interface McpSdkServerConfig {
  type: 'stdio' | 'sse' | 'http' | 'streamable-http' | 'streamable_http'
  command?: string
  args?: string[]
  env?: Record<string, string>
  url?: string
  headers?: Record<string, string>
}

export interface McpServerConfigForProcessTransport {
  type: 'stdio' | 'sse' | 'http' | 'streamable-http' | 'streamable_http' | 'sse-ide'
  command?: string
  args?: string[]
  env?: Record<string, string>
  url?: string
  ideName?: string
  ideRunningInWindows?: boolean
}

export interface McpClaudeAIProxyServerConfig {
  type: 'claude_ai_proxy'
  proxyUrl: string
}

export type McpServerStatusConfig = 'connected' | 'disconnected' | 'connecting' | 'error'

export interface McpServerStatus {
  name: string
  status: McpServerStatusConfig
  config?: McpServerConfigForProcessTransport
  tools?: McpTool[]
  resources?: unknown[]
  prompts?: unknown[]
  error?: string
  disabled?: boolean
}

export interface McpSetServersResult {
  added: string[]
  removed: string[]
  errors: Record<string, string>
}

// ============================================================================
// Permission Types
// ============================================================================

export type PermissionUpdateDestination = 'user' | 'project' | 'local'

export type PermissionBehavior =
  | 'allow'
  | 'allowAlways'
  | 'allowAlwaysPath'
  | 'deny'
  | 'denyAlways'

export interface PermissionRuleValue {
  behavior: PermissionBehavior
  path?: string
  pathRegex?: string
  inputRegex?: string
  toolName?: string
}

export interface PermissionUpdate {
  destination: PermissionUpdateDestination
  behavior: PermissionBehavior
  toolName?: string
  path?: string
  pathRegex?: string
  inputRegex?: string
}

export type PermissionDecisionClassification = 'auto-approved' | 'user-approved' | 'denied'

export interface PermissionResult {
  behavior: PermissionBehavior
  updatedInput?: Record<string, unknown>
  updatedPermissions?: PermissionUpdate[]
  message?: string
  interrupt?: boolean
}

export type PermissionMode =
  | 'default'
  | 'acceptEdits'
  | 'bypassPermissions'
  | 'plan'

// ============================================================================
// Hook Types
// ============================================================================

export type HookEvent =
  | 'PreToolUse'
  | 'PostToolUse'
  | 'PostToolUseFailure'
  | 'Notification'
  | 'UserPromptSubmit'
  | 'SessionStart'
  | 'SessionEnd'
  | 'Stop'
  | 'StopFailure'
  | 'SubagentStart'
  | 'SubagentStop'
  | 'PreCompact'
  | 'PostCompact'
  | 'PermissionRequest'
  | 'PermissionDenied'
  | 'Setup'
  | 'TeammateIdle'
  | 'TaskCreated'
  | 'TaskCompleted'
  | 'Elicitation'
  | 'ElicitationResult'
  | 'ConfigChange'
  | 'WorktreeCreate'
  | 'WorktreeRemove'
  | 'InstructionsLoaded'
  | 'CwdChanged'
  | 'FileChanged'

export type ExitReason =
  | 'clear'
  | 'resume'
  | 'logout'
  | 'prompt_input_exit'
  | 'other'
  | 'bypass_permissions_disabled'

export interface BaseHookInput {
  hook_event_name: HookEvent
  timestamp: string
  transcriberSource: string
  source: 'hook'
}

export interface PreToolUseHookInput extends BaseHookInput {
  hook_event_name: 'PreToolUse'
  tool_name: string
  tool_input: Record<string, unknown>
  tool_use_id: string
}

export interface PermissionRequestHookInput extends BaseHookInput {
  hook_event_name: 'PermissionRequest'
  tool_name: string
  tool_input: Record<string, unknown>
  tool_use_id: string
}

export interface PostToolUseHookInput extends BaseHookInput {
  hook_event_name: 'PostToolUse'
  tool_name: string
  tool_input: Record<string, unknown>
  tool_use_id: string
  tool_response: unknown
}

export interface PostToolUseFailureHookInput extends BaseHookInput {
  hook_event_name: 'PostToolUseFailure'
  tool_name: string
  tool_input: Record<string, unknown>
  tool_use_id: string
  error: string
}

export interface PermissionDeniedHookInput extends BaseHookInput {
  hook_event_name: 'PermissionDenied'
  tool_name: string
  tool_input: Record<string, unknown>
  tool_use_id: string
}

export interface NotificationHookInput extends BaseHookInput {
  hook_event_name: 'Notification'
  message: string
  level?: 'info' | 'warning' | 'error'
}

export interface UserPromptSubmitHookInput extends BaseHookInput {
  hook_event_name: 'UserPromptSubmit'
  prompt: string
}

export interface SessionStartHookInput extends BaseHookInput {
  hook_event_name: 'SessionStart'
  cwd: string
  model: string
  permissionMode: PermissionMode
}

export interface StopHookInput extends BaseHookInput {
  hook_event_name: 'Stop'
  stop_reason: string
}

export interface StopFailureHookInput extends BaseHookInput {
  hook_event_name: 'StopFailure'
  error: string
}

export interface SubagentStartHookInput extends BaseHookInput {
  hook_event_name: 'SubagentStart'
  agent_type: string
  description: string
  prompt: string
}

export interface SubagentStopHookInput extends BaseHookInput {
  hook_event_name: 'SubagentStop'
  agent_type: string
  stop_reason: string
  usage?: ModelUsage
}

export interface PreCompactHookInput extends BaseHookInput {
  hook_event_name: 'PreCompact'
  context_tokens: number
  max_tokens: number
}

export interface PostCompactHookInput extends BaseHookInput {
  hook_event_name: 'PostCompact'
  context_tokens: number
  max_tokens: number
  tokens_removed: number
}

export interface TeammateIdleHookInput extends BaseHookInput {
  hook_event_name: 'TeammateIdle'
  agent_type: string
}

export interface TaskCreatedHookInput extends BaseHookInput {
  hook_event_name: 'TaskCreated'
  task_id: string
  description: string
}

export interface TaskCompletedHookInput extends BaseHookInput {
  hook_event_name: 'TaskCompleted'
  task_id: string
  status: 'completed' | 'failed' | 'stopped'
}

export interface ElicitationHookInput extends BaseHookInput {
  hook_event_name: 'Elicitation'
  mcp_server_name: string
  message: string
}

export interface ElicitationResultHookInput extends BaseHookInput {
  hook_event_name: 'ElicitationResult'
  mcp_server_name: string
  action: 'accept' | 'decline' | 'cancel'
}

export interface ConfigChangeHookInput extends BaseHookInput {
  hook_event_name: 'ConfigChange'
  source: string
  changes: Record<string, unknown>
}

export interface InstructionsLoadedHookInput extends BaseHookInput {
  hook_event_name: 'InstructionsLoaded'
  reason: string
  memoryType: string
  path: string
}

export interface WorktreeCreateHookInput extends BaseHookInput {
  hook_event_name: 'WorktreeCreate'
  path: string
}

export interface WorktreeRemoveHookInput extends BaseHookInput {
  hook_event_name: 'WorktreeRemove'
  path: string
}

export interface CwdChangedHookInput extends BaseHookInput {
  hook_event_name: 'CwdChanged'
  cwd: string
}

export interface FileChangedHookInput extends BaseHookInput {
  hook_event_name: 'FileChanged'
  file_path: string
  event: 'change' | 'add' | 'unlink'
}

export interface SessionEndHookInput extends BaseHookInput {
  hook_event_name: 'SessionEnd'
  reason: ExitReason
}

export type HookInput =
  | PreToolUseHookInput
  | PostToolUseHookInput
  | PostToolUseFailureHookInput
  | PermissionDeniedHookInput
  | NotificationHookInput
  | UserPromptSubmitHookInput
  | SessionStartHookInput
  | SessionEndHookInput
  | StopHookInput
  | StopFailureHookInput
  | SubagentStartHookInput
  | SubagentStopHookInput
  | PreCompactHookInput
  | PostCompactHookInput
  | PermissionRequestHookInput
  | SetupHookInput
  | TeammateIdleHookInput
  | TaskCreatedHookInput
  | TaskCompletedHookInput
  | ElicitationHookInput
  | ElicitationResultHookInput
  | ConfigChangeHookInput
  | InstructionsLoadedHookInput
  | WorktreeCreateHookInput
  | WorktreeRemoveHookInput
  | CwdChangedHookInput
  | FileChangedHookInput

export interface SetupHookInput extends BaseHookInput {
  hook_event_name: 'Setup'
  cwd: string
}

// Hook Output Types
export interface AsyncHookJSONOutput {
  async: true
  asyncTimeout?: number
}

export interface SyncHookJSONOutput {
  continue?: boolean
  suppressOutput?: boolean
  stopReason?: string
  decision?: 'approve' | 'block'
  systemMessage?: string
  reason?: string
  hookSpecificOutput?: HookSpecificOutput
}

export type HookSpecificOutput =
  | PreToolUseHookSpecificOutput
  | UserPromptSubmitHookSpecificOutput
  | SessionStartHookSpecificOutput
  | SetupHookSpecificOutput
  | SubagentStartHookSpecificOutput
  | PostToolUseHookSpecificOutput
  | PostToolUseFailureHookSpecificOutput
  | PermissionDeniedHookSpecificOutput
  | NotificationHookSpecificOutput
  | PermissionRequestHookSpecificOutput
  | ElicitationHookSpecificOutput
  | ElicitationResultHookSpecificOutput
  | CwdChangedHookSpecificOutput
  | FileChangedHookSpecificOutput
  | WorktreeCreateHookSpecificOutput

export interface PreToolUseHookSpecificOutput {
  hookEventName: 'PreToolUse'
  permissionDecision?: PermissionBehavior
  permissionDecisionReason?: string
  updatedInput?: Record<string, unknown>
  additionalContext?: string
}

export interface UserPromptSubmitHookSpecificOutput {
  hookEventName: 'UserPromptSubmit'
  additionalContext?: string
}

export interface SessionStartHookSpecificOutput {
  hookEventName: 'SessionStart'
  additionalContext?: string
  initialUserMessage?: string
  watchPaths?: string[]
}

export interface SetupHookSpecificOutput {
  hookEventName: 'Setup'
  additionalContext?: string
}

export interface SubagentStartHookSpecificOutput {
  hookEventName: 'SubagentStart'
  additionalContext?: string
}

export interface PostToolUseHookSpecificOutput {
  hookEventName: 'PostToolUse'
  additionalContext?: string
  updatedMCPToolOutput?: unknown
}

export interface PostToolUseFailureHookSpecificOutput {
  hookEventName: 'PostToolUseFailure'
  additionalContext?: string
}

export interface PermissionDeniedHookSpecificOutput {
  hookEventName: 'PermissionDenied'
  retry?: boolean
}

export interface NotificationHookSpecificOutput {
  hookEventName: 'Notification'
  additionalContext?: string
}

export interface PermissionRequestHookSpecificOutput {
  hookEventName: 'PermissionRequest'
  decision:
    | { behavior: 'allow'; updatedInput?: Record<string, unknown>; updatedPermissions?: PermissionUpdate[] }
    | { behavior: 'deny'; message?: string; interrupt?: boolean }
}

export interface ElicitationHookSpecificOutput {
  hookEventName: 'Elicitation'
  action?: 'accept' | 'decline' | 'cancel'
  content?: Record<string, unknown>
}

export interface ElicitationResultHookSpecificOutput {
  hookEventName: 'ElicitationResult'
  action?: 'accept' | 'decline' | 'cancel'
  content?: Record<string, unknown>
}

export interface CwdChangedHookSpecificOutput {
  hookEventName: 'CwdChanged'
  watchPaths?: string[]
}

export interface FileChangedHookSpecificOutput {
  hookEventName: 'FileChanged'
  watchPaths?: string[]
}

export interface WorktreeCreateHookSpecificOutput {
  hookEventName: 'WorktreeCreate'
  worktreePath: string
}

export type HookJSONOutput = AsyncHookJSONOutput | SyncHookJSONOutput

// ============================================================================
// Prompt Request/Response Types
// ============================================================================

export interface PromptRequestOption {
  key: string
  label: string
  description?: string
}

export interface PromptRequest {
  prompt: string
  message: string
  options: PromptRequestOption[]
}

export interface PromptResponse {
  prompt_response: string
  selected: string
}

// ============================================================================
// Skill/Command Types
// ============================================================================

export interface SlashCommand {
  name: string
  description: string
  argumentHint: string
}

export interface AgentInfo {
  name: string
  description: string
  model?: string
}

export interface ModelInfo {
  value: string
  displayName: string
  description: string
  supportsEffort?: boolean
  supportedEffortLevels?: Array<'low' | 'medium' | 'high' | 'max'>
  supportsAdaptiveThinking?: boolean
  supportsFastMode?: boolean
  supportsAutoMode?: boolean
}

export interface AccountInfo {
  email?: string
  organization?: string
  subscriptionType?: string
  tokenSource?: string
  apiKeySource?: string
  apiProvider?: 'firstParty' | 'bedrock' | 'vertex' | 'foundry'
}

export type ApiKeySource = 'oauth' | 'api_key' | 'api_key_env' | 'api_key_settings'

// ============================================================================
// Agent Definition Types
// ============================================================================

export type AgentMcpServerSpec = string | Record<string, McpServerConfigForProcessTransport>

export interface AgentDefinition {
  description: string
  tools?: string[]
  disallowedTools?: string[]
  prompt: string
  model?: string
  mcpServers?: AgentMcpServerSpec[]
  criticalSystemReminder_EXPERIMENTAL?: string
  skills?: string[]
  initialPrompt?: string
  maxTurns?: number
  background?: boolean
  memory?: 'user' | 'project' | 'local'
  effort?: 'low' | 'medium' | 'high' | 'max' | number
  permissionMode?: PermissionMode
}

// ============================================================================
// Settings Types
// ============================================================================

export type SettingSource = 'user' | 'project' | 'local'

export interface SdkPluginConfig {
  type: 'local'
  path: string
}

// ============================================================================
// Rewind Types
// ============================================================================

export interface RewindFilesResult {
  canRewind: boolean
  error?: string
  filesChanged?: string[]
  insertions?: number
  deletions?: number
}

// ============================================================================
// SDK Message Types
// ============================================================================

export type SDKAssistantMessageError =
  | 'authentication_failed'
  | 'billing_error'
  | 'rate_limit'
  | 'invalid_request'
  | 'server_error'
  | 'unknown'
  | 'max_output_tokens'

export type SDKStatus = 'compacting' | null

export interface SDKUserMessage {
  type: 'user'
  message: MessageParam
  parent_tool_use_id: string | null
  isSynthetic?: boolean
  tool_use_result?: unknown
  priority?: 'now' | 'next' | 'later'
  timestamp?: string
  uuid?: string
  session_id?: string
}

export interface SDKUserMessageReplay extends SDKUserMessage {
  uuid: string
  session_id: string
  isReplay: true
}

export interface SDKRateLimitInfo {
  status: 'allowed' | 'allowed_warning' | 'rejected'
  resetsAt?: number
  rateLimitType?: 'five_hour' | 'seven_day' | 'seven_day_opus' | 'seven_day_sonnet' | 'overage'
  utilization?: number
  overageStatus?: 'allowed' | 'allowed_warning' | 'rejected'
  overageResetsAt?: number
  overageDisabledReason?: string
  isUsingOverage?: boolean
  surpassedThreshold?: number
}

export interface SDKAssistantMessage {
  type: 'assistant'
  message: AnthropicMessage
  parent_tool_use_id: string | null
  error?: SDKAssistantMessageError
  uuid: string
  session_id: string
}

export interface SDKRateLimitEvent {
  type: 'rate_limit_event'
  rate_limit_info: SDKRateLimitInfo
  uuid: string
  session_id: string
}

export interface SDKStreamlinedTextMessage {
  type: 'streamlined_text'
  text: string
  session_id: string
  uuid: string
}

export interface SDKStreamlinedToolUseSummaryMessage {
  type: 'streamlined_tool_use_summary'
  tool_summary: string
  session_id: string
  uuid: string
}

export interface SDKPermissionDenial {
  tool_name: string
  tool_use_id: string
  tool_input: Record<string, unknown>
}

export interface SDKResultSuccess {
  type: 'result'
  subtype: 'success'
  duration_ms: number
  duration_api_ms: number
  is_error: boolean
  num_turns: number
  result: string
  stop_reason: string | null
  total_cost_usd: number
  usage: NonNullableUsage
  modelUsage: Record<string, ModelUsage>
  permission_denials: SDKPermissionDenial[]
  structured_output?: unknown
  fast_mode_state?: FastModeState
  uuid: string
  session_id: string
}

export interface SDKResultError {
  type: 'result'
  subtype: 'error_during_execution' | 'error_max_turns' | 'error_max_budget_usd' | 'error_max_structured_output_retries'
  duration_ms: number
  duration_api_ms: number
  is_error: boolean
  num_turns: number
  stop_reason: string | null
  total_cost_usd: number
  usage: NonNullableUsage
  modelUsage: Record<string, ModelUsage>
  permission_denials: SDKPermissionDenial[]
  errors: string[]
  fast_mode_state?: FastModeState
  uuid: string
  session_id: string
}

export type SDKResultMessage = SDKResultSuccess | SDKResultError

export interface SDKSystemMessage {
  type: 'system'
  subtype: 'init'
  agents?: string[]
  apiKeySource: ApiKeySource
  betas?: string[]
  claude_code_version: string
  cwd: string
  tools: string[]
  mcp_servers: Array<{ name: string; status: string }>
  model: string
  permissionMode: PermissionMode
  slash_commands: string[]
  output_style: string
  skills: string[]
  plugins: Array<{ name: string; path: string; source?: string }>
  fast_mode_state?: FastModeState
  uuid: string
  session_id: string
}

export interface SDKPartialAssistantMessage {
  type: 'stream_event'
  event: unknown // RawMessageStreamEvent from @anthropic-ai/sdk
  parent_tool_use_id: string | null
  uuid: string
  session_id: string
}

export interface SDKCompactBoundaryMessage {
  type: 'system'
  subtype: 'compact_boundary'
  compact_metadata: {
    trigger: 'manual' | 'auto'
    pre_tokens: number
    preserved_segment?: {
      head_uuid: string
      anchor_uuid: string
      tail_uuid: string
    }
  }
  uuid: string
  session_id: string
}

export interface SDKStatusMessage {
  type: 'system'
  subtype: 'status'
  status: SDKStatus
  permissionMode?: PermissionMode
  uuid: string
  session_id: string
}

export interface SDKPostTurnSummaryMessage {
  type: 'system'
  subtype: 'post_turn_summary'
  summarizes_uuid: string
  status_category: 'blocked' | 'waiting' | 'completed' | 'review_ready' | 'failed'
  status_detail: string
  is_noteworthy: boolean
  title: string
  description: string
  recent_action: string
  needs_action: string
  artifact_urls: string[]
  uuid: string
  session_id: string
}

export interface SDKAPIRetryMessage {
  type: 'system'
  subtype: 'api_retry'
  attempt: number
  max_retries: number
  retry_delay_ms: number
  error_status: number | null
  error: SDKAssistantMessageError
  uuid: string
  session_id: string
}

export interface SDKLocalCommandOutputMessage {
  type: 'system'
  subtype: 'local_command_output'
  content: string
  uuid: string
  session_id: string
}

export interface SDKHookStartedMessage {
  type: 'system'
  subtype: 'hook_started'
  hook_id: string
  hook_name: string
  hook_event: string
  uuid: string
  session_id: string
}

export interface SDKHookProgressMessage {
  type: 'system'
  subtype: 'hook_progress'
  hook_id: string
  hook_name: string
  hook_event: string
  stdout: string
  stderr: string
  output: string
  uuid: string
  session_id: string
}

export interface SDKHookResponseMessage {
  type: 'system'
  subtype: 'hook_response'
  hook_id: string
  hook_name: string
  hook_event: string
  output: string
  stdout: string
  stderr: string
  exit_code?: number
  outcome: 'success' | 'error' | 'cancelled'
  uuid: string
  session_id: string
}

export interface SDKToolProgressMessage {
  type: 'tool_progress'
  tool_use_id: string
  tool_name: string
  parent_tool_use_id: string | null
  elapsed_time_seconds: number
  task_id?: string
  uuid: string
  session_id: string
}

export interface SDKAuthStatusMessage {
  type: 'auth_status'
  isAuthenticating: boolean
  output: string[]
  error?: string
  uuid: string
  session_id: string
}

export interface SDKFilesPersistedEvent {
  type: 'system'
  subtype: 'files_persisted'
  files: Array<{ filename: string; file_id: string }>
  failed: Array<{ filename: string; error: string }>
  processed_at: string
  uuid: string
  session_id: string
}

export interface SDKTaskNotificationMessage {
  type: 'system'
  subtype: 'task_notification'
  task_id: string
  tool_use_id?: string
  status: 'completed' | 'failed' | 'stopped'
  output_file: string
  summary: string
  usage?: { total_tokens: number; tool_uses: number; duration_ms: number }
  uuid: string
  session_id: string
}

export interface SDKTaskStartedMessage {
  type: 'system'
  subtype: 'task_started'
  task_id: string
  tool_use_id?: string
  description: string
  task_type?: string
  workflow_name?: string
  prompt?: string
  uuid: string
  session_id: string
}

export interface SDKTaskProgressMessage {
  type: 'system'
  subtype: 'task_progress'
  task_id: string
  tool_use_id?: string
  description: string
  usage: { total_tokens: number; tool_uses: number; duration_ms: number }
  last_tool_name?: string
  summary?: string
  uuid: string
  session_id: string
}

export interface SDKSessionStateChangedMessage {
  type: 'system'
  subtype: 'session_state_changed'
  state: 'idle' | 'running' | 'requires_action'
  uuid: string
  session_id: string
}

export interface SDKToolUseSummaryMessage {
  type: 'tool_use_summary'
  summary: string
  preceding_tool_use_ids: string[]
  uuid: string
  session_id: string
}

export interface SDKElicitationCompleteMessage {
  type: 'system'
  subtype: 'elicitation_complete'
  mcp_server_name: string
  elicitation_id: string
  uuid: string
  session_id: string
}

export interface SDKPromptSuggestionMessage {
  type: 'prompt_suggestion'
  suggestion: string
  uuid: string
  session_id: string
}

// ============================================================================
// SDK Message Union
// ============================================================================

export type SDKMessage =
  | SDKAssistantMessage
  | SDKUserMessage
  | SDKUserMessageReplay
  | SDKResultMessage
  | SDKSystemMessage
  | SDKPartialAssistantMessage
  | SDKCompactBoundaryMessage
  | SDKStatusMessage
  | SDKAPIRetryMessage
  | SDKLocalCommandOutputMessage
  | SDKHookStartedMessage
  | SDKHookProgressMessage
  | SDKHookResponseMessage
  | SDKToolProgressMessage
  | SDKAuthStatusMessage
  | SDKTaskNotificationMessage
  | SDKTaskStartedMessage
  | SDKTaskProgressMessage
  | SDKSessionStateChangedMessage
  | SDKFilesPersistedEvent
  | SDKToolUseSummaryMessage
  | SDKRateLimitEvent
  | SDKElicitationCompleteMessage
  | SDKPromptSuggestionMessage

// ============================================================================
// Session Types
// ============================================================================

export interface SDKSessionInfo {
  sessionId: string
  summary: string
  lastModified: number
  fileSize?: number
  customTitle?: string
  firstPrompt?: string
  gitBranch?: string
  cwd?: string
  tag?: string
  createdAt?: number
}

// ============================================================================
// Fast Mode
// ============================================================================

export type FastModeState = 'off' | 'cooldown' | 'on'

// ============================================================================
// Config Change
// ============================================================================

export type ConfigChangeSource = 'user' | 'project' | 'local' | 'flag' | 'policy' | 'mdm' | 'remote'
