import { renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { useShowsColorScale } from '../useShowsColorScale'

describe('useShowsColorScale', () => {
  test('maps a country with zero shows to the empty color', () => {
    const byCountry = [
      { country: 'Nigeria', count: 10 },
      { country: 'Ghana', count: 2 },
    ]
    const { result } = renderHook(() => useShowsColorScale(byCountry))

    expect(result.current.getColor('Kenya')).toBe('var(--color-hairline)')
    expect(result.current.countMap.Kenya).toBeUndefined()
  })

  test('maps the highest-count country to the top of the color scale', () => {
    const byCountry = [
      { country: 'Nigeria', count: 10 },
      { country: 'Ghana', count: 2 },
    ]
    const { result } = renderHook(() => useShowsColorScale(byCountry))

    // d3-scale's color interpolation returns an rgb() string, not the original hex literal —
    // rgb(29, 53, 87) is #1d3557 (--color-ink).
    expect(result.current.getColor('Nigeria')).toBe('rgb(29, 53, 87)')
    expect(result.current.countMap.Nigeria).toBe(10)
  })

  test('handles an empty byCountry list without dividing by zero', () => {
    const { result } = renderHook(() => useShowsColorScale([]))

    expect(result.current.getColor('Nigeria')).toBe('var(--color-hairline)')
    expect(result.current.countMap).toEqual({})
  })

  test('interpolates a mid-range count between the scale endpoints', () => {
    const byCountry = [
      { country: 'Nigeria', count: 10 },
      { country: 'Ghana', count: 5 },
    ]
    const { result } = renderHook(() => useShowsColorScale(byCountry))

    const color = result.current.getColor('Ghana')
    expect(color).not.toBe('var(--color-hairline)')
    expect(color).not.toBe('rgb(29, 53, 87)')
  })
})
