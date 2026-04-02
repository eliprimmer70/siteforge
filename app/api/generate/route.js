import { NextResponse } from 'next/server'

export async function POST(request) {
  const { prompt, history } = await request.json()

  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'API not configured. Add GEMINI_API_KEY in your Vercel project settings (Settings → Environment Variables).' }, { status: 500 })
  }

  const isRefinement = history && history.length > 0

  const systemPrompt = isRefinement
    ? `You are an expert web developer. The user wants to modify their existing website.

Current request: "${prompt}"

IMPORTANT: Create a clean, Apple-style website with:
- Minimalist design with lots of white space
- Clean sans-serif fonts
- Subtle shadows and rounded corners
- Smooth transitions
- Professional look

Rules:
- Return ONLY the complete HTML code with embedded CSS
- No markdown, no code blocks
- Make it modern and responsive
- Include Tailwind CSS via CDN`
    : `You are an expert web developer. Generate a complete, single-file HTML website based on: "${prompt}"

IMPORTANT: Create a clean, Apple-style website with:
- Minimalist design with lots of white space
- Clean sans-serif fonts (SF Pro, Inter, system fonts)
- Subtle shadows and rounded corners
- Smooth hover transitions
- Professional typography
- Lots of padding and margins

Rules:
- Return ONLY the HTML code with embedded CSS
- No markdown, no code blocks, just raw HTML
- Make it modern, responsive, and professional
- Include Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
- The website must be complete and functional`

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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

    if (data.error) {
      return NextResponse.json({ error: `AI Error: ${data.error.message || 'Invalid API key or quota exceeded'}` }, { status: 500 })
    }

    if (!data.candidates || !data.candidates[0]) {
      return NextResponse.json({ error: 'No response from AI. Please try again.' }, { status: 500 })
    }

    let code = data.candidates[0].content.parts[0].text
    
    code = code.replace(/```html\n?/g, '')
    code = code.replace(/```\n?/g, '')
    code = code.replace(/```HTML\n?/g, '')
    code = code.trim()

    if (!code || code.length < 50) {
      return NextResponse.json({ error: 'Generated code was too short. Please try again with a more specific description.' }, { status: 500 })
    }

    return NextResponse.json({ code, success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to connect to AI. Check your API key and try again.' }, { status: 500 })
  }
}
