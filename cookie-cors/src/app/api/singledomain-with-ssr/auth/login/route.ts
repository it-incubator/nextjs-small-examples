
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
    // кука должна сразу прилетать на it-incubator.xxx чтобы nextjs мог тоже достать рефреш-токен, так как акссес он не
    // сможет получить, так как его к хедеру не прикрепишь.
    // но даже если access был тоже в куке, большая вероятность, что он уже протух...
    headers.append('Set-Cookie', `refresh-token=xxx${index}; Domain=.it-incubator.xxx; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=300000;`);
}