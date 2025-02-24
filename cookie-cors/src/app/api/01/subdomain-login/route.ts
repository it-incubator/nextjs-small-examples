
// LOGIN (api.it-incubator.xxx)
export async function POST(
    req: Request
) {
    const headers = new Headers();

    //headers.append('Set-Cookie', 'token=123; Path=/; Domain=it-incubator.xxx; Secure; HttpOnly;'); // поддомен может указать куку для родительского домена, но будет точка
    headers.append('Set-Cookie', 'token2=123; Path=/; Domain=.it-incubator.xxx; Secure; HttpOnly;'); // аналог верхнего примера
   // headers.append('Set-Cookie', 'tokenAuth=123; Path=/; Domain=auth.it-incubator.xxx; Secure; HttpOnly;'); //  нельзя для другого поддомена
    headers.append('Set-Cookie', 'token3=123; Path=/; Secure; HttpOnly;'); // Domain=api.it-incubator.xxx;

    headers.append('Access-Control-Allow-Origin', 'https://it-incubator.xxx');
    headers.append('Access-Control-Allow-Credentials', 'true');

    return Response.json({ message: 'CHECK COOKIE'}, {headers})
}