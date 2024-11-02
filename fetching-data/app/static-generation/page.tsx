import {REQUEST_URL} from '@/shared/constants';
import {PrettyDate} from "@/shared/utils/getFormattedDate";

/**
 * Using default behavior with caching the response from fetch
 * This example works only for built app, not on dev mode! Steps to reproduce:
 * 1. pnpm build;
 * 2. pnpm start;
 * 3. try to update page multiple times: data will be the same every time.
 */
export default async function StaticGeneration() {
  /** now default option is { cache: 'force-cache' } */
  console.log('StaticGeneration rendered')
  const data = await fetch(REQUEST_URL)
  const {dateTime} = await data.json()

  return <div>
    {([...new Array(1000)]).map((_, index) => <span>Large_static_page</span>) }
    <PrettyDate date={dateTime} />
  </div>
}
