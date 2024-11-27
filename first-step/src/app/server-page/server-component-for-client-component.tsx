import {delay} from "@/utils";

export default async function ServerComponentForClientComponent() {
    console.log("ServerComponentForClientComponent rendered")
    await delay(5000)

  return (
    <div>
      <h2>ServerComponentForClientComponent</h2>
    </div>
  )
}

