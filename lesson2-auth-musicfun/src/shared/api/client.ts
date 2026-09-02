import createClient, { type Middleware } from 'openapi-fetch'

import type { paths } from './schema'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!

export const apiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
  headers: {
    'API-KEY': API_KEY,
  },
})

const authMiddleware: Middleware = {
  onRequest() {},
}

apiClient.use(authMiddleware)
