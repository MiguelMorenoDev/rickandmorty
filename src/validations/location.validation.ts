import { z } from 'zod';

//CREATE Location Validation

export const createLocationSchemaValidation = z.object ({

    body: z.object({
        id: z.number().optional(),
        name: z.string()
        .min(1, 'Name is required')
        .max(100, 'Name too long'),

        type: z.string()
               .optional(),

        dimension: z.string()
                    .optional(),
        
        residents:  z.array(
            z.string()
            .regex(/^https?:\/\/.+\..+/, 'Invalid image URL format'),
        ),
        url: z.string()
            .regex(/^https?:\/\/.+\..+/, 'Invalid URL format')
        .optional()

    }),
    })

    
//UPDATE Location Validation

export const updateLocationSchemaValidation = z.object ({

    
    body: z.object({
        id: z.number().optional(),
        name: z.string()
        .min(1, 'Name is required')
        .max(100, 'Name too long').optional(),

        type: z.string()
               .optional(),

        dimension: z.string()
                    .optional(),
        
          residents:  z.array(
            z.string()
            .regex(/^https?:\/\/.+\..+/, 'Invalid image URL format')
            .optional(),
        ),
         url: z.string()
            .regex(/^https?:\/\/.+\..+/, 'Invalid URL format')
        .optional()

        }),
    })