import { NextResponse } from 'next/server'

export async function POST(request) {
  const { prompt, history } = await request.json()

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'API not configured. Add GEMINI_API_KEY in Vercel settings.' }, { status: 500 })
  }

  const isRefinement = history && history.length > 0

  const systemPrompt = isRefinement
    ? `You are an expert web developer. Generate a complete, single-file HTML website based on this request: "${prompt}"

IMPORTANT: Create a clean, Apple-style website with:
- Minimalist design with lots of white space
- SF Pro or similar clean font
- Subtle shadows and rounded corners
- Smooth hover transitions
- Clean navigation
- Professional typography
- Use Tailwind CSS via CDN for styling

Rules:
- Return ONLY the HTML code (with embedded CSS)
- No markdown, no code blocks, just raw HTML
- Make it modern, responsive, and professional like apple.com
- Include Tailwind CSS via CDN`
    : `You are an expert web developer. Generate a complete, single-file HTML website based on this request: "${prompt}"

IMPORTANT: Create a clean, Apple-style website with:
- Minimalist design with lots of white space
- Clean sans-serif fonts (SF Pro, Inter, or system fonts)
- Subtle shadows and rounded corners
- Smooth hover transitions
- Clean navigation
- Professional typography
- Lots of padding and margins

Rules:
- Return ONLY the HTML code (with embedded CSS)
- No markdown, no code blocks, just raw HTML
- Make it modern, responsive, and professional like apple.com
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
      return NextResponse.json({ code: '<p style="font-family: -apple-system, sans-serif; padding: 2rem; text-align: center; color: #333;">Error: No response from AI. Please try again.</p>' })
    }

    let code = data.candidates[0].content.parts[0].text
    
    code = code.replace(/```html\n?/g, '')
    code = code.replace(/```\n?/g, '')
    code = code.trim()

    return NextResponse.json({ code, success: true })
  } catch (err) {
    return NextResponse.json({ code: '<p style="font-family: -apple-system, sans-serif; padding: 2rem; text-align: center; color: #333;">Error generating website. Please try again.</p>' })
  }
}
