'use client'

import {CoursesItem} from '@/components/CoursesItem/CoursesItem'
import {Course, type CoursesResponse} from '@/store/services/coursesApi'
import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'

type Props = {
  serverData: CoursesResponse
  pageParam?: number
}

export const CoursesList = ({serverData, pageParam = 1}: Props) => {
  const [page, setPage] = useState(pageParam)

  const {data, isLoading} = useQuery<{ items: Course[] }>({
    queryKey: ['courses', {page}],
    initialData: () => serverData && page === 1 ? serverData : undefined,
    queryFn: () => fetch(`http://localhost:3000/api/courses?page=${page}&limit=5`).then(res => res.json()),
  })

  if (isLoading) return <div>Loading...</div>

  return (
      <div>
        <h1>Courses</h1>
        <h2>Page {page}</h2>
        {data?.items?.map((course: Course) => <CoursesItem key={course.id} course={course}/>)}
        <button onClick={() => setPage(page + 1)}>Next page</button>
      </div>
  )
}
