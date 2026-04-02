import { NextResponse } from 'next/server'

export async function POST(request) {
  const { email, action } = await request.json()

  if (action === 'logout') {
    return NextResponse.json({ success: true })
  }

  if (action === 'check') {
    return NextResponse.json({ success: true, email: email || 'user@example.com' })
  }

  return NextResponse.json({ 
    success: true, 
    email: email,
    remainingGenerations: 10
  })
}
