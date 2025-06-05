export async function POST(req: Request) {
  const body = await req.json()
  console.log('LOGIN ENDPOINT, request body: ', body);
  // 1. берёт по логину ищёт юзера в БД
  // 2. берёт его соль и хеш из БД
  // 3. высчитывает на основе соли из БД и пришедшего пароля заново хэш
  // 4. если хэши совпали, возвращает токен с идентификатором юзера

  // проверка пароля
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 0.5 * 60 * 1000);

  const pseudoToken = {expirationDate: expirationDate, userId: 1};
  return Response.json({accessToken: JSON.stringify(pseudoToken)}, {
    headers: {'Set-Cookie': `refreshToken=refreshToken1;HttpOnly`},
  })
}