import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authAPI } from '@/store/services/auth/auth';
import { pokemonApi } from '@/store/services/pokemon';
import PostsPage from './page';
import { http, HttpResponse, delay } from 'msw';

const mockMeData = { userId: 123 };
const mockPokemonData = {
  species: { name: 'bulbasaur' },
  sprites: { front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png' }
};

const createStore = () => {
  return configureStore({
    reducer: {
      [authAPI.reducerPath]: authAPI.reducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authAPI.middleware, pokemonApi.middleware),
  });
};

const meta: Meta<typeof PostsPage> = {
  title: 'Pages/Posts',
  component: PostsPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      const store = createStore();
      return (
          <Provider store={store}>
            <div style={{ padding: '20px' }}>
              <Story />
            </div>
          </Provider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story: Loading authentication
export const AuthenticationLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/api/auth/me', async () => {
          await delay('infinite'); // Never resolves
          return HttpResponse.json(mockMeData);
        }),
      ],
    },
  },
};

// Story: Not authenticated
export const NotAuthenticated: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/api/auth/me', () => {
          return new HttpResponse(null, {
            status: 401,
          });
        }),
      ],
    },
  },
};

// Story: User authenticated, Pokemon loading
export const PostsLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/api/auth/me', () => {
          return HttpResponse.json(mockMeData);
        }),
        http.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', async () => {
          await delay('infinite'); // Never resolves
          return HttpResponse.json(mockPokemonData);
        }),
      ],
    },
  },
};

// Story: Pokemon API error
export const PostsError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/api/auth/me', () => {
          return HttpResponse.json(mockMeData);
        }),
        http.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', () => {
          return new HttpResponse(null, {
            status: 404,
          });
        }),
      ],
    },
  },
};

// Story: Everything loaded successfully
export const PostsLoaded: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/api/auth/me', () => {
          return HttpResponse.json(mockMeData);
        }),
        http.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', () => {
          return HttpResponse.json(mockPokemonData);
        }),
      ],
    },
  },
};