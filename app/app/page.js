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
        setMessages(prev => [...prev, { role: 'assistant', text: 'Your website is ready! Check the preview.' }])
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
    setView('preview')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f5f5f7', color: '#1d1d1f', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Helvetica, Arial, sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', margin: '1.5rem', marginLeft: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>Create</h1>
            <p style={{ fontSize: '1rem', color: '#86868b' }}>Describe what you want to build</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ background: '#fff', padding: '0.625rem 1rem', borderRadius: '10px', fontSize: '0.875rem', color: '#86868b', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
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
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              New Project
            </button>
          </div>
        </div>

        {currentCode ? (
          <>
            <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
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
                      fontWeight: '500'
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
                    background: '#1d1d1f', 
                    overflow: 'auto',
                    borderLeft: view === 'split' ? '1px solid #d2d2d7' : 'none',
                    padding: '1rem',
                    fontFamily: '"SF Mono", Monaco, Menlo, monospace',
                    fontSize: '0.8125rem',
                    whiteSpace: 'pre-wrap',
                    color: '#a5b4fc',
                    lineHeight: 1.6
                  }}>
                    {currentCode}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>What should we build?</h3>
                  <p style={{ color: '#86868b', maxWidth: '400px', margin: '0 auto', lineHeight: 1.5 }}>
                    Describe your website and our AI will generate it for you in seconds.
                  </p>
                  <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {['Landing page', 'Portfolio', 'Dashboard', 'Online store'].map((suggestion, i) => (
                      <button key={i} onClick={() => setPrompt(suggestion)} style={{
                        padding: '0.5rem 1rem',
                        background: '#f5f5f7',
                        border: '1px solid #d2d2d7',
                        borderRadius: '20px',
                        fontSize: '0.8125rem',
                        color: '#86868b',
                        cursor: 'pointer'
                      }}>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((msg, i) => (
                <div key={i} style={{ 
                  marginBottom: '1rem',
                  textAlign: msg.role === 'user' ? 'right' : 'left'
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.875rem 1rem',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.role === 'user' ? '#0071e3' : '#f5f5f7',
                    color: msg.role === 'user' ? '#fff' : '#1d1d1f',
                    fontSize: '1rem',
                    maxWidth: '70%',
                    wordBreak: 'break-word'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#86868b' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #d2d2d7',
                    borderTop: '2px solid #0071e3',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  <span style={{ fontSize: '1rem' }}>Building your website...</span>
                </div>
              )}
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid #f0f0f0' }}>
              {limitReached && (
                <div style={{ background: '#fff3cd', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                  <p style={{ color: '#856404', fontSize: '0.9375rem', marginBottom: '0.5rem' }}>Free trial ended</p>
                  <a href="/app/billing" style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: '#0071e3',
                    borderRadius: '8px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>Upgrade for more generations</a>
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.75rem', background: '#fff', borderRadius: '16px', padding: '0.5rem', border: '1px solid #d2d2d7', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <input
                  type="text"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !loading && !limitReached && generateWebsite()}
                  placeholder="Describe your website... (e.g., A landing page for my coffee shop)"
                  disabled={loading || limitReached}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: 'transparent',
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
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600'
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
