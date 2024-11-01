import {REQUEST_URL} from '@/shared/constants';
import {PrettyDate} from "@/shared/utils/getFormattedDate";

/**
 * Turning off default behavior with caching the response from fetch with option { cache: 'no-store' } or export const dynamic = 'force-dynamic'
 */
export const dynamic = 'force-dynamic'

export default async function DynamicRequest() {
  const data = await fetch(REQUEST_URL)
  const {dateTime} = await data.json()

  return <PrettyDate date={dateTime} />
}
