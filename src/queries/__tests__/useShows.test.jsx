import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { createQueryWrapper } from '../../test-utils/queryWrapper'
import { useShowsQuery, useCreateShowMutation, showsKeys } from '../useShows'
import * as showsApi from '../../api/shows'

vi.mock('../../api/shows')

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useShowsQuery', () => {
  test('returns show lists on success', async () => {
    showsApi.getShows.mockResolvedValue({
      upcomingShows: [{ _id: '1', title: 'Show One' }],
      pastShows: [],
    })
    const { wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useShowsQuery(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data.upcomingShows).toHaveLength(1)
    expect(result.current.data.upcomingShows[0].title).toBe('Show One')
  })

  test('surfaces an error when the request fails', async () => {
    showsApi.getShows.mockRejectedValue(new Error('network down'))
    const { wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useShowsQuery(), { wrapper })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error.message).toBe('network down')
  })
})

describe('useCreateShowMutation', () => {
  test('invalidates the shows cache on success', async () => {
    showsApi.createShow.mockResolvedValue({ status: 'success' })
    const { wrapper, queryClient } = createQueryWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useCreateShowMutation(), { wrapper })

    result.current.mutate({ title: 'New Show' })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(showsApi.createShow.mock.calls[0][0]).toEqual({ title: 'New Show' })
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: showsKeys.all })
  })
})
