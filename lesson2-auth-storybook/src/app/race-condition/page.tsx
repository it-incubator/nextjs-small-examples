'use client'

import {useGetMeQuery, useGetProfileQuery} from "@/store/services/auth/auth";

/**
 * RACE CONDITION DEMO — double refresh with baseQueryWithReauthWithoutMutexAsExample
 *
 * authAPI.baseQuery === baseQueryWithReauthWithoutMutexAsExample (no mutex, no lock).
 *
 * This page mounts TWO different authenticated endpoints at once:
 *   - getMe      → GET /api/auth/me   (401 when access token expired, 3s delay)
 *   - getProfile → GET /api/profile   (401 when access token expired, 3s delay)
 *
 * They are different cache entries, so RTK Query does NOT dedupe them — both real
 * requests go out in parallel.
 *
 * Steps to see the race:
 *   1. Login, then wait ~30s so the access token expires (see /api/auth/refresh:
 *      expirationDate = now + 0.5 min).
 *   2. Open this page (or press the button). getMe + getProfile fire together.
 *   3. Both come back 401 at the same time. Because the base query has no mutex,
 *      each one independently starts its own refresh:
 *
 *          POST /api/auth/refresh   ← from getMe
 *          POST /api/auth/refresh   ← from getProfile   (❗️sent twice)
 *
 *   4. Open DevTools → Network and confirm TWO /api/auth/refresh calls.
 *
 * Fix (the reason baseQueryWithReauth exists): a Mutex so the second request waits
 * for the first refresh instead of firing its own.
 */
export default function RaceConditionPage() {
    // both queries fire in parallel on mount → two 401 → two refresh requests
    const me = useGetMeQuery()
    const profile = useGetProfileQuery()

    const fireBothInParallel = () => {
        me.refetch()
        profile.refetch()
    }

    return (
        <div style={{padding: 16}}>
            <h2>Race condition demo — refresh sent twice</h2>

            <ol>
                <li>Login first.</li>
                <li>Wait ~30s so the access token expires.</li>
                <li>Press the button (or reload this page).</li>
                <li>DevTools → Network: <b>POST /api/auth/refresh appears twice</b>.</li>
            </ol>

            <button onClick={fireBothInParallel}>
                🚀 Fire getMe + getProfile in parallel
            </button>

            <hr/>

            <div>
                <b>getMe:</b>{' '}
                {me.isFetching ? 'loading...' : JSON.stringify(me.data ?? me.error)}
            </div>
            <div>
                <b>getProfile:</b>{' '}
                {profile.isFetching ? 'loading...' : JSON.stringify(profile.data ?? profile.error)}
            </div>
        </div>
    )
}
