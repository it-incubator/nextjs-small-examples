'use client'
export default function Home() {

    const users = [
        {name: 'John Doe', age: 30},
        {name: 'Jane Doe', age: 28},
        {name: 'Alice Doe', age: 35},
    ]


  return (
      <div>
          <h1>HOME PAGE</h1>
          {users.map((user, index) =><div key={index}>
              <h2>{user.name}</h2>
              <p>Age: {user.age}</p>
          </div>)}
      </div>
  )
}
