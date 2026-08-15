import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { createQueryWrapper } from '../../test-utils/queryWrapper'
import { useImagesQuery, useDeleteImageMutation, imagesKeys } from '../useImages'
import * as imagesApi from '../../api/images'

vi.mock('../../api/images')

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useImagesQuery', () => {
  test('returns images on success', async () => {
    imagesApi.getImages.mockResolvedValue([{ url: 'https://example.com/a.png' }])
    const { wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useImagesQuery(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toHaveLength(1)
  })

  test('surfaces an error when the request fails', async () => {
    imagesApi.getImages.mockRejectedValue(new Error('server error'))
    const { wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useImagesQuery(), { wrapper })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})

describe('useDeleteImageMutation', () => {
  test('invalidates the images cache on success', async () => {
    imagesApi.deleteImage.mockResolvedValue({ status: 'success' })
    const { wrapper, queryClient } = createQueryWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useDeleteImageMutation(), { wrapper })
    result.current.mutate('https://example.com/a.png')

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: imagesKeys.all })
  })
})
