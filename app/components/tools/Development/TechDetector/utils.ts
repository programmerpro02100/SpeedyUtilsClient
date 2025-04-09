interface DetectionResult {
    categories: Record<string, string[]>
    raw: string[]
}

export function detectTechnologies(html: string, headers: Record<string, string>): DetectionResult {
    const detected: string[] = []
    const categories: Record<string, string[]> = {
        CMS: [],
        Frontend: [],
        Backend: [],
        Analytics: [],
        Hosting: [],
        CDN: [],
        Other: []
    }

    const lowerHTML = html.toLowerCase()
    const powered = headers['x-powered-by']?.toLowerCase()
    const server = headers['server']?.toLowerCase()

    // HEADER BASED DETECTIONS
    if (powered?.includes('express')) categories.Backend.push('Express.js')
    if (powered?.includes('php')) categories.Backend.push('PHP')
    if (powered?.includes('asp.net')) categories.Backend.push('ASP.NET')
    if (powered?.includes('next.js')) categories.Frontend.push('Next.js')
    if (powered?.includes('nestjs')) categories.Backend.push('NestJS')

    if (server?.includes('cloudflare')) categories.CDN.push('Cloudflare')
    if (server?.includes('nginx')) categories.Backend.push('Nginx')
    if (server?.includes('apache')) categories.Backend.push('Apache')
    if (server?.includes('gws')) categories.Hosting.push('Google Web Server')
    if (server?.includes('litepeed')) categories.Hosting.push('LiteSpeed')

    if (headers['x-shopify-stage']) categories.CMS.push('Shopify')
    if (headers['x-drupal-cache']) categories.CMS.push('Drupal')
    if (headers['x-wix-request-id']) categories.CMS.push('Wix')

    // HTML BASED DETECTIONS
    if (lowerHTML.includes('wp-content') || lowerHTML.includes('wordpress')) categories.CMS.push('WordPress')
    if (lowerHTML.includes('cdn.shopify.com')) categories.CMS.push('Shopify')
    if (lowerHTML.includes('drupal.js')) categories.CMS.push('Drupal')
    if (lowerHTML.includes('static.squarespace.com')) categories.CMS.push('Squarespace')
    if (lowerHTML.includes('wix.com')) categories.CMS.push('Wix')
    if (lowerHTML.includes('ghost.org')) categories.CMS.push('Ghost')

    // Frontend frameworks
    if (/__react_devtools_global_hook__/i.test(html) || /react(?:dom)?(.min)?\.js/.test(html)) {
        if (!categories.Frontend.includes('React')) categories.Frontend.push('React')
    }
    if (/vue(.min)?\.js/.test(html)) categories.Frontend.push('Vue.js')
    if (/angular(.min)?\.js/.test(html)) categories.Frontend.push('Angular')
    if (/svelte(.min)?\.js/.test(html)) categories.Frontend.push('Svelte')
    if (lowerHTML.includes('tailwindcss') || lowerHTML.includes('tailwind')) categories.Frontend.push('Tailwind CSS')
    if (/bootstrap(.min)?\.css/.test(html)) categories.Frontend.push('Bootstrap')
    if (/jquery(.min)?\.js/.test(html)) categories.Frontend.push('jQuery')

    // Analytics and trackers
    if (lowerHTML.includes('gtag(')) categories.Analytics.push('Google Global Site Tag')
    if (lowerHTML.includes('google-analytics.com')) categories.Analytics.push('Google Analytics')
    if (lowerHTML.includes('googletagmanager.com')) categories.Analytics.push('Google Tag Manager')
    if (lowerHTML.includes('fbq(')) categories.Analytics.push('Facebook Pixel')
    if (lowerHTML.includes('hotjar')) categories.Analytics.push('Hotjar')
    if (lowerHTML.includes('clarity.microsoft.com')) categories.Analytics.push('Microsoft Clarity')

    // Hosting/CDN
    if (lowerHTML.includes('vercel-insights') || lowerHTML.includes('vercel.com')) categories.Hosting.push('Vercel')
    if (lowerHTML.includes('netlify.com')) categories.Hosting.push('Netlify')
    if (lowerHTML.includes('firebase')) categories.Hosting.push('Firebase Hosting')
    if (lowerHTML.includes('heroku')) categories.Hosting.push('Heroku')
    if (lowerHTML.includes('aws.amazon.com') || lowerHTML.includes('cloudfront.net')) categories.Hosting.push('AWS')

    if (lowerHTML.includes('cdn.jsdelivr.net')) categories.CDN.push('jsDelivr')
    if (lowerHTML.includes('cdnjs.cloudflare.com')) categories.CDN.push('Cloudflare CDN')
    if (lowerHTML.includes('unpkg.com')) categories.CDN.push('UNPKG')

    // Raw flat list
    for (const key in categories) {
        detected.push(...categories[key])
    }

    return {
        categories,
        raw: [...new Set(detected)]
    }
}