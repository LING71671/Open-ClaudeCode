import type { AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from '../../services/analytics/index.js'
import { isEnvTruthy } from '../envUtils.js'

export type MiniMaxPricing = {
  input: number
  output: number
  cacheRead: number
  cacheWrite: number | null
}

type MiniMaxPricingTier = {
  serviceTier: 'standard' | 'priority'
  maxInputTokens: number | null
  pricing: MiniMaxPricing
}

export const MINIMAX_MODELS = [
  {
    modelId: 'MiniMax-M3',
    contextWindow: 1_000_000,
    pricingUsdPerMillionTokens: {
      input: 0.6,
      output: 2.4,
      cacheRead: 0.12,
      cacheWrite: null,
    },
    pricingTiersUsdPerMillionTokens: [],
    inputModalities: ['text', 'image', 'video'],
    thinking: ['adaptive', 'disabled'],
    defaultThinking: 'disabled',
  },
  {
    modelId: 'MiniMax-M2.7',
    contextWindow: 204_800,
    pricingUsdPerMillionTokens: {
      input: 0.3,
      output: 1.2,
      cacheRead: 0.06,
      cacheWrite: 0.375,
    },
    pricingTiersUsdPerMillionTokens: [],
    inputModalities: ['text'],
    thinking: ['always_on'],
    defaultThinking: 'always_on',
  },
] as const

export const MINIMAX_ENDPOINTS = [
  {
    region: 'global_en',
    openAIBaseUrl: 'https://api.minimax.io/v1',
    anthropicBaseUrl: 'https://api.minimax.io/anthropic',
    docsRoot: 'https://platform.minimax.io/docs',
  },
  {
    region: 'cn_zh',
    openAIBaseUrl: 'https://api.minimaxi.com/v1',
    anthropicBaseUrl: 'https://api.minimaxi.com/anthropic',
    docsRoot: 'https://platform.minimaxi.com/docs',
  },
] as const

export type MiniMaxRegion = (typeof MINIMAX_ENDPOINTS)[number]['region']

export function getMiniMaxEndpoint(
  region = process.env.MINIMAX_API_REGION,
): (typeof MINIMAX_ENDPOINTS)[number] {
  return (
    MINIMAX_ENDPOINTS.find(endpoint => endpoint.region === region) ??
    MINIMAX_ENDPOINTS[0]
  )
}

export function getMiniMaxModel(modelId: string) {
  const normalizedModelId = modelId.toLowerCase()
  return MINIMAX_MODELS.find(
    model => model.modelId.toLowerCase() === normalizedModelId,
  )
}

export function getMiniMaxPricing(
  modelId: string,
  totalInputTokens = 0,
  serviceTier: string | null | undefined = 'standard',
): MiniMaxPricing | undefined {
  const model = getMiniMaxModel(modelId)
  if (!model) {
    return undefined
  }

  const normalizedServiceTier =
    serviceTier === 'priority' ? 'priority' : 'standard'
  const pricingTiers: readonly MiniMaxPricingTier[] =
    model.pricingTiersUsdPerMillionTokens
  const pricingTier = pricingTiers.find(
    tier =>
      tier.serviceTier === normalizedServiceTier &&
      (tier.maxInputTokens === null || totalInputTokens <= tier.maxInputTokens),
  )

  return pricingTier?.pricing ?? model.pricingUsdPerMillionTokens
}

export type APIProvider =
  | 'firstParty'
  | 'bedrock'
  | 'vertex'
  | 'foundry'
  | 'minimax'

export function getAPIProvider(): APIProvider {
  return isEnvTruthy(process.env.CLAUDE_CODE_USE_BEDROCK)
    ? 'bedrock'
    : isEnvTruthy(process.env.CLAUDE_CODE_USE_VERTEX)
      ? 'vertex'
      : isEnvTruthy(process.env.CLAUDE_CODE_USE_FOUNDRY)
        ? 'foundry'
        : isEnvTruthy(process.env.CLAUDE_CODE_USE_MINIMAX)
          ? 'minimax'
          : 'firstParty'
}

export function getAPIProviderForStatsig(): AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS {
  return getAPIProvider() as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS
}

/**
 * Check if ANTHROPIC_BASE_URL is a first-party Anthropic API URL.
 * Returns true if not set (default API) or points to api.anthropic.com
 * (or api-staging.anthropic.com for ant users).
 */
export function isFirstPartyAnthropicBaseUrl(): boolean {
  const baseUrl = process.env.ANTHROPIC_BASE_URL
  if (!baseUrl) {
    return true
  }
  try {
    const host = new URL(baseUrl).host
    const allowedHosts = ['api.anthropic.com']
    if (process.env.USER_TYPE === 'ant') {
      allowedHosts.push('api-staging.anthropic.com')
    }
    return allowedHosts.includes(host)
  } catch {
    return false
  }
}
