import { apiClient } from './client'

export async function getImages() {
  const { data } = await apiClient.get('/admin/album')
  return data.album
}

export async function uploadImages(files) {
  const formData = new FormData()
  for (const file of files) {
    formData.append('images', file)
  }
  const { data } = await apiClient.post('/admin/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function deleteImage(url) {
  const { data } = await apiClient.put('/admin/delete-slide', { url })
  return data
}
