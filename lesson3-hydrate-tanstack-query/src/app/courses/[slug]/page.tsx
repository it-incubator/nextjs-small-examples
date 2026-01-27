// import {CoursesList} from '@/components/CoursesList/CoursesList'
// import type {CoursesResponse} from '@/store/services/coursesApi'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query

  /*const serverData = await fetch(`http://localhost:3000/api/courses?page=1&limit=5`)
      .then(res => res.json()) as CoursesResponse*/

  return (
      <>
        <h2>slug: {slug}</h2>
        <h2>query: {query}</h2>
        {/*<CoursesList serverData={serverData}/>*/}
      </>
  )
}
