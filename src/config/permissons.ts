export const permissions = {
  episodes: {
    read: ['user', 'admin', 'moderator'],
    create: ['admin'],
    delete: ['admin'],
  },
  users: {
    read: ['admin'],
    create: ['admin'],
    delete: ['admin'],
  },
};