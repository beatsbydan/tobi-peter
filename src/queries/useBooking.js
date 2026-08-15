import { useMutation } from '@tanstack/react-query'
import { sendBookingRequest } from '../api/booking'

export function useSendBookingMutation() {
  return useMutation({ mutationFn: sendBookingRequest })
}
