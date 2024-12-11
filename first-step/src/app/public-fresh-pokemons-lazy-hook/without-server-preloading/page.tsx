'use client'


import React from "react";
import {PokemonsFreshListLazy} from "@/features/pokemon/ui/pokemons-refresh-list-lazy-query";

export default function PokemonsPage({params}: any) {

  return (
    <div>
        <h2>Public Pokemon list without server preloading</h2>
      <PokemonsFreshListLazy />
    </div>
  );
}
