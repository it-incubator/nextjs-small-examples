'use client'
import {useEffect} from "react";

export default function ClientComponent(props: any) {
    console.log("ClientComponent rendered")
    useEffect(() => {
        alert('HELLO')
    }, [])

  return (
    <div>
      <h1>Client component for Server Page</h1>
        {/*<Suspense fallback={<span>Loading... server c inside client c</span>}>*/}
        {/*             <ServerComponentForClientComponent />*/}
        {/*</Suspense>*/}
        {props.children}
        <hr/>
        {props.child}
    </div>
  )
}

