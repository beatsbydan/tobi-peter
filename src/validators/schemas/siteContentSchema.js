import { z } from 'zod'
import { linkRegex } from './linkRegex'

const statSchema = z.object({
  value: z.coerce.number().int().min(0, 'Must be 0 or greater.'),
  label: z.string().optional(),
})

const setSchema = z.object({
  url: z.string().regex(linkRegex, 'Invalid Link.'),
  label: z.string().min(1, 'Label cannot be empty.'),
})

export const siteContentSchema = z.object({
  bio: z
    .array(z.string().min(1, 'Paragraph cannot be empty.'))
    .min(1, 'At least one bio paragraph is required.'),
  bioFeaturedArtists: z.string().min(1, 'Featured artists cannot be empty.'),
  stats: z.object({
    monthlyListeners: statSchema,
    allTimeRemixes: statSchema,
    singles: statSchema,
    eps: statSchema,
    mixtapes: statSchema,
    streams: statSchema,
  }),
  // Empty array is valid — unlike `bio`, EPK having zero videos listed is a legitimate state.
  sets: z.array(setSchema),
  hasNewRelease: z.boolean(),
})
