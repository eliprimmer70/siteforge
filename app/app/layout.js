'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const FREE_GENERATIONS = 10

export default function AppLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [remaining, setRemaining] = useState(FREE_GENERATIONS)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const storedUser = localStorage.getItem('siteforge_user')
    const storedRemaining = localStorage.getItem('siteforge_remaining')
    
    if (!storedUser) {
      router.push('/')
      return
    }
    
    if (storedRemaining) {
      setRemaining(parseInt(storedRemaining))
    }
    
    setLoading(false)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [router])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '24px', height: '24px', border: '2px solid #222', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  if (isMobile) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#0a0a0a', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{ 
          background: '#141414', 
          borderRadius: '16px', 
          padding: '2.5rem', 
          textAlign: 'center',
          maxWidth: '360px'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" style={{ margin: '0 auto', display: 'block' }}>
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#fff' }}>Desktop Required</h1>
          <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
            SiteForge works best on a desktop. Please visit on a PC or Mac.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              padding: '0.875rem 1.5rem',
              background: '#fff',
              borderRadius: '8px',
              border: 'none',
              color: '#000',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.9375rem'
            }}
          >
            Back to Homepage
          </button>
        </div>
      </div>
    )
  }

  const navItems = [
    { href: '/app', label: 'Create', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { href: '/app/projects', label: 'Projects', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    { href: '/app/settings', label: 'Settings', icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z' },
    { href: '/app/billing', label: 'Billing', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  ]

  const isActive = (href) => {
    if (href === '/app') return pathname === '/app'
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    localStorage.removeItem('siteforge_user')
    localStorage.removeItem('siteforge_remaining')
    window.location.href = '/'
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <aside style={{ width: '72px', background: '#0f0f0f', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 50 }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid #1a1a1a', textAlign: 'center' }}>
          <div style={{ fontWeight: '700', fontSize: '1rem', letterSpacing: '-0.02em', color: '#fff' }}>SF</div>
        </div>

        <nav style={{ padding: '1rem 0', flex: 1 }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              title={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                margin: '0 auto 0.25rem',
                borderRadius: '12px',
                textDecoration: 'none',
                color: isActive(item.href) ? '#fff' : '#555',
                background: isActive(item.href) ? '#1a1a1a' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
            </a>
          ))}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid #1a1a1a' }}>
          <div style={{ 
            background: '#1a1a1a', 
            borderRadius: '10px', 
            padding: '0.75rem',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>{remaining}</div>
            <div style={{ fontSize: '0.625rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>left</div>
          </div>
          <button 
            onClick={handleLogout}
            title="Sign out"
            style={{
              width: '100%',
              padding: '0.625rem',
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: '#555',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: '72px', flex: 1, minHeight: '100vh' }}>
        {children}
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
