import { NextResponse } from 'next/server'

export async function POST(request) {
  const { prompt } = await request.json()

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  if (!accountId || !apiToken) {
    return NextResponse.json({ error: 'Cloudflare not configured.' }, { status: 500 })
  }

  const systemPrompt = `You are an expert full-stack web developer. Your job is to build EXACTLY what the user asks for.

USER REQUEST: "${prompt}"

CRITICAL INSTRUCTIONS:
1. Follow the user's request EXACTLY - every detail matters
2. If they ask for a landing page, build a landing page
3. If they ask for an e-commerce site, include products, cart, checkout
4. If they ask for a dashboard, build charts, tables, filters
5. If they ask for a portfolio, build portfolio-specific sections
6. Include realistic content, images, and data as specified

TECHNICAL REQUIREMENTS:
- Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
- Use realistic images from picsum.photos
- Use icons from Lucide: <script src="https://unpkg.com/lucide@latest"></script>
- Make it fully responsive (mobile, tablet, desktop)
- Add smooth animations and hover effects
- Include all interactive elements (buttons work, forms look functional)
- Use a cohesive, modern color scheme

SECTIONS TO INCLUDE (when relevant to the request):
- Navigation with working menu
- Hero section matching the request
- Features/Services/Products section
- About/Team section
- Testimonials
- Contact/CTA section
- Footer

Return ONLY the raw HTML code with all CSS inline. No markdown, no explanations, no code blocks. Just pure, complete HTML that works immediately.`

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
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Build exactly this: ${prompt}. Make it complete, functional, and beautiful.` }
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
      return NextResponse.json({ error: 'No response from AI. Try again.' }, { status: 500 })
    }

    let code = data.result.response
    
    code = code.replace(/```html\n?/g, '')
    code = code.replace(/```html/g, '')
    code = code.replace(/```\n?/g, '')
    code = code.replace(/```HTML\n?/g, '')
    code = code.trim()

    if (!code || code.length < 200) {
      return NextResponse.json({ error: 'Generated code too short. Try again.' }, { status: 500 })
    }

    if (!code.includes('<html') && !code.includes('<!DOCTYPE')) {
      code = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Generated Website</title>\n<script src="https://cdn.tailwindcss.com"></script>\n<script src="https://unpkg.com/lucide@latest"></script>\n</head>\n<body>\n${code}\n</body>\n</html>`
    }

    return NextResponse.json({ code, success: true })
  } catch (err) {
    return NextResponse.json({ error: `Error: ${err.message}` }, { status: 500 })
  }
}
