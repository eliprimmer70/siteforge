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
        setMessages(prev => [...prev, { role: 'assistant', text: 'Your website is ready!' }])
        setCurrentCode(data.code)
        setHistory(prev => [...prev, { role: 'user', text: currentPrompt }, { role: 'assistant', text: data.code }])
        
        const newRemaining = remaining - 1
        setRemaining(newRemaining)
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
    <div style={{ display: 'flex', height: '100vh', background: '#fafafa', color: '#1d1d1f', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Helvetica, Arial, sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #d2d2d7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.125rem', color: '#1d1d1f' }}>Create</h1>
            <p style={{ fontSize: '0.75rem', color: '#86868b' }}>Describe what you want to build</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#86868b', background: '#f5f5f7', padding: '0.5rem 0.875rem', borderRadius: '8px' }}>
              {remaining} / {FREE_GENERATIONS} left
            </span>
            <button
              onClick={startNew}
              style={{
                padding: '0.5rem 1rem',
                background: '#fff',
                border: '1px solid #d2d2d7',
                borderRadius: '8px',
                color: '#1d1d1f',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                fontWeight: '500'
              }}
            >
              New
            </button>
          </div>
        </div>

        {currentCode ? (
          <>
            <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #d2d2d7', display: 'flex', gap: '0.375rem', alignItems: 'center', background: '#fff' }}>
              {['preview', 'code', 'split'].map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    padding: '0.375rem 0.875rem',
                    background: view === v ? '#0071e3' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: view === v ? '#fff' : '#86868b',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
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
                  padding: '0.375rem 0.875rem',
                  background: '#34c759',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}
              >
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
                  borderLeft: view === 'split' ? '1px solid #d2d2d7' : 'none',
                  padding: '1rem',
                  fontFamily: '"SF Mono", Monaco, Menlo, monospace',
                  fontSize: '0.75rem',
                  whiteSpace: 'pre-wrap',
                  color: '#a5b4fc',
                  lineHeight: 1.6
                }}>
                  {currentCode}
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ 
                  marginBottom: '0.875rem',
                  textAlign: msg.role === 'user' ? 'right' : 'left'
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.625rem 0.875rem',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.role === 'user' ? '#0071e3' : '#f5f5f7',
                    color: msg.role === 'user' ? '#fff' : '#1d1d1f',
                    fontSize: '0.875rem',
                    maxWidth: '65%',
                    wordBreak: 'break-word'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#86868b' }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid #d2d2d7',
                    borderTop: '2px solid #0071e3',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  <span style={{ fontSize: '0.875rem' }}>Building your website...</span>
                </div>
              )}
            </div>

            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #d2d2d7', background: '#fff' }}>
              {limitReached && (
                <div style={{ background: '#f5f5f7', borderRadius: '10px', padding: '0.875rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                  <p style={{ color: '#ff3b30', fontSize: '0.8125rem', marginBottom: '0.5rem' }}>Free trial ended</p>
                  <a href="/app/billing" style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: '#0071e3',
                    borderRadius: '6px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>Upgrade for more</a>
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.5rem', background: '#f5f5f7', borderRadius: '12px', padding: '0.375rem', border: '1px solid #d2d2d7' }}>
                <input
                  type="text"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !loading && !limitReached && generateWebsite()}
                  placeholder="Describe your website..."
                  disabled={loading || limitReached}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#1d1d1f',
                    fontSize: '0.9375rem',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={generateWebsite}
                  disabled={loading || !prompt.trim() || limitReached}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: prompt.trim() && !limitReached ? '#0071e3' : '#d2d2d7',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
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
