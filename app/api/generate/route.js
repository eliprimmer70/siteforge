import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'siteforge-secret-key-change-in-production'
)

const FREE_GENERATIONS = 10

async function getUserFromCookie(request) {
  const token = request.cookies.get('auth')
  if (!token) return null
  
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function POST(request) {
  const { prompt, history } = await request.json()
  const user = await getUserFromCookie(request)

  if (!user) {
    return NextResponse.json({ error: 'Please sign in to generate websites', requiresAuth: true }, { status: 401 })
  }

  const generations = user.generations || 0
  if (generations >= FREE_GENERATIONS) {
    return NextResponse.json({ 
      error: 'Free trial ended', 
      limitReached: true,
      remainingGenerations: 0
    }, { status: 403 })
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 })
  }

  const isRefinement = history && history.length > 0

  const systemPrompt = isRefinement
    ? `You are an expert web developer. The user wants to refine an existing website.

Current website code:
${history[history.length - 1]?.text || 'None'}

User feedback: "${prompt}"

Rules:
- Return ONLY the complete updated HTML code
- No markdown, no code blocks, just raw HTML
- Keep the same structure but make the requested changes
- Include Tailwind CSS via CDN for styling
- Make it modern and responsive`
    : `You are a web developer. Generate a complete, single-file HTML website based on this request: "${prompt}"

Rules:
- Return ONLY the HTML code (with embedded CSS and JS if needed)
- No markdown, no code blocks, just raw HTML
- Make it modern and responsive
- Include Tailwind CSS via CDN for styling
- The website should be complete and functional`

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: systemPrompt }]
          }]
        })
      }
    )

    const data = await res.json()

    if (!data.candidates || !data.candidates[0]) {
      return NextResponse.json({ code: '<p>Error: No response from AI</p>' })
    }

    let code = data.candidates[0].content.parts[0].text
    
    code = code.replace(/```html\n?/g, '')
    code = code.replace(/```\n?/g, '')
    code = code.trim()

    return NextResponse.json({ 
      code,
      remainingGenerations: FREE_GENERATIONS - generations - 1
    })
  } catch (err) {
    return NextResponse.json({ code: '<p>Error generating website</p>' })
  }
}
