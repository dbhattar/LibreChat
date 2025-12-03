import type { TStartupConfig } from 'librechat-data-provider';

export const mockStartupConfig: Partial<TStartupConfig> = {
  appTitle: 'LibreChat (Mock Mode)',
  emailEnabled: false,
  socialLogins: [],
  registrationEnabled: true,
  interface: {
    modelSelect: true,
    parameters: true,
    sidePanel: true,
    presets: true,
    prompts: true,
    bookmarks: true,
    multiConvo: true,
    agents: true,
  },
  modelSpecs: {
    enforce: false,
    prioritize: true,
    list: [
      {
        name: 'gpt-4-turbo',
        label: 'GPT-4 Turbo',
        description: 'Most capable GPT-4 model',
        iconURL: '/assets/openai.svg',
        preset: {
          endpoint: 'openAI',
          model: 'gpt-4-turbo-preview',
          modelLabel: 'GPT-4 Turbo',
          temperature: 0.7,
          maxOutputTokens: 4096,
        },
      },
      {
        name: 'claude-3-opus',
        label: 'Claude 3 Opus',
        description: 'Most capable Claude model',
        iconURL: '/assets/anthropic.svg',
        preset: {
          endpoint: 'anthropic',
          model: 'claude-3-opus-20240229',
          modelLabel: 'Claude 3 Opus',
          temperature: 0.7,
          maxOutputTokens: 4096,
        },
      },
    ],
  },
  checkBalance: false,
  version: 'v0.8.1-mock',
  customFooter: 'Running in mock mode - No backend required',
  helpAndFaqURL: '',
  mcpServers: {},
} as any;
