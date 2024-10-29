import {REQUEST_URL} from '@/shared/constants';
import {getFormattedDate} from '@/shared/utils';

/**
 * Using default behavior with caching the response from fetch
 * This example works only for built app, not on dev mode! Steps to reproduce:
 * 1. pnpm build;
 * 2. pnpm start;
 * 3. try to update page multiple times: data will be the same every time.
 */
export default async function StaticGeneration() {
  /** now default option is { cache: 'force-cache' } */
  const data = await fetch(REQUEST_URL)
  const {dateTime} = await data.json()

  return getFormattedDate(dateTime)
}
