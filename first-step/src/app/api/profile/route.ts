export async function GET(req: Request) {
  const headers = req.headers
  const authorizationHeader = headers.get('Authorization');
  if (!authorizationHeader) {
    return Response.json({message: 'Not authorized'}, {
      status: 401,
    })
  }
  const tokenAsString = authorizationHeader!.split(' ')[1]
  const token = JSON.parse(tokenAsString)
  //console.log("token.expirationDate: ", token.expirationDate)
  //console.log(" new Date(): ",  new Date())
  if (!token || new Date(token.expirationDate) < new Date()) {
    return Response.json({message: 'Not authorized'}, {
      status: 401,
    })
  }

  // проверка пароля

  return Response.json({profile: 'Dimych', address: 'Minsk', userId: token.userId})
}