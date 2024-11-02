'use client'

import {useParams} from 'next/navigation';

export default function Zone() {
  const {slug} = useParams()

  return <div>Zone {slug}</div>
}
