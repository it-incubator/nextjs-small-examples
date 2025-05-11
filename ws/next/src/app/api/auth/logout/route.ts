export async function DELETE(req: Request) {

  return Response.json({}, {
    headers: {'Set-Cookie': `refreshToken=__;HttpOnly;Max-Age=0;`},
  })
}