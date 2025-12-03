import type { TEndpointsConfig } from 'librechat-data-provider';

export const mockEndpointsConfig: Partial<TEndpointsConfig> = {
  openAI: {
    order: 1,
  },
  anthropic: {
    order: 2,
  },
  google: {
    order: 3,
  },
  azureOpenAI: null,
  azureAssistants: null,
  assistants: {
    order: 4,
  },
  agents: {
    order: 5,
    disableBuilder: false,
  },
  gptPlugins: null,
  chatGPTBrowser: null,
  custom: null,
};
