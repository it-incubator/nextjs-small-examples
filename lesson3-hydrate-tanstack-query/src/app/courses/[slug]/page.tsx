type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query

  return (
      <>
        <h2>slug: {slug}</h2>
        <h2>query: {query}</h2>
      </>
  )
}
