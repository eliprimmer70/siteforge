'use client'

import { useState, useEffect } from 'react'

const FREE_GENERATIONS = 10

export default function AppPage() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('preview')
  const [currentCode, setCurrentCode] = useState('')
  const [history, setHistory] = useState([])
  const [user, setUser] = useState(null)
  const [remainingGenerations, setRemainingGenerations] = useState(FREE_GENERATIONS)
  const [limitReached, setLimitReached] = useState(false)
  const messagesEndRef = useState(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = () => {
    const storedUser = localStorage.getItem('siteforge_user')
    const storedRemaining = localStorage.getItem('siteforge_remaining')
    
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      const remaining = storedRemaining ? parseInt(storedRemaining) : (userData.remainingGenerations || FREE_GENERATIONS)
      setRemainingGenerations(remaining)
      if (remaining <= 0) setLimitReached(true)
    }
  }

  const generateWebsite = async () => {
    if (!user) {
      window.location.href = '/'
      return
    }
    
    if (limitReached || remainingGenerations <= 0) {
      setLimitReached(true)
      return
    }
    
    if (!prompt.trim()) return
    setLoading(true)

    const userMessage = { role: 'user', text: prompt }
    setMessages(prev => [...prev, userMessage])
    const currentPrompt = prompt
    setPrompt('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: currentPrompt,
          history: history
        }),
      })
      
      const data = await res.json()
      
      if (data.requiresAuth) {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Please sign in to continue' }])
        localStorage.removeItem('siteforge_user')
        localStorage.removeItem('siteforge_remaining')
        setUser(null)
        return
      }
      
      if (data.limitReached) {
        setLimitReached(true)
        setMessages(prev => [...prev, { role: 'assistant', text: 'Free trial ended! You\'ve used all 10 generations.' }])
        return
      }
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.error }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Your website is ready!' }])
        setCurrentCode(data.code)
        setHistory(prev => [...prev, { role: 'user', text: currentPrompt }, { role: 'assistant', text: data.code }])
        
        const newRemaining = remainingGenerations - 1
        setRemainingGenerations(newRemaining)
        localStorage.setItem('siteforge_remaining', newRemaining.toString())
        
        if (newRemaining <= 0) setLimitReached(true)
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error generating website. Please try again.' }])
    }

    setLoading(false)
  }

  const downloadCode = () => {
    const blob = new Blob([currentCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my-website.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  const startNew = () => {
    setMessages([])
    setCurrentCode('')
    setHistory([])
    setPrompt('')
    setView('preview')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#050505', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Helvetica, Arial, sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>Create</h1>
            <p style={{ fontSize: '0.875rem', color: '#86868b' }}>Describe what you want to build</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ background: '#0a0a0a', borderRadius: '8px', padding: '0.5rem 1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '0.75rem', color: '#86868b' }}>{remainingGenerations}</span>
              <span style={{ fontSize: '0.75rem', color: '#666' }}> / {FREE_GENERATIONS} left</span>
            </div>
            <button
              onClick={startNew}
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              New Project
            </button>
          </div>
        </div>

        {currentCode ? (
          <>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#0a0a0a' }}>
              {['preview', 'code', 'split'].map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: view === v ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: view === v ? '#fff' : '#86868b',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}
                >
                  {v}
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <button
                onClick={downloadCode}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#22c55e',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}
              >
                Download HTML
              </button>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              {(view === 'preview' || view === 'split') && (
                <div style={{ flex: 1, background: '#fff', overflow: 'auto' }}>
                  <iframe
                    srcDoc={currentCode}
                    style={{ width: '100%', height: '100%', border: 'none', minHeight: '500px' }}
                    sandbox="allow-scripts"
                  />
                </div>
              )}
              
              {(view === 'code' || view === 'split') && (
                <div style={{ 
                  flex: 1, 
                  background: '#0d0d0d', 
                  overflow: 'auto',
                  borderLeft: view === 'split' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  padding: '1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  whiteSpace: 'pre-wrap',
                  color: '#a5b4fc',
                  lineHeight: '1.6'
                }}>
                  {currentCode}
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ 
                  marginBottom: '1rem',
                  textAlign: msg.role === 'user' ? 'right' : 'left'
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.75rem 1rem',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.role === 'user' ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#1a1a1a',
                    fontSize: '0.9rem',
                    maxWidth: '70%',
                    wordBreak: 'break-word'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#667eea' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #333',
                    borderTop: '2px solid #667eea',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  <span style={{ fontSize: '0.9rem' }}>Building your website...</span>
                </div>
              )}
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', background: '#0a0a0a' }}>
              {limitReached && (
                <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', textAlign: 'center', border: '1px solid rgba(255,100,100,0.2)' }}>
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Free trial ended</p>
                  <a href="/app/billing" style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '8px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>Upgrade for more generations</a>
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.75rem', background: '#000', borderRadius: '16px', padding: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && !limitReached && generateWebsite()}
                  placeholder="Describe your website... (e.g., A landing page for my coffee shop)"
                  disabled={loading || limitReached}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={generateWebsite}
                  disabled={loading || !prompt.trim() || limitReached}
                  style={{
                    padding: '0 1.5rem',
                    background: prompt.trim() && !limitReached ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#333',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                >
                  Generate
                </button>
              </div>
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
