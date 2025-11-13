'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// Compound Component Pattern: Table context and sub-components
type TableContextType<T> = {
  data: T[]
  selectedRows: Set<number>
  toggleRow: (index: number) => void
  selectAll: () => void
  clearSelection: () => void
}

const TableContext = createContext<TableContextType<any> | null>(null)

function useTableContext<T>() {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('Table compound components must be used within Table')
  }
  return context as TableContextType<T>
}

// Main Table component
type TableProps<T> = {
  data: T[]
  children: ReactNode
}

function Table<T>({ data, children }: TableProps<T>) {
  console.log('🔴 Table render')

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())

  const toggleRow = (index: number) => {
    console.log(`🔘 Toggle row ${index}`)
    const newSelection = new Set(selectedRows)
    if (newSelection.has(index)) {
      newSelection.delete(index)
    } else {
      newSelection.add(index)
    }
    setSelectedRows(newSelection)
  }

  const selectAll = () => {
    console.log('✅ Select all rows')
    setSelectedRows(new Set(data.map((_, i) => i)))
  }

  const clearSelection = () => {
    console.log('❌ Clear selection')
    setSelectedRows(new Set())
  }

  return (
    <TableContext.Provider value={{ data, selectedRows, toggleRow, selectAll, clearSelection }}>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        {children}
      </div>
    </TableContext.Provider>
  )
}

// Table.Header sub-component
function TableHeader({ children }: { children: ReactNode }) {
  console.log('🟡 TableHeader render')
  return (
    <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
      {children}
    </div>
  )
}

// Table.Toolbar sub-component
function TableToolbar({ children }: { children: ReactNode }) {
  console.log('🟢 TableToolbar render')
  const { selectedRows, selectAll, clearSelection } = useTableContext()

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: '#e9ecef',
      borderBottom: '1px solid #dee2e6'
    }}>
      <button onClick={selectAll} style={{ padding: '8px 16px' }}>
        Select All
      </button>
      <button onClick={clearSelection} style={{ padding: '8px 16px' }}>
        Clear
      </button>
      <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>
        Selected: {selectedRows.size}
      </span>
      {children}
    </div>
  )
}

// Table.Body sub-component
function TableBody<T>({ renderRow }: { renderRow: (item: T, index: number, isSelected: boolean) => ReactNode }) {
  console.log('🟣 TableBody render')
  const { data, selectedRows } = useTableContext<T>()

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          {renderRow(item, index, selectedRows.has(index))}
        </div>
      ))}
    </div>
  )
}

// Table.Row sub-component
function TableRow({ children, index, isSelected }: { children: ReactNode; index: number; isSelected: boolean }) {
  console.log(`🔶 TableRow ${index} render`)
  const { toggleRow } = useTableContext()

  return (
    <div
      onClick={() => toggleRow(index)}
      style={{
        padding: '16px',
        backgroundColor: isSelected ? '#d1ecf1' : 'white',
        borderBottom: '1px solid #dee2e6',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto auto auto',
        gap: '16px',
        alignItems: 'center'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.backgroundColor = '#f8f9fa'
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.backgroundColor = 'white'
      }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => { }}
        style={{ width: '18px', height: '18px' }}
      />
      {children}
    </div>
  )
}

// Table.Footer sub-component
function TableFooter({ children }: { children: ReactNode }) {
  console.log('🟤 TableFooter render')
  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#f8f9fa',
      borderTop: '2px solid #dee2e6',
      textAlign: 'center'
    }}>
      {children}
    </div>
  )
}

// Attach sub-components to Table
Table.Header = TableHeader
Table.Toolbar = TableToolbar
Table.Body = TableBody
Table.Row = TableRow
Table.Footer = TableFooter

export { Table, useTableContext }
