import {TimeDisplay} from '@/shared/components';

/**
 * Turning off default behavior with caching the response from fetch with option { cache: 'no-store' } or export const dynamic = 'force-dynamic'
 */
export const dynamic = 'force-dynamic'

export default async function DynamicRequest() {
  return <TimeDisplay />
}
