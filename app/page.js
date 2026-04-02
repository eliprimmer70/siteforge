'use client'

import { useState, useEffect } from 'react'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [heroVisible, setHeroVisible] = useState(false)
  
  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100)
  }, [])

  const handleGetStarted = () => {
    setShowAuth(true)
  }

  const handleAuth = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email')
      return
    }
    
    const userData = {
      email: email,
      remainingGenerations: 10
    }
    
    localStorage.setItem('siteforge_user', JSON.stringify(userData))
    localStorage.setItem('siteforge_remaining', '10')
    
    window.location.href = '/app'
  }

  return (
    <div style={{ background: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Helvetica, Arial, sans-serif', overflowX: 'hidden' }}>
      {showAuth && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0,0,0,0.8)', 
          backdropFilter: 'blur(20px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            background: '#1a1a1a', 
            borderRadius: '20px', 
            padding: '2.5rem', 
            width: '100%', 
            maxWidth: '380px',
            border: '1px solid rgba(255,255,255,0.1)',
            animation: 'fadeIn 0.3s ease'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', textAlign: 'center' }}>
              Get started free
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#86868b', textAlign: 'center', marginBottom: '1.5rem' }}>
              10 free generations, no credit card
            </p>
            
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: '#000',
                color: '#fff',
                boxSizing: 'border-box',
                outline: 'none',
                marginBottom: '1rem'
              }}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
            />
            
            <button
              onClick={handleAuth}
              style={{
                width: '100%',
                padding: '0.875rem',
                fontSize: '1rem',
                borderRadius: '10px',
                border: 'none',
                background: '#0071e3',
                color: '#fff',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Continue
            </button>
            
            <button
              onClick={() => setShowAuth(false)}
              style={{
                width: '100%',
                marginTop: '0.75rem',
                padding: '0.75rem',
                fontSize: '0.875rem',
                borderRadius: '10px',
                border: 'none',
                background: 'transparent',
                color: '#86868b',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 2rem', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '48px' }}>
          <div style={{ fontWeight: '600', fontSize: '1.125rem', letterSpacing: '-0.01em' }}>SiteForge</div>
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#f5f5f7', textDecoration: 'none', fontSize: '0.75rem', opacity: 0.8, transition: 'opacity 0.3s' }}>Features</a>
            <a href="#how" style={{ color: '#f5f5f7', textDecoration: 'none', fontSize: '0.75rem', opacity: 0.8, transition: 'opacity 0.3s' }}>How it works</a>
            <a href="#about" style={{ color: '#f5f5f7', textDecoration: 'none', fontSize: '0.75rem', opacity: 0.8, transition: 'opacity 0.3s' }}>About</a>
            <button 
              onClick={handleGetStarted}
              style={{ color: '#fff', padding: '0.4rem 1rem', borderRadius: '980px', fontSize: '0.75rem', fontWeight: '500', background: '#0071e3', border: 'none', cursor: 'pointer', transition: 'background 0.3s' }}
            >
              Try free
            </button>
          </div>
        </div>
      </nav>

      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(125, 94, 255, 0.15), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '680px', textAlign: 'center', opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)' }}>
          <p style={{ fontSize: '0.875rem', color: '#86868b', marginBottom: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Introducing</p>
          <h1 style={{ fontSize: 'clamp(2.75rem, 8vw, 4.5rem)', fontWeight: '700', lineHeight: 1.05, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
            Websites built<br />
            <span style={{ background: 'linear-gradient(135deg, #bf5af2, #5e5ce6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>in seconds.</span>
          </h1>
          <p style={{ fontSize: '1.375rem', color: '#86868b', lineHeight: 1.4, marginBottom: '2rem', fontWeight: '400' }}>
            Describe what you want. Watch it appear.<br />
            No code. No design skills. No compromise.
          </p>
          <button
            onClick={handleGetStarted}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              borderRadius: '980px',
              border: 'none',
              background: '#0071e3',
              color: '#fff',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Start building free →
          </button>
          <p style={{ fontSize: '0.6875rem', color: '#6e6e73', marginTop: '1rem' }}>10 free generations. No credit card required.</p>
        </div>
      </section>

      <section id="features" style={{ padding: '5rem 2rem', background: '#000' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', textAlign: 'center' }}>Features</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '3rem', textAlign: 'center', letterSpacing: '-0.02em' }}>
            Built for speed.
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.1)', borderRadius: '18px', overflow: 'hidden' }}>
            {[
              { title: 'Instant generation', desc: 'From idea to working website in under 30 seconds. No queues, no waiting.' },
              { title: 'Pixel perfect design', desc: 'Every site is responsive, accessible, and optimized for all devices.' },
              { title: 'Iterate freely', desc: 'Make changes with natural language. Keep refining until it\'s perfect.' },
              { title: 'Download & own', desc: 'Get clean HTML, CSS, and JS. Host anywhere, customize everything.' },
              { title: 'Private & secure', desc: 'Your prompts are encrypted. We never train on your data.' },
              { title: 'Smart chat', desc: 'Describe changes naturally. "Make the header bigger" just works.' }
            ].map((feature, i) => (
              <div key={i} style={{ background: '#000', padding: '2rem', transition: 'background 0.3s' }} onMouseOver={e => e.currentTarget.style.background = '#0a0a0a'} onMouseOut={e => e.currentTarget.style.background = '#000'}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#86868b', lineHeight: 1.5 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" style={{ padding: '5rem 2rem', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '0.6875rem', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>How it works</p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '700', marginBottom: '2rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                Three steps to launch.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                {[
                  { num: '01', title: 'Describe your vision', desc: 'Tell us what you want in plain English. A landing page, portfolio, dashboard—anything.' },
                  { num: '02', title: 'AI builds it', desc: 'Our AI understands context, design principles, and best practices to ship production-ready code.' },
                  { num: '03', title: 'Download & launch', desc: 'Get the complete source code. Host anywhere, customize everything, ship when ready.' }
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.75rem', color: '#bf5af2', fontWeight: '600', marginTop: '0.125rem' }}>{step.num}</span>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>{step.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: '#86868b', lineHeight: 1.5 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)', borderRadius: '18px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ background: '#000', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff453a' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff9f0a' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#30d158' }}></div>
                </div>
                <div style={{ fontFamily: 'SF Mono, Monaco, Menlo, monospace', fontSize: '0.75rem', color: '#86868b', lineHeight: 1.6 }}>
                  <p style={{ marginBottom: '0.375rem' }}>$ prompt = "Landing page</p>
                  <p style={{ marginBottom: '0.375rem' }}>for a coffee shop"</p>
                  <p style={{ color: '#bf5af2' }}>→ Generating...</p>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1.25rem', color: '#000' }}>
                <h5 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>Brew & Co.</h5>
                <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.75rem' }}>Artisan coffee, roasted daily</p>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#333' }}>
                  <span>Menu</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: '5rem 2rem', background: '#000' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.6875rem', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>About</p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Built for creators<br />who move fast.
            </h2>
            <p style={{ fontSize: '1rem', color: '#86868b', lineHeight: 1.6 }}>
              SiteForge was created by developers who were tired of spending hours building simple websites. 
              We believe everyone should be able to bring their ideas to life, regardless of technical skills.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center', marginTop: '4rem' }}>
            {[
              { num: '10K+', label: 'Websites generated' },
              { num: '50+', label: 'Countries' },
              { num: '4.9', label: 'User rating' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '700', letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #bf5af2, #5e5ce6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.num}</div>
                <div style={{ fontSize: '0.75rem', color: '#86868b' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Ready to build something great?
          </h2>
          <p style={{ fontSize: '1rem', color: '#86868b', marginBottom: '2rem' }}>
            Join thousands of creators who ship faster with SiteForge.
          </p>
          <button 
            onClick={handleGetStarted}
            style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              borderRadius: '980px',
              border: 'none',
              background: '#0071e3',
              color: '#fff',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Start for free →
          </button>
          <p style={{ fontSize: '0.6875rem', color: '#6e6e73', marginTop: '0.875rem' }}>No credit card. 10 generations included.</p>
        </div>
      </section>

      <footer style={{ padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>SiteForge</div>
          <p style={{ fontSize: '0.6875rem', color: '#6e6e73' }}>© 2024 SiteForge. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #444; }
      `}</style>
    </div>
  )
}
