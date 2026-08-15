/**
 * Cloudinary delivery URL helpers.
 *
 * Cloudinary supports inserting transformation params as a path segment
 * immediately after `/upload/` and before the version/`v123.../` segment, e.g.
 * `https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto/v123/name.png`.
 * `f_auto` lets Cloudinary auto-serve the best format the requesting browser
 * supports (WebP/AVIF instead of PNG/JPG where possible) and `q_auto`
 * auto-picks an optimal quality/compression level — both are purely delivery
 * optimizations, the rendered image is visually identical.
 */

/**
 * Inserts Cloudinary transformation params right after `/image/upload/` in a
 * `res.cloudinary.com` delivery URL. If the URL isn't a cloudinary upload URL,
 * it is returned unchanged.
 *
 * SVG sources are also returned unchanged, regardless of `params` — `f_auto` on an SVG doesn't pick
 * a better format the way it does for a photo, it rasterizes the vector down to a PNG/WebP at
 * whatever pixel size the SVG's own viewBox happens to declare (often small/arbitrary, since that
 * number was never meant to be a real render size for a vector asset). Confirmed via a live request:
 * the EPK hero graphic (a 127×127 viewBox) came back as a 127×127 PNG under `f_auto,q_auto` and was
 * then stretched to fill its ~250px display box, producing visible blur — the untransformed URL
 * serves the real `image/svg+xml`, which scales to any size with no quality loss.
 *
 * @param {string} url
 * @param {string} [params]
 * @returns {string}
 */
export const cloudinaryTransform = (url, params = 'f_auto,q_auto') => {
  if (
    typeof url !== 'string' ||
    !url.includes('res.cloudinary.com') ||
    !url.includes('/image/upload/') ||
    url.toLowerCase().endsWith('.svg')
  ) {
    return url
  }

  return url.replace('/image/upload/', `/image/upload/${params}/`)
}

export const LOGO_URL = cloudinaryTransform(
  'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421297/logo_idpqos.png',
)
