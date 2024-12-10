import {delay} from '@/utils';

export default async function ServerComponent() {
  console.log('ServerComponent rendered')
  await delay(3000)

  return (
      <div>
        <h1>Server component for Server Page</h1>
      </div>
  )
}

