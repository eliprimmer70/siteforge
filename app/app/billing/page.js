'use client'

import { useState, useEffect } from 'react'

const FREE_GENERATIONS = 10

export default function BillingPage() {
  const [remaining, setRemaining] = useState(FREE_GENERATIONS)

  useEffect(() => {
    const storedRemaining = localStorage.getItem('siteforge_remaining')
    if (storedRemaining) setRemaining(parseInt(storedRemaining))
  }, [])

  const plans = [
    { 
      name: 'Free', 
      price: '$0', 
      period: 'forever',
      features: ['10 generations', 'HTML download', 'Basic support'],
      current: remaining > 0
    },
    { 
      name: 'Pro', 
      price: '$9', 
      period: '/month',
      features: ['100 generations/month', 'Priority support', 'Custom domain', 'No watermark'],
      current: false
    },
    { 
      name: 'Unlimited', 
      price: '$29', 
      period: '/month',
      features: ['Unlimited generations', '24/7 support', 'API access', 'White label'],
      current: false
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1d1d1f', letterSpacing: '-0.02em' }}>Billing</h1>
      <p style={{ color: '#86868b', fontSize: '0.875rem', marginBottom: '2rem' }}>Choose the plan that fits your needs</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {plans.map((plan, i) => (
          <div key={i} style={{ 
            background: plan.current ? 'linear-gradient(180deg, rgba(0,113,227,0.04) 0%, rgba(0,113,227,0.02) 100%)' : '#fff',
            borderRadius: '20px', 
            padding: '1.75rem',
            border: plan.current ? '2px solid #0071e3' : '1px solid #d2d2d7',
            position: 'relative',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
          }}>
            {plan.current && (
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#0071e3', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.6875rem', fontWeight: '600', color: '#fff' }}>
                Current
              </div>
            )}
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1d1d1f' }}>{plan.name}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.125rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: '600', color: '#1d1d1f' }}>{plan.price}</span>
                <span style={{ color: '#86868b', fontSize: '0.875rem' }}>{plan.period}</span>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
              {plan.features.map((feature, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#1d1d1f' }}>
                  <span style={{ color: '#34c759' }}>✓</span> {feature}
                </li>
              ))}
            </ul>
            <button 
              disabled={plan.current}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: plan.current ? '#f5f5f7' : '#0071e3',
                border: 'none',
                borderRadius: '10px',
                color: plan.current ? '#86868b' : '#fff',
                fontWeight: '500',
                cursor: plan.current ? 'default' : 'pointer',
                fontSize: '0.9375rem'
              }}
            >
              {plan.current ? 'Current Plan' : 'Coming Soon'}
            </button>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #d2d2d7', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#1d1d1f' }}>Usage This Month</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#86868b' }}>Generations used</span>
          <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1d1d1f' }}>{FREE_GENERATIONS - remaining} / {FREE_GENERATIONS}</span>
        </div>
        <div style={{ height: '6px', background: '#f5f5f7', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${((FREE_GENERATIONS - remaining) / FREE_GENERATIONS) * 100}%`, height: '100%', background: '#0071e3', borderRadius: '3px' }} />
        </div>
      </div>
    </div>
  )
}
