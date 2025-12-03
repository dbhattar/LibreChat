import type { TModelsConfig } from 'librechat-data-provider';

export const mockModelsConfig: TModelsConfig = {
  openAI: [
    'gpt-4-turbo-preview',
    'gpt-4-turbo',
    'gpt-4',
    'gpt-4-0125-preview',
    'gpt-4-1106-preview',
    'gpt-4-vision-preview',
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-0125',
    'gpt-3.5-turbo-1106',
    'gpt-3.5-turbo-16k',
  ],
  anthropic: [
    'claude-3-opus-20240229',
    'claude-3-sonnet-20240229',
    'claude-3-haiku-20240307',
    'claude-2.1',
    'claude-2.0',
    'claude-instant-1.2',
  ],
  google: [
    'gemini-pro',
    'gemini-pro-vision',
    'gemini-1.5-pro-latest',
    'gemini-1.5-flash-latest',
    'gemini-ultra',
  ],
  azureOpenAI: ['gpt-4', 'gpt-4-32k', 'gpt-3.5-turbo', 'gpt-3.5-turbo-16k'],
  assistants: [
    'gpt-4-turbo-preview',
    'gpt-4-0125-preview',
    'gpt-4-1106-preview',
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-0125',
    'gpt-3.5-turbo-1106',
  ],
  agents: [
    'gpt-4-turbo-preview',
    'gpt-4-0125-preview',
    'gpt-4',
    'gpt-3.5-turbo',
    'claude-3-opus-20240229',
    'claude-3-sonnet-20240229',
  ],
};
