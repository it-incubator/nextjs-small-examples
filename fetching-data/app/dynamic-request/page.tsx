import {getFormattedDate} from '@/common/utils/getFormattedDate';

/**
 * Turning off default behavior with caching the response from fetch with { cache: 'no-store' }
 */
export default async function DynamicRequest() {
  const data = await fetch('https://timeapi.io/api/time/current/zone?timeZone=Europe/Minsk', {cache: 'no-store'})
  const {dateTime} = await data.json()

  return getFormattedDate(dateTime)
}
