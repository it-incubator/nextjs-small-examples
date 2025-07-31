

export async function fetchPokemon() {

    const count = 30;
    await delay(2000);
    // Шаг 2. Генерируем случайный ID и запрашиваем покемона
    const randomId = Math.floor(Math.random() * count) + 1;
    const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`);
    if (!pokeRes.ok) {
      throw new Error(`Failed to fetch Pokémon #${randomId}: ${pokeRes.status}`);
    }
    return pokeRes.json();
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
