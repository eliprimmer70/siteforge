import { NextResponse } from 'next/server'

export async function POST(request) {
  const { planId, priceId } = await request.json()

  const stripeKey = process.env.STRIPE_SECRET_KEY

  if (!stripeKey) {
    return NextResponse.json({ 
      error: 'Stripe not configured',
      message: 'Add STRIPE_SECRET_KEY to Vercel environment variables'
    })
  }

  try {
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(stripeKey)

    const priceMap = {
      'pro': {
        name: 'SiteForge Pro',
        amount: 900,
        description: '100 generations/month, priority support, custom domains'
      },
      'unlimited': {
        name: 'SiteForge Unlimited',
        amount: 2900,
        description: 'Unlimited generations, 24/7 support, API access, white label'
      }
    }

    const plan = priceMap[planId]

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
              description: plan.description,
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: plan.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://yoursite.vercel.app'}/app/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://yoursite.vercel.app'}/app/billing?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json({ 
      error: 'Failed to create checkout session',
      message: error.message 
    }, { status: 500 })
  }
}
