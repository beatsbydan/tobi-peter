import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as imagesApi from '../api/images'

export const imagesKeys = {
  all: ['images'],
  list: () => [...imagesKeys.all, 'list'],
}

export function useImagesQuery() {
  return useQuery({ queryKey: imagesKeys.list(), queryFn: imagesApi.getImages })
}

function useInvalidateImages() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: imagesKeys.all })
}

export function useUploadImagesMutation() {
  const invalidateImages = useInvalidateImages()
  return useMutation({
    mutationFn: imagesApi.uploadImages,
    onSuccess: invalidateImages,
  })
}

export function useDeleteImageMutation() {
  const invalidateImages = useInvalidateImages()
  return useMutation({
    mutationFn: imagesApi.deleteImage,
    onSuccess: invalidateImages,
  })
}
