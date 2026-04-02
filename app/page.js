'use client'

import { useState, useRef, useEffect } from 'react'

const FREE_GENERATIONS = 10

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('preview')
  const [currentCode, setCurrentCode] = useState('')
  const [history, setHistory] = useState([])
  const [particles, setParticles] = useState([])
  const [user, setUser] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [authEmail, setAuthEmail] = useState('')
  const [remainingGenerations, setRemainingGenerations] = useState(FREE_GENERATIONS)
  const [limitReached, setLimitReached] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('siteforge_user')
    const storedGenerations = localStorage.getItem('siteforge_generations')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setRemainingGenerations(FREE_GENERATIONS - (parseInt(storedGenerations) || 0))
    }
    
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 15,
      size: 2 + Math.random() * 3
    }))
    setParticles(newParticles)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleAuth = async () => {
    if (!authEmail.includes('@')) {
      alert('Please enter a valid email')
      return
    }
    
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, action: authMode })
      })
      
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('siteforge_user', JSON.stringify(data))
        setUser(data)
        setRemainingGenerations(data.remainingGenerations)
        setShowAuth(false)
        setAuthEmail('')
      }
    } catch (err) {
      alert('Auth failed. Try again.')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' })
    })
    localStorage.removeItem('siteforge_user')
    localStorage.removeItem('siteforge_generations')
    setUser(null)
    setRemainingGenerations(FREE_GENERATIONS)
    setLimitReached(false)
  }

  const generateWebsite = async (userPrompt) => {
    if (!user) {
      setShowAuth(true)
      return
    }
    
    if (limitReached || remainingGenerations <= 0) {
      setLimitReached(true)
      return
    }
    
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
      
      if (data.requiresAuth) {
        setShowAuth(true)
        setMessages(prev => [...prev, { role: 'assistant', text: 'Please sign in to continue' }])
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
        setHistory(prev => [...prev, { role: 'user', text: userPrompt }, { role: 'assistant', text: data.code }])
        
        const newRemaining = data.remainingGenerations
        setRemainingGenerations(newRemaining)
        localStorage.setItem('siteforge_generations', FREE_GENERATIONS - newRemaining)
      }
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

  if (showAuth) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div style={{ 
          background: '#111', 
          borderRadius: '24px', 
          padding: '3rem', 
          width: '100%', 
          maxWidth: '400px',
          border: '1px solid #222',
          position: 'relative'
        }}>
          <button 
            onClick={() => setShowAuth(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'transparent',
              border: 'none',
              color: '#666',
              cursor: 'pointer',
              fontSize: '1.5rem'
            }}
          >×</button>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '16px', 
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              margin: '0 auto 1rem'
            }}>S</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>
              {authMode === 'login' ? 'Welcome back' : 'Start your free trial'}
            </h2>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>
              {authMode === 'login' ? 'Sign in to continue' : '10 free generations, no credit card'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setAuthMode('login')}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: authMode === 'login' ? '#8b5cf6' : 'transparent',
                border: authMode === 'login' ? 'none' : '1px solid #333',
                borderRadius: '10px',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >Sign In</button>
            <button
              onClick={() => setAuthMode('signup')}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: authMode === 'signup' ? '#8b5cf6' : 'transparent',
                border: authMode === 'signup' ? 'none' : '1px solid #333',
                borderRadius: '10px',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >Sign Up</button>
          </div>

          <input
            type="email"
            value={authEmail}
            onChange={(e) => setAuthEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '1rem',
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1rem',
              marginBottom: '1rem',
              boxSizing: 'border-box'
            }}
          />

          <button
            onClick={handleAuth}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {authMode === 'login' ? 'Sign In' : 'Start Free Trial'}
          </button>

          <p style={{ textAlign: 'center', color: '#444', fontSize: '0.75rem', marginTop: '1.5rem' }}>
            {FREE_GENERATIONS} free generations included
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#050505', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ width: '340px', background: 'linear-gradient(180deg, #0a0a0a 0%, #111 100%)', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {particles.map(p => (
            <div key={p.id} style={{
              position: 'absolute',
              left: `${p.left}%`,
              bottom: '-20px',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.4))',
              animation: `float ${p.duration}s linear ${p.delay}s infinite`,
              opacity: 0.6
            }} />
          ))}
        </div>

        <div style={{ padding: '1.25rem', borderBottom: '1px solid #1a1a1a', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem' }}>S</div>
              <div>
                <h1 style={{ fontSize: '1rem', fontWeight: '700', margin: 0, background: 'linear-gradient(90deg, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SiteForge</h1>
                <p style={{ fontSize: '0.65rem', color: '#4b5563', margin: 0 }}>AI Website Builder</p>
              </div>
            </div>
            {user ? (
              <button 
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#666',
                  cursor: 'pointer',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.7rem'
                }}
              >Sign Out</button>
            ) : (
              <button 
                onClick={() => setShowAuth(true)}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.7rem',
                  fontWeight: '600'
                }}
              >Sign In</button>
            )}
          </div>
        </div>

        {user && (
          <div style={{ padding: '1rem', borderBottom: '1px solid #1a1a1a', position: 'relative' }}>
            <div style={{ background: '#0a0a0a', borderRadius: '12px', padding: '1rem', border: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>FREE TRIAL</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: remainingGenerations > 3 ? '#22c55e' : '#ef4444' }}>{remainingGenerations}</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>/ {FREE_GENERATIONS} generations left</span>
              </div>
              <div style={{ height: '6px', background: '#222', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${(remainingGenerations / FREE_GENERATIONS) * 100}%`, 
                  height: '100%', 
                  background: remainingGenerations > 3 ? 'linear-gradient(90deg, #22c55e, #16a34a)' : 'linear-gradient(90deg, #ef4444, #dc2626)',
                  transition: 'all 0.3s'
                }} />
              </div>
              {remainingGenerations === 0 && (
                <p style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '0.5rem' }}>Trial ended</p>
              )}
            </div>
          </div>
        )}
        
        <div style={{ padding: '1rem', borderBottom: '1px solid #1a1a1a', position: 'relative' }}>
          <button
            onClick={startNew}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'transparent',
              border: '1px solid #2a2a2a',
              borderRadius: '10px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => e.target.style.background = '#1a1a1a'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            + Create New Project
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '1rem', position: 'relative' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✨</div>
              <p style={{ fontSize: '0.75rem', color: '#4b5563', lineHeight: '1.6' }}>
                Describe the website you want and watch it come to life
              </p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div key={i} style={{ 
              marginBottom: '1rem',
              textAlign: msg.role === 'user' ? 'right' : 'left'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '0.65rem 1rem',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.role === 'user' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : '#151515',
                fontSize: '0.8rem',
                maxWidth: '85%',
                wordBreak: 'break-word',
                border: msg.role === 'assistant' ? '1px solid #222' : 'none'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#6366f1' }}>
              <div style={{
                width: '18px',
                height: '18px',
                border: '2px solid #2a2a2a',
                borderTop: '2px solid #6366f1',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
              <span style={{ fontSize: '0.8rem' }}>Building your site...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '1rem', borderTop: '1px solid #1a1a1a', position: 'relative' }}>
          {limitReached && (
            <div style={{ 
              background: '#1a1a1a', 
              border: '1px solid #333', 
              borderRadius: '10px', 
              padding: '0.75rem', 
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.75rem', color: '#ef4444', marginBottom: '0.5rem' }}>Free trial ended</p>
              <button 
                onClick={() => setShowAuth(true)}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >Sign up for more generations</button>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.5rem', background: '#0a0a0a', borderRadius: '14px', padding: '4px', border: '1px solid #1a1a1a' }}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateWebsite(prompt)}
              placeholder={user ? "Describe your website..." : "Sign in to get started"}
              disabled={loading || limitReached}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                background: 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
            <button
              onClick={() => !user ? setShowAuth(true) : generateWebsite(prompt)}
              disabled={loading || !prompt.trim() || limitReached}
              style={{
                width: '42px',
                height: '42px',
                background: prompt.trim() && user && !limitReached ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' : '#1a1a1a',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                transition: 'all 0.2s'
              }}
            >
              ↑
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0a0a' }}>
        {currentCode ? (
          <>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #1a1a1a', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', background: '#050505' }}>
              <div style={{ display: 'flex', background: '#0a0a0a', borderRadius: '8px', padding: '3px', gap: '2px' }}>
                {['preview', 'code', 'split'].map(v => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: view === v ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' : 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      color: view === v ? '#fff' : '#6b7280',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <button
                onClick={downloadCode}
                style={{
                  padding: '0.5rem 1.25rem',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                ↓ Download
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
                  borderLeft: view === 'split' ? '1px solid #1a1a1a' : 'none',
                  padding: '1rem',
                  fontFamily: 'JetBrains Mono, Fira Code, monospace',
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
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #050505 100%)' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '24px', 
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4)',
                animation: 'pulse 2s ease-in-out infinite',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem'
              }}>
                🌐
              </div>
              <div style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '34px',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                opacity: 0.3,
                filter: 'blur(20px)',
                zIndex: -1,
                animation: 'pulse 2s ease-in-out infinite'
              }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', background: 'linear-gradient(90deg, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {user ? 'Ready to Build' : 'Sign In to Start'}
              </h2>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', maxWidth: '300px', lineHeight: '1.6' }}>
                {user 
                  ? 'Describe your dream website and watch it materialize' 
                  : 'Get 10 free generations to try it out'}
              </p>
            </div>
            {!user && (
              <button 
                onClick={() => setShowAuth(true)}
                style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Start Free Trial →
              </button>
            )}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '500px' }}>
              {['Landing pages', 'Portfolios', 'Dashboards', 'Online stores'].map((tag, i) => (
                <div key={i} style={{
                  padding: '0.5rem 1rem',
                  background: '#111',
                  border: '1px solid #222',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}
