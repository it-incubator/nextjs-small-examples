import {cookies} from "next/headers";

export async function POST() {
    const cookieStore = await cookies()
    const refreshTokenCookie = cookieStore.get('token')
    return Response.json({'message': refreshTokenCookie?.value},
    {
        headers: {
            'Set-Cookie': "token=xyz; Path=/api/04/auth/refresh",
            'Access-Control-Allow-Origin': `https://dev.it-incubator.xxx`,
            'Access-Control-Allow-Credentials': 'true',
        },
    })
}