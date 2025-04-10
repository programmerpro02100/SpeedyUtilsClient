interface DetectionResult {
    categories: Record<string, string[]>
    raw: string[]
}

function pushUnique(arr: string[], val: string) {
    if (!arr.includes(val)) arr.push(val)
}

export function detectTechnologies(html: string, headers: Record<string, string>): DetectionResult {
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

    // Normalize headers to lowercase
    const lowerHeaders: Record<string, string> = {}
    for (const key in headers) {
        lowerHeaders[key.toLowerCase()] = headers[key].toLowerCase()
    }

    const powered = lowerHeaders['x-powered-by'] || ''
    const server = lowerHeaders['server'] || ''

    // HEADER-BASED DETECTIONS
    if (/express/i.test(powered)) pushUnique(categories.Backend, 'Express.js')
    if (/php/i.test(powered)) pushUnique(categories.Backend, 'PHP')
    if (/asp\.net/i.test(powered)) pushUnique(categories.Backend, 'ASP.NET')
    if (/next\.?js/i.test(powered) || lowerHeaders['x-nextjs-cache']) pushUnique(categories.Frontend, 'Next.js')
    if (/nestjs/i.test(powered)) pushUnique(categories.Backend, 'NestJS')

    if (server.includes('cloudflare') || lowerHTML.includes('cdnjs.cloudflare.com')) pushUnique(categories.CDN, 'Cloudflare')
    if (server.includes('nginx')) pushUnique(categories.Backend, 'Nginx')
    if (server.includes('apache')) pushUnique(categories.Backend, 'Apache')
    if (server.includes('gws')) pushUnique(categories.Hosting, 'Google Web Server')
    if (server.includes('litespeed')) pushUnique(categories.Hosting, 'LiteSpeed')
    if (server.includes('github.com')) pushUnique(categories.Hosting, 'GitHub Pages')

    if (lowerHeaders['x-vercel-id'] || lowerHTML.includes('vercel-insights') || lowerHTML.includes('vercel.com')) {
        pushUnique(categories.Hosting, 'Vercel')
    }

    if (lowerHeaders['x-shopify-stage'] || lowerHTML.includes('cdn.shopify.com')) pushUnique(categories.CMS, 'Shopify')
    if (lowerHeaders['x-drupal-cache'] || lowerHTML.includes('drupal.js')) pushUnique(categories.CMS, 'Drupal')
    if (lowerHeaders['x-wix-request-id'] || lowerHTML.includes('wix.com')) pushUnique(categories.CMS, 'Wix')

    // HTML-based CMS detections
    if (lowerHTML.includes('wp-content') || lowerHTML.includes('wordpress') ||
        lowerHTML.includes('meta name="generator" content="wordpress')) {
        pushUnique(categories.CMS, 'WordPress')
    }
    if (lowerHTML.includes('static.squarespace.com')) pushUnique(categories.CMS, 'Squarespace')
    if (lowerHTML.includes('ghost.org')) pushUnique(categories.CMS, 'Ghost')

    // Frontend frameworks
    if (lowerHTML.includes('_next')) pushUnique(categories.Frontend, 'Next.js')
    if (
        lowerHTML.includes('data-reactroot') ||
        /__react_devtools_global_hook__/i.test(html) ||
        /react(?:dom)?(?:\.min)?\.js(?:\?[^"]*)?/i.test(html)
    ) {
        pushUnique(categories.Frontend, 'React')
    }
    if (/vue(\.runtime)?(\.min)?\.js(?:\?[^"]*)?/i.test(html)) pushUnique(categories.Frontend, 'Vue.js')
    if (/angular(?:\.min)?\.js(?:\?[^"]*)?/i.test(html)) pushUnique(categories.Frontend, 'Angular')
    if (/svelte(?:\.min)?\.js(?:\?[^"]*)?/i.test(html)) pushUnique(categories.Frontend, 'Svelte')
    if (lowerHTML.includes('tailwindcss') || lowerHTML.includes('tailwind')) pushUnique(categories.Frontend, 'Tailwind CSS')
    if (/bootstrap(?:\.min)?\.css(?:\?[^"]*)?/i.test(html)) pushUnique(categories.Frontend, 'Bootstrap')
    if (/jquery(?:\.min)?\.js(?:\?[^"]*)?/i.test(html)) pushUnique(categories.Frontend, 'jQuery')

    // Analytics and trackers
    if (lowerHTML.includes('gtag(')) pushUnique(categories.Analytics, 'Google Global Site Tag')
    if (lowerHTML.includes('google-analytics.com')) pushUnique(categories.Analytics, 'Google Analytics')
    if (lowerHTML.includes('googletagmanager.com')) pushUnique(categories.Analytics, 'Google Tag Manager')
    if (lowerHTML.includes('fbq(')) pushUnique(categories.Analytics, 'Facebook Pixel')
    if (lowerHTML.includes('hotjar')) pushUnique(categories.Analytics, 'Hotjar')
    if (lowerHTML.includes('clarity.microsoft.com')) pushUnique(categories.Analytics, 'Microsoft Clarity')

    // Hosting/CDN
    if (lowerHTML.includes('netlify.com')) pushUnique(categories.Hosting, 'Netlify')
    if (lowerHTML.includes('firebase')) pushUnique(categories.Hosting, 'Firebase Hosting')
    if (lowerHTML.includes('heroku')) pushUnique(categories.Hosting, 'Heroku')
    if (lowerHTML.includes('aws.amazon.com') || lowerHTML.includes('cloudfront.net') || lowerHeaders['x-amz-cf-id']) {
        pushUnique(categories.Hosting, 'AWS')
    }
    if (lowerHTML.includes('surge.sh')) pushUnique(categories.Hosting, 'Surge.sh')
    if (lowerHTML.includes('render.com')) pushUnique(categories.Hosting, 'Render')

    if (lowerHTML.includes('cdn.jsdelivr.net')) pushUnique(categories.CDN, 'jsDelivr')
    if (lowerHTML.includes('unpkg.com')) pushUnique(categories.CDN, 'UNPKG')

    // Final result
    const detected: string[] = []
    for (const key in categories) {
        detected.push(...categories[key])
    }

    return {
        categories,
        raw: [...new Set(detected)]
    }
}
