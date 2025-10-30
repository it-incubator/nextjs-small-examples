// app/api/courses/route.ts
import {courses} from "@/db/db";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCourses = courses.slice(startIndex, endIndex);

  return Response.json({
    page,
    total: courses.length,
    totalPages: Math.ceil(courses.length / limit),
    items: paginatedCourses,
  });
}
