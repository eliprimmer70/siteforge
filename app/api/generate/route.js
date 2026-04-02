import { NextResponse } from 'next/server'

export async function POST(request) {
  const { prompt } = await request.json()

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  if (!accountId || !apiToken) {
    return NextResponse.json({ error: 'Cloudflare not configured.' }, { status: 500 })
  }

  const systemPrompt = `You are an expert web developer. Create a stunning, fully-functional single-page website.

CONTEXT: ${prompt}

REQUIREMENTS:
1. Professional design with modern UI
2. Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
3. Use realistic stock images from picsum.photos (e.g., https://picsum.photos/800/600)
4. Include all these sections:
   - Navigation bar with logo and menu links
   - Hero section with large headline, subtext, and CTA button
   - Features/services section with icons and descriptions
   - About section with image and text
   - Testimonials from realistic customers
   - Gallery or portfolio section
   - Contact form section
   - Footer with links

5. Use a cohesive color scheme
6. Make it mobile responsive
7. Include hover animations and transitions
8. Use icons from a CDN like Lucide or Heroicons via unpkg

Return ONLY the raw HTML code with all CSS inline. No markdown, no explanations, no code blocks. Just pure HTML.`

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
            { role: 'system', content: 'You are a world-class web developer. Create stunning, production-ready websites.' },
            { role: 'user', content: systemPrompt }
          ]
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
      return NextResponse.json({ error: 'No response from AI.' }, { status: 500 })
    }

    let code = data.result.response
    
    code = code.replace(/```html\n?/g, '')
    code = code.replace(/```html/g, '')
    code = code.replace(/```\n?/g, '')
    code = code.replace(/```HTML\n?/g, '')
    code = code.replace(/<html>/g, '<html>')
    code = code.replace(/<HTML>/g, '<html>')
    code = code.trim()

    if (!code || code.length < 200) {
      return NextResponse.json({ error: 'Generated code too short. Try again.' }, { status: 500 })
    }

    if (!code.includes('<html') && !code.includes('<!DOCTYPE')) {
      code = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<script src="https://cdn.tailwindcss.com"></script>\n</head>\n<body>\n${code}\n</body>\n</html>`
    }

    return NextResponse.json({ code, success: true })
  } catch (err) {
    return NextResponse.json({ error: `Error: ${err.message}` }, { status: 500 })
  }
}
