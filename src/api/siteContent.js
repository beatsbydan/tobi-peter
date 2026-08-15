import { apiClient } from './client'

export async function getSiteContent() {
  const { data } = await apiClient.get('/site-content/')
  return data.siteContent
}

export async function updateSiteContent(siteContent) {
  const { data } = await apiClient.patch('/site-content/update', siteContent)
  return data
}
