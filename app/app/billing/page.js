'use client'

import { useState, useEffect } from 'react'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: null,
    features: ['10 generations/month', 'HTML download', 'Community support'],
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9,
    priceId: 'price_pro_monthly',
    features: ['100 generations/month', 'Priority support', 'Custom domains', 'No watermark'],
    popular: true
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: 29,
    priceId: 'price_unlimited_monthly',
    features: ['Unlimited generations', '24/7 support', 'API access', 'White label'],
    popular: false
  }
]

export default function BillingPage() {
  const [user, setUser] = useState(null)
  const [currentPlan, setCurrentPlan] = useState('free')
  const [loading, setLoading] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('siteforge_user')
    const storedPlan = localStorage.getItem('siteforge_plan')
    if (storedUser) setUser(JSON.parse(storedUser))
    if (storedPlan) setCurrentPlan(storedPlan)
  }, [])

  const handleUpgrade = async (plan) => {
    if (plan.priceId) {
      setLoading(true)
      
      try {
        const res = await fetch('/api/stripe/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId: plan.id, priceId: plan.priceId })
        })
        
        const data = await res.json()
        
        if (data.url) {
          window.location.href = data.url
        } else {
          alert('Stripe not configured. Add STRIPE_SECRET_KEY in Vercel settings.')
        }
      } catch (err) {
        alert('Error initiating checkout. Please try again.')
      }
      
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1d1d1f', letterSpacing: '-0.02em' }}>Choose Your Plan</h1>
        <p style={{ color: '#86868b', fontSize: '0.9375rem' }}>Start free. Upgrade when you need more.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        {PLANS.map((plan) => (
          <div 
            key={plan.id} 
            style={{
              background: plan.popular ? '#1d1d1f' : '#fff',
              borderRadius: '20px', 
              padding: '2rem',
              border: plan.popular ? 'none' : '1px solid #e5e5e7',
              position: 'relative', 
              cursor: 'pointer',
              transition: 'all 0.25s',
              transform: hoveredPlan === plan.id ? 'scale(1.02)' : 'scale(1)',
              boxShadow: hoveredPlan === plan.id ? '0 20px 50px rgba(0,0,0,0.12)' : plan.popular ? '0 20px 50px rgba(0,0,0,0.15)' : '0 4px 20px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={() => setHoveredPlan(plan.id)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            {plan.popular && (
              <div style={{ 
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                background: '#0071e3',
                padding: '0.375rem 1rem', borderRadius: '20px',
                fontSize: '0.6875rem', fontWeight: '700', color: '#fff', letterSpacing: '0.02em'
              }}>
                MOST POPULAR
              </div>
            )}
            
            <div style={{ fontSize: '0.8125rem', fontWeight: '600', marginBottom: '0.5rem', color: plan.popular ? '#86868b' : '#86868b', letterSpacing: '0.02em' }}>{plan.name}</div>
            <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.25rem', color: plan.popular ? '#fff' : '#1d1d1f', letterSpacing: '-0.02em' }}>
              ${plan.price}<span style={{ fontSize: '1.25rem', fontWeight: '400', color: plan.popular ? '#86868b' : '#86868b' }}>/mo</span>
            </div>
            <div style={{ height: '1px', background: plan.popular ? '#3d3d3f' : '#e5e5e7', margin: '1.25rem 0' }} />
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
              {plan.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem', fontSize: '0.9375rem', color: plan.popular ? '#f5f5f7' : '#1d1d1f' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            
            {currentPlan === plan.id ? (
              <div style={{
                width: '100%', padding: '0.875rem', borderRadius: '12px',
                background: plan.popular ? 'rgba(255,255,255,0.15)' : '#f5f5f7',
                border: 'none', color: plan.popular ? '#fff' : '#86868b',
                fontSize: '0.9375rem', fontWeight: '600', textAlign: 'center'
              }}>
                Current Plan
              </div>
            ) : plan.price === 0 ? (
              <div style={{
                width: '100%', padding: '0.875rem', borderRadius: '12px',
                background: 'transparent',
                border: '1px solid #e5e5e7', color: '#86868b',
                fontSize: '0.9375rem', fontWeight: '600', textAlign: 'center'
              }}>
                Free Plan
              </div>
            ) : (
              <button 
                onClick={() => handleUpgrade(plan)}
                disabled={loading}
                style={{
                  width: '100%', padding: '0.875rem', borderRadius: '12px',
                  background: plan.popular ? '#0071e3' : '#1d1d1f', border: 'none',
                  color: '#fff',
                  fontSize: '0.9375rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'all 0.2s'
                }}
              >
                {loading ? 'Processing...' : 'Upgrade'}
              </button>
            )}
          </div>
        ))}
      </div>

      <div style={{ 
        background: '#fff', borderRadius: '20px', padding: '2rem',
        border: '1px solid #e5e5e7', marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1d1d1f' }}>Payment Methods</h2>
            <p style={{ fontSize: '0.8125rem', color: '#86868b' }}>Secure payments powered by Stripe</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {['Visa', 'Mastercard', 'Amex', 'Discover', 'PayPal', 'Apple Pay'].map(card => (
            <div key={card} style={{
              padding: '0.625rem 1rem', background: '#f5f5f7', borderRadius: '8px',
              fontSize: '0.8125rem', fontWeight: '600', color: '#86868b'
            }}>
              {card}
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        background: '#fff', borderRadius: '20px', padding: '2rem',
        border: '1px solid #e5e5e7'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: '#f5f5f7',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1d1d1f' }}>Billing History</h2>
            <p style={{ fontSize: '0.8125rem', color: '#86868b' }}>Your payment records</p>
          </div>
        </div>
        <div style={{ 
          padding: '2rem', textAlign: 'center', 
          background: '#fafafa', borderRadius: '12px',
          border: '1px dashed #e5e5e7'
        }}>
          <p style={{ color: '#86868b', fontSize: '0.9375rem' }}>No transactions yet</p>
          <p style={{ color: '#a1a1aa', fontSize: '0.8125rem', marginTop: '0.25rem' }}>Upgrade to a paid plan to see your billing history</p>
        </div>
      </div>
    </div>
  )
}
