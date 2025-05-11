'use client'

import {useGetProfileQuery} from '@/features/auth/authSlice';
import {useMeWithAnonymRedirect} from "@/hooks/useMeWithAnonymRedirect";

export default function LoginPage() {
  const {data} = useGetProfileQuery(undefined, {})

  const meData = useMeWithAnonymRedirect();

  if (!meData) return <div>loading...</div>

  return (
      <div>
        <h2>Profile</h2>
        {!!data && <span>{data.profile}, {data.address}</span>}
      </div>
  )
}
