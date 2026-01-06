// 'use client'


import {PokemonType} from "@/store/services/pokemon";

export default async function ArchivePage() {
    console.log('RENDER ArchivePage')
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
    const data = await response.json() as PokemonType;

    return (
        <div className="App">
         ARCHIVE: {data.species.name}
        </div>
    )
}

// posts/blabla
