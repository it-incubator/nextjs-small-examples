import {CoursesList} from '@/components/CoursesList/CoursesList'
import type {CoursesResponse} from '@/store/services/coursesApi'

export default async function Page() {
  const serverData = await fetch('http://localhost:3000/api/courses?page=1&limit=5')
      .then(res => res.json()) as CoursesResponse

  return <CoursesList serverData={serverData}/>
}
