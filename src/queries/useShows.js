import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as showsApi from '../api/shows'

export const showsKeys = {
  all: ['shows'],
  list: () => [...showsKeys.all, 'list'],
  detail: (id) => [...showsKeys.all, 'detail', id],
  stats: () => [...showsKeys.all, 'stats'],
}

export function useShowsQuery() {
  return useQuery({ queryKey: showsKeys.list(), queryFn: showsApi.getShows })
}

export function useShowQuery(id) {
  return useQuery({
    queryKey: showsKeys.detail(id),
    queryFn: () => showsApi.getShow(id),
    enabled: Boolean(id),
  })
}

export function useShowStatsQuery() {
  return useQuery({ queryKey: showsKeys.stats(), queryFn: showsApi.getShowStats })
}

function useInvalidateShows() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: showsKeys.all })
}

export function useCreateShowMutation() {
  const invalidateShows = useInvalidateShows()
  return useMutation({
    mutationFn: showsApi.createShow,
    onSuccess: invalidateShows,
  })
}

export function useUpdateShowMutation() {
  const invalidateShows = useInvalidateShows()
  return useMutation({
    mutationFn: ({ id, show }) => showsApi.updateShow(id, show),
    onSuccess: invalidateShows,
  })
}

export function useDeleteShowMutation() {
  const invalidateShows = useInvalidateShows()
  return useMutation({
    mutationFn: showsApi.deleteShow,
    onSuccess: invalidateShows,
  })
}

export function useCompleteShowMutation() {
  const invalidateShows = useInvalidateShows()
  return useMutation({
    mutationFn: showsApi.completeShow,
    onSuccess: invalidateShows,
  })
}
