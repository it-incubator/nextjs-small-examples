import { NextRequest, NextResponse } from 'next/server';
import { courses } from '@/db/db';

export async function PATCH(
    req: NextRequest,
    { params }: any
) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const courseId = Number.parseInt(id, 10);

  const { isLiked } = await req.json();

  if (typeof isLiked !== 'boolean') {
    return NextResponse.json({ message: 'Invalid isLiked value' }, { status: 400 });
  }

  const course = courses.find((c: any) => c.id === courseId);
  if (!course) {
    return NextResponse.json({ message: 'Course not found' }, { status: 404 });
  }

  course.isLiked = isLiked;
  return NextResponse.json({ message: 'Like updated', course });
}
