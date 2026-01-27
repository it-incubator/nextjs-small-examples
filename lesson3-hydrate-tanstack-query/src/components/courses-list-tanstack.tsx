'use client'

import {Course} from '@/store/services/coursesApi';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';

export function CoursesListTanstack(props: { ssrItems?: { items: Course[] }, page?: number, totalPages?: number }) {
    const [page, setPage] = useState(1)

    const {data} = useQuery({
        queryKey: ['courses', 'list', {page}],
        initialData: () => {
            if (props.ssrItems && page === 1) {
                return props.ssrItems
            }
            return undefined;
        },
        async queryFn() {
            console.log('✈️  queryFn')
            const response = await fetch(`http://localhost:3000/api/courses?page=${page}&limit=5`)
            return await response.json();
        }
    })

    return (
        <div>
            <h1>Courses</h1>
            {data?.items?.map((c: Course) => <CoursesItem key={c.id} course={c}/>)}
            <button onClick={() => setPage(page + 1)}>next</button>
        </div>
    )
}


function CoursesItem({course}: { course: Course }) {
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        async mutationFn(params: {id: number, isLiked: boolean}) {
                const response = await fetch(`http://localhost:3000/api/courses/${params.id}/like`, {
                    method: 'PATCH',
                    headers: {
                        "content-type": 'application/json'
                    },
                    body: JSON.stringify({isLiked: params.isLiked})
                })
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['courses', 'list']
            })
        }
    })

    return (
        <div key={course.id}>
            <strong>{course.title}</strong> — {course.company}
            <button
                style={{marginLeft: '10px'}}
                onClick={() => mutate({id: course.id, isLiked: !course.isLiked})}
            >
                {course.isLiked ? '❤️' : '🤍'}
            </button>
        </div>
    )
}
