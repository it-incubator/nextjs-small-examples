import {cookies} from "next/headers";
import {getCORSHeaders} from "@/app/api/cors.helper";
import {db} from "@/app/api/in-memory-db";
import {setRefreshToken} from "@/app/api/api-domain-with-ssr/auth/login/route";

export async function POST(req: Request) {
    const cookieStore = await cookies()
    console.log("POST REFRESH")
    console.log(cookieStore)
    const refreshTokenCookie = cookieStore.get('refresh-token')
    const headers = getCORSHeaders(req, ['https://dev.it-incubator.xxx','https://it-incubator.xxx'])
    const correctToken = 'xxx' + db.getRefreshTokenIndex();
    if (refreshTokenCookie?.value !== correctToken) {
        return Response.json({message: `Not authorized, incorrect token: ${refreshTokenCookie?.value}; must be: ${correctToken}`}, {
            status: 401,
            headers
        })
    }

    setRefreshToken(headers);

    return Response.json({"accessToken": 'fake'}, {headers})
}