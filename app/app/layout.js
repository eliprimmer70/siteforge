'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const FREE_GENERATIONS = 10

export default function AppLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
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
    
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/')
    }
    
    if (storedRemaining) {
      setRemaining(parseInt(storedRemaining))
    }
    
    setLoading(false)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [router])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '24px', height: '24px', border: '2px solid #333', borderTop: '2px solid #0071e3', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  if (isMobile) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#000', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{ 
          background: '#1a1a1a', 
          borderRadius: '20px', 
          padding: '2.5rem', 
          textAlign: 'center',
          maxWidth: '360px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>💻</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>Desktop Required</h1>
          <p style={{ color: '#86868b', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            SiteForge works best on a desktop. Please visit us on a PC.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              padding: '0.875rem 1.5rem',
              background: '#0071e3',
              borderRadius: '10px',
              border: 'none',
              color: '#fff',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Back to Homepage
          </button>
        </div>
      </div>
    )
  }

  const navItems = [
    { href: '/app', icon: '🏠', label: 'Create' },
    { href: '/app/projects', icon: '📁', label: 'Projects' },
    { href: '/app/settings', icon: '⚙️', label: 'Settings' },
    { href: '/app/billing', icon: '💳', label: 'Billing' },
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
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Helvetica, Arial, sans-serif' }}>
      <aside style={{ width: '220px', background: '#0a0a0a', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontWeight: '600', fontSize: '1rem', letterSpacing: '-0.01em' }}>SiteForge</div>
          <div style={{ fontSize: '0.6875rem', color: '#6e6e73', marginTop: '0.125rem' }}>Dashboard</div>
        </div>

        <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.625rem 0.875rem',
                borderRadius: '8px',
                textDecoration: 'none',
                color: isActive(item.href) ? '#fff' : '#86868b',
                background: isActive(item.href) ? 'rgba(0,113,227,0.15)' : 'transparent',
                marginBottom: '0.25rem',
                fontSize: '0.8125rem',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '1rem' }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ background: '#000', borderRadius: '10px', padding: '0.875rem', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.625rem', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.375rem' }}>Free Trial</div>
            <div style={{ fontSize: '1.375rem', fontWeight: '600' }}>
              {remaining}
              <span style={{ fontSize: '0.8125rem', fontWeight: '400', color: '#6e6e73' }}> / {FREE_GENERATIONS}</span>
            </div>
            <div style={{ height: '3px', background: '#333', borderRadius: '2px', marginTop: '0.5rem', overflow: 'hidden' }}>
              <div style={{ width: `${(remaining / FREE_GENERATIONS) * 100}%`, height: '100%', background: '#0071e3', borderRadius: '2px' }} />
            </div>
          </div>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.625rem',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#86868b',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Sign out
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: '220px', flex: 1, minHeight: '100vh' }}>
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
