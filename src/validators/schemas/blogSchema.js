import { z } from 'zod'
import { linkRegex } from './linkRegex'

// Same shape for create and update — mirrors src/validators/validateBlog.js.
export const blogSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty.'),
  author: z.string().min(1, 'Author cannot be empty.'),
  text: z.string().min(1, 'Text cannot be empty.'),
  link: z.string().regex(linkRegex, 'Invalid Link.'),
})
