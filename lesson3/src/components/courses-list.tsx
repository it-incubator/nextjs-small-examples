'use client'
import {
    Course,
    coursesApi, CoursesResponse,
    useGetCoursesQuery,
    useLikeCourseMutation
} from "@/store/services/coursesApi";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/store";

export function CoursesList(props: Partial<CoursesResponse>) {
    console.log("CoursesList rendered")
    const dataFromCache = useAppSelector((state) =>
        coursesApi.endpoints.getCourses
            .select(0)(state).data
    )

    const [page, setPage] = useState(dataFromCache?.page ?? 1)

    const dispatch = useAppDispatch();

    let needHydrateStateRef = useRef(!!props.items && !dataFromCache?.items);

    const {data, isFetching} = useGetCoursesQuery(page, {
        skip: needHydrateStateRef.current
    })

    const handleLoadMore = () => {
        setPage((prev) => prev + 1)
    }

    useEffect(() => {
        if (needHydrateStateRef.current) {
            needHydrateStateRef.current = false;
            const thunk = coursesApi.util.upsertQueryData('getCourses', 1, {
                items: props.items!,
                page: props.page!,
                totalPages: props.totalPages!
            })
            dispatch(thunk);
        }
    }, [])

    const dataForRender = data?.items || props.items

    return (
        <div>
            <h1>Courses</h1>
            {dataForRender?.map((c) => <CoursesItem key={c.id} course={c}/>)}
            {isFetching ? (
                <p>Loading...</p>
            ) : (
                <button onClick={handleLoadMore}>Показать ещё</button>
            )}
        </div>
    )
}


function CoursesItem({course}: { course: Course }) {
    const [likeCourse] = useLikeCourseMutation()
    return (
        <div key={course.id}>
            <strong>{course.title}</strong> — {course.company}
            <button
                style={{marginLeft: '10px'}}
                onClick={() => likeCourse({id: course.id, isLiked: !course.isLiked})}
            >
                {course.isLiked ? '❤️' : '🤍'}
            </button>
        </div>
    )
}
