export async function DELETE(req: Request) {

  return Response.json({}, {
    headers: {'Set-Cookie': `refreshToken=refreshToken1;HttpOnly;Max-Age=0;`},
  })
}