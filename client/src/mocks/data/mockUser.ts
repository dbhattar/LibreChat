import type { TUser } from 'librechat-data-provider';

export const mockUser: Partial<TUser> = {
  id: 'mock-user-123',
  username: 'demo_user',
  email: 'demo@librechat.local',
  name: 'Demo User',
  avatar: '',
  role: 'user',
  provider: 'local',
  plugins: [],
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2025-12-02T00:00:00.000Z',
};

export const mockUserBalance = {
  balance: 100.0,
  tokenCredits: 1000000,
};
