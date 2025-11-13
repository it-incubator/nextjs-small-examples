'use client'

import { ReactNode } from 'react'

export function Grid({ columns = 2, gap = '20px', children }: { columns?: number; gap?: string; children: ReactNode }) {
  console.log('🟣 Grid render')
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap
    }}>
      {children}
    </div>
  )
}
