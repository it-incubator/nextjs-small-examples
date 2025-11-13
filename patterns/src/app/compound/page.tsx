'use client'

import { useState } from 'react'
import { Table, useTableContext } from './Table'

console.log('🔵 CompoundPage module loaded')

// Types
type Product = {
  id: number
  name: string
  price: number
  category: string
  stock: number
}

const mockProducts: Product[] = [
  { id: 1, name: 'Laptop Pro', price: 1299, category: 'Electronics', stock: 15 },
  { id: 2, name: 'Wireless Mouse', price: 29, category: 'Electronics', stock: 50 },
  { id: 3, name: 'Desk Chair', price: 199, category: 'Furniture', stock: 8 },
  { id: 4, name: 'Standing Desk', price: 599, category: 'Furniture', stock: 5 },
  { id: 5, name: 'Monitor 27"', price: 349, category: 'Electronics', stock: 20 },
]

export default function CompoundPage() {
  console.log('🌟 CompoundPage render')

  const [products, setProducts] = useState(mockProducts)
  const [counter, setCounter] = useState(0)

  const deleteSelected = (selectedIndices: Set<number>) => {
    console.log('🗑️ Deleting selected products')
    const newProducts = products.filter((_, index) => !selectedIndices.has(index))
    setProducts(newProducts)
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Compound Component Pattern</h1>
      <p>
        The Compound Component pattern allows you to create a set of components that work together,
        sharing implicit state. The sub-components (Header, Toolbar, Body, Footer) are aware of the
        parent Table context. Check the console to see rerenders!
      </p>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setCounter(c => c + 1)} style={{ padding: '10px 20px' }}>
          Increment Counter: {counter}
        </button>
      </div>

      <h2>Product Table with Compound Components</h2>

      <Table data={products}>
        <Table.Header>
          <h3 style={{ margin: 0 }}>Product Inventory</h3>
        </Table.Header>

        <Table.Toolbar>
          <button
            onClick={() => {
              const { selectedRows } = useTableContext()
              deleteSelected(selectedRows)
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete Selected
          </button>
        </Table.Toolbar>

        <Table.Body<Product>
          renderRow={(product, index, isSelected) => (
            <Table.Row index={index} isSelected={isSelected}>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{product.name}</div>
              <div>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: '#e7f3ff',
                  color: '#0066cc',
                  fontSize: '12px'
                }}>
                  {product.category}
                </span>
              </div>
              <div style={{ fontWeight: 'bold', color: '#28a745' }}>
                ${product.price}
              </div>
              <div style={{
                color: product.stock < 10 ? '#dc3545' : '#6c757d'
              }}>
                Stock: {product.stock}
              </div>
            </Table.Row>
          )}
        />

        <Table.Footer>
          <div>Total Products: {products.length} | Total Value: ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}</div>
        </Table.Footer>
      </Table>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
        <h3>How Compound Components Work:</h3>
        <ul>
          <li>The Table component manages state (selected rows) via Context</li>
          <li>Sub-components (Header, Toolbar, Body, Row, Footer) access this shared state</li>
          <li>They work together as a cohesive unit while maintaining flexibility</li>
          <li>You can compose them in any order and add/remove as needed</li>
          <li>Each component has a specific responsibility but shares implicit state</li>
        </ul>
      </div>
    </div>
  )
}
