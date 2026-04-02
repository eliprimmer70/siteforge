'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [hoveredProject, setHoveredProject] = useState(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = () => {
    const stored = localStorage.getItem('siteforge_projects')
    if (stored) {
      try {
        setProjects(JSON.parse(stored))
      } catch (e) {
        setProjects([])
      }
    }
  }

  const deleteProject = (id, e) => {
    e.stopPropagation()
    const updated = projects.filter(p => p.id !== id)
    setProjects(updated)
    localStorage.setItem('siteforge_projects', JSON.stringify(updated))
  }

  const openProject = (project) => {
    localStorage.setItem('siteforge_current', JSON.stringify(project))
    router.push('/app')
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.25rem', color: '#fff' }}>Projects</h1>
          <p style={{ color: '#666', fontSize: '0.875rem' }}>{projects.length} saved {projects.length === 1 ? 'project' : 'projects'}</p>
        </div>
        <button 
          onClick={() => router.push('/app')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.625rem 1rem',
            background: '#fff',
            borderRadius: '8px',
            color: '#000',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.8125rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div style={{ 
          background: '#141414', 
          borderRadius: '16px', 
          padding: '4rem 2rem', 
          textAlign: 'center',
          border: '1px solid #222'
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" style={{ margin: '0 auto 1rem', display: 'block' }}>
            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
          </svg>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#fff' }}>No projects yet</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Generate a website and click Save to see it here</p>
          <button 
            onClick={() => router.push('/app')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              background: '#fff',
              borderRadius: '8px',
              color: '#000',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.875rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {projects.map((project) => (
            <div 
              key={project.id} 
              style={{ 
                background: '#141414', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: '1px solid #222',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => openProject(project)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div style={{ height: '180px', background: '#1a1a1a', position: 'relative' }}>
                <div style={{
                  position: 'absolute', top: '8px', right: '8px', zIndex: 10,
                  opacity: hoveredProject === project.id ? 1 : 0,
                  transition: 'opacity 0.2s'
                }}>
                  <button 
                    onClick={(e) => deleteProject(project.id, e)}
                    style={{
                      width: '28px', height: '28px', borderRadius: '6px',
                      background: 'rgba(0,0,0,0.8)',
                      border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                <iframe 
                  srcDoc={project.code} 
                  style={{ 
                    width: '100%', height: '100%', 
                    border: 'none', 
                    transform: 'scale(0.5)', 
                    transformOrigin: 'top left', 
                    width: '200%', 
                    height: '200%' 
                  }} 
                  sandbox="allow-scripts" 
                />
              </div>
              <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.25rem', color: '#fff' }}>{project.name}</h3>
                    <p style={{ fontSize: '0.75rem', color: '#666' }}>
                      {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div style={{
                    padding: '0.25rem 0.5rem',
                    background: '#1a1a1a',
                    borderRadius: '4px',
                    fontSize: '0.625rem',
                    fontWeight: '600',
                    color: '#666'
                  }}>
                    HTML
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
