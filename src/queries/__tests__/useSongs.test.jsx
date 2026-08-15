import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { createQueryWrapper } from '../../test-utils/queryWrapper'
import { useSongsQuery, useDeleteSongMutation, songsKeys } from '../useSongs'
import * as songsApi from '../../api/songs'

vi.mock('../../api/songs')

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useSongsQuery', () => {
  test('returns songs on success', async () => {
    songsApi.getSongs.mockResolvedValue([{ _id: '1', title: 'Track One' }])
    const { wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useSongsQuery(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toHaveLength(1)
  })

  test('surfaces an error when the request fails', async () => {
    songsApi.getSongs.mockRejectedValue(new Error('server error'))
    const { wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useSongsQuery(), { wrapper })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})

describe('useDeleteSongMutation', () => {
  test('invalidates the songs cache on success', async () => {
    songsApi.deleteSong.mockResolvedValue({ status: 'success' })
    const { wrapper, queryClient } = createQueryWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useDeleteSongMutation(), { wrapper })
    result.current.mutate('song-id')

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(songsApi.deleteSong.mock.calls[0][0]).toBe('song-id')
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: songsKeys.all })
  })
})
