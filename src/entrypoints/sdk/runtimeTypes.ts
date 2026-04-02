/**
 * SDK Runtime Types - Non-serializable types (callbacks, interfaces with methods).
 *
 * These types define the runtime API for SDK consumers including session management,
 * query interfaces, and callback types.
 */

import type { z } from 'zod/v4'
import type {
  AgentDefinition,
  HookEvent,
  HookInput,
  HookJSONOutput,
  McpServerConfigForProcessTransport,
  McpSdkServerConfig,
  PermissionMode,
  SDKMessage,
  SDKResultMessage,
  SDKSessionInfo,
  SDKUserMessage,
  SlashCommand,
} from './coreTypes.generated.js'

// ============================================================================
// Zod Utility Types
// ============================================================================

export type AnyZodRawShape = z.ZodRawShape

export type InferShape<S extends AnyZodRawShape> = z.infer<z.ZodObject<S>>

// ============================================================================
// Effort Level
// ============================================================================

export type EffortLevel = 'low' | 'medium' | 'high' | 'max' | null

// ============================================================================
// Session Types
// ============================================================================

export interface SDKSessionOptions {
  workingDirectory?: string
  permissionMode?: PermissionMode
  model?: string
  maxTurns?: number
  maxBudgetUsd?: number
  maxTimeMs?: number
  outputFormat?: { type: string } & Record<string, unknown>
  continue?: boolean
  resumeSessionId?: string
  agents?: Record<string, AgentDefinition>
  sdkMcpServers?: Record<string, McpServerConfigForProcessTransport>
  hooks?: Record<HookEvent, Array<{
    matcher?: string
    callback: (input: HookInput) => Promise<HookJSONOutput>
    timeout?: number
  }>>
  stdout?: NodeJS.WriteStream | null
  stderr?: NodeJS.WriteStream | null
  stdin?: NodeJS.ReadStream | null
  signal?: AbortSignal
  loadSettingsFromDisk?: boolean
  plugins?: Array<{ type: 'local'; path: string }>
  settings?: Record<string, unknown>
  effort?: EffortLevel
}

export interface SDKSession {
  query: Query
  exec: (message: string | SDKUserMessage) => AsyncGenerator<SDKMessage, SDKResultMessage>
  stop: () => Promise<void>
  setPermissionMode: (mode: PermissionMode) => Promise<void>
  setModel: (model: string) => Promise<void>
  getMcpStatus: () => Promise<unknown>
  getContextUsage: () => Promise<unknown>
  disconnect: () => Promise<void>
}

export interface Options {
  apiKey?: string
  apiKeySource?: string
  baseUrl?: string
  signal?: AbortSignal
}

// ============================================================================
// Query Types
// ============================================================================

export interface InternalQuery {
  command: string
  args?: string[]
  signal?: AbortSignal
}

export interface Query {
  mcp: {
    status: () => Promise<unknown>
    reconnect: (serverName: string) => Promise<void>
    setServers: (servers: Record<string, McpServerConfigForProcessTransport>) => Promise<unknown>
  }
  permissions: {
    setMode: (mode: PermissionMode) => Promise<void>
  }
  session: {
    interrupt: () => Promise<void>
    getContextUsage: () => Promise<unknown>
    rewindFiles: (userMessageId: string, dryRun?: boolean) => Promise<unknown>
  }
  settings: {
    get: () => Promise<unknown>
    apply: (settings: Record<string, unknown>) => Promise<void>
  }
}

export interface InternalOptions extends Options {
  // Internal-only options
}

// ============================================================================
// Session Listing
// ============================================================================

export interface ListSessionsOptions {
  limit?: number
  offset?: number
  cwd?: string
  tag?: string
  gitBranch?: string
  sortBy?: 'lastModified' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface GetSessionInfoOptions {
  sessionId: string
}

export interface GetSessionMessagesOptions {
  sessionId: string
  limit?: number
  offset?: number
}

export interface SessionMutationOptions {
  sessionId: string
}

export interface ForkSessionOptions {
  sessionId: string
  fromMessageId?: string
  workingDirectory?: string
}

export interface ForkSessionResult {
  sessionId: string
}

export type SessionMessage = SDKMessage

// ============================================================================
// MCP Types
// ============================================================================

export interface McpSdkServerConfigWithInstance extends McpSdkServerConfig {
  instance?: unknown
}

export interface SdkMcpToolDefinition {
  name: string
  description: string
  inputSchema: z.ZodType
  handler: (args: unknown, extra: unknown) => Promise<unknown>
}
