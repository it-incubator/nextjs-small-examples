'use client'

export function TableHeader() {
  console.log('🟡 TableHeader render')

  return (
    <thead>
      <tr style={{ backgroundColor: '#f8f9fa' }}>
        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>ID</th>
        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Name</th>
        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Position</th>
        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Department</th>
        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Salary</th>
        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Status</th>
        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Actions</th>
      </tr>
    </thead>
  )
}
