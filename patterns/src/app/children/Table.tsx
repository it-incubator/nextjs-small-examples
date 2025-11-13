'use client'

import { ReactNode } from 'react'

// Table using children pattern
export function Table({ children }: { children: ReactNode }) {
  console.log('🟤 Table (children) render')
  return (
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {children}
    </table>
  )
}

export function TableHeader({ children }: { children: ReactNode }) {
  console.log('⚫ TableHeader render')
  return (
    <thead style={{ backgroundColor: '#f8f9fa' }}>
      {children}
    </thead>
  )
}

export function TableBody({ children }: { children: ReactNode }) {
  console.log('⚪ TableBody render')
  return <tbody>{children}</tbody>
}

export function TableRow({ highlighted = false, children }: { highlighted?: boolean; children: ReactNode }) {
  console.log('🔷 TableRow render')
  return (
    <tr style={{
      backgroundColor: highlighted ? '#fff3cd' : 'inherit',
      borderBottom: '1px solid #dee2e6'
    }}>
      {children}
    </tr>
  )
}

export function TableCell({ header = false, children }: { header?: boolean; children: ReactNode }) {
  console.log('🔸 TableCell render')
  const Tag = header ? 'th' : 'td'
  return (
    <Tag style={{
      padding: '12px',
      textAlign: 'left',
      fontWeight: header ? 'bold' : 'normal',
      borderBottom: header ? '2px solid #dee2e6' : undefined
    }}>
      {children}
    </Tag>
  )
}
