'use client'

type Employee = {
  id: number
  name: string
  position: string
  department: string
  salary: number
  status: 'active' | 'inactive' | 'on-leave'
}

type EmployeeRowProps = {
  employee: Employee
  onDelete: (id: number) => void
  onToggleStatus: (id: number) => void
}

export function EmployeeRow({ employee, onDelete, onToggleStatus }: EmployeeRowProps) {
  console.log(`🔴 EmployeeRow ${employee.id} render`)

  const getStatusColor = (status: Employee['status']) => {
    switch (status) {
      case 'active': return { bg: '#d4edda', color: '#155724' }
      case 'inactive': return { bg: '#f8d7da', color: '#721c24' }
      case 'on-leave': return { bg: '#fff3cd', color: '#856404' }
    }
  }

  const statusColors = getStatusColor(employee.status)

  return (
    <tr style={{ borderBottom: '1px solid #dee2e6' }}>
      <td style={{ padding: '12px' }}>{employee.id}</td>
      <td style={{ padding: '12px', fontWeight: 'bold' }}>{employee.name}</td>
      <td style={{ padding: '12px' }}>{employee.position}</td>
      <td style={{ padding: '12px' }}>
        <span style={{
          padding: '4px 8px',
          borderRadius: '4px',
          backgroundColor: '#e7f3ff',
          color: '#0066cc',
          fontSize: '12px'
        }}>
          {employee.department}
        </span>
      </td>
      <td style={{ padding: '12px', fontWeight: 'bold', color: '#28a745' }}>
        ${employee.salary.toLocaleString()}
      </td>
      <td style={{ padding: '12px' }}>
        <span style={{
          padding: '4px 12px',
          borderRadius: '12px',
          backgroundColor: statusColors.bg,
          color: statusColors.color,
          fontSize: '12px',
          textTransform: 'capitalize'
        }}>
          {employee.status.replace('-', ' ')}
        </span>
      </td>
      <td style={{ padding: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onToggleStatus(employee.id)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Toggle Status
          </button>
          <button
            onClick={() => onDelete(employee.id)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export type { Employee }
