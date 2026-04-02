'use client'

import { useState, useEffect } from 'react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [hoveredProject, setHoveredProject] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('siteforge_projects')
    if (stored) {
      setProjects(JSON.parse(stored))
    }
  }, [])

  const deleteProject = (index) => {
    const updated = projects.filter((_, i) => i !== index)
    setProjects(updated)
    localStorage.setItem('siteforge_projects', JSON.stringify(updated))
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1d1d1f', letterSpacing: '-0.02em' }}>Projects</h1>
          <p style={{ color: '#86868b', fontSize: '0.875rem' }}>{projects.length} {projects.length === 1 ? 'project' : 'projects'} created</p>
        </div>
        <a href="/app" style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          background: '#0071e3',
          borderRadius: '10px',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: '500',
          fontSize: '0.875rem',
          transition: 'all 0.2s'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Project
        </a>
      </div>

      {projects.length === 0 ? (
        <div style={{ 
          background: '#fff', 
          borderRadius: '20px', 
          padding: '5rem 2rem', 
          textAlign: 'center', 
          border: '1px solid #e5e5e7',
          boxShadow: '0 2px 20px rgba(0,0,0,0.02)'
        }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #f5f5f7 0%, #e5e5e7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem', fontSize: '2rem'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.5">
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
            </svg>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1d1d1f' }}>No projects yet</h3>
          <p style={{ color: '#86868b', marginBottom: '2rem', fontSize: '0.9375rem', maxWidth: '320px', margin: '0 auto 2rem' }}>Start building and your projects will appear here</p>
          <a href="/app" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.875rem 1.5rem',
            background: '#0071e3',
            borderRadius: '10px',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '0.9375rem'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Create your first project
          </a>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {projects.map((project, i) => (
            <div 
              key={i} 
              style={{ 
                background: '#fff', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '1px solid #e5e5e7', 
                boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                transition: 'all 0.25s',
                transform: hoveredProject === i ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredProject === i ? '0 12px 40px rgba(0,0,0,0.08)' : '0 2px 12px rgba(0,0,0,0.03)'
              }}
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div style={{ height: '200px', background: '#fafafa', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', top: '12px', right: '12px', zIndex: 10,
                  display: 'flex', gap: '8px', opacity: hoveredProject === i ? 1 : 0,
                  transition: 'opacity 0.2s'
                }}>
                  <button 
                    onClick={() => deleteProject(i)}
                    style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                  </button>
                </div>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.02) 100%)'
                }} />
                <iframe srcDoc={project.code} style={{ width: '100%', height: '100%', border: 'none', transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', height: '200%' }} sandbox="allow-scripts" />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1d1d1f' }}>{project.name || 'Untitled Project'}</h3>
                    <p style={{ fontSize: '0.75rem', color: '#86868b' }}>{new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div style={{
                    padding: '0.375rem 0.75rem',
                    background: '#f5f5f7',
                    borderRadius: '6px',
                    fontSize: '0.6875rem',
                    fontWeight: '600',
                    color: '#86868b'
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
