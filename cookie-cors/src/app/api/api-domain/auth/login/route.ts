
// LOGIN (it-incubator.xxx)
import {getCORSHeaders} from "@/app/api/cors.helper";
import {db} from "@/app/api/in-memory-db";

export async function POST(
    req: Request
) {
    const headers = getCORSHeaders(req)
    setRefreshToken(headers);
    return Response.json({ message: 'token inside cookie'}, {headers})
}

export const setRefreshToken = (headers: Headers) => {
    db.increaseRefreshTokenIndex()
    const index = db.getRefreshTokenIndex()
    headers.append('Set-Cookie', `refresh-token=xxx${index}; Path=/api/api-domain/auth/refresh; Secure; HttpOnly; SameSite=Strict; Max-Age=300000;`);
}