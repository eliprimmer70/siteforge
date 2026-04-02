import { SignJWT } from 'jose'
import { NextResponse } from 'next/server'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'siteforge-secret-key-change-in-production'
)

const FREE_GENERATIONS = 10

export async function POST(request) {
  const { email, action } = await request.json()

  if (action === 'login' || action === 'signup') {
    const token = await new SignJWT({ 
      email, 
      generations: 0, 
      trialStart: Date.now(),
      createdAt: Date.now()
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret)

    const response = NextResponse.json({ 
      success: true, 
      email,
      remainingGenerations: FREE_GENERATIONS,
      isTrial: true
    })
    
    response.cookies.set('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    })
    
    return response
  }

  if (action === 'logout') {
    const response = NextResponse.json({ success: true })
    response.cookies.delete('auth')
    return response
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
