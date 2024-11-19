export function POST() {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + 0.5 * 60 * 1000);

    const pseudoToken = {expirationDate: expirationDate, userId: 1};
    return Response.json({ accessToken: JSON.stringify(pseudoToken) }, {
        headers: { 'Set-Cookie': `refreshToken=refreshToken2` },
    })
}