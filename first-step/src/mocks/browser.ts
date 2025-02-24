import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
// Создаём браузерный мок-сервер
export const worker = setupWorker(...handlers);