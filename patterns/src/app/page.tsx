'use client'

import Link from "next/link"
import { useState } from "react"

console.log('🔵 Home page module loaded')

export default function Home() {
  console.log('🟢 Home page render')

  const [counter, setCounter] = useState(0)

  const patterns = [
    {
      name: 'Simple Table',
      path: '/simple',
      description: 'Basic table implementation without patterns. Each item renders itself directly with inline logic.',
      color: '#6c757d',
      emoji: '📊'
    },
    {
      name: 'Render Props',
      path: '/render-props',
      description: 'Share logic while giving full control over rendering to the consumer. Components accept render functions as props.',
      color: '#007bff',
      emoji: '🎯'
    },
    {
      name: 'Compound Components',
      path: '/compound',
      description: 'Create a set of components that work together, sharing implicit state through Context.',
      color: '#28a745',
      emoji: '🧩'
    },
    {
      name: 'Slot Pattern',
      path: '/slot',
      description: 'Pass components as props to specific named "slots", providing flexibility while maintaining structure.',
      color: '#ffc107',
      emoji: '🎰'
    },
    {
      name: 'Children Pattern',
      path: '/children',
      description: 'The most fundamental React pattern - compose components by nesting them using the children prop.',
      color: '#dc3545',
      emoji: '👶'
    }
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <header style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '30px 20px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '42px' }}>React Patterns Explorer</h1>
        <p style={{ margin: 0, fontSize: '18px', opacity: 0.9 }}>
          Interactive demonstrations of common React patterns with table implementations
        </p>
        <button
          onClick={() => setCounter(c => c + 1)}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Test Rerender Counter: {counter}
        </button>
      </header>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {patterns.map((pattern) => (
            <Link
              key={pattern.path}
              href={pattern.path}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: `3px solid ${pattern.color}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>{pattern.emoji}</div>
              <h2 style={{
                margin: '0 0 12px 0',
                fontSize: '24px',
                color: pattern.color
              }}>
                {pattern.name}
              </h2>
              <p style={{
                margin: 0,
                color: '#6c757d',
                lineHeight: '1.6'
              }}>
                {pattern.description}
              </p>
              <div style={{
                marginTop: '16px',
                padding: '8px 16px',
                backgroundColor: pattern.color,
                color: 'white',
                borderRadius: '6px',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                View Examples →
              </div>
            </Link>
          ))}
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, color: '#343a40' }}>About This Project</h2>
          <ul style={{ lineHeight: '1.8', color: '#495057' }}>
            <li><strong>Console Logging:</strong> All components log to console so you can track rerenders</li>
            <li><strong>Strict Mode:</strong> Disabled for accurate rerender tracking</li>
            <li><strong>React Compiler:</strong> Disabled to see natural React behavior</li>
            <li><strong>Client-Side:</strong> All components are client components for SPA investigation</li>
            <li><strong>Interactive Tables:</strong> Each pattern includes table implementations with state management</li>
          </ul>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#d1ecf1',
            borderRadius: '8px',
            borderLeft: '4px solid #0c5460'
          }}>
            <strong style={{ color: '#0c5460' }}>💡 Tip:</strong> Open your browser console (F12) to see component rerenders in real-time!
          </div>
        </div>

        <div style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: '#fff3cd',
          borderRadius: '12px',
          borderLeft: '4px solid #856404'
        }}>
          <h3 style={{ marginTop: 0, color: '#856404' }}>Pattern Comparison</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#ffeeba' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #856404' }}>Pattern</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #856404' }}>Best For</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #856404' }}>Complexity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #ffeeba' }}>Simple Table</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ffeeba' }}>Basic tables, learning, prototypes</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ffeeba' }}>Very Low</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #ffeeba' }}>Children</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ffeeba' }}>Simple composition & wrappers</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ffeeba' }}>Low</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #ffeeba' }}>Slot</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ffeeba' }}>Layouts with multiple named areas</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ffeeba' }}>Medium</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #ffeeba' }}>Render Props</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ffeeba' }}>Logic sharing with render control</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ffeeba' }}>Medium</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>Compound</td>
                <td style={{ padding: '12px' }}>Related components with shared state</td>
                <td style={{ padding: '12px' }}>High</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <footer style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <p style={{ margin: 0 }}>Built with Next.js 15 • Click any pattern above to explore</p>
      </footer>
    </div>
  )
}
