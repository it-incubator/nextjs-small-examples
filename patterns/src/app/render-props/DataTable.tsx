'use client'

// Render Props Pattern: DataTable component that accepts render functions
type DataTableProps<T> = {
  data: T[]
  renderRow: (item: T, index: number) => React.ReactNode
  renderHeader?: () => React.ReactNode
  renderEmpty?: () => React.ReactNode
}

export function DataTable<T>({ data, renderRow, renderHeader, renderEmpty }: DataTableProps<T>) {
  console.log('🔴 DataTable render')

  if (data.length === 0) {
    return <div>{renderEmpty?.() || 'No data'}</div>
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      {renderHeader && (
        <thead>
          {renderHeader()}
        </thead>
      )}
      <tbody>
        {data.map((item, index) => renderRow(item, index))}
      </tbody>
    </table>
  )
}
