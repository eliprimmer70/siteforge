import { NextResponse } from 'next/server'

export async function POST(request) {
  const { prompt } = await request.json()

  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'API not configured. Add GROQ_API_KEY in Vercel settings. Get free key at console.groq.com' }, { status: 500 })
  }

  const systemPrompt = `You are an expert web developer at a top agency. Generate a complete, professional, production-ready single-page HTML website.

The user wants: "${prompt}"

Follow this process carefully:

**Step 1: Research & Plan**
- Identify the type of business/website needed
- Determine key sections required
- Plan responsive layout
- Choose appropriate color scheme and typography

**Step 2: Design & Structure**
Create a modern, professional website with these sections:
1. **Navigation** - Logo + menu items
2. **Hero Section** - Compelling headline, subheadline, CTA button, visual
3. **About/Services Section** - What they do, value proposition
4. **Features/Benefits Section** - Key offerings with icons
5. **Testimonials** - Customer quotes (realistic)
6. **Contact/CTA Section** - Call to action
7. **Footer** - Links, copyright

**Step 3: Content Generation**
Use realistic, specific content:
- Real company names (e.g., "Elevate Studios", "Horizon Digital")
- Specific service descriptions, not generic
- Believable testimonials with names and companies
- Actual phone numbers (555-XXX-XXXX format)
- Realistic email addresses

**Step 4: Styling**
- Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
- Modern, clean design with subtle animations
- Professional color palette appropriate for the business
- Mobile responsive
- Good typography hierarchy

**Rules:**
- Return ONLY the raw HTML code - no markdown, no code blocks, no explanations
- The HTML must be complete, valid, and production-ready
- Include all CSS inline in <style> tags
- Use realistic placeholder images from picsum.photos or gradient backgrounds
- Make it look like a real business website, not a template`

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
