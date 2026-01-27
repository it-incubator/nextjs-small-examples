'use client'

import {CoursesItem} from '@/components/CoursesItem/CoursesItem'
import type {Course, CoursesResponse} from '@/store/services/coursesApi'
import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'

export default function Page() {
  const [page, setPage] = useState(1)

  const {data, isLoading} = useQuery<CoursesResponse>({
    queryKey: ['courses', {page}],
    queryFn: () => fetch(`http://localhost:3000/api/courses?page=${page}&limit=5`).then(res => res.json())
  })

  if (isLoading) return <div>Loading...</div>

  return (
      <div>
        <h1>Courses</h1>
        {data?.items?.map((course: Course) => <CoursesItem key={course.id} course={course}/>)}
        <button onClick={() => setPage(page + 1)}>Next page</button>
      </div>
  )
}
