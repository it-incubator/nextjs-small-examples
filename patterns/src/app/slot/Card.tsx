'use client'

import { ReactNode } from 'react'

// Slot Pattern: Components accept specific "slots" as props
type CardProps = {
  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode
  aside?: ReactNode
}

export function Card({ header, body, footer, aside }: CardProps) {
  console.log('🔴 Card render')

  return (
    <div style={{
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: 'white',
      display: 'grid',
      gridTemplateColumns: aside ? '1fr 300px' : '1fr',
      gap: 0
    }}>
      <div>
        {header && (
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderBottom: '2px solid #dee2e6'
          }}>
            {header}
          </div>
        )}
        {body && (
          <div style={{ padding: '20px' }}>
            {body}
          </div>
        )}
        {footer && (
          <div style={{
            padding: '16px 20px',
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #dee2e6'
          }}>
            {footer}
          </div>
        )}
      </div>
      {aside && (
        <div style={{
          padding: '20px',
          backgroundColor: '#e9ecef',
          borderLeft: '1px solid #dee2e6'
        }}>
          {aside}
        </div>
      )}
    </div>
  )
}
