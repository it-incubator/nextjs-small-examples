'use client'

import {useGetProfileQuery} from '@/features/auth/authSlice';

export default function LoginPage() {
  const {data} = useGetProfileQuery(undefined, {})

  return (
      <div>
        <h2>Profile</h2>
        {!!data && <span>{data.profile}, {data.address}</span>}
      </div>
  )
}
