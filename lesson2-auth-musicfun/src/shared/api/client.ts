import createClient from 'openapi-fetch'

import type { paths } from './schema'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!

// API-KEY goes on every request as a default header.
// (No auth middleware yet — we'll add token injection + 401 refresh later.)
export const apiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
  headers: {
    'API-KEY': API_KEY,
  },
})
