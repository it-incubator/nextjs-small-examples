import {TimeDisplay} from '@/shared/components';

/**
 * Using default behavior with caching the response from fetch
 * This example works only for built app, not on dev mode! Steps to reproduce:
 * 1. pnpm build;
 * 2. pnpm start;
 * 3. try to update page multiple times: data will be the same every time.
 */
export default async function StaticGeneration() {
  return <TimeDisplay />
}
