import { z } from 'zod'
import { linkRegex } from './linkRegex'

// Same shape for create and update — mirrors the rules that used to live in
// src/validators/validateShow.js (now superseded by this schema for admin forms).
export const showSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty.'),
  venue: z.string().min(1, 'Venue cannot be empty.'),
  date: z.string().min(1, 'Date cannot be empty.'),
  country: z.string().min(1, 'Country cannot be empty'),
  city: z.string().min(1, 'City cannot be empty'),
  ticketLink: z.string().regex(linkRegex, 'Invalid link.'),
})
