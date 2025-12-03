import type { TPreset } from 'librechat-data-provider';
import { EModelEndpoint } from 'librechat-data-provider';

export const mockPresets: TPreset[] = [
  {
    presetId: 'preset-1',
    title: 'Coding Assistant',
    endpoint: EModelEndpoint.openAI,
    model: 'gpt-4',
    modelLabel: 'GPT-4',
    promptPrefix: 'You are an expert programmer. Provide clear, well-commented code examples.',
    temperature: 0.3,
    topP: 0.9,
    maxOutputTokens: 2048,
  },
  {
    presetId: 'preset-2',
    title: 'Creative Writing',
    endpoint: EModelEndpoint.anthropic,
    model: 'claude-3-opus-20240229',
    modelLabel: 'Claude 3 Opus',
    promptPrefix: 'You are a creative writing assistant. Help users craft engaging stories.',
    temperature: 0.9,
    topP: 0.95,
    maxOutputTokens: 4096,
  },
  {
    presetId: 'preset-3',
    title: 'Technical Documentation',
    endpoint: EModelEndpoint.openAI,
    model: 'gpt-3.5-turbo',
    modelLabel: 'GPT-3.5 Turbo',
    promptPrefix: 'You are a technical writer. Create clear, concise documentation.',
    temperature: 0.5,
    topP: 0.9,
    maxOutputTokens: 2048,
  },
];
