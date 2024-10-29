import {getFormattedDate} from '@/common/utils/getFormattedDate';

/**
 * Using default behavior with caching the response from fetch
 * This example works only for built app, not on dev mode! Steps to reproduce:
 * 1. pnpm run build;
 * 2. pnpm run start;
 * 3. try to update page multiple times: data will be the same every time.
 */
export default async function StaticGeneration() {
  /** now default option is { cache: 'force-cache' } */
  const data = await fetch('https://timeapi.io/api/time/current/zone?timeZone=Europe/Minsk')
  const {dateTime} = await data.json()

  return getFormattedDate(dateTime)
}
