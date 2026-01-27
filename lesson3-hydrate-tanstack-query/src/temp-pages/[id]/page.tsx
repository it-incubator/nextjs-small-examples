type Props = {
  params: Promise<{ id: string }>
}

export default async function Page(props: Props) {
  const params = await props.params

  const todo = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`)
      .then(res => res.json()) as Todo

  console.log(`✈️ fetch todo ${params.id}`)

  return <div>{todo.title}</div>
}

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}
