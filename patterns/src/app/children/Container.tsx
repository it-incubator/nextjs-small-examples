'use client'

import { ReactNode } from 'react'

export function Container({ children }: { children: ReactNode }) {
  console.log('🔴 Container render')
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    }}>
      {children}
    </div>
  )
}
