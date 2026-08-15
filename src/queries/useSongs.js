import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as songsApi from '../api/songs'

export const songsKeys = {
  all: ['songs'],
  list: () => [...songsKeys.all, 'list'],
  detail: (id) => [...songsKeys.all, 'detail', id],
  recent: () => [...songsKeys.all, 'recent'],
}

export function useSongsQuery() {
  return useQuery({ queryKey: songsKeys.list(), queryFn: songsApi.getSongs })
}

export function useSongQuery(id) {
  return useQuery({
    queryKey: songsKeys.detail(id),
    queryFn: () => songsApi.getSong(id),
    enabled: Boolean(id),
  })
}

export function useRecentSongQuery() {
  return useQuery({ queryKey: songsKeys.recent(), queryFn: songsApi.getRecentSong })
}

function useInvalidateSongs() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: songsKeys.all })
}

export function useCreateSongMutation() {
  const invalidateSongs = useInvalidateSongs()
  return useMutation({
    mutationFn: songsApi.createSong,
    onSuccess: invalidateSongs,
  })
}

export function useUpdateSongMutation() {
  const invalidateSongs = useInvalidateSongs()
  return useMutation({
    mutationFn: ({ id, song }) => songsApi.updateSong(id, song),
    onSuccess: invalidateSongs,
  })
}

export function useDeleteSongMutation() {
  const invalidateSongs = useInvalidateSongs()
  return useMutation({
    mutationFn: songsApi.deleteSong,
    onSuccess: invalidateSongs,
  })
}
