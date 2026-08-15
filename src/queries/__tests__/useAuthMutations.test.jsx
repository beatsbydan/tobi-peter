import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { createQueryWrapper } from '../../test-utils/queryWrapper'
import { useLoginMutation, useSubscribersQuery } from '../useAuthMutations'
import * as authApi from '../../api/auth'

vi.mock('../../api/auth')

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useLoginMutation', () => {
  test('resolves with the token on success', async () => {
    authApi.login.mockResolvedValue({ status: 'success', token: 'abc123' })
    const { wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useLoginMutation(), { wrapper })
    result.current.mutate({ email: 'tobi@example.com', password: 'password123' })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data.token).toBe('abc123')
  })

  test('surfaces a 401 error on bad credentials', async () => {
    const error = new Error('Unauthorized')
    error.response = { status: 401 }
    authApi.login.mockRejectedValue(error)
    const { wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useLoginMutation(), { wrapper })
    result.current.mutate({ email: 'tobi@example.com', password: 'wrongpassword' })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error.response.status).toBe(401)
  })
})

describe('useSubscribersQuery', () => {
  test('returns the subscriber list on success', async () => {
    authApi.getSubscribers.mockResolvedValue([{ email: 'fan@example.com' }])
    const { wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useSubscribersQuery(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toHaveLength(1)
  })
})
