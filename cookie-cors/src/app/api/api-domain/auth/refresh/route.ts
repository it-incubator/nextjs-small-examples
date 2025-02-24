import {cookies} from "next/headers";
import {db} from "@/app/api/in-memory-db";
import {getCORSHeaders} from "@/app/api/cors.helper";
import {setRefreshToken} from "@/app/api/api-domain/auth/login/route";

export async function POST(req: Request) {
    const cookieStore = await cookies()
    const refreshTokenCookie = cookieStore.get('refresh-token')


    const correctToken = 'xxx' + db.getRefreshTokenIndex();
    if (refreshTokenCookie?.value !== correctToken) {
        return Response.json({message: `Not authorized, incorrect token: ${refreshTokenCookie?.value}; must be: ${correctToken}`}, {
            status: 401,
        })
    }

    const headers = getCORSHeaders(req);
    setRefreshToken(headers);

    return Response.json({"accessToken": 'fake'},
        {
            headers
        })
}