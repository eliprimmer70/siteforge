'use client'

import { useState, useRef, useEffect } from 'react'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [visible, setVisible] = useState({})
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )
    
    document.querySelectorAll('section').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      window.location.href = '/app'
    }
  }

  return (
    <div style={{ background: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Helvetica, Arial, sans-serif', overflowX: 'hidden' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 2rem', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.875rem' }}>S</div>
            <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>SiteForge</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#86868b', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = '#86868b'}>Features</a>
            <a href="#how" style={{ color: '#86868b', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = '#86868b'}>How it works</a>
            <a href="#about" style={{ color: '#86868b', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = '#86868b'}>About</a>
            <a href="/app" style={{ background: '#fff', color: '#000', padding: '0.5rem 1.25rem', borderRadius: '980px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>Try it free</a>
          </div>
        </div>
      </nav>

      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem 4rem', position: 'relative' }}>
        <div style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: '700', lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            Websites built in seconds,<br />
            <span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>not hours.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#86868b', lineHeight: 1.5, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Describe what you want. Watch it appear. No code, no design skills, no compromise.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                borderRadius: '980px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                width: '280px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                borderRadius: '980px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: '#fff',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Start building free →
            </button>
          </form>
          <p style={{ fontSize: '0.75rem', color: '#6e6e73', marginTop: '1rem' }}>10 free generations. No credit card required.</p>
        </div>
      </section>

      <section id="features" style={{ padding: '6rem 2rem', background: '#000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.875rem', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Features</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '700', marginBottom: '4rem', maxWidth: '600px' }}>
            Everything you need to ship faster.
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', overflow: 'hidden' }}>
            {[
              { icon: '⚡', title: 'Instant generation', desc: 'From idea to working website in under 30 seconds. No waiting, no queues.' },
              { icon: '🎨', title: 'Pixel perfect design', desc: 'Every site is responsive, accessible, and optimized for all devices.' },
              { icon: '🔄', title: 'Iterate freely', desc: 'Make changes with natural language. Keep refining until it\'s perfect.' },
              { icon: '📥', title: 'Download & own', desc: 'Get clean HTML, CSS, and JS. Host anywhere, customize everything.' },
              { icon: '🔒', title: 'Private & secure', desc: 'Your prompts are encrypted. We never train on your data.' },
              { icon: '💬', title: 'Smart chat interface', desc: 'Describe changes naturally. "Make the header bigger" just works.' }
            ].map((feature, i) => (
              <div key={i} style={{ background: '#000', padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: '#86868b', lineHeight: 1.5 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="showcase" style={{ padding: '6rem 2rem', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>How it works</p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '1.5rem', lineHeight: 1.15 }}>
                From idea to launch in three steps.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { num: '01', title: 'Describe your vision', desc: 'Tell us what you want in plain English. A landing page, portfolio, dashboard—anything.' },
                  { num: '02', title: 'AI builds it instantly', desc: 'Our AI understands context, design principles, and best practices to ship production-ready code.' },
                  { num: '03', title: 'Download & launch', desc: 'Get the complete source code. Host it anywhere, customize everything, ship when ready.' }
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#667eea', fontWeight: '600' }}>{step.num}</span>
                    <div>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>{step.title}</h4>
                      <p style={{ fontSize: '0.9375rem', color: '#86868b', lineHeight: 1.5 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ background: '#000', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }}></div>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#86868b' }}>
                  <p style={{ marginBottom: '0.5rem' }}>$ prompt = "A modern landing page</p>
                  <p style={{ marginBottom: '0.5rem' }}>for a coffee shop with hero,</p>
                  <p style={{ marginBottom: '0.5rem' }}>menu, and contact form"</p>
                  <p style={{ color: '#667eea' }}>→ Generating...</p>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', color: '#000' }}>
                <h5 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Brew & Co.</h5>
                <p style={{ fontSize: '0.875rem', color: '#666' }}>Artisan coffee, roasted daily</p>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span>Menu</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: '6rem 2rem', background: '#000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.875rem', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>About</p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '700', marginBottom: '1.5rem' }}>
              Built for creators who move fast.
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#86868b', lineHeight: 1.6, marginBottom: '3rem' }}>
              SiteForge was created by developers who were tired of spending hours building simple websites. 
              We believe everyone should be able to bring their ideas to life, regardless of technical skills. 
              No bloated page builders. No templates. Just pure AI-powered creation.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
            {[
              { num: '10K+', label: 'Websites generated' },
              { num: '50+', label: 'Countries' },
              { num: '4.9', label: 'Average rating' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '700', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.num}</div>
                <div style={{ fontSize: '0.875rem', color: '#86868b' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" style={{ padding: '8rem 2rem', background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '700', marginBottom: '1rem' }}>
            Ready to build something great?
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#86868b', marginBottom: '2.5rem' }}>
            Join thousands of creators who ship faster with SiteForge.
          </p>
          <a 
            href="/app" 
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              borderRadius: '980px',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: '#fff',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Start for free →
          </a>
          <p style={{ fontSize: '0.75rem', color: '#6e6e73', marginTop: '1rem' }}>No credit card. 10 generations included.</p>
        </div>
      </section>

      <footer style={{ padding: '3rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.75rem' }}>S</div>
            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>SiteForge</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#6e6e73' }}>© 2024 SiteForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
