import {TimeFetcher} from '@/shared/components';

/**
 * Using default behavior with caching the response from fetch with time-based revalidation
 * This example works only for built app, not on dev mode! Steps to reproduce:
 * 1. pnpm build;
 * 2. pnpm start;
 * 3. open /time-based-revalidation page to fetch data for the first time;
 * 4. wait for 5 seconds, for example and try to update page (data will be the same as it's fresh);
 * 5. wait more than 20 seconds and try to update page (data will be the same, but this request will start revalidation process);
 * 6. next update will return new data.
 */
export const revalidate = 20

let counter = 0

// for main page, если медленно обновляется страница, редко и нет нужды гарантированно показать самый свежий контент

export default async function TimeBasedRevalidation() {
    console.log("TimeBasedRevalidation rendering " + ++counter)

    return <TimeFetcher />
}
