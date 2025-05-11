'use client'
import {useEffect, useState} from "react";

export default function Home() {
    console.log("HOME RENDERED")
    const [data, setData] = useState<null | string>(null)

    const users = [
        {name: 'John Doe', age: 30},
        {name: 'Jane Doe', age: 28},
        {name: 'Alice Doe', age: 35},
    ]

    useEffect(() =>{
        setTimeout(() => {
            setData('DATA LOADED')
        }, 1000)
    }, [])

  return (
      <div>
          <h1>HOME PAGE</h1>
          <hr/>
          data: {data}
          <hr/>
          {users.map((user, index) =><div key={index}>
              <h2>{user.name}</h2>
              <p>Age: {user.age}</p>
          </div>)}
      </div>
  )
}
