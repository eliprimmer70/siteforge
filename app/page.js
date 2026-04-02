'use client'

import { useState, useEffect, useRef } from 'react'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [showAuth, setShowAuth] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAuth = () => {
    if (!email || !email.includes('@')) return
    const userData = { email, remainingGenerations: 10, verified: true }
    localStorage.setItem('siteforge_user', JSON.stringify(userData))
    localStorage.setItem('siteforge_remaining', '10')
    window.location.href = '/app'
  }

  return (
    <div style={{ background: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Helvetica, Arial, sans-serif', overflowX: 'hidden' }}>
      {showAuth && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', 
          backdropFilter: 'blur(50px)', WebkitBackdropFilter: 'blur(50px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div style={{ 
            background: '#1c1c1e', borderRadius: '20px', padding: '2.5rem', width: '90%', maxWidth: '420px',
            boxShadow: '0 25px 100px rgba(0,0,0,0.6)'
          }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Start building.</h2>
            <p style={{ color: '#86868b', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.5 }}>Enter your email to create an account and get 10 free generations.</p>
            
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@email.com"
              autoFocus
              style={{
                width: '100%', padding: '1rem 1.125rem', borderRadius: '12px',
                border: '1px solid #424245', background: '#2c2c2e', color: '#fff',
                fontSize: '1rem', boxSizing: 'border-box', outline: 'none', marginBottom: '1rem',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={e => { e.target.style.borderColor = '#007aff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,122,255,0.2)'; }}
              onBlur={e => { e.target.style.borderColor = '#424245'; e.target.style.boxShadow = 'none'; }}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
            />
            
            <button onClick={handleAuth} style={{
              width: '100%', padding: '1rem 1.5rem', borderRadius: '12px',
              background: '#007aff', border: 'none', color: '#fff',
              fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={e => e.target.style.background = '#0071e3'}
            onMouseOut={e => e.target.style.background = '#007aff'}
            >
              Continue
            </button>
            
            <p style={{ fontSize: '0.8125rem', color: '#6e6e73', textAlign: 'center', marginTop: '1.5rem', lineHeight: 1.5 }}>
              By continuing, you agree to our <span style={{ color: '#2997ff', cursor: 'pointer' }}>Terms</span> and <span style={{ color: '#2997ff', cursor: 'pointer' }}>Privacy Policy</span>.
            </p>
          </div>
        </div>
      )}

      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, 
        padding: '0 5%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '52px' }}>
          <div style={{ fontWeight: '600', fontSize: '1.125rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            SiteForge
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#f5f5f7', textDecoration: 'none', fontSize: '0.8125rem', opacity: 0.8, transition: 'opacity 0.2s' }}
               onMouseOver={e => e.target.style.opacity = '1'}
               onMouseOut={e => e.target.style.opacity = '0.8'}>Features</a>
            <a href="#how" style={{ color: '#f5f5f7', textDecoration: 'none', fontSize: '0.8125rem', opacity: 0.8, transition: 'opacity 0.2s' }}
               onMouseOver={e => e.target.style.opacity = '1'}
               onMouseOut={e => e.target.style.opacity = '0.8'}>How it works</a>
            <a href="#pricing" style={{ color: '#f5f5f7', textDecoration: 'none', fontSize: '0.8125rem', opacity: 0.8, transition: 'opacity 0.2s' }}
               onMouseOver={e => e.target.style.opacity = '1'}
               onMouseOut={e => e.target.style.opacity = '0.8'}>Pricing</a>
            <button onClick={() => setShowAuth(true)} style={{ 
              background: '#007aff', color: '#fff', padding: '0.5rem 1.125rem', borderRadius: '980px', 
              border: 'none', fontSize: '0.8125rem', fontWeight: '600', cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={e => e.target.style.background = '#0071e3'}
            onMouseOut={e => e.target.style.background = '#007aff'}
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      <section ref={heroRef} style={{ 
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent: 'center', padding: '7rem 5% 5rem', textAlign: 'center',
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,122,255,0.15), transparent)',
        position: 'relative', overflow: 'hidden'
      }}>
        {mounted && (
          <div style={{
            position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%)',
            filter: 'blur(40px)', pointerEvents: 'none'
          }} />
        )}
        {mounted && (
          <div style={{
            position: 'absolute', bottom: '10%', right: '15%', width: '250px', height: '250px',
            background: 'radial-gradient(circle, rgba(118,75,162,0.1) 0%, transparent 70%)',
            filter: 'blur(40px)', pointerEvents: 'none'
          }} />
        )}
        
        <div style={{ maxWidth: '900px', opacity: mounted ? 1 : 0, transform: `translateY(${mounted ? 0 : 20}px)`, transition: 'all 0.8s ease-out' }}>
          <p style={{ fontSize: '1rem', color: '#007aff', marginBottom: '1rem', fontWeight: '500', letterSpacing: '0.02em' }}>Introducing</p>
          
          <h1 style={{ 
            fontSize: 'clamp(3rem, 10vw, 5.5rem)', fontWeight: '700', lineHeight: 1.0, 
            marginBottom: '1.5rem', letterSpacing: '-0.035em'
          }}>
            Build websites.<br />
            <span style={{ background: 'linear-gradient(135deg, #86868b 0%, #6366f1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Ship faster.</span>
          </h1>
          
          <p style={{ 
            fontSize: '1.375rem', color: '#86868b', lineHeight: 1.5, marginBottom: '2.5rem', 
            maxWidth: '580px', margin: '0 auto 2.5rem', fontWeight: '400'
          }}>
            Describe what you want. Watch it come to life. No code required.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setShowAuth(true)} style={{
              padding: '1rem 2rem', fontSize: '1.125rem', borderRadius: '980px',
              background: '#007aff', border: 'none', color: '#fff',
              fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.target.style.background = '#0071e3'; e.target.style.transform = 'scale(1.02)'; }}
            onMouseOut={e => { e.target.style.background = '#007aff'; e.target.style.transform = 'scale(1)'; }}
            >
              Start building free
            </button>
            <a href="#how" style={{
              padding: '1rem 2rem', fontSize: '1.125rem', borderRadius: '980px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', fontWeight: '500', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.transform = 'scale(1.02)'; }}
            onMouseOut={e => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.transform = 'scale(1)'; }}
            >
              Learn more
            </a>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#6e6e73', marginTop: '1.25rem' }}>10 free generations. No credit card required.</p>
        </div>
      </section>

      <section style={{ padding: '5rem 5%', background: '#000' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <div style={{ 
            background: '#0a0a0a', borderRadius: '24px', padding: '3rem',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 0 80px rgba(0,0,0,0.3)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Demo</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' }, gap: '2rem', alignItems: 'center' }}>
              <div>
                <div style={{
                  padding: '1.25rem', background: '#141414', borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontFamily: 'SF Mono, Monaco, Menlo, monospace'
                }}>
                  <p style={{ fontSize: '0.875rem', color: '#d1d1d6', lineHeight: 1.7 }}>
                    <span style={{ color: '#007aff' }}>"</span>Landing page for a coffee shop with hero, menu, and contact section<span style={{ color: '#007aff' }}>"</span>
                  </p>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: '20px', padding: '2.5rem', color: '#1d1d1f', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Brew & Co.</h3>
                <p style={{ fontSize: '0.9375rem', color: '#86868b', marginBottom: '2rem' }}>Artisan coffee, roasted daily</p>
                <div style={{ display: 'flex', gap: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #e5e5e5' }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#1d1d1f' }}>Menu</span>
                  <span style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#1d1d1f' }}>About</span>
                  <span style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#1d1d1f' }}>Contact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: '6rem 5%', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', letterSpacing: '-0.025em', marginBottom: '1rem' }}>
              Why SiteForge?
            </h2>
            <p style={{ color: '#86868b', fontSize: '1.125rem', maxWidth: '480px', margin: '0 auto' }}>
              Everything you need to build and ship websites faster.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '20px', overflow: 'hidden' }}>
            {[
              { icon: '⚡', title: 'Instant generation', desc: 'From idea to working website in under 30 seconds. No more hours of coding.' },
              { icon: '✨', title: 'Beautiful by default', desc: 'Every site is crafted with modern design principles. No ugly templates.' },
              { icon: '🔄', title: 'Iterate naturally', desc: 'Make changes with plain English. "Make the header bigger" just works.' },
              { icon: '📦', title: 'Own your code', desc: 'Download clean HTML/CSS/JS. Host anywhere you want. No lock-in.' },
              { icon: '🔒', title: 'Private by design', desc: 'Your ideas stay yours. We never store or train on your projects.' },
              { icon: '🚀', title: 'Deploy anywhere', desc: 'The code works on any hosting platform. Vercel, Netlify, anywhere.' },
            ].map((f, i) => (
              <div key={i} style={{ background: '#0a0a0a', padding: '2rem', transition: 'all 0.3s', cursor: 'default' }}
              onMouseOver={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.paddingTop = '2.25rem'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.paddingTop = '2rem'; }}
              >
                <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.625rem', letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: '#86868b', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" style={{ padding: '6rem 5%', background: '#000' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', letterSpacing: '-0.025em', marginBottom: '1rem' }}>
              How it works.
            </h2>
            <p style={{ color: '#86868b', fontSize: '1.125rem' }}>
              From idea to launch in three steps.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
            {[
              { num: '01', title: 'Describe it', desc: 'Tell us what you want in plain English. A landing page, portfolio, dashboard—anything.' },
              { num: '02', title: 'AI builds it', desc: 'Our AI creates production-ready code tailored to your description.' },
              { num: '03', title: 'Download & launch', desc: 'Get the complete source code. Host anywhere, customize everything.' },
            ].map((step, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '72px', height: '72px', borderRadius: '22px',
                  background: 'linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.375rem', fontWeight: '700', color: '#86868b',
                  margin: '0 auto 1.5rem', letterSpacing: '-0.02em',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ fontSize: '1rem', color: '#86868b', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: '6rem 5%', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', letterSpacing: '-0.025em', marginBottom: '1rem' }}>
              Choose your plan.
            </h2>
            <p style={{ color: '#86868b', fontSize: '1.125rem' }}>
              Start free. Upgrade when you need more.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{
              background: '#141414', borderRadius: '20px', padding: '2rem',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s'
            }}>
              <div style={{ fontSize: '0.8125rem', color: '#86868b', marginBottom: '0.5rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Free</div>
              <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>$0</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {['10 generations/month', 'HTML download', 'Community support'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem', fontSize: '0.9375rem', color: '#d1d1d6' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowAuth(true)} style={{
                width: '100%', padding: '0.875rem', borderRadius: '12px',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', fontSize: '0.9375rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
              }}>
                Get started
              </button>
            </div>

            <div style={{
              background: '#1c1c1e', borderRadius: '20px', padding: '2rem',
              border: '2px solid #007aff', position: 'relative',
              boxShadow: '0 0 60px rgba(0,122,255,0.15)'
            }}>
              <div style={{ 
                position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                background: '#007aff', padding: '0.375rem 1rem', borderRadius: '20px',
                fontSize: '0.6875rem', fontWeight: '700', color: '#fff', letterSpacing: '0.03em'
              }}>
                MOST POPULAR
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#86868b', marginBottom: '0.5rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pro</div>
              <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>$9<span style={{ fontSize: '1.25rem', fontWeight: '400', color: '#86868b' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {['100 generations/month', 'Priority support', 'Custom domains', 'No watermark'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem', fontSize: '0.9375rem', color: '#d1d1d6' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/app/billing" style={{
                display: 'block', width: '100%', padding: '0.875rem', borderRadius: '12px',
                background: '#007aff', border: 'none',
                color: '#fff', fontSize: '0.9375rem', fontWeight: '600', cursor: 'pointer', textDecoration: 'none', textAlign: 'center', transition: 'background 0.2s'
              }}>
                Upgrade to Pro
              </a>
            </div>

            <div style={{
              background: '#141414', borderRadius: '20px', padding: '2rem',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s'
            }}>
              <div style={{ fontSize: '0.8125rem', color: '#86868b', marginBottom: '0.5rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Unlimited</div>
              <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>$29<span style={{ fontSize: '1.25rem', fontWeight: '400', color: '#86868b' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {['Unlimited generations', '24/7 support', 'API access', 'White label'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem', fontSize: '0.9375rem', color: '#d1d1d6' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button disabled style={{
                width: '100%', padding: '0.875rem', borderRadius: '12px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                color: '#6e6e73', fontSize: '0.9375rem', fontWeight: '600', cursor: 'not-allowed'
              }}>
                Coming soon
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem 5%', background: '#000', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(0,122,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '700', letterSpacing: '-0.025em', marginBottom: '1rem' }}>
            Ready to build something?
          </h2>
          <p style={{ color: '#86868b', fontSize: '1.125rem', marginBottom: '2.5rem' }}>
            Join thousands of creators building faster with SiteForge.
          </p>
          <button onClick={() => setShowAuth(true)} style={{
            padding: '1rem 2.5rem', fontSize: '1.125rem', borderRadius: '980px',
            background: '#007aff', border: 'none', color: '#fff',
            fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseOver={e => { e.target.style.background = '#0071e3'; e.target.style.transform = 'scale(1.02)'; }}
          onMouseOut={e => { e.target.style.background = '#007aff'; e.target.style.transform = 'scale(1)'; }}
          >
            Start for free
          </button>
          <p style={{ fontSize: '0.875rem', color: '#6e6e73', marginTop: '1.25rem' }}>Free to start. No credit card required.</p>
        </div>
      </section>

      <footer style={{ padding: '2.5rem 5%', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontWeight: '600', fontSize: '0.9375rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            SiteForge
          </div>
          <p style={{ fontSize: '0.75rem', color: '#6e6e73' }}>© 2024 SiteForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
