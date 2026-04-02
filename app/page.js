'use client'

import { useState, useEffect } from 'react'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [showAuth, setShowAuth] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAuth = () => {
    if (!email || !email.includes('@')) return
    const userData = { email, remainingGenerations: 10, verified: true }
    localStorage.setItem('siteforge_user', JSON.stringify(userData))
    localStorage.setItem('siteforge_remaining', '10')
    window.location.href = '/app'
  }

  return (
    <div style={{ background: '#000', color: '#fff', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', overflowX: 'hidden' }}>
      {showAuth && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', 
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div style={{ 
            background: '#0a0a0a', borderRadius: '12px', padding: '2rem', width: '90%', maxWidth: '380px',
            border: '1px solid #1a1a1a'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Get started</h2>
            <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1.25rem' }}>10 free generations, no credit card required.</p>
            
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Work email"
              autoFocus
              style={{
                width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                border: '1px solid #222', background: '#111', color: '#fff',
                fontSize: '0.9375rem', boxSizing: 'border-box', outline: 'none', marginBottom: '0.75rem',
              }}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
            />
            
            <button onClick={handleAuth} style={{
              width: '100%', padding: '0.75rem', borderRadius: '8px',
              background: '#fff', border: 'none', color: '#000',
              fontSize: '0.9375rem', fontWeight: '600', cursor: 'pointer'
            }}>
              Continue
            </button>
            
            <p style={{ fontSize: '0.75rem', color: '#444', textAlign: 'center', marginTop: '1rem' }}>
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      )}

      <nav style={{ 
        position: 'sticky', top: 0, zIndex: 100, 
        padding: '0 5%', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #111'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '56px' }}>
          <div style={{ fontWeight: '600', fontSize: '1rem' }}>SiteForge</div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <span style={{ color: '#666', fontSize: '0.875rem' }}>Features</span>
            <span style={{ color: '#666', fontSize: '0.875rem' }}>Pricing</span>
            <button onClick={() => setShowAuth(true)} style={{ 
              background: '#fff', color: '#000', padding: '0.5rem 1rem', borderRadius: '6px', 
              border: 'none', fontSize: '0.8125rem', fontWeight: '600', cursor: 'pointer'
            }}>
              Sign up free
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section style={{ padding: '8rem 5% 6rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          
          <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.375rem 0.75rem', background: '#111', borderRadius: '999px',
              fontSize: '0.75rem', color: '#666', marginBottom: '1.5rem', border: '1px solid #1a1a1a'
            }}>
              <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%' }}></span>
              Now with Groq AI - Free and unlimited
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '600', lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
              Build websites<br />
              <span style={{ color: '#666' }}>at the speed of thought</span>
            </h1>
            
            <p style={{ fontSize: '1.125rem', color: '#666', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
              Describe what you need. Get production-ready code in seconds. No design skills required.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setShowAuth(true)} style={{
                padding: '0.875rem 1.5rem', fontSize: '0.9375rem', borderRadius: '8px',
                background: '#fff', border: 'none', color: '#000',
                fontWeight: '600', cursor: 'pointer'
              }}>
                Start building free
              </button>
              <button style={{
                padding: '0.875rem 1.5rem', fontSize: '0.9375rem', borderRadius: '8px',
                background: 'transparent', border: '1px solid #222',
                color: '#fff', fontWeight: '500', cursor: 'pointer'
              }}>
                See examples
              </button>
            </div>

            <p style={{ fontSize: '0.8125rem', color: '#444', marginTop: '1rem' }}>Free for 10 generations. No credit card.</p>
          </div>
        </section>

        <section style={{ padding: '4rem 5%', borderTop: '1px solid #111', borderBottom: '1px solid #111', background: '#050505' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ background: '#0a0a0a', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1a1a1a' }}>
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #111', display: 'flex', gap: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28ca41' }}></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', minHeight: '320px' }}>
                <div style={{ padding: '2rem', borderRight: '1px solid #111' }}>
                  <p style={{ fontSize: '0.6875rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Input</p>
                  <div style={{ 
                    padding: '1rem', background: '#111', borderRadius: '8px',
                    fontSize: '0.8125rem', color: '#888', lineHeight: 1.7, fontStyle: 'italic'
                  }}>
                    "A modern landing page for a design studio with their services, team section, and contact form"
                  </div>
                </div>
                <div style={{ padding: '2rem', background: '#fafafa', color: '#111' }}>
                  <p style={{ fontSize: '0.6875rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Generated Output</p>
                  <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <div style={{ height: '12px', background: '#111', borderRadius: '4px', width: '50%', marginBottom: '1rem' }}></div>
                    <div style={{ height: '6px', background: '#e5e5e5', borderRadius: '3px', width: '75%', marginBottom: '1.5rem' }}></div>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ width: '48px', height: '48px', background: '#f0f0f0', borderRadius: '8px' }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ height: '6px', background: '#e5e5e5', borderRadius: '3px', width: '60%', marginBottom: '0.5rem' }}></div>
                        <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '3px', width: '80%' }}></div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                      {[1, 2, 3].map(i => (
                        <div key={i} style={{ height: '60px', background: '#f5f5f5', borderRadius: '6px' }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '5rem 5%' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '0.75rem' }}>How it works</h2>
              <p style={{ color: '#666', fontSize: '0.9375rem' }}>Three steps to your perfect website</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {[
                { num: '01', title: 'Describe it', desc: 'Tell us what you want in plain English. Be as detailed as you like.' },
                { num: '02', title: 'AI builds it', desc: 'Our AI creates production-ready code tailored to your needs.' },
                { num: '03', title: 'Download', desc: 'Get clean HTML, CSS, and JS. Host anywhere you want.' },
              ].map((step, i) => (
                <div key={i} style={{ 
                  padding: '1.5rem', background: '#0a0a0a', borderRadius: '10px',
                  border: '1px solid #1a1a1a'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#444', marginBottom: '0.75rem', fontWeight: '600' }}>{step.num}</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '5rem 5%', borderTop: '1px solid #111' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '0.75rem' }}>Built for everyone</h2>
              <p style={{ color: '#666', fontSize: '0.9375rem' }}>No coding required</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {[
                'Freelancers who need portfolios fast',
                'Small businesses launching online',
                'Startups testing landing pages',
                'Developers prototyping ideas',
                'Marketers running quick campaigns',
                'Anyone who hates writing HTML',
              ].map((item, i) => (
                <div key={i} style={{ 
                  padding: '1.25rem 1.5rem', background: '#0a0a0a', borderRadius: '8px',
                  border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: '0.75rem'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span style={{ fontSize: '0.9375rem', color: '#999' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '5rem 5%', background: '#050505', borderTop: '1px solid #111' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: '600', marginBottom: '1rem' }}>
              Ready to build something?
            </h2>
            <p style={{ color: '#666', fontSize: '1rem', marginBottom: '2rem' }}>
              Start with 10 free generations. No credit card required.
            </p>
            <button onClick={() => setShowAuth(true)} style={{
              padding: '1rem 2rem', fontSize: '1rem', borderRadius: '8px',
              background: '#fff', border: 'none', color: '#000',
              fontWeight: '600', cursor: 'pointer'
            }}>
              Start for free
            </button>
          </div>
        </section>
      </main>

      <footer style={{ padding: '2rem 5%', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>SiteForge</div>
          <p style={{ fontSize: '0.75rem', color: '#444' }}>© 2024 SiteForge</p>
        </div>
      </footer>
    </div>
  )
}
