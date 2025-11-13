'use client'

import { ReactNode } from 'react'

export function Box({ padding = '16px', children }: { padding?: string; children: ReactNode }) {
  console.log('🔶 Box render')
  return (
    <div style={{
      padding,
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      backgroundColor: 'white'
    }}>
      {children}
    </div>
  )
}
