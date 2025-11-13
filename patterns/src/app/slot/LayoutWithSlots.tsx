'use client'

import { ReactNode } from 'react'

// Layout with named slots
type LayoutWithSlotsProps = {
  sidebar?: ReactNode
  main: ReactNode
  topBar?: ReactNode
}

export function LayoutWithSlots({ sidebar, main, topBar }: LayoutWithSlotsProps) {
  console.log('🟢 LayoutWithSlots render')

  return (
    <div>
      {topBar && (
        <div style={{
          padding: '16px',
          backgroundColor: '#343a40',
          color: 'white',
          marginBottom: '20px',
          borderRadius: '8px'
        }}>
          {topBar}
        </div>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: sidebar ? '250px 1fr' : '1fr',
        gap: '20px'
      }}>
        {sidebar && (
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            {sidebar}
          </div>
        )}
        <div>
          {main}
        </div>
      </div>
    </div>
  )
}
