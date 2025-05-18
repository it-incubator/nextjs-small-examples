import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export type Course = {
    id: number
    title: string
    company: string
    isLiked: boolean
}

export type CoursesResponse = {
    items: Course[]
    page: number
    totalPages: number
}

export const coursesApi = createApi({
    reducerPath: 'coursesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/api/'}),
    tagTypes: ['Courses'],
    endpoints: (builder) => ({
        getCourses: builder.query<CoursesResponse, number>({
            keepUnusedDataFor: 60,
            query: (page = 1) => `courses?page=${page}&limit=5`,
            serializeQueryArgs: ({endpointName}) => endpointName, // один ключ на все страницы
            merge: (currentCache, newData) => {
                currentCache.items.push(...newData.items)
                currentCache.page = newData.page
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg !== previousArg
            }
        }),

        likeCourse: builder.mutation<Course, { id: number; isLiked: boolean }>({
            query: ({id, isLiked}) => ({
                url: `courses/${id}/like`,
                method: 'PATCH',
                body: {isLiked},
            }),
            async onQueryStarted({id, isLiked}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    coursesApi.util.updateQueryData('getCourses', undefined as any, (draft) => {
                        const course = draft.items.find((c) => c.id === id)
                        if (course) course.isLiked = isLiked
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
    }),
})

export const {
    useGetCoursesQuery,
    useLikeCourseMutation,
} = coursesApi
