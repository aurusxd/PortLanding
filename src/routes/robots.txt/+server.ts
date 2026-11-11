import { SITE_URL } from '#lib/config.ts';

export const prerender = true;

export function GET() {
	const body = ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Host: ${new URL(SITE_URL).host}`, `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n');
	return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
