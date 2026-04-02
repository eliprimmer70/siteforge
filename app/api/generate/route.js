import { NextResponse } from 'next/server'

export async function POST(request) {
  const { prompt, history } = await request.json()

  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'API not configured. Add GROQ_API_KEY in your Vercel project settings (Settings → Environment Variables). Get a free key at console.groq.com' }, { status: 500 })
  }

  const isRefinement = history && history.length > 0

  const systemPrompt = isRefinement
    ? `You are an expert web developer. The user wants to modify their existing website.

Current request: "${prompt}"

Create a clean, professional single-page HTML website. Rules:
- Return ONLY the raw HTML code with embedded CSS
- No markdown, no code blocks, no explanations
- Modern minimalist design with professional styling
- Responsive layout that works on mobile and desktop
- Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
- Clean typography, good spacing, subtle shadows`
    : `You are an expert web developer. Generate a complete, professional single-page HTML website based on: "${prompt}"

Rules:
- Return ONLY the raw HTML code with embedded CSS
- No markdown, no code blocks, no explanations - just raw HTML
- Modern minimalist design - clean, professional, trustworthy
- Responsive layout that works on all devices
- Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
- Include realistic placeholder content (company name, descriptions, navigation, etc.)
- The website must be complete and production-ready`

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: systemPrompt }],
        temperature: 0.7,
        max_tokens: 4096
      })
    })

    const data = await res.json()

    if (data.error) {
      return NextResponse.json({ error: `API Error: ${data.error.message}` }, { status: 500 })
    }

    if (!data.choices || !data.choices[0]) {
      return NextResponse.json({ error: 'No response from AI. Please try again.' }, { status: 500 })
    }

    let code = data.choices[0].message.content
    
    code = code.replace(/```html\n?/g, '')
    code = code.replace(/```\n?/g, '')
    code = code.replace(/```HTML\n?/g, '')
    code = code.trim()

    if (!code || code.length < 50) {
      return NextResponse.json({ error: 'Generated code was too short. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ code, success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to connect to AI. Check your API key and try again.' }, { status: 500 })
  }
}
