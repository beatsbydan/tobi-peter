import { apiClient } from './client'

export async function getBlogs() {
  const { data } = await apiClient.get('/blog/')
  return data.AllBlogs
}

export async function getBlog(id) {
  const { data } = await apiClient.get(`/blog/${id}`)
  return data.blog
}

export async function createBlog(blog) {
  const { data } = await apiClient.post('/blog/create', blog)
  return data
}

export async function updateBlog(id, blog) {
  const { data } = await apiClient.patch(`/blog/update/${id}`, blog)
  return data
}

export async function deleteBlog(id) {
  const { data } = await apiClient.delete(`/blog/delete/${id}`)
  return data
}
