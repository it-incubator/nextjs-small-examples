import {cookies} from "next/headers";

export async function POST() {
  // if refreshTOken valid then create new refresh and access pair
  // pay attention: prev refresh token should be added to black list
  await delay(1000)
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken');
  if (!refreshToken) {
    return new Response('Not authorized', {
      status: 401,
    })
  }

  const now = new Date();
  const expirationDate = new Date(now.getTime() + 0.5 * 60 * 1000);


  const pseudoToken = {expirationDate: expirationDate, userId: 1};
  return Response.json({accessToken: JSON.stringify(pseudoToken)}, {
    headers: {'Set-Cookie': `refreshToken=refreshToken` + now.getMilliseconds()},
  })
}


const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))