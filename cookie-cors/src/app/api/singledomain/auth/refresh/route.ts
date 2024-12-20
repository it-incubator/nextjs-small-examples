import {cookies} from "next/headers";
import {db} from "@/app/api/in-memory-db";
import {getCORSHeaders} from "@/app/api/cors.helper";
import {setRefreshToken} from "@/app/api/singledomain/auth/login/route";

export async function POST(req: Request) {
    const cookieStore = await cookies()
    const refreshTokenCookie = cookieStore.get('refresh-token')


    const correctToken = 'xxx' + db.getRefreshTokenIndex();
    console.log(refreshTokenCookie?.value);
    console.log(correctToken);
    const headers = getCORSHeaders(req);

    if (refreshTokenCookie?.value !== correctToken) {
        return Response.json({message: 'Not authorized'}, {
            status: 401,
            headers
        })
    }


    setRefreshToken(headers);

    return Response.json({"accessToken": 'fake'},
        {
            headers
        })
}