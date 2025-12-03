import { http, HttpResponse, delay } from 'msw';
import { mockStartupConfig } from './data/mockStartupConfig';
import { mockEndpointsConfig } from './data/mockEndpoints';
import { mockModelsConfig } from './data/mockModels';
import { mockUser, mockUserBalance } from './data/mockUser';
import { mockConversationsResponse, mockConversations } from './data/mockConversations';
import { mockMessages, getMessagesByConversationId } from './data/mockMessages';
import { mockPresets } from './data/mockPresets';

const BASE_URL = '';  // Empty for relative URLs

export const handlers = [
  // Startup Configuration
  http.get(`${BASE_URL}/api/config`, async () => {
    await delay(200);
    return HttpResponse.json(mockStartupConfig);
  }),

  // Endpoints Configuration
  http.get(`${BASE_URL}/api/endpoints`, async () => {
    await delay(150);
    return HttpResponse.json(mockEndpointsConfig);
  }),

  // Models Configuration
  http.get(`${BASE_URL}/api/models`, async () => {
    await delay(150);
    return HttpResponse.json(mockModelsConfig);
  }),

  // Health Check
  http.get(`${BASE_URL}/health`, () => {
    return new HttpResponse('OK', { status: 200 });
  }),

  // Authentication - Get User
  http.get(`${BASE_URL}/api/user`, async () => {
    await delay(100);
    return HttpResponse.json(mockUser);
  }),

  // User Balance
  http.get(`${BASE_URL}/api/balance`, async () => {
    await delay(100);
    return HttpResponse.json(mockUserBalance);
  }),

  // Login
  http.post(`${BASE_URL}/api/auth/login`, async ({ request }) => {
    await delay(300);
    const body = await request.json() as any;
    
    // Simple mock authentication
    if (body.email && body.password) {
      return HttpResponse.json({
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
      });
    }
    
    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // Logout
  http.post(`${BASE_URL}/api/auth/logout`, async () => {
    await delay(100);
    return HttpResponse.json({ message: 'Logged out successfully' });
  }),

  // Register
  http.post(`${BASE_URL}/api/auth/register`, async ({ request }) => {
    await delay(300);
    const body = await request.json() as any;
    
    return HttpResponse.json({
      user: {
        ...mockUser,
        email: body.email,
        username: body.username || body.email,
        name: body.name || 'New User',
      },
      token: 'mock-jwt-token-' + Date.now(),
    });
  }),

  // Refresh Token
  http.post(`${BASE_URL}/api/auth/refresh`, async () => {
    await delay(100);
    return HttpResponse.json({
      user: mockUser,
      token: 'mock-jwt-token-refreshed-' + Date.now(),
    });
  }),

  // Conversations List
  http.get(`${BASE_URL}/api/convos`, async ({ request }) => {
    await delay(200);
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20');
    
    // Simple pagination mock
    return HttpResponse.json({
      ...mockConversationsResponse,
      pageSize,
      cursor,
    });
  }),

  // Get Conversation by ID
  http.get(`${BASE_URL}/api/convos/:conversationId`, async ({ params }) => {
    await delay(150);
    const { conversationId } = params;
    
    const conversation = mockConversations.find(
      (c) => c.conversationId === conversationId
    );
    
    if (conversation) {
      return HttpResponse.json(conversation);
    }
    
    return HttpResponse.json(
      { message: 'Conversation not found' },
      { status: 404 }
    );
  }),

  // Update Conversation
  http.post(`${BASE_URL}/api/convos/update`, async ({ request }) => {
    await delay(200);
    const body = await request.json() as any;
    
    const conversation = mockConversations.find(
      (c) => c.conversationId === body.arg.conversationId
    );
    
    if (conversation) {
      const updated = { ...conversation, ...body.arg };
      return HttpResponse.json(updated);
    }
    
    return HttpResponse.json(
      { message: 'Conversation not found' },
      { status: 404 }
    );
  }),

  // Delete Conversation
  http.delete(`${BASE_URL}/api/convos`, async ({ request }) => {
    await delay(200);
    const body = await request.json() as any;
    
    return HttpResponse.json({
      acknowledged: true,
      deletedCount: 1,
      messages: {
        acknowledged: true,
        deletedCount: mockMessages[body.arg.conversationId]?.length || 0,
      },
    });
  }),

  // Archive Conversation
  http.post(`${BASE_URL}/api/convos/archive`, async ({ request }) => {
    await delay(200);
    const body = await request.json() as any;
    
    const conversation = mockConversations.find(
      (c) => c.conversationId === body.arg.conversationId
    );
    
    if (conversation) {
      return HttpResponse.json({
        ...conversation,
        isArchived: body.arg.isArchived,
      });
    }
    
    return HttpResponse.json(
      { message: 'Conversation not found' },
      { status: 404 }
    );
  }),

  // Duplicate Conversation
  http.post(`${BASE_URL}/api/convos/duplicate`, async ({ request }) => {
    await delay(300);
    const body = await request.json() as any;
    const { conversationId } = body.arg;
    
    const originalConvo = mockConversations.find(
      (c) => c.conversationId === conversationId
    );
    
    if (originalConvo) {
      const duplicatedConvo = {
        ...originalConvo,
        conversationId: `convo-duplicated-${Date.now()}`,
        title: `${originalConvo.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return HttpResponse.json(duplicatedConvo);
    }
    
    return HttpResponse.json(
      { message: 'Conversation not found' },
      { status: 404 }
    );
  }),

  // Messages List
  http.get(`${BASE_URL}/api/messages`, async ({ request }) => {
    await delay(150);
    const url = new URL(request.url);
    const conversationId = url.searchParams.get('conversationId');
    
    if (conversationId) {
      const messages = getMessagesByConversationId(conversationId);
      return HttpResponse.json({
        messages,
        count: messages.length,
      });
    }
    
    return HttpResponse.json({ messages: [], count: 0 });
  }),

  // Get Messages by Conversation ID
  http.get(`${BASE_URL}/api/messages/:conversationId`, async ({ params }) => {
    await delay(150);
    const { conversationId } = params as { conversationId: string };
    const messages = getMessagesByConversationId(conversationId);
    return HttpResponse.json(messages);
  }),

  // Update Message
  http.put(`${BASE_URL}/api/messages/:conversationId/:messageId`, async ({ request, params }) => {
    await delay(150);
    const body = await request.json() as any;
    const { conversationId, messageId } = params;
    
    const messages = mockMessages[conversationId as string];
    const message = messages?.find((m) => m.messageId === messageId);
    
    if (message) {
      return HttpResponse.json({
        ...message,
        text: body.text,
        updatedAt: new Date().toISOString(),
      });
    }
    
    return HttpResponse.json(
      { message: 'Message not found' },
      { status: 404 }
    );
  }),

  // Generate Title
  http.post(`${BASE_URL}/api/convos/gen_title`, async ({ request }) => {
    await delay(500);
    const body = await request.json() as any;
    
    return HttpResponse.json({
      title: 'AI Generated Title ' + Date.now(),
      conversationId: body.conversationId,
    });
  }),

  // Presets
  http.get(`${BASE_URL}/api/presets`, async () => {
    await delay(100);
    return HttpResponse.json(mockPresets);
  }),

  http.post(`${BASE_URL}/api/presets`, async ({ request }) => {
    await delay(200);
    const body = await request.json() as any;
    
    return HttpResponse.json({
      ...body,
      presetId: 'preset-' + Date.now(),
    });
  }),

  http.post(`${BASE_URL}/api/presets/delete`, async ({ request }) => {
    await delay(200);
    return HttpResponse.json({ acknowledged: true, deletedCount: 1 });
  }),

  // Files
  http.get(`${BASE_URL}/api/files`, async () => {
    await delay(150);
    return HttpResponse.json([]);
  }),

  http.get(`${BASE_URL}/api/files/config`, async () => {
    await delay(100);
    return HttpResponse.json({
      endpoints: {
        openAI: true,
        anthropic: true,
        google: true,
        assistants: true,
        agents: true,
      },
      serverFileSizeLimit: 100000000,
      avatarSizeLimit: 2000000,
    });
  }),

  http.post(`${BASE_URL}/api/files`, async ({ request }) => {
    await delay(500);
    // Mock file upload
    return HttpResponse.json({
      message: 'File uploaded successfully (mock)',
      files: [
        {
          file_id: 'file-' + Date.now(),
          filename: 'mock-file.pdf',
          type: 'application/pdf',
          size: 12345,
        },
      ],
    });
  }),

  http.post(`${BASE_URL}/api/files/images`, async ({ request }) => {
    await delay(500);
    // Mock image upload
    return HttpResponse.json({
      message: 'Image uploaded successfully (mock)',
      files: [
        {
          file_id: 'img-' + Date.now(),
          filename: 'mock-image.png',
          type: 'image/png',
          size: 54321,
          filepath: '/api/files/images/' + Date.now() + '.png',
        },
      ],
    });
  }),

  http.delete(`${BASE_URL}/api/files`, async ({ request }) => {
    await delay(200);
    const body = await request.json() as any;
    return HttpResponse.json({
      message: 'File(s) deleted successfully (mock)',
      count: body.files?.length || 1,
    });
  }),

  // Plugins
  http.get(`${BASE_URL}/api/plugins`, async () => {
    await delay(100);
    return HttpResponse.json([]);
  }),

  // Search
  http.get(`${BASE_URL}/api/search/enable`, async () => {
    await delay(50);
    return HttpResponse.json(false);
  }),

  // Tags
  http.get(`${BASE_URL}/api/tags`, async () => {
    await delay(100);
    return HttpResponse.json([
      { tag: 'work', count: 5 },
      { tag: 'personal', count: 3 },
      { tag: 'research', count: 7 },
    ]);
  }),

  http.post(`${BASE_URL}/api/tags`, async ({ request }) => {
    await delay(150);
    const body = await request.json() as any;
    return HttpResponse.json({
      tag: body.tag,
      count: 0,
    });
  }),

  http.put(`${BASE_URL}/api/tags/:tag`, async ({ params, request }) => {
    await delay(150);
    const body = await request.json() as any;
    return HttpResponse.json({
      tag: body.tag,
      count: 1,
    });
  }),

  http.delete(`${BASE_URL}/api/tags/:tag`, async ({ params }) => {
    await delay(150);
    return HttpResponse.json({ acknowledged: true, deletedCount: 1 });
  }),

  // SSE Chat Endpoint - Simulated streaming
  http.post(`${BASE_URL}/api/ask/:endpoint`, async ({ params, request }) => {
    await delay(300);
    const { endpoint } = params;
    const body = await request.json() as any;
    
    // For SSE, we need to return a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Send created event
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              created: true,
              message: {
                messageId: 'msg-' + Date.now(),
                conversationId: body.conversationId || 'new-convo-' + Date.now(),
                parentMessageId: body.parentMessageId,
                sender: 'assistant',
                text: '',
                model: body.model,
                endpoint: endpoint,
              },
            })}\n\n`
          )
        );

        await new Promise((resolve) => setTimeout(resolve, 100));

        // Send message chunks
        const responseText = `This is a mock response from ${endpoint}. In a real scenario, this would be streaming from the AI model. This demonstrates the mock service worker functionality!`;
        const words = responseText.split(' ');
        
        for (const word of words) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                message: {
                  text: word + ' ',
                },
              })}\n\n`
            )
          );
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        // Send final event
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              final: true,
              conversation: {
                conversationId: body.conversationId || 'new-convo-' + Date.now(),
                title: body.title || 'New Conversation',
              },
            })}\n\n`
          )
        );

        controller.close();
      },
    });

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }),

  // Assistants (if enabled)
  http.get(`${BASE_URL}/api/assistants`, async () => {
    await delay(150);
    return HttpResponse.json({
      data: [],
      has_more: false,
    });
  }),

  http.get(`${BASE_URL}/api/assistants/v2`, async ({ request }) => {
    await delay(150);
    const url = new URL(request.url);
    const order = url.searchParams.get('order') || 'desc';
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const endpoint = url.searchParams.get('endpoint');
    
    return HttpResponse.json({
      data: [],
      has_more: false,
      first_id: null,
      last_id: null,
    });
  }),

  // Agents (if enabled)
  http.get(`${BASE_URL}/api/agents`, async () => {
    await delay(150);
    return HttpResponse.json({
      data: [],
      has_more: false,
    });
  }),

  http.get(`${BASE_URL}/api/agents/categories`, async () => {
    await delay(100);
    return HttpResponse.json([
      { category: 'productivity', count: 5 },
      { category: 'development', count: 8 },
      { category: 'creative', count: 3 },
    ]);
  }),

  // Agent Tool Calls
  http.get(`${BASE_URL}/api/agents/tools/calls`, async ({ request }) => {
    await delay(100);
    const url = new URL(request.url);
    const conversationId = url.searchParams.get('conversationId');
    
    // Return empty tool calls for the conversation
    return HttpResponse.json({
      toolCalls: [],
      conversationId,
    });
  }),

  // MCP Tools
  http.get(`${BASE_URL}/api/mcp/tools`, async () => {
    await delay(100);
    return HttpResponse.json({});
  }),

  // Banner
  http.get(`${BASE_URL}/api/banner`, async () => {
    await delay(50);
    return HttpResponse.json(null);
  }),

  // Terms
  http.get(`${BASE_URL}/api/user/terms`, async () => {
    await delay(50);
    return HttpResponse.json({
      termsAccepted: true,
    });
  }),

  // API Keys
  http.get(`${BASE_URL}/api/keys`, async ({ request }) => {
    await delay(100);
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    
    return HttpResponse.json({
      expiresAt: null,
    });
  }),

  // Agent Tool Auth
  http.get(`${BASE_URL}/api/agents/tools/:toolId/auth`, async ({ params }) => {
    await delay(100);
    const { toolId } = params;
    
    return HttpResponse.json({
      authenticated: true,
      message: `Mock authentication for ${toolId}`,
    });
  }),

  // Speech Config
  http.get(`${BASE_URL}/api/files/speech/config/get`, async () => {
    await delay(100);
    return HttpResponse.json({
      tts: {
        enabled: false,
      },
      stt: {
        enabled: false,
      },
    });
  }),

  // Voices
  http.get(`${BASE_URL}/api/voices`, async () => {
    await delay(100);
    return HttpResponse.json([]);
  }),

  // Roles
  http.get(`${BASE_URL}/api/roles/:roleName`, async ({ params }) => {
    await delay(100);
    const { roleName } = params;
    
    return HttpResponse.json({
      name: roleName,
      permissions: {
        prompts: {
          use: true,
          create: true,
          share: false,
        },
        bookmarks: {
          use: true,
        },
        multiConvo: {
          use: true,
        },
        agents: {
          use: true,
          create: true,
          share: false,
        },
      },
    });
  }),

  // Share Link
  http.get(`${BASE_URL}/api/share/link/:conversationId`, async ({ params }) => {
    await delay(150);
    const { conversationId } = params;
    
    // Return null to indicate no shared link exists yet
    return HttpResponse.json(null);
  }),
];
