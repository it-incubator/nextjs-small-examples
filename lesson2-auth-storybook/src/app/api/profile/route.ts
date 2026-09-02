import {delay} from "@/app/api/auth/refresh/route";

export async function GET(req: Request) {
  // same delay as /auth/me so that, when the access token is expired, both
  // requests receive 401 at ~the same moment → the refresh flow overlaps
  await delay(3000)
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