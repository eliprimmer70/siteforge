'use client'

import { useState, useEffect } from 'react'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: null,
    features: ['10 generations/month', 'HTML download', 'Community support'],
    color: '#fff',
    textColor: '#18181b',
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9,
    priceId: 'price_pro_monthly',
    features: ['100 generations/month', 'Priority support', 'Custom domains', 'No watermark', 'Advanced templates'],
    color: '#18181b',
    textColor: '#fff',
    popular: true
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: 29,
    priceId: 'price_unlimited_monthly',
    features: ['Unlimited generations', '24/7 support', 'API access', 'White label'],
    color: '#fff',
    textColor: '#18181b',
    popular: false
  }
]

export default function BillingPage() {
  const [user, setUser] = useState(null)
  const [currentPlan, setCurrentPlan] = useState('free')
  const [loading, setLoading] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

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
    <div style={{ padding: '2rem', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Billing</h1>
        <p style={{ color: '#71717a' }}>Choose the plan that fits your needs</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {PLANS.map((plan) => (
          <div key={plan.id} style={{
            background: plan.color, borderRadius: '20px', padding: '2rem',
            border: currentPlan === plan.id ? '2px solid #6366f1' : '1px solid #e4e4e7',
            position: 'relative', boxShadow: plan.popular ? '0 20px 50px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.03)',
            color: plan.textColor
          }}>
            {plan.popular && (
              <div style={{ 
                position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                padding: '0.375rem 1rem', borderRadius: '20px',
                fontSize: '0.75rem', fontWeight: '700', color: '#fff'
              }}>
                MOST POPULAR
              </div>
            )}
            
            <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', opacity: 0.7 }}>{plan.name}</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>
              ${plan.price}<span style={{ fontSize: '1rem', fontWeight: '400', opacity: 0.7 }}>/mo</span>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
              {plan.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem', fontSize: '0.875rem' }}>
                  <span style={{ color: '#22c55e' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            
            {currentPlan === plan.id ? (
              <div style={{
                width: '100%', padding: '0.75rem', borderRadius: '10px',
                background: plan.popular ? 'rgba(255,255,255,0.2)' : '#f4f4f5',
                border: 'none', color: plan.textColor,
                fontSize: '0.9375rem', fontWeight: '600', textAlign: 'center'
              }}>
                Current plan
              </div>
            ) : plan.price === 0 ? (
              <button disabled style={{
                width: '100%', padding: '0.75rem', borderRadius: '10px',
                background: '#f4f4f5', border: 'none', color: '#71717a',
                fontSize: '0.9375rem', fontWeight: '600', cursor: 'not-allowed'
              }}>
                Downgrade
              </button>
            ) : (
              <button 
                onClick={() => handleUpgrade(plan)}
                disabled={loading}
                style={{
                  width: '100%', padding: '0.75rem', borderRadius: '10px',
                  background: plan.popular ? '#fff' : '#18181b', border: 'none',
                  color: plan.popular ? '#18181b' : '#fff',
                  fontSize: '0.9375rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Processing...' : 'Upgrade'}
              </button>
            )}
          </div>
        ))}
      </div>

      <div style={{ 
        background: '#fff', borderRadius: '16px', padding: '1.5rem',
        border: '1px solid #e4e4e7', marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>Payment methods</h2>
        <p style={{ color: '#71717a', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Secure payments powered by Stripe
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {['Visa', 'MC', 'Amex', 'PayPal'].map(card => (
            <div key={card} style={{
              padding: '0.5rem 0.75rem', background: '#fafafa', borderRadius: '6px',
              fontSize: '0.75rem', fontWeight: '600', color: '#71717a'
            }}>
              {card}
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        background: '#fff', borderRadius: '16px', padding: '1.5rem',
        border: '1px solid #e4e4e7'
      }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>Billing history</h2>
        <p style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>No transactions yet</p>
      </div>
    </div>
  )
}
