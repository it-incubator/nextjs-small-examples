# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 educational project demonstrating hydration patterns with TanStack Query and Redux Toolkit Query. The project uses pnpm as the package manager and React 19.

## Development Commands

```bash
# Start development server with Turbopack
pnpm dev

# Start development server with debugging enabled
pnpm debug

# Start development server with HTTPS
pnpm devHttps

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Architecture

### State Management Dual Pattern

This project uses **both** state management libraries side-by-side for educational comparison:

1. **Redux Toolkit Query (RTK Query)**: `src/store/services/coursesApi.ts`
   - Configured in the Redux store with middleware
   - Used in `courses-list-tanstack-infinity.tsx` for mutations
   - Features optimistic updates via `onQueryStarted`

2. **TanStack Query**: Primary data fetching solution
   - Configured with `staleTime: Infinity` in `src/store/store.ts`
   - Query client exposed on `window.__TANSTACK_QUERY_CLIENT__` for debugging
   - Used in most components for queries and mutations

### Hydration Pattern

The project demonstrates SSR hydration with TanStack Query:

- **Without SSR**: `/courses` page (`src/app/courses/page.tsx`)
  - Client-side data fetching only
  - No initial data from server

- **With SSR**: `/courses/ssr` page (`src/app/courses/ssr/page.tsx`)
  - Server fetches initial data
  - Passed to client component via `ssrItems` prop
  - `initialData` callback in useQuery hydrates from SSR data
  - Pagination starts at page 2 for infinite queries when SSR data present

### Component Architecture

**StoreWrapper Pattern**: `src/store/store-wrapper.tsx`
- Single client component wrapping both Redux Provider and QueryClientProvider
- Applied at root layout level (`src/app/layout.tsx`)
- Enables both Redux and TanStack Query throughout the app

**Server/Client Component Demos**: `/demo` routes
- `/demo/client`: Pure client component (uses 'use client')
- `/demo/server`: Server component that can render other server components inside client wrappers via children pattern (`ClientWrapper.tsx`)
- Demonstrates RSC composition rules

### API Routes

All routes use `export const dynamic = 'force-dynamic'` to prevent caching:

- `GET /api/courses?page={page}&limit={limit}`: Paginated courses list
- `PATCH /api/courses/[id]/like`: Toggle course like status

Data source: `src/db/db.ts` - 50 mock courses

### Query Patterns

**Standard Pagination**: `courses-list-tanstack.tsx`
- Uses `useQuery` with page-based query keys
- `initialData` callback checks for SSR data on page 1
- Manual pagination via state

**Infinite Scroll**: `courses-list-tanstack-infinity.tsx`
- Uses `useInfiniteQuery`
- When SSR data present: initializes with `pages: [ssrItems]` and `initialPageParam: 2`
- When no SSR: starts from page 1
- Flattens pages for rendering

## Key Technical Details

- **Next.js App Router**: Uses App Router (not Pages Router)
- **React Server Components**: Default components are server components unless marked with 'use client'
- **Turbopack**: Development server uses Turbopack for faster builds
- **TypeScript**: Fully typed with strict typing for Redux hooks (`useAppSelector`, `useAppDispatch`, `useAppStore`)
- **Port**: Development server runs on `localhost:3000`
