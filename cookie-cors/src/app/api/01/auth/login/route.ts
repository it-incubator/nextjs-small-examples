
// LOGIN (it-incubator.xxx)
export async function POST(
    req: Request
) {
    const headers = new Headers();

    // Append multiple Set-Cookie headers
    //headers.append('Set-Cookie', 'token=xxx; Path=/; Secure;');
    headers.append('Set-Cookie', 'refresh-token=xxx; Path=/api/01/auth; Secure; HttpOnly; Max-Age=1000;');
    headers.append('Set-Cookie', 'refresh-token=xxx; Domain=it-incubator.xxx; Path=/api/01/auth; Secure; HttpOnly; Max-Age=1000;');
    headers.append('Set-Cookie', 'token1=xxx; Path=/; Domain=.it-incubator.xxx; Secure; HttpOnly;'); // chrome will add dot:  Domain=.it-incubator.xxx
    headers.append('Set-Cookie', 'token2=xxx; Path=/; Domain=it-incubator.xxx; Secure; HttpOnly; SameSite=None;'); // chrome will add dot:  Domain=.it-incubator.xxx
    headers.append('Set-Cookie', 'dont-be-set=yyy; Path=/; Domain=api.it-incubator.xxx; Secure; HttpOnly;'); // нельзя установить куку для поддомена
    headers.append('Set-Cookie', 'token3=yyy; Path=/; Secure; HttpOnly; SameSite=Lax;'); // explicitly dot
    headers.append('Set-Cookie', 'token4=yyy; Path=/; Secure; HttpOnly; SameSite=None;'); // chrome add  Domain=it-incubator.xxx without dot that means cookie will go only for this domain
    headers.append('Set-Cookie', 'token5=www; Path=/; SameSite=Strict; Secure; HttpOnly;'); // нельзя установить куку для поддомена


    // headers.append('Set-Cookie', 'refresh-token=xxx; Path=/api/auth/refresh; Secure; HttpOnly; SameSite=Strict; Max-Age=300000;');
    //
    // const allowedOrigins = ['https://dev.it-kamasutra.com'];
    // const origin = req.headers.get('Origin')!;
    // if (allowedOrigins.includes(origin)) {
    //     headers.append('Access-Control-Allow-Origin', origin);
    //     headers.append('Access-Control-Allow-Credentials', 'true');
    // }

    headers.append('Access-Control-Allow-Origin', 'https://it-incubator.xxx');
    headers.append('Access-Control-Allow-Credentials', 'true');

    return Response.json({ message: 'token inside cookie'}, {headers})



}