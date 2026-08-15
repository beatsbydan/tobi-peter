import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { createQueryWrapper } from '../../test-utils/queryWrapper'
import { useBlogsQuery, useCreateBlogMutation, blogsKeys } from '../useBlogs'
import * as blogsApi from '../../api/blogs'

vi.mock('../../api/blogs')

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useBlogsQuery', () => {
  test('returns blogs on success', async () => {
    blogsApi.getBlogs.mockResolvedValue([{ _id: '1', title: 'A post' }])
    const { wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useBlogsQuery(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toHaveLength(1)
  })

  test('surfaces an error when the request fails', async () => {
    blogsApi.getBlogs.mockRejectedValue(new Error('server error'))
    const { wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useBlogsQuery(), { wrapper })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})

describe('useCreateBlogMutation', () => {
  test('invalidates the blogs cache on success', async () => {
    blogsApi.createBlog.mockResolvedValue({ status: 'success' })
    const { wrapper, queryClient } = createQueryWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useCreateBlogMutation(), { wrapper })
    result.current.mutate({ title: 'A post' })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: blogsKeys.all })
  })
})
