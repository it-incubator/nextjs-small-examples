export function getCORSHeaders(request: Request, allowedOrigins = ['https://dev.it-incubator.xxx']) {
    const headers = new Headers();
    const origin = request.headers.get('Origin')!;
    if (allowedOrigins.includes(origin)) {
        headers.append('Access-Control-Allow-Origin', origin);
        headers.append('Access-Control-Allow-Credentials', 'true');
    }
    return headers;
}