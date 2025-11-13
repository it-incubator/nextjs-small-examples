'use client'

import { useState } from 'react'
import { EmployeeRow, type Employee } from './EmployeeRow'
import { TableHeader } from './TableHeader'

console.log('🔵 SimplePage module loaded')

const mockEmployees: Employee[] = [
  { id: 1, name: 'John Smith', position: 'Developer', department: 'Engineering', salary: 85000, status: 'active' },
  { id: 2, name: 'Sarah Johnson', position: 'Designer', department: 'Design', salary: 75000, status: 'active' },
  { id: 3, name: 'Mike Williams', position: 'Manager', department: 'Engineering', salary: 95000, status: 'on-leave' },
  { id: 4, name: 'Emily Brown', position: 'Developer', department: 'Engineering', salary: 80000, status: 'active' },
  { id: 5, name: 'David Lee', position: 'QA Engineer', department: 'QA', salary: 70000, status: 'inactive' },
  { id: 6, name: 'Lisa Chen', position: 'Product Manager', department: 'Product', salary: 90000, status: 'active' },
]

export default function SimplePage() {
  console.log('🟢 SimplePage render')

  const [employees, setEmployees] = useState(mockEmployees)
  const [counter, setCounter] = useState(0)
  const [filterDepartment, setFilterDepartment] = useState<string>('all')

  const deleteEmployee = (id: number) => {
    console.log(`🗑️ Deleting employee ${id}`)
    setEmployees(employees.filter(e => e.id !== id))
  }

  const toggleEmployeeStatus = (id: number) => {
    console.log(`🔄 Toggling status for employee ${id}`)
    setEmployees(employees.map(e => {
      if (e.id === id) {
        const statusCycle: Employee['status'][] = ['active', 'inactive', 'on-leave']
        const currentIndex = statusCycle.indexOf(e.status)
        const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length]
        return { ...e, status: nextStatus }
      }
      return e
    }))
  }

  const filteredEmployees = filterDepartment === 'all'
    ? employees
    : employees.filter(e => e.department === filterDepartment)

  const departments = Array.from(new Set(mockEmployees.map(e => e.department)))

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>Simple Table - No Patterns</h1>
      <p>
        This is a basic table implementation without using any React patterns.
        Each row is a component that renders itself with all logic inline.
        Check the console to see rerenders - notice how this compares to pattern-based approaches!
      </p>

      <div style={{
        marginTop: '20px',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#e9ecef',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCounter(c => c + 1)}
            style={{ padding: '10px 20px' }}
          >
            Increment Counter: {counter}
          </button>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label style={{ fontWeight: 'bold' }}>Filter by Department:</label>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ced4da'
              }}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div style={{
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: 'white'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHeader />
          <tbody>
            {filteredEmployees.map(employee => (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                onDelete={deleteEmployee}
                onToggleStatus={toggleEmployeeStatus}
              />
            ))}
          </tbody>
        </table>

        {filteredEmployees.length === 0 && (
          <div style={{
            padding: '60px',
            textAlign: 'center',
            color: '#6c757d',
            backgroundColor: 'white'
          }}>
            No employees found
          </div>
        )}
      </div>

      <div style={{
        marginTop: '30px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          border: '1px solid #dee2e6',
          borderRadius: '8px'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Total Employees</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{employees.length}</div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          border: '1px solid #dee2e6',
          borderRadius: '8px'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#28a745' }}>Active</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            {employees.filter(e => e.status === 'active').length}
          </div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          border: '1px solid #dee2e6',
          borderRadius: '8px'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#ffc107' }}>On Leave</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            {employees.filter(e => e.status === 'on-leave').length}
          </div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          border: '1px solid #dee2e6',
          borderRadius: '8px'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>Inactive</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            {employees.filter(e => e.status === 'inactive').length}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#d1ecf1',
        borderRadius: '8px',
        borderLeft: '4px solid #0c5460'
      }}>
        <h3>About This Implementation:</h3>
        <ul style={{ marginTop: '12px', lineHeight: '1.8' }}>
          <li><strong>No Patterns:</strong> Just straightforward React components</li>
          <li><strong>Self-Rendering Items:</strong> Each EmployeeRow component handles its own rendering</li>
          <li><strong>Direct Props:</strong> Callbacks passed directly as props (onDelete, onToggleStatus)</li>
          <li><strong>Simple Structure:</strong> Easy to understand but less reusable</li>
          <li><strong>Console Logging:</strong> Watch how each row rerenders independently</li>
        </ul>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        borderRadius: '8px',
        borderLeft: '4px solid #856404'
      }}>
        <h3>Rerender Behavior:</h3>
        <p style={{ marginTop: '12px', lineHeight: '1.6' }}>
          When you click "Increment Counter", notice that ALL EmployeeRow components rerender,
          even though the employee data hasn't changed. This is because the parent SimplePage
          rerenders, causing all children to rerender too. Patterns like React.memo, useCallback,
          or the patterns shown in other pages can help optimize this behavior.
        </p>
      </div>
    </div>
  )
}
