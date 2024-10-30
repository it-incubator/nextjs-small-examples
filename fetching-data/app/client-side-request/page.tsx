'use client'

import {REQUEST_URL} from '@/shared/constants';
import {getFormattedDate} from '@/shared/utils';
import {useEffect, useState} from 'react'
import {PrettyDate} from "@/shared/utils/getFormattedDate";

/**
 * Fetching data on client-side as usual in SPA. You can replace local state with global one (RTK with RTK-query, for instance, or etc.)
 */
export default function ClientSideRequest() {
  const [dateTime, setDateTime] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      const data = await fetch(REQUEST_URL)
      const {dateTime} = await data.json()
      setDateTime(dateTime)
    }

    fetchPosts()
  }, [])

  if (!dateTime) return <div>Loading...</div>

  return <PrettyDate date={dateTime} />
}
