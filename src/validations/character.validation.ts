import { z } from 'zod';

//CREATE Character Validation

export const createCharacterSchemaValidation = z.object({
    body: z.object({
        id: z.number().optional(),
        name: z.string()
            .min(1, 'Name is required')
            .max(100, 'Name too long'),

        status: z.enum(['Alive', 'Dead', 'unknown']),

        species: z.string()
            .min(1, 'Species is required'),

        type: z.string()
                .optional(),
        
        gender: z.enum(['Female', 'Male', 'Genderless', 'unknown']),

        origin: z.object({
            name: z.string(),
            url: z.string()
            .regex(/^https?:\/\/.+\..+/, 'Invalid URL format')
        .optional()
        }).optional(),

        location: z.object({
            name: z.string().min(1, 'Location is required'),
            url: z.string()
                .regex(/^https?:\/\/.+\..+/, 'Invalid image URL format')
                .optional()
        }).optional(),

        image: z.string()
            .regex(/^https?:\/\/.+\..+/, 'Invalid image URL format'),
             episode: z.array(z.string()
            .regex(/^https?:\/\/.+\..+/, 'Invalid episode URL format'))     
            .optional()

    })
});

//UPDATE Character Validation

 export const updateCharacterSchemaValidation = z.object({
    body: z.object({
        id: z.number().optional(),
        name: z.string()
            .min(1, 'Name is required')
            .max(100, 'Name too long').optional(),

        status: z.enum(['Alive', 'Dead', 'unknown']).optional(),

        species: z.string()
            .min(1, 'Species is required').optional(),

        type: z.string()
                .optional(),
        
        gender: z.enum(['Female', 'Male', 'Genderless', 'unknown']).optional(),

        origin: z.object({
            name: z.string().optional(),
            url: z.string()
            .regex(/^https?:\/\/.+\..+/, 'Invalid URL format')
        .optional()
        }).optional(),

        location: z.object({
            name: z.string().min(1, 'Location is required').optional(),
            url: z.string()
                .regex(/^https?:\/\/.+\..+/, 'Invalid image URL format')
                .optional()
        }).optional(),

        image: z.string()
            .regex(/^https?:\/\/.+\..+/, 'Invalid image URL format'). optional(),
             episode: z.array(z.string()
            .regex(/^https?:\/\/.+\..+/, 'Invalid episode URL format'))     
            .optional()

    })
});