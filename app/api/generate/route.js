import { NextResponse } from 'next/server'

export async function POST(request) {
  const { prompt } = await request.json()

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  if (!accountId || !apiToken) {
    return NextResponse.json({ error: 'Cloudflare not configured. Add CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in Vercel settings.' }, { status: 500 })
  }

  const systemPrompt = `You are an expert web developer. Generate a complete, professional, production-ready single-page HTML website based on: "${prompt}"

Rules:
- Return ONLY raw HTML with embedded CSS
- No markdown, no code blocks
- Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
- Modern, clean design
- Mobile responsive
- Include these sections: Navigation, Hero, About/Services, Features, Testimonials, Contact, Footer
- Use realistic content`

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3-8b-instruct`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful web developer.' },
            { role: 'user', content: systemPrompt }
          ],
          max_tokens: 2048
        })
      }
    )

    const data = await res.json()

    if (data.errors) {
      return NextResponse.json({ error: `Cloudflare error: ${data.errors[0]?.message || JSON.stringify(data.errors)}` }, { status: 500 })
    }

    if (!data.result?.response) {
      return NextResponse.json({ error: 'No response. Try again.' }, { status: 500 })
    }

    let code = data.result.response
    
    code = code.replace(/```html\n?/g, '')
    code = code.replace(/```\n?/g, '')
    code = code.replace(/```HTML\n?/g, '')
    code = code.trim()

    if (!code || code.length < 100) {
      return NextResponse.json({ error: 'Generated code too short. Try again.' }, { status: 500 })
    }

    return NextResponse.json({ code, success: true })
  } catch (err) {
    return NextResponse.json({ error: `Connection error: ${err.message}` }, { status: 500 })
  }
}
