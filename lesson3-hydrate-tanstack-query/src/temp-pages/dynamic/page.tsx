import fs from 'fs/promises'
import path from 'node:path'

export default async function Page() {
  /*const getParsedData = async () => {
    const filePath = path.join(process.cwd(), 'public', 'data.json')
    try {
      const data = await fs.readFile(filePath)
      return JSON.parse(data.toString())
    } catch {
      return {title: 'no title'}
    }
  }

  const {title} = await getParsedData()*/

  const todos = await fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json()) as Todo[]

  console.log('✈️ fetch todos')

  return <>
    {/*<h2>{title}</h2>*/}
    {todos.map(todo => <div key={todo.id}>{todo.title}</div>)}
  </>
}

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}
