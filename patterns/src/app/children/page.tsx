'use client'

import { useState } from 'react'
import { Container } from './Container'
import { Section } from './Section'
import { Panel } from './Panel'
import { Grid } from './Grid'
import { Box } from './Box'
import { Table, TableHeader, TableBody, TableRow, TableCell } from './Table'

console.log('🔵 ChildrenPage module loaded')

// Types
type Task = {
  id: number
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  assignee: string
}

const mockTasks: Task[] = [
  { id: 1, title: 'Fix login bug', description: 'Users cannot login with special characters', priority: 'high', completed: false, assignee: 'Alice' },
  { id: 2, title: 'Update documentation', description: 'Add examples for new API', priority: 'medium', completed: false, assignee: 'Bob' },
  { id: 3, title: 'Refactor database queries', description: 'Optimize slow queries', priority: 'high', completed: true, assignee: 'Charlie' },
  { id: 4, title: 'Design new landing page', description: 'Create mockups for homepage redesign', priority: 'low', completed: false, assignee: 'Diana' },
  { id: 5, title: 'Set up CI/CD pipeline', description: 'Automate deployment process', priority: 'medium', completed: true, assignee: 'Eve' },
]

export default function ChildrenPage() {
  console.log('🌟 ChildrenPage render')

  const [tasks, setTasks] = useState(mockTasks)
  const [counter, setCounter] = useState(0)
  const [showCompleted, setShowCompleted] = useState(true)

  const filteredTasks = showCompleted ? tasks : tasks.filter(t => !t.completed)

  const toggleTask = (id: number) => {
    console.log(`✅ Toggle task ${id}`)
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '#dc3545'
      case 'medium': return '#ffc107'
      case 'low': return '#28a745'
    }
  }

  return (
    <Container>
      <h1>Children Pattern (Composition)</h1>
      <p>
        The Children pattern is the most fundamental React pattern. It allows you to compose
        components by nesting them, passing content through the children prop. This creates
        flexible, reusable wrapper components. Check the console to see rerenders!
      </p>

      <Section>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setCounter(c => c + 1)} style={{ padding: '10px 20px' }}>
            Increment Counter: {counter}
          </button>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            style={{ padding: '10px 20px' }}
          >
            {showCompleted ? 'Hide' : 'Show'} Completed
          </button>
        </div>

        <Panel variant="info">
          <strong>Info:</strong> This entire page is built using composition with the children pattern.
          Every component (Container, Section, Panel, Grid, Box, Table) accepts children!
        </Panel>
      </Section>

      <Section title="Task Management Table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Status</TableCell>
              <TableCell header>Title</TableCell>
              <TableCell header>Description</TableCell>
              <TableCell header>Priority</TableCell>
              <TableCell header>Assignee</TableCell>
              <TableCell header>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map(task => (
              <TableRow key={task.id} highlighted={!task.completed && task.priority === 'high'}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                </TableCell>
                <TableCell>
                  <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.title}
                  </strong>
                </TableCell>
                <TableCell>
                  <span style={{ color: task.completed ? '#6c757d' : 'inherit' }}>
                    {task.description}
                  </span>
                </TableCell>
                <TableCell>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: getPriorityColor(task.priority),
                    color: 'white',
                    fontSize: '12px',
                    textTransform: 'uppercase'
                  }}>
                    {task.priority}
                  </span>
                </TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>
                  <button
                    onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      <Section title="Task Statistics">
        <Grid columns={3}>
          <Box>
            <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Total Tasks</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{tasks.length}</div>
          </Box>
          <Box>
            <h3 style={{ margin: '0 0 10px 0', color: '#28a745' }}>Completed</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {tasks.filter(t => t.completed).length}
            </div>
          </Box>
          <Box>
            <h3 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>Pending</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {tasks.filter(t => !t.completed).length}
            </div>
          </Box>
        </Grid>
      </Section>

      <Section title="Priority Breakdown">
        <Grid columns={2}>
          {(['high', 'medium', 'low'] as const).map(priority => {
            const tasksForPriority = tasks.filter(t => t.priority === priority)
            return (
              <Panel key={priority} variant={priority === 'high' ? 'warning' : priority === 'medium' ? 'info' : 'success'}>
                <h4 style={{ margin: '0 0 10px 0', textTransform: 'capitalize' }}>{priority} Priority</h4>
                <div>
                  <strong>{tasksForPriority.length}</strong> tasks
                </div>
                <div style={{ marginTop: '8px', fontSize: '14px', color: '#6c757d' }}>
                  {tasksForPriority.filter(t => t.completed).length} completed,{' '}
                  {tasksForPriority.filter(t => !t.completed).length} pending
                </div>
              </Panel>
            )
          })}
        </Grid>
      </Section>

      <Section>
        <Panel variant="success">
          <h3>How the Children Pattern Works:</h3>
          <ul>
            <li>Components accept a `children` prop containing nested content</li>
            <li>Enables composition - building complex UIs from simple, reusable pieces</li>
            <li>Children can be any valid React node (elements, strings, numbers, etc.)</li>
            <li>Perfect for wrapper components (Container, Section, Box, Panel, Grid)</li>
            <li>Most fundamental and widely-used React pattern</li>
            <li>All components on this page use this pattern!</li>
          </ul>
        </Panel>
      </Section>
    </Container>
  )
}
