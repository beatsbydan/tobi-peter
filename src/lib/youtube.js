// Normalizes any YouTube link an admin might paste (watch/share/embed) to the `/embed/VIDEO_ID`
// shape VideoPlayer's <iframe src> requires — returns null if the URL can't be parsed as one.
export function toYoutubeEmbedUrl(url) {
  if (!url) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.slice(1)
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (parsed.hostname.replace('www.', '').replace('m.', '') === 'youtube.com') {
      if (parsed.pathname.startsWith('/embed/')) return url
      if (parsed.pathname === '/watch') {
        const id = parsed.searchParams.get('v')
        return id ? `https://www.youtube.com/embed/${id}` : null
      }
    }
    return null
  } catch {
    return null
  }
}
