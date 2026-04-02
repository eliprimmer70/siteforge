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
          prompt: `Create a complete, production-ready HTML website: ${prompt}. Include Tailwind CSS CDN, all sections (nav, hero, features, about, testimonials, contact, footer), realistic images from picsum.photos, Lucide icons, and working interactive elements. Return ONLY raw HTML code starting with <!DOCTYPE html>.`,
          max_tokens: 8192
        })
      }
    )

    const text = await res.text()

    if (!res.ok) {
      return NextResponse.json({ error: `API error: ${text.substring(0, 200)}` }, { status: 500 })
    }

    const data = JSON.parse(text)

    if (data.errors && data.errors.length > 0) {
      return NextResponse.json({ error: `Cloudflare: ${JSON.stringify(data.errors)}` }, { status: 500 })
    }

    if (!data.result?.response) {
      return NextResponse.json({ error: 'No response from AI. Try again.' }, { status: 500 })
    }

    let code = data.result.response
    
    code = code.replace(/```html\n?/g, '')
    code = code.replace(/```html/g, '')
    code = code.replace(/```\n?/g, '')
    code = code.replace(/```HTML\n?/g, '')
    code = code.trim()

    if (!code || code.length < 200) {
      return NextResponse.json({ error: 'Generated code too short. Try again with a simpler request.' }, { status: 500 })
    }

    if (!code.includes('<html') && !code.includes('<!DOCTYPE')) {
      code = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Generated Website</title>\n<script src="https://cdn.tailwindcss.com"></script>\n<script src="https://unpkg.com/lucide@latest"></script>\n</head>\n<body>\n${code}\n</body>\n</html>`
    }

    return NextResponse.json({ code, success: true })
  } catch (err) {
    return NextResponse.json({ error: `Error: ${err.message}` }, { status: 500 })
  }
}
