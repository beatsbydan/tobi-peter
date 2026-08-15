import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as siteContentApi from '../api/siteContent'

// Singleton: only one row ever exists, so `all` doubles as the one cache entry's key — no
// .list()/.detail(id) needed.
export const siteContentKeys = {
  all: ['siteContent'],
}

export function useSiteContentQuery() {
  return useQuery({ queryKey: siteContentKeys.all, queryFn: siteContentApi.getSiteContent })
}

export function useUpdateSiteContentMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: siteContentApi.updateSiteContent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: siteContentKeys.all }),
  })
}
