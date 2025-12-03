# Mock Service Worker (MSW) Configuration for LibreChat

This directory contains the Mock Service Worker (MSW) setup that allows you to run the LibreChat UI without a backend server.

## Directory Structure

```
mocks/
├── data/                      # Mock data definitions
│   ├── mockStartupConfig.ts   # Startup configuration
│   ├── mockEndpoints.ts       # AI endpoints configuration
│   ├── mockModels.ts          # Available AI models
│   ├── mockUser.ts            # User data
│   ├── mockConversations.ts   # Sample conversations
│   ├── mockMessages.ts        # Sample messages
│   └── mockPresets.ts         # Conversation presets
├── handlers.ts                # MSW request handlers
├── browser.ts                 # Browser service worker setup
└── index.ts                   # Main exports
```

## Features

The mock server intercepts and handles the following API calls:

### Configuration
- `GET /api/config` - Startup configuration
- `GET /api/endpoints` - Available AI endpoints
- `GET /api/models` - Available models per endpoint
- `GET /health` - Health check

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh
- `GET /api/user` - Current user info

### Conversations
- `GET /api/convos` - List conversations (with pagination)
- `GET /api/convos/:id` - Get specific conversation
- `POST /api/convos/update` - Update conversation
- `DELETE /api/convos` - Delete conversation
- `POST /api/convos/archive` - Archive conversation
- `POST /api/convos/gen_title` - Generate title

### Messages
- `GET /api/messages` - List messages
- `GET /api/messages/:conversationId` - Get messages for conversation
- `PUT /api/messages/:conversationId/:messageId` - Update message

### Chat (SSE)
- `POST /api/ask/:endpoint` - Send chat message (streaming)

### Presets
- `GET /api/presets` - Get presets
- `POST /api/presets` - Create preset
- `POST /api/presets/delete` - Delete preset

### Files
- `GET /api/files` - List files
- `GET /api/files/config` - File configuration
- `POST /api/files` - Upload file
- `POST /api/files/images` - Upload image

### Other
- `GET /api/balance` - User balance
- `GET /api/plugins` - Available plugins
- `GET /api/search/enable` - Search status
- `GET /api/tags` - Conversation tags
- `GET /api/banner` - System banner
- `GET /api/user/terms` - Terms of service

## Usage

### Enable Mock Mode

Set the environment variable in your `.env` file:

```bash
VITE_USE_MOCKS=true
```

### Run Development Server

```bash
cd client
npm run dev
# or
npm run b:dev  # for bun
```

The mock service worker will automatically:
1. Intercept all API calls
2. Return mock data
3. Simulate network delays
4. Log all intercepted requests to the console

### Login Credentials

Any email and password combination will work in mock mode. For example:
- Email: `demo@example.com`
- Password: `anything`

## Customizing Mock Data

You can modify the mock data in the `data/` directory:

### Add More Conversations

Edit `mockConversations.ts`:

```typescript
export const mockConversations: TConversation[] = [
  // Add your conversations here
  {
    conversationId: 'my-convo',
    title: 'My Conversation',
    endpoint: EModelEndpoint.openAI,
    model: 'gpt-4',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
```

### Add Messages to Conversations

Edit `mockMessages.ts`:

```typescript
export const mockMessages: Record<string, TMessage[]> = {
  'my-convo': [
    {
      messageId: 'msg-1',
      conversationId: 'my-convo',
      text: 'Hello!',
      sender: 'User',
      isCreatedByUser: true,
      createdAt: new Date().toISOString(),
    },
  ],
};
```

### Modify Available Models

Edit `mockModels.ts` to add or remove AI models for each endpoint.

### Change App Configuration

Edit `mockStartupConfig.ts` to modify feature flags, branding, etc.

## Simulated Features

### Network Delays
All mock responses include realistic delays (50-500ms) to simulate network latency.

### Streaming Chat Responses
The `/api/ask/:endpoint` endpoint simulates streaming SSE responses with word-by-word delivery.

### Pagination
Conversation lists support cursor-based pagination (though currently returns all items).

### File Uploads
File and image uploads are mocked and return fake file IDs.

## Debugging

MSW logs all intercepted requests to the browser console with the format:
```
[MSW] GET /api/config (200 OK)
```

You can also inspect requests in the browser's Network tab - they will appear as normal network requests.

## Disabling Mock Mode

Remove or set `VITE_USE_MOCKS=false` in your `.env` file, then restart the dev server.

## Production Builds

Mock mode is automatically disabled in production builds (`NODE_ENV=production`).
