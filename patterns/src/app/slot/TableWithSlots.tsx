'use client'

import { ReactNode } from 'react'

// Table with slots - Refactored to accept rendered rows as slot
type TableWithSlotsProps = {
  header?: ReactNode
  rows: ReactNode
  toolbar?: ReactNode
  summary?: ReactNode
  emptyState?: ReactNode
  isEmpty?: boolean
}

export function TableWithSlots({ header, rows, toolbar, summary, emptyState, isEmpty }: TableWithSlotsProps) {
  console.log('🟡 TableWithSlots render')

  if (isEmpty && emptyState) {
    return <div>{emptyState}</div>
  }

  return (
    <div>
      {toolbar && (
        <div style={{
          padding: '16px',
          backgroundColor: '#e9ecef',
          borderRadius: '8px 8px 0 0',
          marginBottom: '-1px'
        }}>
          {toolbar}
        </div>
      )}

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #dee2e6',
        borderRadius: toolbar ? '0 0 8px 8px' : '8px'
      }}>
        {header && (
          <thead>
            {header}
          </thead>
        )}
        <tbody>
          {rows}
        </tbody>
      </table>

      {summary && (
        <div style={{
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '0 0 8px 8px',
          border: '1px solid #dee2e6',
          borderTop: 'none',
          marginTop: '-1px'
        }}>
          {summary}
        </div>
      )}
    </div>
  )
}
