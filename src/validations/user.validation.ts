import { z } from 'zod';

export const UserRole = z.enum(['admin', 'user', 'moderator']);

//CREATE User Validation

export const createUserSchemaValidation = z.object ({
body: z.object({
    id: z.number().optional(),
    name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name too long'),

     email: z.email({ message: 'Invalid email format'}),
        password: z.string()
            .min(4, 'Password must be at least 4 characters'),

    role: UserRole
})

});

//UPDATE User Validation
export const updateUserSchemaValidation = z.object ({
body: z.object({
    id: z.number().optional(),
    name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name too long'),

     email: z.email({ message: 'Invalid email format'}),
        password: z.string()
            .min(4, 'Password must be at least 4 characters'),

    role: UserRole
})

});