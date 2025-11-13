'use client'

// List with render props for different item types
type ListProps<T> = {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  renderFooter?: (count: number) => React.ReactNode
}

export function List<T>({ items, renderItem, renderFooter }: ListProps<T>) {
  console.log('🟡 List render')

  return (
    <div style={{ marginTop: '20px' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))}
      </ul>
      {renderFooter && renderFooter(items.length)}
    </div>
  )
}
