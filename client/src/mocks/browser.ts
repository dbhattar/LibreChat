import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Create and export the worker
export const worker = setupWorker(...handlers);

// Optional: Configure worker behavior
worker.start({
  onUnhandledRequest: 'bypass', // Let unmocked requests pass through
  quiet: false, // Log mocking activity to console
});
