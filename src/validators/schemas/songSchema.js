import { z } from 'zod'
import { linkRegex } from './linkRegex'

const optionalLink = z
  .string()
  .optional()
  .refine((val) => !val || linkRegex.test(val), { message: 'Invalid Link' })

const allowedCoverExtensions = /(\.jpg|\.jpeg|\.png)$/i

// Mirrors src/validators/validateSong.js — split into fields (shared by create/update) and a
// create-only cover-art file requirement, since update doesn't re-upload a cover.
export const songFieldsSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty.'),
  date: z.string().min(1, 'Date cannot be empty.'),
  appleMusic: optionalLink,
  spotify: optionalLink,
  audiomack: optionalLink,
  youtube: optionalLink,
  tidal: optionalLink,
  boomPlay: optionalLink,
  youtubeMusic: optionalLink,
})

export const createSongSchema = songFieldsSchema.extend({
  coverArt: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Cover art is required.')
    .refine(
      (files) => allowedCoverExtensions.test(files[0]?.name ?? ''),
      'File type should only be .jpg, .jpeg or .png',
    ),
})

export const updateSongSchema = songFieldsSchema
