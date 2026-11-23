import puppeteer, { type Browser } from 'puppeteer-core';

/**
 * GET /.netlify/functions/resume-pdf?id=<document id>[&page=cover-letter]: prints the site's
 * `/resume?id=…` (or `/cover-letter?id=…`) page to PDF in headless Chrome, the same as Print → Save
 * as PDF. The studio's "Generate Resume PDF" and "Generate Cover Letter PDF" actions call it, then
 * upload the result to the document's `pdf` field.
 *
 * - Print media: always the light "paper" theme (app.css), on A4 pages from the `@page` rule.
 * - Text stays text (selectable, ~40 KB), and `tagged` adds a structure tree in HTML order for ATS
 *   parsers. The resume markup puts Experience and Skills before the sidebar for the same reason.
 * - Printed at the page's own size (no shrink-to-fit, so the text stays readable; usually two pages).
 *   `X-Pdf-Pages` reports the page count so the studio can warn when a resume or letter runs long.
 *
 * Locally, set CHROME_PATH to an installed Chrome and RESUME_RENDER_ORIGIN to the dev server.
 * On Netlify it uses @sparticuz/chromium and prints this deploy's own netlify.app URL (DEPLOY_URL),
 * which skips the CDN cache in front of the custom domain.
 */

const ALLOWED_ORIGINS = ['https://richard-dev.sanity.studio', 'http://localhost:3333'];

// The pages it can print, by the `page` parameter (default `resume`).
const PAGES: Record<string, string> = { resume: '/resume', 'cover-letter': '/cover-letter' };

export default async (request: Request) => {
	const origin = request.headers.get('origin') ?? '';
	const cors: Record<string, string> = {
		'access-control-allow-origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
		'access-control-expose-headers': 'X-Pdf-Pages',
		vary: 'Origin'
	};
	if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

	// Published document IDs only (drafts are `drafts.<id>`, and the page reads published content).
	const params = new URL(request.url).searchParams;
	const id = params.get('id') ?? '';
	if (!/^[A-Za-z0-9_-]+$/.test(id)) {
		return new Response('Missing or invalid document id', { status: 400, headers: cors });
	}
	const pageName = params.get('page') ?? 'resume';
	const path = Object.hasOwn(PAGES, pageName) ? PAGES[pageName] : undefined;
	if (!path) return new Response('Unknown page', { status: 400, headers: cors });

	const siteOrigin = process.env.RESUME_RENDER_ORIGIN ?? process.env.DEPLOY_URL ?? process.env.URL;
	let browser: Browser | undefined;
	try {
		browser = await launch();
		const page = await browser.newPage();
		await page.emulateMediaType('print');
		const response = await page.goto(`${siteOrigin}${path}?id=${id}`, { waitUntil: 'networkidle0' });
		if (!response?.ok()) {
			return new Response(`${path} returned ${response?.status()}`, { status: 404, headers: cors });
		}
		await page.evaluate(() => document.fonts.ready);

		const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true, tagged: true });

		// Copied into a plain ArrayBuffer-backed array, which is what `Response` accepts.
		return new Response(new Uint8Array(pdf), {
			headers: {
				...cors,
				'content-type': 'application/pdf',
				'cache-control': 'no-store',
				'x-pdf-pages': String(countPages(pdf))
			}
		});
	} catch (error) {
		console.error(error);
		return new Response('Could not render the PDF', { status: 500, headers: cors });
	} finally {
		await browser?.close();
	}
};

// No custom `config.path`: SvelteKit's own function claims `/*` but excludes `/.netlify/*`, so the
// default URL is the one that can't collide with a site route.

async function launch() {
	if (process.env.CHROME_PATH) {
		return puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true });
	}
	const { default: chromium } = await import('@sparticuz/chromium');
	return puppeteer.launch({
		args: chromium.args,
		executablePath: await chromium.executablePath(),
		headless: true
	});
}

/** Page objects in a Chrome (Skia) PDF: one `/Type /Page` dictionary per page. */
function countPages(pdf: Uint8Array) {
	return Buffer.from(pdf).toString('latin1').match(/\/Type\s*\/Page(?![s\w])/g)?.length ?? 0;
}
