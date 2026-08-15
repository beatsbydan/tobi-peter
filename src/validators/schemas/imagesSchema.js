import { z } from 'zod'

const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i

// Mirrors src/validators/validateFiles.js (already fixed in Phase 1 to flag ANY invalid file,
// not just when every file is invalid).
export const imagesSchema = z.object({
  files: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Select at least one image.')
    .refine(
      (files) => Array.from(files).every((file) => allowedExtensions.test(file.name)),
      'File type should only be .jpg, .jpeg or .png',
    ),
})
