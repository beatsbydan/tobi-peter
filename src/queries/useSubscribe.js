import { useMutation } from '@tanstack/react-query'
import { sendSubscription } from '../api/subscribe'

export function useSendSubscriptionMutation() {
  return useMutation({ mutationFn: sendSubscription })
}
