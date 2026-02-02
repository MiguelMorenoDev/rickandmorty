import { z } from 'zod'

// CREATE episode validation
export const createEpisodeSchemaValidation = z.object({
  body: z.object({
    id: z.number().optional(),

    name: z.string()
      .min(1, 'Name is required')
      .max(100, 'Name too long'),

    air_date: z
      .string()
      .refine(v => !isNaN(Date.parse(v)), {
        message: 'Invalid air_date format'
      }),

    characters: z.array(
        z.string().regex(/^https?:\/\/.+\..+/, 'Invalid character URL format'))
      .optional(),

    url: z
        .array(
            z.string().regex(/^https?:\/\/.+\..+/, 'Invalid character URL format')
        ).optional(),
    
    created: z
      .string()
      .refine(v => !isNaN(Date.parse(v)), {
    message: 'Invalid created date format'
  })

  })


});

//UPDATE episode validation
export const updateEpisodeSchemaValidation = z.object({
  body: z.object({
    id: z.number().optional(),

    name: z.string()
      .min(1, 'Name is required')
      .max(100, 'Name too long').optional(),

    air_date: z
      .string()
      .refine(v => !isNaN(Date.parse(v)), {
        message: 'Invalid air_date format'
      }).optional(),

    characters: z.array(
        z.string().regex(/^https?:\/\/.+\..+/, 'Invalid character URL format'))
      .optional(),

    url: z
        .array(
            z.string().regex(/^https?:\/\/.+\..+/, 'Invalid character URL format')
        ).optional(),
    
    created: z
      .string()
      .refine(v => !isNaN(Date.parse(v)), {
    message: 'Invalid created date format'
  }).optional()

  })


});