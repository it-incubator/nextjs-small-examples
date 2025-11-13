'use client'

import { useState } from 'react'
import { DataTable } from './DataTable'
import { List } from './List'

console.log('🔵 RenderPropsPage module loaded')

// Types for our table data
type User = {
  id: number
  name: string
  email: string
  role: string
}

const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'User' },
  { id: 5, name: 'Eve Adams', email: 'eve@example.com', role: 'Admin' },
]

export default function RenderPropsPage() {
  console.log('🟢 RenderPropsPage render')

  const [users, setUsers] = useState(mockUsers)
  const [counter, setCounter] = useState(0)
  const [highlightedRole, setHighlightedRole] = useState<string | null>(null)

  const deleteUser = (id: number) => {
    console.log(`🗑️ Deleting user ${id}`)
    setUsers(users.filter(u => u.id !== id))
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Render Props Pattern</h1>
      <p>
        The Render Props pattern allows components to share logic while giving full control
        over the rendering to the consumer. Check the console to see rerenders!
      </p>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setCounter(c => c + 1)}
          style={{ padding: '10px 20px' }}
        >
          Increment Counter: {counter}
        </button>
        <button
          onClick={() => setHighlightedRole(highlightedRole === 'Admin' ? null : 'Admin')}
          style={{ padding: '10px 20px' }}
        >
          Toggle Highlight Admins
        </button>
      </div>

      <h2>Table with Render Props</h2>
      <DataTable
        data={users}
        renderHeader={() => (
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Role</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        )}
        renderRow={(user: User) => (
          <tr
            key={user.id}
            style={{
              backgroundColor: highlightedRole === user.role ? '#fff3cd' : 'white',
              transition: 'background-color 0.3s'
            }}
          >
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.id}</td>
            <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>{user.name}</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: user.role === 'Admin' ? '#d4edda' : user.role === 'Editor' ? '#cce5ff' : '#f8f9fa',
                color: user.role === 'Admin' ? '#155724' : user.role === 'Editor' ? '#004085' : '#383d41',
              }}>
                {user.role}
              </span>
            </td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
              <button
                onClick={() => deleteUser(user.id)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        )}
        renderEmpty={() => (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6c757d' }}>
            No users found
          </div>
        )}
      />

      <h2>List with Render Props</h2>
      <List
        items={users}
        renderItem={(user: User) => {
            console.log("⭐️ renderItem")
            return (
                <div style={{
                    padding: '16px',
                    marginBottom: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <strong>{user.name}</strong>
                        <div style={{fontSize: '14px', color: '#6c757d'}}>{user.email}</div>
                    </div>
                    <div style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        fontSize: '12px'
                    }}>
                        {user.role}
                    </div>
                </div>
            );
        }}
        renderFooter={(count) => (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#e9ecef',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            Total users: {count}
          </div>
        )}
      />
    </div>
  )
}
