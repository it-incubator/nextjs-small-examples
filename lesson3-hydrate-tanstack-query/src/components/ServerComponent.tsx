import {CoursesResponse} from "../store/services/coursesApi";
import {delay} from "@/utils/delay";

export const ServerComponent = async () => {
    debugger;
    await delay(5000)
    const response = await fetch('http://localhost:3000/api/courses?page=1&limit=5')
    const data = await response.json() as CoursesResponse;

    return <div>Server Component, totalPages: {data.totalPages}</div>
}