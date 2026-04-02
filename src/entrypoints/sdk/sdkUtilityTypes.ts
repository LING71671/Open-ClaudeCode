/**
 * SDK Utility Types - Utility types that can't be expressed as Zod schemas.
 *
 * These include mapped types, conditional types, and other TypeScript-specific constructs.
 */

import type { Usage } from '@anthropic-ai/sdk'

/** Mapped type that makes all properties of Usage non-nullable */
export type NonNullableUsage = {
  [K in keyof Usage]: NonNullable<Usage[K]>
}
