'use client'

import { ReactNode } from 'react'

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  console.log('🟡 Section render')
  return (
    <section style={{
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
      {children}
    </section>
  )
}
