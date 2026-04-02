'use client'

import { useState, useEffect } from 'react'

const FREE_GENERATIONS = 10

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('siteforge_projects')
    if (stored) {
      setProjects(JSON.parse(stored))
    }
  }, [])

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>Projects</h1>
          <p style={{ color: '#86868b', fontSize: '0.875rem' }}>All your generated websites in one place</p>
        </div>
        <a href="/app" style={{
          padding: '0.75rem 1.5rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '10px',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          + New Project
        </a>
      </div>

      {projects.length === 0 ? (
        <div style={{ background: '#0a0a0a', borderRadius: '16px', padding: '4rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>No projects yet</h3>
          <p style={{ color: '#86868b', marginBottom: '1.5rem' }}>Start building and your projects will appear here</p>
          <a href="/app" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '10px',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Create your first project
          </a>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {projects.map((project, i) => (
            <div key={i} style={{ background: '#0a0a0a', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ height: '180px', background: '#fff' }}>
                <iframe srcDoc={project.code} style={{ width: '100%', height: '100%', border: 'none' }} sandbox="allow-scripts" />
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{project.name || 'Untitled'}</h3>
                <p style={{ fontSize: '0.75rem', color: '#666' }}>{new Date(project.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
