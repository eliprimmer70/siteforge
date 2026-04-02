'use client'

import { useState, useEffect } from 'react'

const FREE_GENERATIONS = 10

export default function AppPage() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('split')
  const [currentCode, setCurrentCode] = useState('')
  const [history, setHistory] = useState([])
  const [remaining, setRemaining] = useState(FREE_GENERATIONS)
  const [limitReached, setLimitReached] = useState(false)

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

  const generateWebsite = async () => {
    if (limitReached || remaining <= 0) {
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
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.error }])
        setLoading(false)
        return
      }
      
      if (data.code) {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Your website is ready! Check the preview on the right.' }])
        setCurrentCode(data.code)
        setHistory(prev => [...prev, { role: 'user', text: currentPrompt }, { role: 'assistant', text: data.code }])
        
        const newRemaining = remaining - 1
        setRemaining(newRemaining)
        localStorage.setItem('siteforge_remaining', newRemaining.toString())
        
        if (newRemaining <= 0) setLimitReached(true)
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error. Make sure GEMINI_API_KEY is set in Vercel settings.' }])
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
    setView('split')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f5f5f7', color: '#1d1d1f', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Helvetica, Arial, sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', margin: '1.5rem', marginLeft: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>Create</h1>
            <p style={{ fontSize: '0.9375rem', color: '#86868b' }}>Describe what you want to build</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ 
              background: '#fff', 
              padding: '0.625rem 1rem', 
              borderRadius: '10px', 
              fontSize: '0.875rem', 
              color: '#86868b', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <span style={{ fontWeight: '600', color: '#1d1d1f' }}>{remaining}</span> / {FREE_GENERATIONS} left
            </div>
            <button
              onClick={startNew}
              style={{
                padding: '0.625rem 1.25rem',
                background: '#fff',
                border: '1px solid #d2d2d7',
                borderRadius: '10px',
                color: '#1d1d1f',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New
            </button>
          </div>
        </div>

        {currentCode ? (
          <>
            <div style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
                {['preview', 'code', 'split'].map(v => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: view === v ? '#0071e3' : 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      color: view === v ? '#fff' : '#86868b',
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      textTransform: 'capitalize',
                      fontWeight: '500',
                      transition: 'all 0.15s'
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
                    background: '#34c759',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    display: 'flex', alignItems: 'center', gap: '0.375rem'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Download
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
                    background: '#1d1d1f', 
                    overflow: 'auto',
                    borderLeft: view === 'split' ? '1px solid #3d3d3f' : 'none',
                    padding: '1.25rem',
                    fontFamily: '"SF Mono", Monaco, Menlo, monospace',
                    fontSize: '0.8125rem',
                    whiteSpace: 'pre-wrap',
                    color: '#e5e5e7',
                    lineHeight: 1.7
                  }}>
                    {currentCode}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
                  <div style={{ 
                    width: '80px', height: '80px', borderRadius: '24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem', fontSize: '2.5rem'
                  }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1d1d1f' }}>What should we build?</h3>
                  <p style={{ color: '#86868b', maxWidth: '400px', margin: '0 auto 2rem', lineHeight: 1.5 }}>
                    Describe your website and our AI will generate it for you in seconds.
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Landing page', icon: '🚀' },
                      { label: 'Portfolio', icon: '👤' },
                      { label: 'Dashboard', icon: '📊' },
                      { label: 'Online store', icon: '🛒' }
                    ].map((s, i) => (
                      <button key={i} onClick={() => setPrompt(s.label)} style={{
                        padding: '0.75rem 1.25rem',
                        background: '#f5f5f7',
                        border: '1px solid #e5e5e7',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        color: '#1d1d1f',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        transition: 'all 0.2s'
                      }}>
                        <span>{s.icon}</span> {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{ 
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                  }}>
                    <div style={{
                      maxWidth: '80%',
                      padding: '1rem 1.25rem',
                      borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                      background: msg.role === 'user' ? '#0071e3' : '#f5f5f7',
                      color: msg.role === 'user' ? '#fff' : '#1d1d1f',
                      fontSize: '0.9375rem',
                      lineHeight: 1.5,
                      wordBreak: 'break-word'
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#86868b', padding: '0.5rem 0' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #e5e5e7',
                      borderTop: '2px solid #0071e3',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }} />
                    <span style={{ fontSize: '0.9375rem' }}>Building your website...</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid #f0f0f0' }}>
              {limitReached && (
                <div style={{ 
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '12px', 
                  padding: '1rem 1.25rem', 
                  marginBottom: '1rem', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <p style={{ color: '#92400e', fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.125rem' }}>Free trial ended</p>
                    <p style={{ color: '#b45309', fontSize: '0.8125rem' }}>Upgrade to get more generations</p>
                  </div>
                  <a href="/app/billing" style={{
                    display: 'inline-block',
                    padding: '0.625rem 1rem',
                    background: '#0071e3',
                    borderRadius: '8px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '0.8125rem',
                    fontWeight: '600'
                  }}>Upgrade</a>
                </div>
              )}
              <div style={{ 
                display: 'flex', gap: '0.75rem', 
                background: '#f5f5f7', 
                borderRadius: '16px', 
                padding: '0.5rem',
                border: '1px solid #e5e5e7'
              }}>
                <input
                  type="text"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !loading && !limitReached && prompt.trim() && generateWebsite()}
                  placeholder="Describe your website... (e.g., A landing page for my coffee shop)"
                  disabled={loading || limitReached}
                  style={{
                    flex: 1,
                    padding: '1rem 1.25rem',
                    background: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#1d1d1f',
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={generateWebsite}
                  disabled={loading || !prompt.trim() || limitReached}
                  style={{
                    padding: '1rem 1.5rem',
                    background: prompt.trim() && !limitReached ? '#0071e3' : '#d2d2d7',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    cursor: (loading || !prompt.trim() || limitReached) ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  {loading ? (
                    <div style={{
                      width: '18px', height: '18px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid #fff',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }} />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  )}
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
