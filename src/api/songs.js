import { apiClient } from './client'

export async function getSongs() {
  const { data } = await apiClient.get('/song/')
  return data.allSongs
}

export async function getSong(id) {
  const { data } = await apiClient.get(`/song/${id}`)
  return data.song
}

export async function getRecentSong() {
  const { data } = await apiClient.get('/song/recent')
  return data.recentSong
}

export async function createSong({ title, releaseDate, streamingLinks, coverArt }) {
  const formData = new FormData()
  formData.append('image', coverArt)
  const { data: uploaded } = await apiClient.post('/song/upload-cover', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  const { data } = await apiClient.post('/song/create', {
    title,
    releaseDate,
    streamingLink: streamingLinks,
    url: uploaded.url,
  })
  return data
}

export async function updateSong(id, { title, releaseDate, streamingLinks }) {
  const { data } = await apiClient.put(`/song/update/${id}`, {
    title,
    releaseDate,
    streamingLink: streamingLinks,
  })
  return data
}

export async function deleteSong(id) {
  const { data } = await apiClient.delete(`/song/delete/${id}`)
  return data
}
