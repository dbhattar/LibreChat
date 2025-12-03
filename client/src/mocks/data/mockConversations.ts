import type { TConversation } from 'librechat-data-provider';
import { Constants, EModelEndpoint } from 'librechat-data-provider';

export const mockConversations: TConversation[] = [
  {
    conversationId: 'convo-mock-1',
    title: 'Introduction to AI',
    endpoint: EModelEndpoint.openAI,
    model: 'gpt-4',
    createdAt: '2025-12-01T10:00:00.000Z',
    updatedAt: '2025-12-01T10:30:00.000Z',
  },
  {
    conversationId: 'convo-mock-2',
    title: 'React Best Practices',
    endpoint: EModelEndpoint.anthropic,
    model: 'claude-3-opus-20240229',
    createdAt: '2025-12-01T09:00:00.000Z',
    updatedAt: '2025-12-01T09:45:00.000Z',
  },
  {
    conversationId: 'convo-mock-3',
    title: 'TypeScript Tips',
    endpoint: EModelEndpoint.openAI,
    model: 'gpt-3.5-turbo',
    createdAt: '2025-11-30T14:00:00.000Z',
    updatedAt: '2025-11-30T14:20:00.000Z',
  },
  {
    conversationId: 'convo-mock-4',
    title: 'Understanding Async/Await',
    endpoint: EModelEndpoint.google,
    model: 'gemini-pro',
    createdAt: '2025-11-29T11:00:00.000Z',
    updatedAt: '2025-11-29T11:30:00.000Z',
  },
  {
    conversationId: 'new',
    title: 'New Conversation',
    endpoint: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockConversationsResponse = {
  conversations: mockConversations.filter((c) => c.conversationId !== 'new'),
  pageNumber: 1,
  pageSize: 20,
  pages: 1,
  nextCursor: null,
};
