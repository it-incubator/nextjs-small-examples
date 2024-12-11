export async function GET(req: Request) {
  /**
   1. проверяет accessToken:
   1.1 берёт первую и вторую часть токена, секрет, который знает только бекенд
   и высчитывает заново подпись
   1.2. сравнивает полученную подпись с той, которая в токене пришла
   1.3 если равны подписи - значит пользователь тот за кого себя выдаёт
   1.4 берем id пользователя из второй части токена
   2. на сонове id берёт данные из БД
  */
  const headers = req.headers
  const authorizationHeader = headers.get('Authorization');
  if (!authorizationHeader) {
    return new Response('Not authorized', {
      status: 401,
    })
  }
  const tokenAsString = authorizationHeader!.split(' ')[1]
  const token = JSON.parse(tokenAsString)
  if (token.expirationDate < new Date()) {
    return new Response('Not authorized', {
      status: 401,
    })
  }

  // проверка пароля

  return Response.json({userId: token.userId})
}