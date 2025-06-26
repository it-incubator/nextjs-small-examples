'use client'

import {useParams, useSearchParams} from "next/navigation";

export default function LoginPage() {

    const params = useParams()
    const postId = params['post-id']

    const searchParams = useSearchParams()
    const code = searchParams.get('code')

    return (
        <div className={""}>
            POST will be here post: {postId}, query param, code = {code}
        </div>
    );
}
