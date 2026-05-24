// Mock user store — replaces a real database for this demo.
// In production you would query a real DB and store hashed passwords.

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'user@netflix.com',
    password: 'netflix123',
    plan: 'Standard',
    avatar: 'JD',
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@netflix.com',
    password: 'admin456',
    plan: 'Premium',
    avatar: 'AU',
  },
];

module.exports = mockUsers;
