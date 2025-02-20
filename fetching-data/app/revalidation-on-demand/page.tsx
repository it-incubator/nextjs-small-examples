import {TimeFetcher} from '@/shared/components';

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
let counter = 0;

// for user page with photo, потому что как бы пользователь разместив (или удалив) пост наверняка удивится, если зайдёт
// на свою страницу, а там не будет нового поста, либо будет удалённый пост

export default async function RevalidationOnDemand() {
    console.log('RevalidationOnDemand rendering ' + ++counter)

    return <TimeFetcher/>
}
