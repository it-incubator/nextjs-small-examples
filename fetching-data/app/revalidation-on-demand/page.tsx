import {getFormattedDate} from '@/common/utils/getFormattedDate';

/**
 * Using default behavior with caching the response from fetch with revalidation on demand
 * This example works only for built app, not on dev mode! Steps to reproduce:
 * 1. pnpm build;
 * 2. pnpm start;
 * 3. open /revalidation-on-demand page to fetch data for the first time;
 * 4. try to update page (data will be the same);
 * 5. make GET request on http://localhost:3000/api/revalidate;
 * 6. next page update will return new data.
 */
export default async function RevalidationOnDemand() {
  const data = await fetch('https://timeapi.io/api/time/current/zone?timeZone=Europe/Minsk')
  const {dateTime} = await data.json()

  return getFormattedDate(dateTime)
}
