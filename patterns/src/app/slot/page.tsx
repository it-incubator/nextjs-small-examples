'use client'

import { useState } from 'react'
import { Card } from './Card'
import { TableWithSlots } from './TableWithSlots'
import { LayoutWithSlots } from './LayoutWithSlots'

console.log('🔵 SlotPage module loaded')

// Types
type Order = {
  id: number
  customer: string
  product: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  date: string
}

const mockOrders: Order[] = [
  { id: 1001, customer: 'John Doe', product: 'Laptop', amount: 1299, status: 'delivered', date: '2025-11-01' },
  { id: 1002, customer: 'Jane Smith', product: 'Phone', amount: 899, status: 'shipped', date: '2025-11-10' },
  { id: 1003, customer: 'Bob Johnson', product: 'Tablet', amount: 499, status: 'processing', date: '2025-11-12' },
  { id: 1004, customer: 'Alice Williams', product: 'Headphones', amount: 199, status: 'pending', date: '2025-11-13' },
  { id: 1005, customer: 'Charlie Brown', product: 'Smartwatch', amount: 299, status: 'shipped', date: '2025-11-11' },
]

export default function SlotPage() {
  console.log('🌟 SlotPage render')

  const [orders, setOrders] = useState(mockOrders)
  const [counter, setCounter] = useState(0)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus)

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return { bg: '#fff3cd', color: '#856404' }
      case 'processing': return { bg: '#cce5ff', color: '#004085' }
      case 'shipped': return { bg: '#d1ecf1', color: '#0c5460' }
      case 'delivered': return { bg: '#d4edda', color: '#155724' }
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>Slot Pattern</h1>
      <p>
        The Slot pattern allows you to pass components as props to specific named "slots"
        in the parent component, giving you full control over what gets rendered in each area.
        Check the console to see rerenders!
      </p>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setCounter(c => c + 1)} style={{ padding: '10px 20px' }}>
          Increment Counter: {counter}
        </button>
      </div>

      <LayoutWithSlots
        topBar={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Order Management System</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ padding: '8px 16px' }}>Add Order</button>
              <button style={{ padding: '8px 16px' }}>Export</button>
            </div>
          </div>
        }
        sidebar={
          <div>
            <h3>Filters</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['all', 'pending', 'processing', 'shipped', 'delivered'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  style={{
                    padding: '10px',
                    textAlign: 'left',
                    backgroundColor: filterStatus === status ? '#007bff' : 'white',
                    color: filterStatus === status ? 'white' : 'black',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
            <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
              <strong>Stats:</strong>
              <div style={{ marginTop: '8px', fontSize: '14px' }}>
                Total: {orders.length}<br />
                Filtered: {filteredOrders.length}
              </div>
            </div>
          </div>
        }
        main={
          <div>
            <TableWithSlots
              isEmpty={filteredOrders.length === 0}
              header={
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: 'bold'
                  }}>
                    Order ID
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: 'bold'
                  }}>
                    Customer
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: 'bold'
                  }}>
                    Product
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: 'bold'
                  }}>
                    Amount
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: 'bold'
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: 'bold'
                  }}>
                    Date
                  </th>
                </tr>
              }
              rows={
                <>
                  {filteredOrders.map((order, rowIdx) => {
                    const colors = getStatusColor(order.status)
                    return (
                      <tr key={order.id} style={{
                        borderBottom: '1px solid #dee2e6',
                        backgroundColor: rowIdx % 2 === 0 ? 'white' : '#f8f9fa'
                      }}>
                        <td style={{ padding: '12px' }}>
                          <strong>#{order.id}</strong>
                        </td>
                        <td style={{ padding: '12px' }}>
                          {order.customer}
                        </td>
                        <td style={{ padding: '12px' }}>
                          {order.product}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <strong style={{ color: '#28a745' }}>${order.amount}</strong>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            backgroundColor: colors.bg,
                            color: colors.color,
                            fontSize: '12px',
                            textTransform: 'capitalize'
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          {order.date}
                        </td>
                      </tr>
                    )
                  })}
                </>
              }
              toolbar={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <input
                    type="search"
                    placeholder="Search orders..."
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      width: '300px'
                    }}
                  />
                  <div>
                    Showing {filteredOrders.length} of {orders.length} orders
                  </div>
                </div>
              }
              summary={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong>Total Revenue:</strong> ${filteredOrders.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}
                  </div>
                  <div>
                    <strong>Average Order:</strong> ${Math.round(filteredOrders.reduce((sum, o) => sum + o.amount, 0) / filteredOrders.length || 0)}
                  </div>
                </div>
              }
              emptyState={
                <div style={{ padding: '60px', textAlign: 'center', color: '#6c757d' }}>
                  No orders found
                </div>
              }
            />

            <div style={{ marginTop: '40px' }}>
              <h3>Card Example with Slots</h3>
              <Card
                header={<h3 style={{ margin: 0 }}>Order Details</h3>}
                body={
                  <div>
                    <p>This is an example of a card component using the slot pattern.</p>
                    <p>Different slots (header, body, footer, aside) can be filled with any content.</p>
                  </div>
                }
                footer={
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ padding: '8px 16px' }}>Save</button>
                    <button style={{ padding: '8px 16px' }}>Cancel</button>
                  </div>
                }
                aside={
                  <div>
                    <h4>Quick Info</h4>
                    <ul style={{ paddingLeft: '20px' }}>
                      <li>Total Orders: {orders.length}</li>
                      <li>Pending: {orders.filter(o => o.status === 'pending').length}</li>
                      <li>Delivered: {orders.filter(o => o.status === 'delivered').length}</li>
                    </ul>
                  </div>
                }
              />
            </div>
          </div>
        }
      />

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#d1ecf1', borderRadius: '8px' }}>
        <h3>How the Slot Pattern Works:</h3>
        <ul>
          <li>Components accept specific named props (slots) for different areas</li>
          <li>Each slot can receive any React node (elements, components, etc.)</li>
          <li>Provides flexibility while maintaining structure</li>
          <li>Different from children prop - you can have multiple named slots</li>
          <li>Great for layouts, cards, modals, and complex UI structures</li>
          <li><strong>TableWithSlots example:</strong> The parent renders header and rows, passing them as slots (header, rows, toolbar, summary, emptyState)</li>
          <li>This gives the parent full control over rendering while TableWithSlots handles the structure</li>
        </ul>
      </div>
    </div>
  )
}
