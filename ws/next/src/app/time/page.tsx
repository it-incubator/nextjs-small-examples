'use client'

import {useServerTimeQuery} from "@/store/services/time.api";

export default function PostsPage() {
    const { data, error, isLoading } = useServerTimeQuery();
    // -> useSelector(selector) -> useEffect() -> const {store} = useContext(Provider)
    // const unsubscribe = store
    // .subscribe(() => { const selectedState = selector(store.getState())  })

    if (isLoading) {
        return <span>...</span>
    }

    console.log(data)

    return (
        <div className="App">
           time: {data.time}
        </div>
    )
}
