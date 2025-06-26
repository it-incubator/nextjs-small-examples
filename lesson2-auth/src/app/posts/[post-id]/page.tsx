'use client'

import { useEffect } from "react"
import {useParams, useSearchParams} from "next/navigation";

export default function LoginPage() {

     const params = useParams()
     const postId = params['post-id']

    const searchParams = useSearchParams()
    const code = searchParams.get('code')

     useEffect(() => {
       //  alert('hello')
     }, [])

    const users = [
        { id: 1, name: 'ddd'},
        { id: 2, name: 'ddd'},
        { id: 3, name: 'ddd'},
        { id: 4, name: 'ddd'},
    ]

  return (
    <div className={""}>
     POST will be here post: {postId}, query param, code = {code}
        {
            users.map((user) => (
                <div key={user.id}>{user.name}</div>
            ))  // end of map function  }
        }
    </div>
  );
}
