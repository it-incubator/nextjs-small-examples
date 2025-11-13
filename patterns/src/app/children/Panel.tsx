'use client'

import { ReactNode } from 'react'

export function Panel({ variant = 'default', children }: { variant?: 'default' | 'info' | 'warning' | 'success'; children: ReactNode }) {
  console.log('🟢 Panel render')

  const colors = {
    default: { bg: '#f8f9fa', border: '#dee2e6' },
    info: { bg: '#d1ecf1', border: '#bee5eb' },
    warning: { bg: '#fff3cd', border: '#ffeaa7' },
    success: { bg: '#d4edda', border: '#c3e6cb' }
  }

  const style = colors[variant]

  return (
    <div style={{
      padding: '16px',
      backgroundColor: style.bg,
      border: `1px solid ${style.border}`,
      borderRadius: '8px',
      marginBottom: '16px'
    }}>
      {children}
    </div>
  )
}
