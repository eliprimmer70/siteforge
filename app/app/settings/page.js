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
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1d1d1f', letterSpacing: '-0.02em' }}>Settings</h1>
      <p style={{ color: '#86868b', fontSize: '0.875rem', marginBottom: '2rem' }}>Manage your account and preferences</p>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #d2d2d7', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#1d1d1f' }}>Account</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#86868b', marginBottom: '0.5rem' }}>Email</label>
          <input 
            type="email" 
            defaultValue={user?.email || ''}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              background: '#f5f5f7',
              border: '1px solid #d2d2d7',
              borderRadius: '10px',
              color: '#1d1d1f',
              fontSize: '0.9375rem',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>

        <button 
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
          style={{
            padding: '0.75rem 1.5rem',
            background: saved ? '#34c759' : '#0071e3',
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '0.9375rem'
          }}
        >
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #d2d2d7', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#1d1d1f' }}>Danger Zone</h2>
        <button 
          onClick={handleLogout}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#fff',
            border: '1px solid #ff3b30',
            borderRadius: '10px',
            color: '#ff3b30',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '0.9375rem'
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
