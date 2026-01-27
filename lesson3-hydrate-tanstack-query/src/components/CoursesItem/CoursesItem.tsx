'use client'

import {Course} from '@/store/services/coursesApi'
import {useMutation, useQueryClient} from '@tanstack/react-query'

type Props = {
  course: Course
}

export const CoursesItem = ({course}: Props) => {
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    async mutationFn(params: {id: number, isLiked: boolean}) {
      const response = await fetch(`http://localhost:3000/api/courses/${params.id}/like`, {
        method: 'PATCH',
        body: JSON.stringify({isLiked: params.isLiked})
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['courses']})
    }
  })

  return (
      <div key={course.id}>
        <strong>{course.title}</strong> — {course.company}
        <button style={{marginLeft: '10px'}} onClick={() => mutate({id: course.id, isLiked: !course.isLiked})}>
          {course.isLiked ? '❤️' : '🤍'}
        </button>
      </div>
  )
}
