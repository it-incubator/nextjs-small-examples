export async function POST(
    req: Request
) {
    return Response.json({accessToken: 'yyy'}, {
        headers: {
            'Set-Cookie': [
                "token=xxx",
                "Domain=.it-incubator.xxx",
                "Path=/",
                //"SameSite=None",
                // "Secure",
                // "HttpOnly"
                ].join(';'),
            'Access-Control-Allow-Origin': `https://it-incubator.xxx`,
            'Access-Control-Allow-Credentials': 'true',
        },
    })
}