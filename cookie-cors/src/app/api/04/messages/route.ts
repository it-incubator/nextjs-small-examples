import {cookies} from "next/headers";

export async function GET(
    req: Request
) {
    const cookieStore = await cookies()
    const refreshTokenCookie = cookieStore.get('token')
    return Response.json({'message': refreshTokenCookie?.value},
        {
            headers: {
                'Access-Control-Allow-Origin': `https://dev.it-incubator.xxx`,
                'Access-Control-Allow-Credentials': 'true',
            },
        })
}