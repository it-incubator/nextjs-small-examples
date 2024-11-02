'use client'

import {Loader, PrettyDate} from '@/shared/components';
import {fetchDate} from '@/shared/utils';
import {useEffect, useState} from 'react'

/**
 * Fetching data on client-side as usual in SPA. You can replace local state with global one (RTK with RTK-query, for instance, or etc.)
 */
export default function ClientSideRequest() {
  const [dateTime, setDateTime] = useState<string | null>(null)

  useEffect(() => {
    async function getTime() {
      const dateTime = await fetchDate()
      setDateTime(dateTime)
    }

    void getTime()
  }, [])

  if (!dateTime) return <Loader />

  return <PrettyDate date={dateTime} />
}
