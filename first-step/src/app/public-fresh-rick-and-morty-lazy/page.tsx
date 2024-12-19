import {RickAndMortyFreshListLazy} from "@/features/rick-and-morty/ui/rick-and-morty-fresh-list-lazy";


export default async function RickAndMortyPage({searchParams}: any) {
    console.log('LOAD RickAndMortyPage ON SERVER')
    const params = await searchParams
    console.log(params)
    const listResponse = await fetch(`https://rickandmortyapi.com/api/character?page=1${params.name ? `&name=${params.name}` : ''}`)
    const list = await listResponse.json()

  return (
    <div>
        <h2>Public RickAndMortyFresh list</h2>
      <RickAndMortyFreshListLazy preloadedList={list.results}/>
    </div>
  );
}
