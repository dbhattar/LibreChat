import type { TMessage } from 'librechat-data-provider';
import { EModelEndpoint } from 'librechat-data-provider';

export const mockMessages: Record<string, TMessage[]> = {
  'convo-mock-1': [
    {
      messageId: 'msg-1-1',
      conversationId: 'convo-mock-1',
      parentMessageId: '00000000-0000-0000-0000-000000000000',
      text: 'Can you explain what artificial intelligence is?',
      sender: 'User',
      isCreatedByUser: true,
      createdAt: '2025-12-01T10:00:00.000Z',
      updatedAt: '2025-12-01T10:00:00.000Z',
    },
    {
      messageId: 'msg-1-2',
      conversationId: 'convo-mock-1',
      parentMessageId: 'msg-1-1',
      text: 'Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. It encompasses various technologies including machine learning, natural language processing, computer vision, and robotics.\n\nKey aspects of AI include:\n\n1. **Machine Learning**: Systems that can learn from data and improve over time\n2. **Natural Language Processing**: Understanding and generating human language\n3. **Computer Vision**: Interpreting visual information from the world\n4. **Problem Solving**: Making decisions based on available information\n\nAI is used in many applications today, from virtual assistants to autonomous vehicles.',
      sender: 'ChatGPT',
      isCreatedByUser: false,
      model: 'gpt-4',
      endpoint: EModelEndpoint.openAI,
      createdAt: '2025-12-01T10:00:15.000Z',
      updatedAt: '2025-12-01T10:00:15.000Z',
    },
    {
      messageId: 'msg-1-3',
      conversationId: 'convo-mock-1',
      parentMessageId: 'msg-1-2',
      text: 'What are some real-world applications?',
      sender: 'User',
      isCreatedByUser: true,
      createdAt: '2025-12-01T10:05:00.000Z',
      updatedAt: '2025-12-01T10:05:00.000Z',
    },
    {
      messageId: 'msg-1-4',
      conversationId: 'convo-mock-1',
      parentMessageId: 'msg-1-3',
      text: 'AI has numerous real-world applications across various industries:\n\n**Healthcare:**\n- Medical diagnosis and imaging analysis\n- Drug discovery and development\n- Personalized treatment plans\n\n**Finance:**\n- Fraud detection\n- Algorithmic trading\n- Credit scoring\n\n**Transportation:**\n- Self-driving cars\n- Traffic prediction\n- Route optimization\n\n**Retail:**\n- Recommendation systems\n- Inventory management\n- Customer service chatbots\n\n**Entertainment:**\n- Content recommendations (Netflix, Spotify)\n- Gaming AI\n- Content generation\n\nThese are just a few examples - AI is becoming increasingly integrated into our daily lives!',
      sender: 'ChatGPT',
      isCreatedByUser: false,
      model: 'gpt-4',
      endpoint: EModelEndpoint.openAI,
      createdAt: '2025-12-01T10:05:15.000Z',
      updatedAt: '2025-12-01T10:05:15.000Z',
    },
  ],
  'convo-mock-2': [
    {
      messageId: 'msg-2-1',
      conversationId: 'convo-mock-2',
      parentMessageId: '00000000-0000-0000-0000-000000000000',
      text: 'What are some React best practices for 2025?',
      sender: 'User',
      isCreatedByUser: true,
      createdAt: '2025-12-01T09:00:00.000Z',
      updatedAt: '2025-12-01T09:00:00.000Z',
    },
    {
      messageId: 'msg-2-2',
      conversationId: 'convo-mock-2',
      parentMessageId: 'msg-2-1',
      text: 'Here are some key React best practices for 2025:\n\n1. **Use Server Components** (React 18+)\n   - Leverage server-side rendering for better performance\n   - Reduce client-side JavaScript bundle size\n\n2. **Embrace Hooks**\n   - Use functional components with hooks instead of class components\n   - Create custom hooks for reusable logic\n\n3. **Optimize Re-renders**\n   - Use React.memo() for expensive components\n   - Implement useMemo() and useCallback() wisely\n\n4. **Code Splitting**\n   - Lazy load components with React.lazy()\n   - Use Suspense for better loading states\n\n5. **TypeScript Integration**\n   - Use TypeScript for type safety\n   - Define proper interfaces and types\n\n6. **State Management**\n   - Use Context API for global state\n   - Consider libraries like Zustand or Jotai for complex state\n\n7. **Testing**\n   - Write unit tests with Vitest or Jest\n   - Use React Testing Library for component tests\n\nWould you like me to elaborate on any of these?',
      sender: 'Claude',
      isCreatedByUser: false,
      model: 'claude-3-opus-20240229',
      endpoint: EModelEndpoint.anthropic,
      createdAt: '2025-12-01T09:00:20.000Z',
      updatedAt: '2025-12-01T09:00:20.000Z',
    },
  ],
};

export const getMessagesByConversationId = (conversationId: string): TMessage[] => {
  return mockMessages[conversationId] || [];
};
