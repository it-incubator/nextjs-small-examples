'use client'
import {useGetBestPokemonQuery} from "@/features/pokemon/slice";

export default function BestPokemonPage() {

    const {data, error, isFetching} = useGetBestPokemonQuery();

    if (error) {
        return <div>Error...</div>
    }

    if (isFetching) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h2>BEST POKEMON</h2>
            {
                data.name
            }
        </div>
    );
}
