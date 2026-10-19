import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  configureMiniMaxRequest,
  getMiniMaxModel,
  getMiniMaxPricing,
  MINIMAX_MODELS,
} from '../model/providers.js'
import { ALL_MODEL_CONFIGS } from '../model/configs.js'

const flash = 'MiniMax-M3.1-Flash'

test('MiniMax catalog and defaults contain only the current models', () => {
  assert.deepEqual(MINIMAX_MODELS.map(model => model.modelId), [flash, 'MiniMax-M3'])
  assert.equal(getMiniMaxModel(flash.toLowerCase())?.modelId, flash)
  assert.equal(getMiniMaxModel('MiniMax-M2.7'), undefined)
  for (const model of MINIMAX_MODELS) {
    assert.equal(model.contextWindow, 1_000_000)
    assert.deepEqual(model.inputModalities, ['text', 'image', 'video'])
    assert.equal(model.pricingUsdPerMillionTokens.cacheWrite, null)
  }
  for (const config of Object.values(ALL_MODEL_CONFIGS)) {
    assert.equal(config.minimax, flash)
  }
})

test('MiniMax-M3 pricing selects context and service tiers at the boundary', () => {
  for (const tokens of [0, 511_999, 512_000, 512_001, 1_000_000]) {
    const longContext = tokens > 512_000
    for (const tier of ['standard', 'priority', undefined]) {
      const expected = tier === 'priority'
        ? (longContext ? [0.9, 3.6, 0.18] : [0.45, 1.8, 0.09])
        : (longContext ? [0.6, 2.4, 0.12] : [0.3, 1.2, 0.06])
      const pricing = getMiniMaxPricing('MiniMax-M3', tokens, tier)!
      assert.deepEqual([pricing.input, pricing.output, pricing.cacheRead], expected)
      assert.equal(pricing.cacheWrite, null)
    }
  }
})

test('Flash pricing stays flat and unknown models retain generic pricing fallback', () => {
  for (const tokens of [0, 512_000, 512_001, 1_000_000]) {
    assert.deepEqual(getMiniMaxPricing(flash, tokens), {
      input: 0.15, output: 0.6, cacheRead: 0.015, cacheWrite: null,
    })
  }
  assert.equal(getMiniMaxPricing('custom-model'), undefined)
})

test('Flash enforces adaptive thinking and omits unsupported service tier', () => {
  for (const thinking of [undefined, { type: 'disabled' }, { type: 'enabled', budget_tokens: 1000 }]) {
    const params: Record<string, unknown> = { thinking, service_tier: 'priority', max_tokens: 1234 }
    configureMiniMaxRequest(flash, params, undefined)
    assert.deepEqual(params.thinking, { type: 'adaptive' })
    assert.deepEqual(params.output_config, { effort: 'max' })
    assert.equal('service_tier' in params, false)
    assert.equal(params.max_tokens, 1234)
  }
})

test('Flash supports every published effort and preserves output format', () => {
  for (const effort of ['low', 'medium', 'high', 'xhigh', 'max']) {
    const format = { type: 'json_schema' }
    const params: Record<string, unknown> = { output_config: { effort, format } }
    configureMiniMaxRequest(flash, params, 'low')
    assert.deepEqual(params.output_config, { effort, format })
    const fromSetting: Record<string, unknown> = {}
    configureMiniMaxRequest(flash, fromSetting, effort)
    assert.deepEqual(fromSetting.output_config, { effort })
  }
  for (const effort of ['none', 'invalid', 42]) {
    assert.throws(() => configureMiniMaxRequest(flash, { output_config: { effort } }, undefined), /Unsupported effort/)
  }
})

test('MiniMax-M3 defaults thinking off, supports adaptive, and ignores effort', () => {
  for (const thinking of [undefined, { type: 'disabled' }, { type: 'enabled', budget_tokens: 1000 }, { type: 'adaptive' }]) {
    const params: Record<string, unknown> = { thinking, output_config: { effort: 'max' }, service_tier: 'priority' }
    configureMiniMaxRequest('MiniMax-M3', params, 'low')
    assert.deepEqual(params.thinking, { type: thinking && thinking.type !== 'disabled' ? 'adaptive' : 'disabled' })
    assert.equal('output_config' in params, false)
    assert.equal(params.service_tier, 'priority')
  }
})

test('Custom model request parameters pass through unchanged', () => {
  const params = { thinking: { type: 'enabled' }, output_config: { effort: 'custom' }, service_tier: 'priority' }
  const original = structuredClone(params)
  configureMiniMaxRequest('custom-model', params, undefined)
  assert.deepEqual(params, original)
})
