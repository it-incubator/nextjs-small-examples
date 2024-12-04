import {PokemonsList} from "@/features/pokemon/ui/pokemons-list";
import {initializeStore} from "@/store/store";
import {pokemonApi} from "@/features/pokemon/slice";


export async function generateStaticParams() {
    return;
    const response = await fetch('https://api.example.com/data');

    const serverData = await response.json();

    const store = initializeStore();
    console.log('generateStaticParams called')

    const promise = store.dispatch(
        pokemonApi.util.updateQueryData('getPokemons', null, () => serverData)
    );

    await Promise.all([promise])
    console.log(store.getState())
    return {
        props: {
            initialReduxState: store.getState(),
        },
    };
}


export default async function PokemonsPage({params}: any) {
    console.log('LOAD POKEMONS ON SERVER')
    const pokemonsResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    const pokemons = await pokemonsResponse.json();
    console.log('POKEMONS LOADED')

  return (
    <div>
        <h2>Public Pokemon list</h2>
      <PokemonsList pokemons={pokemons.results}/>
    </div>
  );
}
