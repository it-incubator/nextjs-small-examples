//'use client'
import {Suspense} from "react";
import {Wrapper} from "@/app/implicit-dynamic-attributes-request/wrapper";
import { cookies } from "next/headers";

/**
 * Feature used in Server Component | Why it's dynamic
 * cookies() | Reads request cookies
 * headers() | Reads request headers
 * searchParams in Page props | Depends on query string (/page?query=...)
 * useSearchParams() (Client) | Forces the route to be dynamic
 * usePathname() (Client) | Same — relies on the request path
 * useParams() (Client) | Accesses dynamic route segments
 * request headers access via NextRequest in middleware | Dynamic per request
 * Reading from request.url, request.referrer, etc. | Depends on incoming request
 * Accessing userAgent() from next/server | Based on client browser
 * Accessing ip() from next/server | Based on incoming request IP
 * Reading environment variables at runtime that depend on request | Could force dynamic
 * Calling external APIs inside page.tsx without caching | Dynamic fetch
 * Reading cookies via next/headers inside server components | Implicitly dynamic
 * useRouter() in Client Components | Causes route to be dynamic due to dependency on route data
 * https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-apis
 */

let counter = 0

// SSR, почему не юзаем для страницы пользователя?
export default function ImplicitDynamicRequest() {

    const cookie = cookies();
    console.log('ImplicitDynamicRequest rendered: ' + ++counter)
    return (
        <div> This is static content should be regenerated each time
            <div>
                <Suspense fallback={"...loading"}><Wrapper/></Suspense>
            </div>
            <div>Footer</div>
        </div>
    )
}

