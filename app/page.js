'use client'

import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('preview')
  const [currentCode, setCurrentCode] = useState('')
  const [history, setHistory] = useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateWebsite = async (userPrompt, isRegenerate = false) => {
    if (!userPrompt.trim()) return
    setLoading(true)

    const userMessage = { role: 'user', text: userPrompt }
    setMessages(prev => [...prev, userMessage])

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: userPrompt,
          history: history
        }),
      })
      const data = await res.json()
      
      setMessages(prev => [...prev, { role: 'assistant', text: 'Here\'s your website!' }])
      setCurrentCode(data.code)
      setHistory(prev => [...prev, { role: 'user', text: userPrompt }, { role: 'assistant', text: data.code }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error generating website. Please try again.' }])
    }

    setLoading(false)
    setPrompt('')
  }

  const downloadCode = () => {
    const blob = new Blob([currentCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'generated-website.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  const startNew = () => {
    setMessages([])
    setCurrentCode('')
    setHistory([])
    setPrompt('')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0a', color: '#fff' }}>
      <div style={{ width: '320px', background: '#111', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #222' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>SiteForge</h1>
          <p style={{ fontSize: '0.75rem', color: '#666' }}>AI Website Builder</p>
        </div>
        
        <div style={{ padding: '1rem', borderBottom: '1px solid #222' }}>
          <button
            onClick={startNew}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#222',
              border: '1px solid #333',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            + New Project
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
          {messages.length === 0 && (
            <p style={{ fontSize: '0.75rem', color: '#444', textAlign: 'center', marginTop: '2rem' }}>
              Describe the website you want to build...
            </p>
          )}
          
          {messages.map((msg, i) => (
            <div key={i} style={{ 
              marginBottom: '1rem',
              textAlign: msg.role === 'user' ? 'right' : 'left'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                background: msg.role === 'user' ? '#6366f1' : '#1a1a1a',
                fontSize: '0.875rem',
                maxWidth: '85%',
                wordBreak: 'break-word'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#666' }}>
              <div className="spinner" style={{
                width: '16px',
                height: '16px',
                border: '2px solid #333',
                borderTop: '2px solid #6366f1',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <span style={{ fontSize: '0.875rem' }}>Generating...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '1rem', borderTop: '1px solid #222' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateWebsite(prompt)}
              placeholder="Describe your website..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
            <button
              onClick={() => generateWebsite(prompt)}
              disabled={loading || !prompt.trim()}
              style={{
                padding: '0.75rem 1rem',
                background: '#6366f1',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentCode ? (
          <>
            <div style={{ padding: '1rem', borderBottom: '1px solid #222', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', background: '#111', borderRadius: '8px', padding: '4px' }}>
                <button
                  onClick={() => setView('preview')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: view === 'preview' ? '#222' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: view === 'preview' ? '#fff' : '#666',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  Preview
                </button>
                <button
                  onClick={() => setView('code')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: view === 'code' ? '#222' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: view === 'code' ? '#fff' : '#666',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  Code
                </button>
                <button
                  onClick={() => setView('split')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: view === 'split' ? '#222' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: view === 'split' ? '#fff' : '#666',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  Split
                </button>
              </div>
              <button
                onClick={downloadCode}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#22c55e',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
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
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    sandbox="allow-scripts"
                  />
                </div>
              )}
              
              {(view === 'code' || view === 'split') && (
                <div style={{ 
                  flex: 1, 
                  background: '#0d0d0d', 
                  overflow: 'auto',
                  borderLeft: view === 'split' ? '1px solid #222' : 'none',
                  padding: '1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  whiteSpace: 'pre-wrap',
                  color: '#a5b4fc'
                }}>
                  {currentCode}
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '4rem' }}>🌐</div>
            <p style={{ color: '#666', fontSize: '1rem' }}>
              {messages.length === 0 
                ? 'Describe your website in the chat to get started' 
                : 'Generating your website...'}
            </p>
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
