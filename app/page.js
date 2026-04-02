'use client'

import { useState, useEffect } from 'react'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [showAuth, setShowAuth] = useState(false)

  const handleAuth = () => {
    if (!email || !email.includes('@')) return
    const userData = { email, remainingGenerations: 10, verified: true }
    localStorage.setItem('siteforge_user', JSON.stringify(userData))
    localStorage.setItem('siteforge_remaining', '10')
    window.location.href = '/app'
  }

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', overflowX: 'hidden' }}>
      {showAuth && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', 
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div style={{ 
            background: '#fff', borderRadius: '12px', padding: '2.5rem', width: '90%', maxWidth: '400px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>Get started</h2>
            <p style={{ color: '#666', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>10 free website generations. No credit card required.</p>
            
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Work email"
              autoFocus
              style={{
                width: '100%', padding: '0.875rem 1rem', borderRadius: '8px',
                border: '1px solid #ddd', background: '#fafafa', color: '#111',
                fontSize: '1rem', boxSizing: 'border-box', outline: 'none', marginBottom: '1rem',
              }}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
            />
            
            <button onClick={handleAuth} style={{
              width: '100%', padding: '0.875rem', borderRadius: '8px',
              background: '#111', border: 'none', color: '#fff',
              fontSize: '1rem', fontWeight: '500', cursor: 'pointer'
            }}>
              Continue with email
            </button>
            
            <p style={{ fontSize: '0.8125rem', color: '#999', textAlign: 'center', marginTop: '1rem' }}>
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      )}

      <nav style={{ 
        position: 'sticky', top: 0, zIndex: 100, 
        padding: '0 5%', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          <div style={{ fontWeight: '600', fontSize: '1.125rem', letterSpacing: '-0.02em' }}>
            SiteForge
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9375rem' }}>Features</a>
            <a href="#pricing" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9375rem' }}>Pricing</a>
            <button onClick={() => setShowAuth(true)} style={{ 
              background: '#111', color: '#fff', padding: '0.625rem 1.25rem', borderRadius: '6px', 
              border: 'none', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer'
            }}>
              Sign up free
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section style={{ padding: '6rem 5% 4rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '600', lineHeight: 1.2, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Build websites in minutes,<br />not hours
            </h1>
            
            <p style={{ fontSize: '1.125rem', color: '#666', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '560px', margin: '0 auto 2rem' }}>
              Describe what you need. Get production-ready code. No design skills required.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setShowAuth(true)} style={{
                padding: '0.875rem 1.5rem', fontSize: '1rem', borderRadius: '6px',
                background: '#111', border: 'none', color: '#fff',
                fontWeight: '500', cursor: 'pointer'
              }}>
                Start for free
              </button>
              <button style={{
                padding: '0.875rem 1.5rem', fontSize: '1rem', borderRadius: '6px',
                background: 'transparent', border: '1px solid #ddd',
                color: '#111', fontWeight: '500', cursor: 'pointer'
              }}>
                View examples
              </button>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#999', marginTop: '1rem' }}>No credit card required</p>
          </div>
        </section>

        <section style={{ padding: '4rem 5%', background: '#fafafa', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '2rem', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Input</p>
                  <div style={{ 
                    padding: '1.25rem', background: '#f8f8f8', borderRadius: '8px', border: '1px solid #eee',
                    fontSize: '0.9375rem', color: '#333', lineHeight: 1.6, fontStyle: 'italic'
                  }}>
                    "A landing page for a design agency with services, portfolio, and contact form"
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Output</p>
                  <div style={{ background: '#fff', borderRadius: '8px', padding: '1.5rem', border: '1px solid #eee' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ height: '8px', background: '#333', borderRadius: '4px', width: '40%', marginBottom: '0.75rem' }}></div>
                      <div style={{ height: '4px', background: '#ddd', borderRadius: '2px', width: '70%' }}></div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ width: '60px', height: '60px', background: '#f0f0f0', borderRadius: '8px' }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ height: '4px', background: '#ddd', borderRadius: '2px', width: '80%', marginBottom: '0.5rem' }}></div>
                        <div style={{ height: '4px', background: '#eee', borderRadius: '2px', width: '60%' }}></div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                      {[1, 2, 3].map(i => (
                        <div key={i} style={{ height: '80px', background: '#f5f5f5', borderRadius: '6px' }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" style={{ padding: '5rem 5%' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '0.75rem' }}>Features</h2>
              <p style={{ color: '#666', fontSize: '1rem' }}>Everything you need to ship websites faster</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {[
                { title: 'Instant generation', desc: 'Get working code in seconds. No more staring at blank files.' },
                { title: 'Clean code', desc: 'Production-ready HTML, CSS, and JS. Readable and maintainable.' },
                { title: 'Responsive design', desc: 'Every site works on mobile, tablet, and desktop.' },
                { title: 'Easy iteration', desc: 'Ask for changes in plain English. Get results instantly.' },
                { title: 'Download & own', desc: 'Get the full source code. Host anywhere. No lock-in.' },
                { title: 'No design skills', desc: 'Professional results without touching a single design tool.' },
              ].map((f, i) => (
                <div key={i} style={{ padding: '1.5rem 0' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.9375rem', color: '#666', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '5rem 5%', background: '#fafafa', borderTop: '1px solid #eee' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem' }}>Simple pricing</h2>
            <p style={{ color: '#666', fontSize: '1rem', marginBottom: '2.5rem' }}>Start free. Upgrade when you need more.</p>
          </div>

          <div style={{ maxWidth: '700px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div style={{
              background: '#fff', borderRadius: '12px', padding: '2rem',
              border: '1px solid #eee'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem', fontWeight: '500' }}>Free</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>$0</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', textAlign: 'left' }}>
                {['10 generations per month', 'HTML download', 'Basic support'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9375rem', color: '#444' }}>
                    <span style={{ color: '#22c55e' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowAuth(true)} style={{
                width: '100%', padding: '0.75rem', borderRadius: '6px',
                background: '#f5f5f5', border: '1px solid #ddd',
                color: '#111', fontSize: '0.9375rem', fontWeight: '500', cursor: 'pointer'
              }}>
                Get started
              </button>
            </div>

            <div style={{
              background: '#111', borderRadius: '12px', padding: '2rem',
              color: '#fff'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#999', marginBottom: '0.5rem', fontWeight: '500' }}>Pro</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>$9<span style={{ fontSize: '1.25rem', fontWeight: '400', color: '#999' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', textAlign: 'left' }}>
                {['100 generations per month', 'Priority support', 'Custom domains', 'No watermark'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9375rem', color: '#f5f5f5' }}>
                    <span style={{ color: '#22c55e' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="/app/billing" style={{
                display: 'block', width: '100%', padding: '0.75rem', borderRadius: '6px',
                background: '#fff', border: 'none',
                color: '#111', fontSize: '0.9375rem', fontWeight: '500', cursor: 'pointer', textDecoration: 'none', textAlign: 'center'
              }}>
                Upgrade
              </a>
            </div>
          </div>
        </section>

        <section id="pricing" style={{ padding: '5rem 5%', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem' }}>Ready to ship faster?</h2>
            <p style={{ color: '#666', fontSize: '1rem', marginBottom: '2rem' }}>
              Join hundreds of developers and designers who use SiteForge.
            </p>
            <button onClick={() => setShowAuth(true)} style={{
              padding: '1rem 2rem', fontSize: '1rem', borderRadius: '6px',
              background: '#111', border: 'none', color: '#fff',
              fontWeight: '500', cursor: 'pointer'
            }}>
              Start for free
            </button>
          </div>
        </section>
      </main>

      <footer style={{ padding: '2rem 5%', borderTop: '1px solid #eee' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: '600', fontSize: '0.9375rem' }}>SiteForge</div>
          <p style={{ fontSize: '0.8125rem', color: '#999' }}>© 2024 SiteForge</p>
        </div>
      </footer>
    </div>
  )
}
