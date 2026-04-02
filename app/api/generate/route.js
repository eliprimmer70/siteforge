import { NextResponse } from 'next/server'

export async function POST(request) {
  const { prompt } = await request.json()

  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'API not configured. Add GROQ_API_KEY in Vercel settings. Get free key at console.groq.com' }, { status: 500 })
  }

  const systemPrompt = `You are an expert web developer. Generate a complete, professional, production-ready single-page HTML website.

The user wants: "${prompt}"

Create a modern, professional website with these sections:
1. Navigation with logo and menu
2. Hero section with headline, subheadline, CTA
3. About/Services section
4. Features/Benefits with icons
5. Testimonials
6. Contact/CTA section
7. Footer

Use realistic content - real company names, specific descriptions, believable testimonials.

Rules:
- Return ONLY raw HTML with embedded CSS
- No markdown, no code blocks
- Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
- Modern, clean design
- Mobile responsive
- Make it look like a real business website`

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
        max_tokens: 8192
      })
    })

    const data = await res.json()

    if (data.error) {
      return NextResponse.json({ error: `Error: ${data.error.message}` }, { status: 500 })
    }

    if (!data.choices || !data.choices[0]) {
      return NextResponse.json({ error: 'No response. Please try again.' }, { status: 500 })
    }

    let code = data.choices[0].message.content
    
    code = code.replace(/```html\n?/g, '')
    code = code.replace(/```\n?/g, '')
    code = code.replace(/```HTML\n?/g, '')
    code = code.trim()

    if (!code || code.length < 200) {
      return NextResponse.json({ error: 'Generated code was too short. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ code, success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Connection failed. Check your API key.' }, { status: 500 })
  }
}
