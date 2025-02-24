import {cookies} from "next/headers";
import {getCORSHeaders} from "@/app/api/cors.helper";
import {setRefreshToken} from "@/app/api/singledomain-with-ssr/auth/login/route";
import {db} from "@/app/api/in-memory-db";

export async function POST(req: Request) {
    const cookieStore = await cookies()
    console.log("POST REFRESH")
    console.log(cookieStore)
    const refreshTokenCookie = cookieStore.get('refresh-token')

    if (refreshTokenCookie?.value !== 'xxx' + db.getRefreshTokenIndex()) {
        return Response.json({message: 'Not authorized'}, {
            status: 401,
        })
    }

    const headers = getCORSHeaders(req);
    setRefreshToken(headers);

    return Response.json({"accessToken": 'fake'}, {headers})
}