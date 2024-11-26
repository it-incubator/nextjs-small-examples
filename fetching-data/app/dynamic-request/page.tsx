import {TimeDisplay} from '@/shared/components';

/**
 * Turning off default behavior with caching the response from fetch with option { cache: 'no-store' } or export const dynamic = 'force-dynamic'
 */
export const dynamic = 'force-dynamic'

let counter = 0

// SSR, почему не юзаем для страницы пользователя?
export default async function DynamicRequest() {
    console.log( 'DynamicRequest rendered: ' + ++counter)

    return <TimeDisplay />
}
