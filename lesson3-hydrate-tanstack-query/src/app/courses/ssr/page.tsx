import {CoursesResponse} from "@/store/services/coursesApi";
import {CoursesListTanstack} from "@/components/courses-list-tanstack";

export default async function CoursesSSRPage() {
    const response = await fetch('http://localhost:3000/api/courses?page=1&limit=5')
    const data = await response.json() as CoursesResponse;

    return (<CoursesListTanstack ssrItems={data} page={data.page} totalPages={data.totalPages} />)
}
