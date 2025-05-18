import {courses} from "@/db/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const courseId = parseInt(params.id);
  const body = await req.json();
  const { isLiked } = body;

  if (typeof isLiked !== 'boolean') {
    return Response.json({ message: 'Invalid isLiked value' }, { status: 400 });
  }

  const course = courses.find((c: any) => c.id === courseId);
  if (!course) {
    return Response.json({ message: 'Course not found' }, { status: 404 });
  }

  course.isLiked = isLiked;

  return Response.json({ message: 'Like updated', course });
}
