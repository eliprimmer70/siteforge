'use client'

import { useState, useEffect } from 'react'

const FREE_GENERATIONS = 10

export default function BillingPage() {
  const [user, setUser] = useState(null)
  const [remaining, setRemaining] = useState(FREE_GENERATIONS)

  useEffect(() => {
    const storedUser = localStorage.getItem('siteforge_user')
    const storedRemaining = localStorage.getItem('siteforge_remaining')
    if (storedUser) setUser(JSON.parse(storedUser))
    if (storedRemaining) setRemaining(parseInt(storedRemaining))
  }, [])

  const plans = [
    { 
      name: 'Free', 
      price: '$0', 
      period: 'forever',
      features: ['10 generations', 'Basic support', 'HTML download'],
      current: remaining > 0,
      disabled: false
    },
    { 
      name: 'Pro', 
      price: '$9', 
      period: '/month',
      features: ['100 generations/month', 'Priority support', 'Custom domain', 'No watermark'],
      current: false,
      disabled: false
    },
    { 
      name: 'Unlimited', 
      price: '$29', 
      period: '/month',
      features: ['Unlimited generations', '24/7 support', 'Custom domain', 'API access', 'White label'],
      current: false,
      disabled: false
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>Billing</h1>
      <p style={{ color: '#86868b', fontSize: '0.875rem', marginBottom: '2rem' }}>Choose the plan that fits your needs</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {plans.map((plan, i) => (
          <div key={i} style={{ 
            background: plan.current ? 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))' : '#0a0a0a',
            borderRadius: '20px', 
            padding: '2rem',
            border: plan.current ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.1)',
            position: 'relative'
          }}>
            {plan.current && (
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#667eea', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>
                Current Plan
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700' }}>{plan.price}</span>
                  <span style={{ color: '#666', fontSize: '0.875rem' }}>{plan.period}</span>
                </div>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
              {plan.features.map((feature, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#86868b' }}>
                  <span style={{ color: '#22c55e' }}>✓</span> {feature}
                </li>
              ))}
            </ul>
            <button 
              disabled={plan.current || plan.disabled}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: plan.current ? '#333' : 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontWeight: '600',
                cursor: plan.current ? 'not-allowed' : 'pointer',
                opacity: plan.current ? 0.5 : 1
              }}
            >
              {plan.current ? 'Current Plan' : 'Coming Soon'}
            </button>
          </div>
        ))}
      </div>

      <div style={{ background: '#0a0a0a', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Usage This Month</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#86868b' }}>Generations used</span>
          <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>{FREE_GENERATIONS - remaining} / {FREE_GENERATIONS}</span>
        </div>
        <div style={{ height: '8px', background: '#222', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${((FREE_GENERATIONS - remaining) / FREE_GENERATIONS) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #667eea, #764ba2)', borderRadius: '4px' }} />
        </div>
      </div>
    </div>
  )
}
