import { revalidatePath } from 'next/cache'

export async function GET() {
  revalidatePath('/revalidation-on-demand')
  return Response.json({ revalidated: true, now: Date.now() })
}
