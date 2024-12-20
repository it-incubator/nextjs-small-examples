export async function POST(
    req: Request
) {
    return Response.json({accessToken: 'yyy'}, {
        headers: {
            'Set-Cookie': "token=xx; Path=/api/04/auth/refresh;",
            'Access-Control-Allow-Origin': `https://dev.it-incubator.xxx`,
            'Access-Control-Allow-Credentials': 'true',
        },
    })
}