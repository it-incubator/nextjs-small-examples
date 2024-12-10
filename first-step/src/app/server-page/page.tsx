import ServerComponent from '@/app/server-page/server-component';
import {Suspense} from 'react';
import ClientComponent from '@/app/server-page/client-component';
import ServerComponentForClientComponent from '@/app/server-page/server-component-for-client-component';

export default async function ServerPage() {
  console.log('ServerPage rendered')
  const childJSX = <div></div>
  // <ServerComponentForClientComponent />
  return (
      <div>
        <h1>This is server component server page</h1>
        <Suspense fallback={<span>Loading...</span>}>
          {/*<ServerComponent/>*/}
        </Suspense>
        <ClientComponent child={childJSX}>
          <Suspense fallback={<span>Loading...</span>}>
            {/*<ServerComponentForClientComponent/>*/}
          </Suspense>
        </ClientComponent>
      </div>
  )
}
