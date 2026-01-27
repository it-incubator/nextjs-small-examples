'use client'
import {Course, useLikeCourseMutation} from "@/store/services/coursesApi";

/*export function CoursesListTanstackInfinity(props: any) {

    const {data, isLoading, isFetching, fetchNextPage} = useInfiniteQuery({
        queryKey: ['courses', 'list'],
        enabled: !props.ssrItems,
        initialData: () => {
            if (!props.ssrItems) return undefined;

            return {
                pages: [
                    {items: props.ssrItems}
                ],
                pageParams: [1]
            } as any
        },
        initialPageParam: !!props.ssrItems ? 2 : 1,
        async queryFn(params) {
            const response = await fetch(`http://localhost:3000/api/courses?page=${params.pageParam}&limit=5`)
            const json = await response.json();

            return json;
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined
            }
            return lastPageParam + 1
        },
    })

    console.log('🔥')
    let dataForRendering = !!data
        ? data!.pages.flatMap((pageData) => pageData.items)
        : props.ssrItems;

    return (
        <div>
            <h1>Courses</h1>
            {dataForRendering?.map((c) => <CoursesItem key={c.id} course={c}/>)}


            {isFetching ? (
                <p>Loading...</p>
            ) : (
                <button onClick={() => fetchNextPage()}>Показать ещё</button>
            )}
        </div>
    )
}*/


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
