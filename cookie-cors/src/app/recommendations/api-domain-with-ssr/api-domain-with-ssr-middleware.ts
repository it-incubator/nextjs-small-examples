import {NextRequest, NextResponse} from "next/server";
import {baseUrl} from "@/app/recommendations/api-domain-with-ssr/constants";


const refresh = async (refreshToken: string) => {
    const response = await fetch(baseUrl + '/auth/refresh', {
        method: 'POST',
        headers: {"cookie": `refresh-token=${refreshToken}`}
    });
    console.log("REFRESH REQUEST")
    if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        console.log(data)
        return {
            accessToken: data.accessToken,
            refreshSetCookie: response.headers.get("set-cookie")
        }
    } else {
        const data = await response.json();
        console.log("ERROR: " + response.status + "; " + data)
        console.log("data: " + JSON.stringify(data))
    }
}

export async function apiDomainWithSsrMiddleware(request: NextRequest) {
    const cookie = request.cookies.get('refresh-token')
    console.log(cookie)
    const tokens = await refresh(cookie?.value)
    const requestHeaders = new Headers(request.headers)
    console.log(JSON.stringify(tokens))

    if (tokens) {
        requestHeaders.set('Authorization', 'Bearer ' + tokens.accessToken)
    }
    // You can also set request headers in NextResponse.next
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    if (tokens) {
        response.headers.set('Set-Cookie', tokens.refreshSetCookie)
    }
    return response
}