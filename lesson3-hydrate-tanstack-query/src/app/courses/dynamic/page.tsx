export default async function Page() {
  const todos = await fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json()) as Todo[]

  console.log('✈️ fetch todos')

  return <>{todos.map(todo => <div key={todo.id}>{todo.title}</div>)}</>
}

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}
