import { z } from 'zod';

export const loginSchema = z.object({
    body: z.object({
        email: z.email({ message: 'Invalid email format'}),
        password: z.string()
            .min(4, 'Password must be at least 4 characters')
    })
});


export const registerSchema = z.object({
        body: z.object({
            name: z.string()
                .min(2, 'Name must be at least 2 characters')
                .max(50, 'Name too long'),
            email: z.email({message: 'Invalid email format'}),
            password: z.string()
                .min(6, 'Password must be at least 6 characters')
                .max(100, 'Password too long')
                .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
                .regex(/[0-9]/, 'Password must contain at least one number'),
                role: z.enum(['admin', 'user', 'moderator']).optional()

        })
});