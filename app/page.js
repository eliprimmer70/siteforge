'use client'

import { useState, useEffect } from 'react'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [showAuth, setShowAuth] = useState(false)

  const handleAuth = () => {
    if (!email || !email.includes('@')) return
    const userData = { email, remainingGenerations: 10 }
    localStorage.setItem('siteforge_user', JSON.stringify(userData))
    localStorage.setItem('siteforge_remaining', '10')
    window.location.href = '/app'
  }

  return (
    <div style={{ background: '#0a0a0b', color: '#e4e4e7', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', overflowX: 'hidden', minHeight: '100vh' }}>
      {showAuth && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div style={{ 
            background: '#18181b', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '380px',
            border: '1px solid #27272a'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Start for free</h2>
            <p style={{ color: '#71717a', fontSize: '0.875rem', marginBottom: '1.25rem' }}>10 generations, no card needed.</p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px',
                border: '1px solid #3f3f46', background: '#09090b', color: '#e4e4e7',
                fontSize: '0.9375rem', boxSizing: 'border-box', outline: 'none', marginBottom: '0.75rem'
              }}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
            />
            <button onClick={handleAuth} style={{
              width: '100%', padding: '0.75rem', borderRadius: '8px',
              background: '#fff', border: 'none', color: '#09090b',
              fontSize: '0.9375rem', fontWeight: '600', cursor: 'pointer'
            }}>
              Continue
            </button>
            <button onClick={() => setShowAuth(false)} style={{
              width: '100%', marginTop: '0.5rem', padding: '0.5rem', borderRadius: '8px',
              background: 'transparent', border: 'none', color: '#71717a', fontSize: '0.875rem', cursor: 'pointer'
            }}>
              Maybe later
            </button>
          </div>
        </div>
      )}

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1rem 1.5rem', backdropFilter: 'blur(12px)', borderBottom: '1px solid #27272a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: '700', fontSize: '1rem', letterSpacing: '-0.02em' }}>SiteForge</div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.875rem' }}>Features</a>
            <a href="#pricing" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.875rem' }}>Pricing</a>
            <button onClick={() => setShowAuth(true)} style={{ 
              background: '#fff', color: '#09090b', padding: '0.5rem 1rem', borderRadius: '6px', 
              border: 'none', fontSize: '0.8125rem', fontWeight: '600', cursor: 'pointer'
            }}>
              Get started
            </button>
          </div>
        </div>
      </nav>

      <section style={{ padding: '10rem 1.5rem 6rem', position: 'relative' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.25rem, 6vw, 3.5rem)', fontWeight: '700', lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.025em' }}>
            Build websites<br />with your words.
          </h1>
          
          <p style={{ fontSize: '1.125rem', color: '#a1a1aa', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
            Describe what you need. Get a working website. Ship faster.
          </p>

          <button onClick={() => setShowAuth(true)} style={{
            padding: '0.875rem 1.75rem', fontSize: '1rem', borderRadius: '8px',
            background: '#fff', border: 'none', color: '#09090b',
            fontWeight: '600', cursor: 'pointer'
          }}>
            Try it free →
          </button>

          <p style={{ fontSize: '0.75rem', color: '#52525b', marginTop: '0.875rem' }}>Free to start. No credit card.</p>
        </div>
      </section>

      <section id="features" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem' }}>
            What you get
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'Instant results', desc: 'From idea to live website in seconds. No coding required.' },
              { title: 'Clean code', desc: 'Download production-ready HTML. Host anywhere.' },
              { title: 'Natural edits', desc: 'Tell us what to change. We update it instantly.' },
              { title: 'Your data stays yours', desc: 'We never store or train on your projects.' },
            ].map((f, i) => (
              <div key={i} style={{
                background: '#18181b', borderRadius: '10px', padding: '1.25rem',
                border: '1px solid #27272a'
              }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.375rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.8125rem', color: '#71717a', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: '5rem 1.5rem', background: '#18181b' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', textAlign: 'center', marginBottom: '0.75rem' }}>
            Simple pricing
          </h2>
          <p style={{ color: '#71717a', textAlign: 'center', marginBottom: '2.5rem' }}>Start free. Upgrade when you need more.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{
              background: '#09090b', borderRadius: '10px', padding: '1.5rem',
              border: '1px solid #27272a'
            }}>
              <div style={{ fontSize: '0.8125rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Free</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>$0</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                {['10 generations', 'HTML download', 'Basic support'].map(f => (
                  <li key={f} style={{ fontSize: '0.8125rem', color: '#71717a', marginBottom: '0.5rem' }}>• {f}</li>
                ))}
              </ul>
              <button onClick={() => setShowAuth(true)} style={{
                width: '100%', padding: '0.625rem', borderRadius: '6px',
                background: '#27272a', border: 'none', color: '#e4e4e7',
                fontSize: '0.8125rem', fontWeight: '600', cursor: 'pointer'
              }}>
                Get started
              </button>
            </div>

            <div style={{
              background: '#09090b', borderRadius: '10px', padding: '1.5rem',
              border: '1px solid #6366f1'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#a1a1aa' }}>Pro</span>
                <span style={{ fontSize: '0.625rem', background: '#6366f1', padding: '0.125rem 0.375rem', borderRadius: '4px', color: '#fff', fontWeight: '600' }}>BEST</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>$9<span style={{ fontSize: '0.875rem', fontWeight: '400', color: '#71717a' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                {['100 generations', 'Priority support', 'Custom domains', 'No watermark'].map(f => (
                  <li key={f} style={{ fontSize: '0.8125rem', color: '#71717a', marginBottom: '0.5rem' }}>• {f}</li>
                ))}
              </ul>
              <button style={{
                width: '100%', padding: '0.625rem', borderRadius: '6px',
                background: '#6366f1', border: 'none', color: '#fff',
                fontSize: '0.8125rem', fontWeight: '600', cursor: 'pointer'
              }}>
                Coming soon
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.75rem' }}>
            Start building today
          </h2>
          <p style={{ color: '#71717a', marginBottom: '1.5rem' }}>
            Free to try. No commitment.
          </p>
          <button onClick={() => setShowAuth(true)} style={{
            padding: '0.875rem 1.75rem', fontSize: '1rem', borderRadius: '8px',
            background: '#fff', border: 'none', color: '#09090b',
            fontWeight: '600', cursor: 'pointer'
          }}>
            Get started free
          </button>
        </div>
      </section>

      <footer style={{ padding: '2rem 1.5rem', borderTop: '1px solid #27272a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>SiteForge</div>
          <p style={{ fontSize: '0.75rem', color: '#52525b' }}>© 2024</p>
        </div>
      </footer>
    </div>
  )
}
