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

    // HEADER BASED DETECTIONS
    const powered = headers['x-powered-by']?.toLowerCase()
    if (powered?.includes('express')) categories.Backend.push('Express.js')
    if (powered?.includes('php')) categories.Backend.push('PHP')
    if (powered?.includes('asp.net')) categories.Backend.push('ASP.NET')
    if (powered?.includes('next.js')) categories.Frontend.push('Next.js')

    if (headers['server']?.toLowerCase().includes('cloudflare')) categories.CDN.push('Cloudflare')
    if (headers['x-shopify-stage']) categories.CMS.push('Shopify')

    // HTML BASED DETECTIONS
    if (html.includes('wp-content') || html.includes('wordpress')) categories.CMS.push('WordPress')
    if (html.includes('cdn.shopify.com')) categories.CMS.push('Shopify')
    if (html.includes('drupal.js')) categories.CMS.push('Drupal')
    if (html.includes('static.squarespace.com')) categories.CMS.push('Squarespace')

    if (html.includes('__REACT_DEVTOOLS_GLOBAL_HOOK__') || html.includes('react')) categories.Frontend.push('React')
    if (html.includes('vue')) categories.Frontend.push('Vue.js')
    if (html.includes('angular')) categories.Frontend.push('Angular')
    if (html.includes('tailwindcss')) categories.Frontend.push('Tailwind CSS')
    if (html.includes('bootstrap')) categories.Frontend.push('Bootstrap')
    if (html.includes('cdnjs.cloudflare.com/ajax/libs/jquery/')) categories.Frontend.push('jQuery')

    if (html.includes('gtag(')) categories.Analytics.push('Google Global Site Tag')
    if (html.includes('google-analytics.com')) categories.Analytics.push('Google Analytics')
    if (html.includes('googletagmanager.com')) categories.Analytics.push('Google Tag Manager')
    if (html.includes('fbq(')) categories.Analytics.push('Facebook Pixel')
    if (html.includes('hotjar')) categories.Analytics.push('Hotjar')
    if (html.includes('clarity.microsoft.com')) categories.Analytics.push('Microsoft Clarity')

    if (html.includes('vercel-insights') || html.includes('vercel.com')) categories.Hosting.push('Vercel')
    if (html.includes('netlify.com')) categories.Hosting.push('Netlify')
    if (html.includes('firebase')) categories.Hosting.push('Firebase Hosting')
    if (html.includes('heroku')) categories.Hosting.push('Heroku')

    // Raw flat list
    for (const key in categories) {
        detected.push(...categories[key])
    }

    return {
        categories,
        raw: [...new Set(detected)]
    }
}