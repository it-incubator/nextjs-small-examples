import {http, HttpResponse} from 'msw';

// Определяем мокированные API-эндпоинты
export const handlers = [
    http.get('https://pokeapi.co/api/v2/best-pokemon', () => {
        return HttpResponse.json({
            id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
            name: 'Pikachu'
        })
    }),

];