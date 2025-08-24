'use client'

import {useGetPokemonByNameQuery} from "@/store/services/pokemon";

export default function PostsPage() {
    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur') // useEffect -> useDispatch: dispatch(tc()) / useSelector(selector) -> useContext
    // -> useEffect -> store.subscribe(() => {
    //     const state = store.getState();
    //     const substate = selector(state)
    //   useState()
    // })

    return (
        <div className="App">
            {error ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <>Loading...!!!!!!</>
            ) : data ? (
                <>
                    <h3>{data.species.name}</h3>
                    <img src={data.sprites.front_shiny} alt={data.species.name} />
                </>
            ) : null}
        </div>
    )
}


