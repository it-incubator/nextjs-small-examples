This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Example with multi-zones using rewrites config: host and micro-frontend apps

## Getting Started

First, run the development servers for both apps (in host and zone directories):

1. Go to host directory:
```bash
cd host
```
2. Run the development server for host:
```bash
pnpm dev
```
3. Go to zone directory:
```bash
cd zone
```
4. Run the development server for zone:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the host app with links to micro-frontend app (zone).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.