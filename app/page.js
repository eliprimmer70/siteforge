'use client'

import { useState, useEffect, useRef } from 'react'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [showAuth, setShowAuth] = useState(false)
  const [authStep, setAuthStep] = useState('email')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSendCode = async () => {
    if (!email || !email.includes('@')) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setAuthStep('verify')
    setLoading(false)
  }

  const handleVerify = async () => {
    if (code.length !== 6) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    const userData = { email, remainingGenerations: 10, verified: true }
    localStorage.setItem('siteforge_user', JSON.stringify(userData))
    localStorage.setItem('siteforge_remaining', '10')
    window.location.href = '/app'
  }

  return (
    <div style={{ background: '#fafafa', color: '#18181b', fontFamily: 'Inter, -apple-system, sans-serif', overflowX: 'hidden' }}>
      {showAuth && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{ 
            background: '#fff', borderRadius: '20px', padding: '2.5rem', width: '100%', maxWidth: '420px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            animation: 'slideUp 0.3s ease'
          }}>
            {authStep === 'email' ? (
              <>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Create your account</h2>
                <p style={{ color: '#71717a', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>Start with 10 free generations</p>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  style={{
                    width: '100%', padding: '1rem', borderRadius: '12px',
                    border: '1px solid #e4e4e7', background: '#fafafa', color: '#18181b',
                    fontSize: '1rem', boxSizing: 'border-box', outline: 'none', marginBottom: '1rem'
                  }}
                />
                <button onClick={handleSendCode} disabled={loading} style={{
                  width: '100%', padding: '1rem', borderRadius: '12px',
                  background: '#18181b', border: 'none', color: '#fff',
                  fontSize: '1rem', fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.7 : 1
                }}>
                  {loading ? 'Sending...' : 'Continue with email'}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
                  <div style={{ flex: 1, height: '1px', background: '#e4e4e7' }} />
                  <span style={{ padding: '0 1rem', color: '#a1a1aa', fontSize: '0.75rem' }}>or continue with</span>
                  <div style={{ flex: 1, height: '1px', background: '#e4e4e7' }} />
                </div>
                <button style={{
                  width: '100%', padding: '1rem', borderRadius: '12px',
                  background: '#fff', border: '1px solid #e4e4e7', color: '#18181b',
                  fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginBottom: '0.75rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Continue with Google
                </button>
                <p style={{ fontSize: '0.75rem', color: '#a1a1aa', textAlign: 'center', marginTop: '1rem' }}>
                  By continuing, you agree to our <span style={{ color: '#18181b' }}>Terms</span> and <span style={{ color: '#18181b' }}>Privacy Policy</span>
                </p>
                <button onClick={() => setShowAuth(false)} style={{
                  width: '100%', marginTop: '1rem', padding: '0.75rem', borderRadius: '12px',
                  background: 'transparent', border: 'none', color: '#71717a', fontSize: '0.9375rem', cursor: 'pointer'
                }}>
                  Maybe later
                </button>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Check your email</h2>
                <p style={{ color: '#71717a', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>We sent a code to {email}</p>
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  style={{
                    width: '100%', padding: '1rem', borderRadius: '12px',
                    border: '1px solid #e4e4e7', background: '#fafafa', color: '#18181b',
                    fontSize: '1.5rem', textAlign: 'center', letterSpacing: '0.5rem', boxSizing: 'border-box', outline: 'none', marginBottom: '1rem'
                  }}
                />
                <button onClick={handleVerify} disabled={loading || code.length !== 6} style={{
                  width: '100%', padding: '1rem', borderRadius: '12px',
                  background: '#18181b', border: 'none', color: '#fff',
                  fontSize: '1rem', fontWeight: '600', cursor: 'pointer', opacity: code.length !== 6 ? 0.5 : 1
                }}>
                  {loading ? 'Verifying...' : 'Verify email'}
                </button>
                <button onClick={() => setAuthStep('email')} style={{
                  width: '100%', marginTop: '1rem', padding: '0.75rem', borderRadius: '12px',
                  background: 'transparent', border: 'none', color: '#71717a', fontSize: '0.875rem', cursor: 'pointer'
                }}>
                  ← Back to email
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1rem 2rem', background: 'rgba(250,250,250,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e4e4e7' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>SiteForge</div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
            <a href="#features" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.9375rem' }}>Features</a>
            <a href="#how" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.9375rem' }}>How it works</a>
            <a href="#pricing" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.9375rem' }}>Pricing</a>
            <a href="#faq" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.9375rem' }}>FAQ</a>
            <button onClick={() => setShowAuth(true)} style={{ 
              background: '#18181b', color: '#fff', padding: '0.625rem 1.25rem', borderRadius: '8px', 
              border: 'none', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer'
            }}>
              Get started
            </button>
          </div>
          <button onClick={() => setShowMobileNav(!showMobileNav)} className="mobile-menu-btn" style={{
            background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', display: 'none'
          }}>
            ☰
          </button>
        </div>
      </nav>

      <section style={{ padding: '10rem 2rem 6rem', position: 'relative', background: 'linear-gradient(180deg, #fafafa 0%, #fff 50%, #fafafa 100%)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ 
            animation: 'float 6s ease-in-out infinite',
            marginBottom: '2rem'
          }}>
            <span style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '600', 
              color: '#6366f1', background: '#eeeffc', padding: '0.5rem 1rem', borderRadius: '24px',
              border: '1px solid #c7d2fe'
            }}>
              <span style={{ width: '8px', height: '8px', background: '#6366f1', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
              AI-powered website builder
            </span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.75rem, 8vw, 4.5rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', 
            letterSpacing: '-0.03em', animation: 'fadeInUp 0.8s ease'
          }}>
            Build websites<br />
            <span style={{ 
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>at the speed of thought.</span>
          </h1>
          
          <p style={{ 
            fontSize: '1.375rem', color: '#71717a', lineHeight: 1.6, marginBottom: '2.5rem', 
            maxWidth: '560px', margin: '0 auto 2.5rem', animation: 'fadeInUp 0.8s ease 0.2s both'
          }}>
            Describe what you want. Watch it come to life. No code, no design skills, no compromise.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeInUp 0.8s ease 0.4s both' }}>
            <button onClick={() => setShowAuth(true)} style={{
              padding: '1.125rem 2.25rem', fontSize: '1.0625rem', borderRadius: '12px',
              background: '#18181b', border: 'none', color: '#fff',
              fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)' }}
            onMouseOut={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)' }}
            >
              Start building free →
            </button>
            <button style={{
              padding: '1.125rem 2.25rem', fontSize: '1.0625rem', borderRadius: '12px',
              background: '#fff', border: '1px solid #e4e4e7', color: '#18181b',
              fontWeight: '600', cursor: 'pointer'
            }}>
              Watch demo
            </button>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#a1a1aa', marginTop: '1.5rem', animation: 'fadeIn 0.8s ease 0.6s both' }}>
            Free to start. No credit card required. 10 generations included.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #18181b, #27272a)', borderRadius: '24px', padding: '3rem',
            display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem', alignItems: 'center',
            animation: 'fadeInUp 0.8s ease'
          }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '0.75rem' }}>Try it now</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Type a description and watch the AI generate your website in real-time.
              </p>
              <div style={{ background: '#09090b', borderRadius: '12px', padding: '1.25rem', border: '1px solid #3f3f46' }}>
                <p style={{ color: '#22c55e', fontSize: '0.875rem', fontFamily: 'monospace' }}>$ "Landing page for a coffee shop"</p>
                <p style={{ color: '#6366f1', fontSize: '0.875rem', fontFamily: 'monospace', marginTop: '0.5rem' }}>→ Generating...</p>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
              <h4 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>Brew & Co.</h4>
              <p style={{ color: '#71717a', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Artisan coffee, roasted daily</p>
              <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e4e4e7' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#71717a' }}>Menu</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#71717a' }}>About</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#71717a' }}>Contact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: '6rem 2rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Everything you need to ship faster
            </h2>
            <p style={{ color: '#71717a', fontSize: '1.125rem', maxWidth: '500px', margin: '0 auto' }}>
              Powerful features to help you build and launch websites in record time.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '⚡', title: 'Lightning fast', desc: 'Generate complete websites in under 30 seconds. No more hours of coding from scratch.', color: '#fbbf24' },
              { icon: '🎨', title: 'Beautiful design', desc: 'Every site is crafted with modern design principles. No ugly templates or clunky builders.', color: '#f472b6' },
              { icon: '🔄', title: 'Iterate instantly', desc: 'Make changes with natural language. "Make the header bigger" just works.', color: '#6366f1' },
              { icon: '📥', title: 'Own your code', desc: 'Download clean HTML/CSS/JS. Host anywhere you want. No lock-in.', color: '#22c55e' },
              { icon: '🔒', title: 'Private & secure', desc: 'Your ideas stay yours. We never store or train on your projects.', color: '#8b5cf6' },
              { icon: '🌐', title: 'Deploy anywhere', desc: 'The code works on any hosting platform. Vercel, Netlify, GitHub Pages, anywhere.', color: '#06b6d4' },
            ].map((f, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: '16px', padding: '2rem',
                border: '1px solid #e4e4e7', boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                animation: `fadeInUp 0.5s ease ${i * 0.1}s both`
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)' }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)' }}
              >
                <div style={{ 
                  width: '56px', height: '56px', borderRadius: '14px', 
                  background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', marginBottom: '1.25rem'
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: '#71717a', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              How it works
            </h2>
            <p style={{ color: '#71717a', fontSize: '1.125rem' }}>
              From idea to launch in three simple steps.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { num: '01', title: 'Describe your vision', desc: 'Tell us what you want in plain English. A landing page, portfolio, dashboard—anything you can imagine.' },
              { num: '02', title: 'AI builds it instantly', desc: 'Our AI understands context, design principles, and best practices to ship production-ready code.' },
              { num: '03', title: 'Download & launch', desc: 'Get the complete source code. Host anywhere, customize everything, ship when ready.' },
            ].map((step, i) => (
              <div key={i} style={{ 
                textAlign: 'center', padding: '2rem',
                animation: `fadeInUp 0.5s ease ${i * 0.15}s both`
              }}>
                <div style={{ 
                  width: '72px', height: '72px', borderRadius: '20px', 
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', fontWeight: '800', color: '#fff',
                  margin: '0 auto 1.5rem', boxShadow: '0 8px 30px rgba(99, 102, 241, 0.3)'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ fontSize: '1rem', color: '#71717a', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} style={{ padding: '6rem 2rem', background: '#18181b', color: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}>
            {[
              { num: '10,000+', label: 'Websites generated' },
              { num: '50+', label: 'Countries reached' },
              { num: '4.9/5', label: 'User satisfaction' },
              { num: '30s', label: 'Avg. generation time' },
            ].map((stat, i) => (
              <div key={i} style={{ 
                opacity: statsVisible ? 1 : 0, 
                transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${i * 0.1}s`
              }}>
                <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{stat.num}</div>
                <div style={{ fontSize: '0.9375rem', color: '#a1a1aa' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: '6rem 2rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Simple, transparent pricing
            </h2>
            <p style={{ color: '#71717a', fontSize: '1.125rem' }}>
              Start free. Upgrade when you need more.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{
              background: '#fff', borderRadius: '20px', padding: '2rem',
              border: '1px solid #e4e4e7', boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#71717a', marginBottom: '0.5rem' }}>Free</div>
              <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' }}>$0<span style={{ fontSize: '1rem', fontWeight: '400', color: '#a1a1aa' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {['10 generations/month', 'HTML download', 'Community support', 'Basic templates'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9375rem', color: '#52525b' }}>
                    <span style={{ color: '#22c55e' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowAuth(true)} style={{
                width: '100%', padding: '0.875rem', borderRadius: '10px',
                background: '#fff', border: '1px solid #e4e4e7', color: '#18181b',
                fontSize: '0.9375rem', fontWeight: '600', cursor: 'pointer'
              }}>
                Get started free
              </button>
            </div>

            <div style={{
              background: '#18181b', borderRadius: '20px', padding: '2rem', color: '#fff',
              position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
            }}>
              <div style={{ 
                position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                padding: '0.375rem 1rem', borderRadius: '20px',
                fontSize: '0.75rem', fontWeight: '700', color: '#fff'
              }}>
                MOST POPULAR
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#a1a1aa', marginBottom: '0.5rem' }}>Pro</div>
              <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' }}>$9<span style={{ fontSize: '1rem', fontWeight: '400', color: '#71717a' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {['100 generations/month', 'Priority support', 'Custom domains', 'No watermark', 'Advanced templates'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9375rem', color: '#d4d4d8' }}>
                    <span style={{ color: '#22c55e' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="/app/billing" style={{
                display: 'block', width: '100%', padding: '0.875rem', borderRadius: '10px',
                background: '#fff', border: 'none', color: '#18181b',
                fontSize: '0.9375rem', fontWeight: '600', cursor: 'pointer', textDecoration: 'none', textAlign: 'center'
              }}>
                Upgrade to Pro
              </a>
            </div>

            <div style={{
              background: '#fff', borderRadius: '20px', padding: '2rem',
              border: '1px solid #e4e4e7', boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#71717a', marginBottom: '0.5rem' }}>Unlimited</div>
              <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' }}>$29<span style={{ fontSize: '1rem', fontWeight: '400', color: '#a1a1aa' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {['Unlimited generations', '24/7 support', 'API access', 'White label', 'Custom integrations'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9375rem', color: '#52525b' }}>
                    <span style={{ color: '#22c55e' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button style={{
                width: '100%', padding: '0.875rem', borderRadius: '10px',
                background: '#fff', border: '1px solid #e4e4e7', color: '#18181b',
                fontSize: '0.9375rem', fontWeight: '600', cursor: 'pointer'
              }}>
                Coming soon
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '3rem', textAlign: 'center' }}>
            Frequently asked questions
          </h2>
          {[
            { q: 'What do I get with the free plan?', a: 'You get 10 website generations per month, unlimited downloads, and access to basic templates. No credit card required.' },
            { q: 'Can I use the generated code commercially?', a: 'Yes! You own 100% of the code generated. Use it for personal projects, client work, or commercial products.' },
            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, and PayPal through our secure Stripe integration.' },
            { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. Cancel anytime from your dashboard. You\'ll keep access until the end of your billing period.' },
            { q: 'Do you offer refunds?', a: 'Yes, we offer a 14-day money-back guarantee. No questions asked.' },
          ].map((faq, i) => (
            <div key={i} style={{ 
              padding: '1.5rem 0', borderBottom: '1px solid #e4e4e7',
              cursor: 'pointer'
            }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: '700', marginBottom: '0.5rem' }}>{faq.q}</h3>
              <p style={{ fontSize: '0.9375rem', color: '#71717a', lineHeight: 1.6 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '6rem 2rem', background: '#18181b', color: '#fff' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', marginBottom: '1rem' }}>
            Ready to build something great?
          </h2>
          <p style={{ color: '#a1a1aa', fontSize: '1.125rem', marginBottom: '2.5rem' }}>
            Join thousands of creators shipping faster with SiteForge.
          </p>
          <button onClick={() => setShowAuth(true)} style={{
            padding: '1.125rem 2.5rem', fontSize: '1.125rem', borderRadius: '12px',
            background: '#fff', border: 'none', color: '#18181b',
            fontWeight: '700', cursor: 'pointer'
          }}>
            Start for free →
          </button>
          <p style={{ color: '#71717a', fontSize: '0.875rem', marginTop: '1.5rem' }}>Free to start. No credit card required.</p>
        </div>
      </section>

      <footer style={{ padding: '3rem 2rem', background: '#fafafa', borderTop: '1px solid #e4e4e7' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontWeight: '800', fontSize: '1.125rem' }}>SiteForge</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.875rem' }}>Terms</a>
            <a href="#" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.875rem' }}>Privacy</a>
            <a href="#" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.875rem' }}>Contact</a>
          </div>
          <p style={{ fontSize: '0.8125rem', color: '#a1a1aa' }}>© 2024 SiteForge. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </div>
  )
}
