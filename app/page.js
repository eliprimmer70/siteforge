'use client'

import { useState, useEffect } from 'react'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [showAuth, setShowAuth] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const handleAuth = () => {
    if (!email || !email.includes('@')) {
      return
    }
    const userData = { email, remainingGenerations: 10 }
    localStorage.setItem('siteforge_user', JSON.stringify(userData))
    localStorage.setItem('siteforge_remaining', '10')
    window.location.href = '/app'
  }

  return (
    <div style={{ background: '#030305', color: '#fff', fontFamily: 'Inter, -apple-system, sans-serif', overflowX: 'hidden', minHeight: '100vh' }}>
      <div style={{ 
        position: 'fixed', 
        top: 0, left: 0, right: 0, bottom: 0, 
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.08), transparent 40%)`,
        pointerEvents: 'none', 
        zIndex: 0 
      }} />

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1rem 2rem', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.875rem' }}>S</div>
            <span style={{ fontWeight: '700', fontSize: '1.125rem', letterSpacing: '-0.02em' }}>SiteForge</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>Features</a>
            <a href="#pricing" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>Pricing</a>
            <button onClick={() => setShowAuth(true)} style={{ 
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
              color: '#fff', 
              padding: '0.625rem 1.25rem', 
              borderRadius: '8px', 
              border: 'none', 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              cursor: 'pointer'
            }}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {showAuth && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div style={{ 
            background: '#0f0f12', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '400px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Start building for free</h2>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1.5rem' }}>10 free generations included</p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: '100%', padding: '0.875rem 1rem', borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)', background: '#000', color: '#fff',
                fontSize: '1rem', boxSizing: 'border-box', outline: 'none', marginBottom: '1rem'
              }}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
            />
            <button onClick={handleAuth} style={{
              width: '100%', padding: '0.875rem', borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: '#fff',
              fontSize: '1rem', fontWeight: '600', cursor: 'pointer'
            }}>
              Continue →
            </button>
            <button onClick={() => setShowAuth(false)} style={{
              width: '100%', marginTop: '0.75rem', padding: '0.75rem', borderRadius: '10px',
              background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '0.875rem', cursor: 'pointer'
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 2rem 4rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
            background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '20px', padding: '0.375rem 1rem', marginBottom: '2rem'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#a5b4fc' }}>✨ Now with AI-powered generation</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em', background: 'linear-gradient(180deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Build websites<br />at the speed of thought.
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: '#9ca3af', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Describe what you want. Watch it come to life. No code, no design skills needed.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setShowAuth(true)} style={{
              padding: '1rem 2rem', fontSize: '1.125rem', borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: '#fff',
              fontWeight: '700', cursor: 'pointer', boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)'
            }}>
              Start building free →
            </button>
            <button style={{
              padding: '1rem 2rem', fontSize: '1.125rem', borderRadius: '12px',
              background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
              fontWeight: '600', cursor: 'pointer'
            }}>
              Watch demo
            </button>
          </div>

          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '1rem' }}>Free to start. No credit card required.</p>
        </div>

        <div style={{ marginTop: '4rem', width: '100%', maxWidth: '1000px' }}>
          <div style={{ 
            background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05))',
            borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#a5b4fc', marginBottom: '0.5rem' }}>PROMPT</div>
                <p style={{ fontSize: '0.9rem', color: '#e5e7eb', lineHeight: 1.6 }}>
                  "A modern landing page for a SaaS startup with pricing, features, and testimonials"
                </p>
              </div>
              <div style={{ background: '#000', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontFamily: 'monospace' }}>
                  <p>✓ Landing page created</p>
                  <p>✓ Responsive design</p>
                  <p>✓ SEO optimized</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Everything you need to ship faster
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#9ca3af', maxWidth: '500px', margin: '0 auto' }}>
              From idea to production in seconds
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Generate complete websites in under 30 seconds. No more hours of coding.' },
              { icon: '🎨', title: 'Beautiful Design', desc: 'Every site is crafted with modern design principles. No ugly templates.' },
              { icon: '🔄', title: 'Iterate Instantly', desc: 'Make changes with natural language. Describe, refine, repeat.' },
              { icon: '📥', title: 'Own Your Code', desc: 'Download clean HTML/CSS/JS. Host anywhere you want.' },
              { icon: '🔒', title: 'Private & Secure', desc: 'Your ideas stay yours. We never train on your data.' },
              { icon: '🌐', title: 'Publish Anywhere', desc: 'Get production-ready code. Deploy to any hosting platform.' },
            ].map((feature, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '1.75rem',
                border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: '#9ca3af', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Simple, transparent pricing
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#9ca3af' }}>
              Start free. Upgrade when you need more.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '2rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Free</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: '800' }}>$0</span>
                <span style={{ color: '#6b7280' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {['10 generations/month', 'HTML download', 'Community support'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#d1d5db', fontSize: '0.9375rem' }}>
                    <span style={{ color: '#22c55e' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowAuth(true)} style={{
                width: '100%', padding: '0.875rem', borderRadius: '10px',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '0.9375rem'
              }}>
                Get started
              </button>
            </div>

            <div style={{
              background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1))',
              borderRadius: '20px', padding: '2rem',
              border: '1px solid rgba(99, 102, 241, 0.5)',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>
                Popular
              </div>
              <div style={{ fontSize: '1rem', color: '#a5b4fc', marginBottom: '0.5rem' }}>Pro</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: '800' }}>$9</span>
                <span style={{ color: '#6b7280' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {['100 generations/month', 'Priority support', 'Custom domains', 'No watermark'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#d1d5db', fontSize: '0.9375rem' }}>
                    <span style={{ color: '#22c55e' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button style={{
                width: '100%', padding: '0.875rem', borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none',
                color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '0.9375rem'
              }}>
                Coming soon
              </button>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '2rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Unlimited</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: '800' }}>$29</span>
                <span style={{ color: '#6b7280' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {['Unlimited generations', '24/7 support', 'API access', 'White label'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#d1d5db', fontSize: '0.9375rem' }}>
                    <span style={{ color: '#22c55e' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button style={{
                width: '100%', padding: '0.875rem', borderRadius: '10px',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '0.9375rem'
              }}>
                Coming soon
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Ready to build something great?
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#9ca3af', marginBottom: '2.5rem' }}>
            Join thousands of creators shipping faster with SiteForge.
          </p>
          <button onClick={() => setShowAuth(true)} style={{
            padding: '1.125rem 2.5rem', fontSize: '1.25rem', borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: '#fff',
            fontWeight: '700', cursor: 'pointer', boxShadow: '0 0 60px rgba(99, 102, 241, 0.4)'
          }}>
            Start building free →
          </button>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '1rem' }}>Free to start. No credit card required.</p>
        </div>
      </section>

      <footer style={{ padding: '3rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.75rem' }}>S</div>
            <span style={{ fontWeight: '600' }}>SiteForge</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>© 2024 SiteForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
