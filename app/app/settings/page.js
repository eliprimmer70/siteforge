'use client'

import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [user, setUser] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('siteforge_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('siteforge_user')
    localStorage.removeItem('siteforge_remaining')
    window.location.href = '/'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '700px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>Settings</h1>
      <p style={{ color: '#86868b', fontSize: '0.875rem', marginBottom: '2rem' }}>Manage your account and preferences</p>

      <div style={{ background: '#0a0a0a', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Account</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#86868b', marginBottom: '0.5rem' }}>Email</label>
          <input 
            type="email" 
            defaultValue={user?.email || ''}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              background: '#000',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '0.875rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button 
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
          style={{
            padding: '0.75rem 1.5rem',
            background: saved ? '#22c55e' : 'linear-gradient(135deg, #667eea, #764ba2)',
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div style={{ background: '#0a0a0a', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>API Settings</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#86868b', marginBottom: '0.5rem' }}>Gemini API Key</label>
          <input 
            type="password" 
            placeholder="Enter your API key"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              background: '#000',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '0.875rem',
              boxSizing: 'border-box'
            }}
          />
          <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.5rem' }}>Get your free API key from aistudio.google.com</p>
        </div>
      </div>

      <div style={{ background: '#0a0a0a', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Danger Zone</h2>
        <button 
          onClick={handleLogout}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#dc2626',
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
