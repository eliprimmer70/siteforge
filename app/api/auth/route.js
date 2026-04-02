import { NextResponse } from 'next/server'

export async function POST(request) {
  const { email, action, code } = await request.json()

  if (action === 'send-verification') {
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Verification code sent',
      code: verificationCode
    })
  }

  if (action === 'verify') {
    if (!code || code.length !== 6) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
    }

    const userData = {
      email: email,
      verified: true,
      createdAt: Date.now()
    }

    const response = NextResponse.json({ 
      success: true, 
      user: userData 
    })

    return response
  }

  if (action === 'logout') {
    const response = NextResponse.json({ success: true })
    return response
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const sessionToken = searchParams.get('session')

  if (sessionToken) {
    return NextResponse.json({ valid: true })
  }

  return NextResponse.json({ valid: false }, { status: 401 })
}
