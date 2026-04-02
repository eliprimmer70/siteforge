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
      const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const storedUser = localStorage.getItem('siteforge_user')
    const storedRemaining = localStorage.getItem('siteforge_remaining')
    
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else if (!isMobile) {
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
        <div style={{ width: '24px', height: '24px', border: '2px solid #333', borderTop: '2px solid #667eea', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
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
        padding: '2rem',
        position: 'fixed',
        inset: 0,
        zIndex: 9999
      }}>
        <div style={{ 
          background: '#0a0a0a', 
          borderRadius: '24px', 
          padding: '3rem', 
          textAlign: 'center',
          maxWidth: '400px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>💻</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Desktop Required</h1>
          <p style={{ color: '#86868b', lineHeight: 1.6, marginBottom: '2rem' }}>
            SiteForge works best on a desktop or laptop computer. Please visit us on a PC for the full experience.
          </p>
          <a 
            href="/" 
            style={{
              display: 'block',
              padding: '1rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '12px',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Back to Homepage
          </a>
        </div>
      </div>
    )
  }

  const navItems = [
    { href: '/app', icon: '🏠', label: 'Home' },
    { href: '/app/projects', icon: '📁', label: 'Projects' },
    { href: '/app/settings', icon: '⚙️', label: 'Settings' },
    { href: '/app/billing', icon: '💳', label: 'Billing' },
  ]

  const isActive = (href) => {
    if (href === '/app') return pathname === '/app'
    return pathname.startsWith(href)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Helvetica, Arial, sans-serif' }}>
      <aside style={{ width: '240px', background: '#0a0a0a', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <a href="/app" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#fff' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>S</div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '1rem' }}>SiteForge</div>
              <div style={{ fontSize: '0.7rem', color: '#666' }}>Dashboard</div>
            </div>
          </a>
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
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                textDecoration: 'none',
                color: isActive(item.href) ? '#fff' : '#86868b',
                background: isActive(item.href) ? 'rgba(102, 126, 234, 0.15)' : 'transparent',
                marginBottom: '0.25rem',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '1.125rem' }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', border: '1px solid rgba(102,126,234,0.2)' }}>
            <div style={{ fontSize: '0.7rem', color: '#86868b', marginBottom: '0.5rem' }}>FREE TRIAL</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>
              {remaining}
              <span style={{ fontSize: '0.875rem', fontWeight: '400', color: '#666' }}> / {FREE_GENERATIONS}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#86868b' }}>generations left</div>
            <div style={{ height: '4px', background: '#222', borderRadius: '2px', marginTop: '0.75rem', overflow: 'hidden' }}>
              <div style={{ width: `${(remaining / FREE_GENERATIONS) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #667eea, #764ba2)', borderRadius: '2px' }} />
            </div>
          </div>
          <a 
            href="/app/billing" 
            style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '0.875rem',
              fontWeight: '600',
              textAlign: 'center',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            Upgrade to Pro
          </a>
        </div>
      </aside>

      <main style={{ marginLeft: '240px', flex: 1, minHeight: '100vh' }}>
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
