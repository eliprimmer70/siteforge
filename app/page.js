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
    <div style={{ background: '#fafafa', color: '#18181b', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', overflowX: 'hidden', minHeight: '100vh' }}>
      {showAuth && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div style={{ 
            background: '#fff', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '400px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Start for free</h2>
            <p style={{ color: '#71717a', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>10 generations included. No card needed.</p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: '100%', padding: '0.875rem 1rem', borderRadius: '10px',
                border: '1px solid #e4e4e7', background: '#fafafa', color: '#18181b',
                fontSize: '1rem', boxSizing: 'border-box', outline: 'none', marginBottom: '1rem'
              }}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
            />
            <button onClick={handleAuth} style={{
              width: '100%', padding: '0.875rem', borderRadius: '10px',
              background: '#18181b', border: 'none', color: '#fff',
              fontSize: '1rem', fontWeight: '600', cursor: 'pointer'
            }}>
              Continue →
            </button>
            <button onClick={() => setShowAuth(false)} style={{
              width: '100%', marginTop: '0.75rem', padding: '0.75rem', borderRadius: '10px',
              background: 'transparent', border: 'none', color: '#71717a', fontSize: '0.875rem', cursor: 'pointer'
            }}>
              Maybe later
            </button>
          </div>
        </div>
      )}

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1rem 2rem', background: 'rgba(250,250,250,0.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e4e4e7' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: '700', fontSize: '1.125rem', letterSpacing: '-0.02em' }}>SiteForge</div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.9375rem' }}>Features</a>
            <a href="#pricing" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.9375rem' }}>Pricing</a>
            <button onClick={() => setShowAuth(true)} style={{ 
              background: '#18181b', color: '#fff', padding: '0.625rem 1.25rem', borderRadius: '8px', 
              border: 'none', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer'
            }}>
              Get started
            </button>
          </div>
        </div>
      </nav>

      <section style={{ padding: '9rem 2rem 5rem', position: 'relative', background: 'linear-gradient(180deg, #fafafa 0%, #fff 100%)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ 
            display: 'inline-block', fontSize: '0.8125rem', fontWeight: '600', color: '#6366f1',
            background: '#eeeffc', padding: '0.375rem 0.875rem', borderRadius: '20px', marginBottom: '1.5rem'
          }}>
            Now with AI-powered generation
          </span>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            Build websites<br />at the speed of thought.
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: '#71717a', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '520px', margin: '0 auto 2.5rem' }}>
            Tell us what you want. Get a working website in seconds. No coding needed.
          </p>

          <button onClick={() => setShowAuth(true)} style={{
            padding: '1rem 2rem', fontSize: '1.0625rem', borderRadius: '10px',
            background: '#18181b', border: 'none', color: '#fff',
            fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
          }}>
            Start building free →
          </button>

          <p style={{ fontSize: '0.8125rem', color: '#a1a1aa', marginTop: '1rem' }}>Free to start. No credit card required.</p>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '0.75rem' }}>
            How it works
          </h2>
          <p style={{ color: '#71717a', textAlign: 'center', marginBottom: '3rem', maxWidth: '400px', margin: '0 auto 3rem' }}>
            Three steps from idea to live website.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { num: '01', title: 'Describe it', desc: 'Tell us what you need in plain English. A landing page, portfolio, dashboard—anything.' },
              { num: '02', title: 'AI builds it', desc: 'Our AI creates a complete, working website tailored to your description.' },
              { num: '03', title: 'Download & launch', desc: 'Get the full source code. Host it anywhere you want.' },
            ].map((step, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: '14px', background: '#eeeffc',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.875rem', fontWeight: '700', color: '#6366f1', margin: '0 auto 1rem'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: '#71717a', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: '5rem 2rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem' }}>
            Everything you need
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'Lightning fast', desc: 'Generate complete websites in under 30 seconds.' },
              { title: 'Beautiful design', desc: 'Every site is polished, responsive, and professional.' },
              { title: 'Iterate instantly', desc: 'Want changes? Just tell us. We update it right away.' },
              { title: 'Clean code', desc: 'Download production-ready HTML/CSS/JS. You own it.' },
              { title: 'Private by default', desc: 'We never store or train on your projects.' },
              { title: 'Deploy anywhere', desc: 'The code works on any hosting platform.' },
            ].map((f, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: '12px', padding: '1.5rem',
                border: '1px solid #e4e4e7', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.375rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#71717a', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '0.75rem' }}>
            Simple pricing
          </h2>
          <p style={{ color: '#71717a', textAlign: 'center', marginBottom: '3rem' }}>Start free. Upgrade when you need more.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div style={{
              background: '#fafafa', borderRadius: '16px', padding: '2rem',
              border: '1px solid #e4e4e7'
            }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#71717a', marginBottom: '0.5rem' }}>Free</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>$0</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                {['10 generations/month', 'HTML download', 'Community support'].map(f => (
                  <li key={f} style={{ fontSize: '0.9375rem', color: '#52525b', marginBottom: '0.625rem' }}>✓ {f}</li>
                ))}
              </ul>
              <button onClick={() => setShowAuth(true)} style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px',
                background: '#fff', border: '1px solid #e4e4e7', color: '#18181b',
                fontSize: '0.9375rem', fontWeight: '600', cursor: 'pointer'
              }}>
                Get started
              </button>
            </div>

            <div style={{
              background: '#18181b', borderRadius: '16px', padding: '2rem', color: '#fff',
              position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}>
              <div style={{ 
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                background: '#6366f1', padding: '0.25rem 0.875rem', borderRadius: '20px',
                fontSize: '0.6875rem', fontWeight: '700', color: '#fff'
              }}>
                BEST VALUE
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#a1a1aa', marginBottom: '0.5rem' }}>Pro</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>$9<span style={{ fontSize: '1rem', fontWeight: '400', color: '#71717a' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                {['100 generations/month', 'Priority support', 'Custom domains', 'No watermark'].map(f => (
                  <li key={f} style={{ fontSize: '0.9375rem', color: '#d4d4d8', marginBottom: '0.625rem' }}>✓ {f}</li>
                ))}
              </ul>
              <button style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px',
                background: '#fff', border: 'none', color: '#18181b',
                fontSize: '0.9375rem', fontWeight: '600', cursor: 'pointer'
              }}>
                Coming soon
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 2rem', background: '#18181b', color: '#fff' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            Ready to build something great?
          </h2>
          <p style={{ color: '#a1a1aa', marginBottom: '2rem' }}>
            Join thousands of creators shipping faster with SiteForge.
          </p>
          <button onClick={() => setShowAuth(true)} style={{
            padding: '1rem 2rem', fontSize: '1.0625rem', borderRadius: '10px',
            background: '#fff', border: 'none', color: '#18181b',
            fontWeight: '700', cursor: 'pointer'
          }}>
            Start for free →
          </button>
        </div>
      </section>

      <footer style={{ padding: '2rem', background: '#fafafa', borderTop: '1px solid #e4e4e7' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: '700', fontSize: '0.9375rem' }}>SiteForge</div>
          <p style={{ fontSize: '0.8125rem', color: '#a1a1aa' }}>© 2024</p>
        </div>
      </footer>
    </div>
  )
}
