import { NextResponse } from 'next/server'

export async function POST(request) {
  const { prompt } = await request.json()

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  if (!accountId || !apiToken) {
    return NextResponse.json({ error: 'Cloudflare not configured.' }, { status: 500 })
  }

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
            { role: 'system', content: 'You are a web developer.' },
            { role: 'user', content: `HTML website for: ${prompt}` }
          ]
        })
      }
    )

    const text = await res.text()

    if (!res.ok) {
      return NextResponse.json({ error: `API error ${res.status}: ${text}` }, { status: 500 })
    }

    const data = JSON.parse(text)

    if (data.errors && data.errors.length > 0) {
      return NextResponse.json({ error: `Cloudflare error: ${JSON.stringify(data.errors)}` }, { status: 500 })
    }

    if (!data.result?.response) {
      return NextResponse.json({ error: `No response. Raw: ${text.substring(0, 500)}` }, { status: 500 })
    }

    let code = data.result.response
    
    code = code.replace(/```html\n?/g, '')
    code = code.replace(/```\n?/g, '')
    code = code.replace(/```HTML\n?/g, '')
    code = code.trim()

    if (!code || code.length < 50) {
      return NextResponse.json({ error: 'Generated code too short.' }, { status: 500 })
    }

    return NextResponse.json({ code, success: true })
  } catch (err) {
    return NextResponse.json({ error: `Error: ${err.message}` }, { status: 500 })
  }
}
