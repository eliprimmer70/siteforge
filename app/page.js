'use client'

import { useState, useEffect } from 'react'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [showAuth, setShowAuth] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  
  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100)
  }, [])

  const handleGetStarted = () => {
    setShowAuth(true)
  }

  const handleAuth = () => {
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
    <div style={{ background: '#fff', color: '#1d1d1f', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Helvetica, Arial, sans-serif', overflowX: 'hidden' }}>
      {showAuth && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0,0,0,0.5)', 
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            background: '#fff', 
            borderRadius: '20px', 
            padding: '2.5rem', 
            width: '100%', 
            maxWidth: '360px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            animation: 'fadeIn 0.3s ease'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', textAlign: 'center', letterSpacing: '-0.02em' }}>
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
                padding: '1rem',
                fontSize: '1rem',
                borderRadius: '12px',
                border: '1px solid #d2d2d7',
                background: '#f5f5f7',
                color: '#1d1d1f',
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
                padding: '1rem',
                fontSize: '1rem',
                borderRadius: '12px',
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
                fontSize: '0.9375rem',
                borderRadius: '12px',
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

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 2rem', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid #d2d2d7' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '52px' }}>
          <div style={{ fontWeight: '600', fontSize: '1.125rem', letterSpacing: '-0.01em' }}>SiteForge</div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '0.875rem', opacity: 0.8 }}>Features</a>
            <a href="#how" style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '0.875rem', opacity: 0.8 }}>How it works</a>
            <a href="#community" style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '0.875rem', opacity: 0.8 }}>Community</a>
            <button 
              onClick={handleGetStarted}
              style={{ color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '980px', fontSize: '0.875rem', fontWeight: '500', background: '#0071e3', border: 'none', cursor: 'pointer' }}
            >
              Try free
            </button>
          </div>
        </div>
      </nav>

      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7rem 2rem 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #f5f5f7 0%, #fff 50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '680px', textAlign: 'center', opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)', position: 'relative' }}>
          <p style={{ fontSize: '1rem', color: '#86868b', marginBottom: '0.75rem' }}>Introducing SiteForge</p>
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: '700', lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            Websites built<br />
            <span style={{ color: '#0071e3' }}>in seconds.</span>
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#86868b', lineHeight: 1.4, marginBottom: '2.5rem', fontWeight: '400' }}>
            Describe what you want. Watch it appear.<br />
            No code. No design skills. No compromise.
          </p>
          <button
            onClick={handleGetStarted}
            style={{
              padding: '1.125rem 2rem',
              fontSize: '1.125rem',
              borderRadius: '980px',
              border: 'none',
              background: '#0071e3',
              color: '#fff',
              fontWeight: '500',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,113,227,0.3)'
            }}
          >
            Start building free →
          </button>
          <p style={{ fontSize: '0.75rem', color: '#86868b', marginTop: '1rem' }}>10 free generations. No credit card required.</p>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', background: '#f5f5f7' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '600', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Built for speed.
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#86868b', maxWidth: '500px', margin: '0 auto 3rem' }}>
            From idea to launch in seconds, not hours.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'Instant generation', desc: 'From idea to working website in under 30 seconds. No queues, no waiting.' },
              { title: 'Pixel perfect design', desc: 'Every site is responsive, accessible, and optimized for all devices.' },
              { title: 'Iterate freely', desc: 'Make changes with natural language. Keep refining until it\'s perfect.' },
              { title: 'Download & own', desc: 'Get clean HTML, CSS, and JS. Host anywhere, customize everything.' },
            ].map((feature, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '2rem', textAlign: 'left', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{feature.title}</h3>
                <p style={{ fontSize: '1rem', color: '#86868b', lineHeight: 1.5 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '600', marginBottom: '2rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                Three steps to launch.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { num: '01', title: 'Describe your vision', desc: 'Tell us what you want in plain English. A landing page, portfolio, dashboard—anything.' },
                  { num: '02', title: 'AI builds it', desc: 'Our AI understands context, design principles, and best practices to ship production-ready code.' },
                  { num: '03', title: 'Download & launch', desc: 'Get the complete source code. Host anywhere, customize everything, ship when ready.' }
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1.25rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#0071e3', fontWeight: '600', marginTop: '0.125rem', minWidth: '2rem' }}>{step.num}</span>
                    <div>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>{step.title}</h4>
                      <p style={{ fontSize: '1rem', color: '#86868b', lineHeight: 1.5 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#f5f5f7', borderRadius: '20px', padding: '1.5rem' }}>
              <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ fontFamily: 'SF Mono, Monaco, Menlo, monospace', fontSize: '0.875rem', color: '#86868b', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  <p style={{ marginBottom: '0.5rem' }}>$ "Landing page for</p>
                  <p style={{ marginBottom: '0.5rem' }}>a coffee shop"</p>
                  <p style={{ color: '#0071e3' }}>→ Generating...</p>
                </div>
                <div style={{ background: '#fafafa', borderRadius: '12px', padding: '1.25rem' }}>
                  <h5 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>Brew & Co.</h5>
                  <p style={{ fontSize: '0.875rem', color: '#86868b', marginBottom: '0.75rem' }}>Artisan coffee, roasted daily</p>
                  <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#86868b' }}>
                    <span>Menu</span>
                    <span>About</span>
                    <span>Contact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="community" style={{ padding: '6rem 2rem', background: '#f5f5f7' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '600', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Community Showcase
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#86868b', marginBottom: '3rem' }}>
            See what others have built with SiteForge
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {[
              { name: 'Luxe Interior', desc: 'Interior design portfolio', author: 'Sarah M.' },
              { name: 'FitLife Gym', desc: 'Fitness center landing page', author: 'Mike R.' },
              { name: 'Bloom Studio', desc: 'Photography portfolio', author: 'Emma L.' },
            ].map((project, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', textAlign: 'left', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', cursor: 'pointer' }}>
                <div style={{ height: '160px', background: 'linear-gradient(135deg, #f5f5f7, #e5e5e5)', borderRadius: '12px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86868b' }}>
                  Preview
                </div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>{project.name}</h4>
                <p style={{ fontSize: '0.875rem', color: '#86868b', marginBottom: '0.5rem' }}>{project.desc}</p>
                <p style={{ fontSize: '0.75rem', color: '#86868b' }}>by {project.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '600', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Ready to build something great?
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#86868b', marginBottom: '2.5rem' }}>
            Join thousands of creators who ship faster with SiteForge.
          </p>
          <button 
            onClick={handleGetStarted}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.125rem',
              borderRadius: '980px',
              border: 'none',
              background: '#0071e3',
              color: '#fff',
              fontWeight: '500',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,113,227,0.3)'
            }}
          >
            Start for free →
          </button>
          <p style={{ fontSize: '0.75rem', color: '#86868b', marginTop: '1rem' }}>No credit card. 10 generations included.</p>
        </div>
      </section>

      <footer style={{ padding: '2rem', background: '#f5f5f7', borderTop: '1px solid #d2d2d7' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>SiteForge</div>
          <p style={{ fontSize: '0.75rem', color: '#86868b' }}>© 2024 SiteForge. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}
