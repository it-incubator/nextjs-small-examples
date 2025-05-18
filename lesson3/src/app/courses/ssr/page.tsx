import {CoursesList} from "@/components/courses-list";
import {CoursesResponse} from "@/store/services/coursesApi";

export default async function CoursesSSRPage() {
    const response = await fetch('http://localhost:3000/api/courses?page=1&limit=5')
    const data = await response.json() as CoursesResponse;

    return (<CoursesList items={data.items} page={data.page} totalPages={data.totalPages} />)
}
