'use client'

import {getFormattedDate} from '@/common/utils/getFormattedDate';
import {useEffect, useState} from 'react'

/**
 * Fetching data on client-side as usual in SPA. You can replace local state with global one (RTK with RTK-query, for instance, or etc.)
 */
export default function ClientSideRequest() {
  const [dateTime, setDateTime] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      const data = await fetch('https://timeapi.io/api/time/current/zone?timeZone=Europe/Minsk')
      const {dateTime} = await data.json()
      setDateTime(dateTime)
    }

    fetchPosts()
  }, [])

  if (!dateTime) return <div>Loading...</div>

  return getFormattedDate(dateTime)
}
