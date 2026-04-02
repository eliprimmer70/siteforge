'use client'

import { useState, useEffect, useRef } from 'react'

const FREE_GENERATIONS = 10

export default function AppPage() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('split')
  const [currentCode, setCurrentCode] = useState('')
  const [currentName, setCurrentName] = useState('')
  const [remaining, setRemaining] = useState(FREE_GENERATIONS)
  const [limitReached, setLimitReached] = useState(false)
  const [saved, setSaved] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const storedRemaining = localStorage.getItem('siteforge_remaining')
    const storedUser = localStorage.getItem('siteforge_user')
    
    if (!storedUser) {
      window.location.href = '/'
      return
    }
    
    if (storedRemaining) {
      const r = parseInt(storedRemaining)
      setRemaining(r)
      if (r <= 0) setLimitReached(true)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const generateWebsite = async () => {
    if (limitReached || remaining <= 0) {
      setLimitReached(true)
      return
    }
    
    if (!prompt.trim()) return
    setLoading(true)
    setSaved(false)

    const userMessage = { role: 'user', text: prompt }
    setMessages(prev => [...prev, userMessage])
    const currentPrompt = prompt
    setPrompt('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentPrompt }),
      })
      
      const data = await res.json()
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.error }])
        setLoading(false)
        return
      }
      
      if (data.code) {
        const name = currentPrompt.slice(0, 40) + (currentPrompt.length > 40 ? '...' : '')
        setCurrentName(name)
        setMessages(prev => [...prev, { role: 'assistant', text: 'Website generated! Save it to your projects.' }])
        setCurrentCode(data.code)
        
        const newRemaining = remaining - 1
        setRemaining(newRemaining)
        localStorage.setItem('siteforge_remaining', newRemaining.toString())
        
        if (newRemaining <= 0) setLimitReached(true)
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Connection error. Please try again.' }])
    }

    setLoading(false)
  }

  const saveProject = () => {
    if (!currentCode) return
    
    const projects = JSON.parse(localStorage.getItem('siteforge_projects') || '[]')
    const newProject = {
      id: Date.now(),
      name: currentName || 'Untitled Project',
      code: currentCode,
      prompt: messages.find(m => m.role === 'user')?.text || '',
      createdAt: new Date().toISOString()
    }
    
    projects.unshift(newProject)
    localStorage.setItem('siteforge_projects', JSON.stringify(projects))
    
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const downloadCode = () => {
    const blob = new Blob([currentCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'website.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  const startNew = () => {
    setMessages([])
    setCurrentCode('')
    setCurrentName('')
    setPrompt('')
    setView('split')
    setSaved(false)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ width: '420px', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', background: '#0f0f0f' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '1.125rem', fontWeight: '600' }}>New Project</h1>
            <button
              onClick={startNew}
              style={{
                padding: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#666' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            {remaining} generations left
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
          {messages.length === 0 ? (
            <div>
              <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Describe the website you want to build. Be specific about features, style, and content.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Landing page for a SaaS product', 'Portfolio for a photographer', 'E-commerce store for handmade jewelry', 'Restaurant website with menu'].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(suggestion)}
                    style={{
                      padding: '0.875rem 1rem',
                      background: '#1a1a1a',
                      border: '1px solid #2a2a2a',
                      borderRadius: '10px',
                      color: '#999',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {msg.role === 'user' && (
                    <div style={{ 
                      padding: '0.875rem 1rem',
                      background: '#1a1a1a',
                      borderRadius: '12px 12px 4px 12px',
                      fontSize: '0.9375rem',
                      lineHeight: 1.5
                    }}>
                      {msg.text}
                    </div>
                  )}
                  {msg.role === 'assistant' && (
                    <div style={{ 
                      padding: '0.875rem 1rem',
                      background: '#141414',
                      borderRadius: '12px 12px 12px 4px',
                      fontSize: '0.875rem',
                      color: '#aaa',
                      lineHeight: 1.5
                    }}>
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#666', padding: '0.5rem 0' }}>
                  <div style={{
                    width: '16px', height: '16px',
                    border: '2px solid #333',
                    borderTop: '2px solid #666',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  <span style={{ fontSize: '0.875rem' }}>Generating...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div style={{ padding: '1.5rem', borderTop: '1px solid #1a1a1a' }}>
          {limitReached && (
            <a href="/app/billing" style={{
              display: 'block',
              padding: '0.875rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '10px',
              color: '#fff',
              textDecoration: 'none',
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.75rem'
            }}>
              Upgrade to generate more
            </a>
          )}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !loading && !limitReached && prompt.trim() && generateWebsite()}
              placeholder="Describe your website..."
              disabled={loading || limitReached}
              style={{
                flex: 1,
                padding: '0.875rem 1rem',
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '0.9375rem',
                outline: 'none'
              }}
            />
            <button
              onClick={generateWebsite}
              disabled={loading || !prompt.trim() || limitReached}
              style={{
                padding: '0.875rem 1.25rem',
                background: prompt.trim() && !limitReached ? '#fff' : '#333',
                border: 'none',
                borderRadius: '10px',
                color: prompt.trim() && !limitReached ? '#000' : '#666',
                cursor: (loading || !prompt.trim() || limitReached) ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0a0a' }}>
        {currentCode ? (
          <>
            <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {['preview', 'code'].map(v => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: view === v ? '#fff' : 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      color: view === v ? '#000' : '#666',
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      fontWeight: '500'
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <div style={{ flex: 1 }} />
              <button
                onClick={saveProject}
                style={{
                  padding: '0.5rem 1rem',
                  background: saved ? '#22c55e' : '#333',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {saved ? (
                    <path d="M20 6L9 17l-5-5"/>
                  ) : (
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8"/>
                  )}
                </svg>
                {saved ? 'Saved!' : 'Save'}
              </button>
              <button
                onClick={downloadCode}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#222',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download
              </button>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              {(view === 'preview') && (
                <div style={{ flex: 1, background: '#fff', overflow: 'auto' }}>
                  <iframe
                    srcDoc={currentCode}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    sandbox="allow-scripts"
                  />
                </div>
              )}
              
              {(view === 'code') && (
                <div style={{ 
                  flex: 1, 
                  background: '#0d0d0d', 
                  overflow: 'auto',
                  padding: '1.5rem',
                  fontFamily: 'SF Mono, Monaco, Menlo, monospace',
                  fontSize: '0.8125rem',
                  whiteSpace: 'pre-wrap',
                  color: '#888',
                  lineHeight: 1.7
                }}>
                  {currentCode}
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>
            <div style={{ textAlign: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: '0 auto 1rem', display: 'block', color: '#333' }}>
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              <p style={{ fontSize: '0.9375rem' }}>Your website preview will appear here</p>
              <p style={{ fontSize: '0.8125rem', color: '#333', marginTop: '0.5rem' }}>Generate a website to see it here</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
