'use client'
import {PokemonsList} from '@/features/pokemon/ui/pokemons-list';
import {useMeWithAnonymRedirect} from "@/hooks/useMeWithAnonymRedirect";

export default function PokemonsPage() {

    const meData = useMeWithAnonymRedirect();

    if (!meData) return <div>loading...</div>

    return (
        <div>
            <h2>Pokemon list</h2>
            <PokemonsList/>
        </div>
    );
}
