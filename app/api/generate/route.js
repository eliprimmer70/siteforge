import { NextResponse } from 'next/server'

export async function POST(request) {
  const { prompt } = await request.json()

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  if (!accountId || !apiToken) {
    return NextResponse.json({ error: 'Cloudflare not configured. Add CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in Vercel settings.' }, { status: 500 })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 120000)

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
            { role: 'system', content: 'You are a helpful web developer. Return only HTML code, no explanations.' },
            { role: 'user', content: `Create a single-page HTML website: ${prompt}. Use Tailwind CSS CDN. Return only the raw HTML code, nothing else.` }
          ],
          max_tokens: 2048
        }),
        signal: controller.signal
      }
    )

    clearTimeout(timeout)

    if (!res.ok) {
      const errorText = await res.text()
      return NextResponse.json({ error: `Cloudflare error: ${res.status} - ${errorText}` }, { status: 500 })
    }

    const data = await res.json()

    if (data.errors) {
      return NextResponse.json({ error: `Cloudflare: ${data.errors[0]?.message || JSON.stringify(data.errors)}` }, { status: 500 })
    }

    if (!data.result?.response) {
      return NextResponse.json({ error: 'No response from AI. Try again.' }, { status: 500 })
    }

    let code = data.result.response
    
    code = code.replace(/```html\n?/g, '')
    code = code.replace(/```\n?/g, '')
    code = code.replace(/```HTML\n?/g, '')
    code = code.trim()

    if (!code || code.length < 50) {
      return NextResponse.json({ error: 'Generated code too short. Try again.' }, { status: 500 })
    }

    return NextResponse.json({ code, success: true })
  } catch (err) {
    if (err.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timed out. Try a simpler description.' }, { status: 500 })
    }
    return NextResponse.json({ error: `Error: ${err.message}` }, { status: 500 })
  }
}
