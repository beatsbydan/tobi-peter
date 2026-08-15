import { useMutation, useQuery } from '@tanstack/react-query'
import * as authApi from '../api/auth'

export function useRegisterMutation() {
  return useMutation({ mutationFn: authApi.register })
}

export function useLoginMutation() {
  return useMutation({ mutationFn: authApi.login })
}

export function useForgotPasswordMutation() {
  return useMutation({ mutationFn: authApi.forgotPassword })
}

export function useChangePasswordMutation() {
  return useMutation({ mutationFn: authApi.changePassword })
}

export function useLogoutMutation() {
  return useMutation({ mutationFn: authApi.logout })
}

export function useSubscribersQuery() {
  return useQuery({ queryKey: ['subscribers'], queryFn: authApi.getSubscribers })
}
