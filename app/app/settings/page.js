'use client'

import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [user, setUser] = useState(null)
  const [saved, setSaved] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('siteforge_user')
    if (stored) {
      const userData = JSON.parse(stored)
      setUser(userData)
      setEmail(userData.email || '')
      setName(userData.name || '')
    }
  }, [])

  const handleSave = () => {
    const updatedUser = { ...user, email, name }
    localStorage.setItem('siteforge_user', JSON.stringify(updatedUser))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = () => {
    localStorage.removeItem('siteforge_user')
    localStorage.removeItem('siteforge_remaining')
    window.location.href = '/'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '640px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1d1d1f', letterSpacing: '-0.02em' }}>Settings</h1>
        <p style={{ color: '#86868b', fontSize: '0.875rem' }}>Manage your account and preferences</p>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e5e7', boxShadow: '0 2px 12px rgba(0,0,0,0.02)' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1d1d1f' }}>Profile</h2>
          <p style={{ fontSize: '0.8125rem', color: '#86868b', marginTop: '0.25rem' }}>Update your personal information</p>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '1.75rem', fontWeight: '600'
            }}>
              {name ? name.charAt(0).toUpperCase() : email ? email.charAt(0).toUpperCase() : '?'}
            </div>
            <div>
              <button style={{
                padding: '0.5rem 1rem',
                background: '#f5f5f7',
                border: 'none',
                borderRadius: '8px',
                color: '#1d1d1f',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '0.8125rem'
              }}>
                Change Photo
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#86868b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                background: '#f5f5f7',
                border: '1px solid #d2d2d7',
                borderRadius: '10px',
                color: '#1d1d1f',
                fontSize: '0.9375rem',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#0071e3'}
              onBlur={e => e.target.style.borderColor = '#d2d2d7'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#86868b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                background: '#f5f5f7',
                border: '1px solid #d2d2d7',
                borderRadius: '10px',
                color: '#1d1d1f',
                fontSize: '0.9375rem',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#0071e3'}
              onBlur={e => e.target.style.borderColor = '#d2d2d7'}
            />
          </div>

          <button 
            onClick={handleSave}
            style={{
              padding: '0.875rem 1.5rem',
              background: saved ? '#34c759' : '#0071e3',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.9375rem',
              transition: 'all 0.2s'
            }}
          >
            {saved ? '✓ Changes Saved' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e5e7', boxShadow: '0 2px 12px rgba(0,0,0,0.02)', marginTop: '1.5rem' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1d1d1f' }}>Preferences</h2>
          <p style={{ fontSize: '0.8125rem', color: '#86868b', marginTop: '0.25rem' }}>Customize your experience</p>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <p style={{ fontWeight: '500', color: '#1d1d1f', marginBottom: '0.125rem', fontSize: '0.9375rem' }}>Email Notifications</p>
              <p style={{ fontSize: '0.8125rem', color: '#86868b' }}>Receive updates about your projects</p>
            </div>
            <div style={{
              width: '44px', height: '26px', borderRadius: '13px',
              background: '#34c759', position: 'relative', cursor: 'pointer'
            }}>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: '#fff', position: 'absolute',
                top: '2px', right: '2px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
              }} />
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: '500', color: '#1d1d1f', marginBottom: '0.125rem', fontSize: '0.9375rem' }}>Marketing Emails</p>
              <p style={{ fontSize: '0.8125rem', color: '#86868b' }}>News and special offers</p>
            </div>
            <div style={{
              width: '44px', height: '26px', borderRadius: '13px',
              background: '#e5e5e7', position: 'relative', cursor: 'pointer'
            }}>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: '#fff', position: 'absolute',
                top: '2px', left: '2px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
              }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e5e7', boxShadow: '0 2px 12px rgba(0,0,0,0.02)', marginTop: '1.5rem' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#ff3b30' }}>Danger Zone</h2>
          <p style={{ fontSize: '0.8125rem', color: '#86868b', marginTop: '0.25rem' }}>Irreversible actions</p>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <button 
            onClick={handleLogout}
            style={{
              padding: '0.875rem 1.5rem',
              background: '#fff',
              border: '1px solid #ff3b30',
              borderRadius: '10px',
              color: '#ff3b30',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.9375rem',
              transition: 'all 0.2s'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
