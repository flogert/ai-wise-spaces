export const prerender = false;
import type { APIRoute } from 'astro';

type AuditSignalMap = {
	hasTitle: boolean;
	hasMetaDescription: boolean;
	hasH1: boolean;
	hasFaqContent: boolean;
	hasLocalSchema: boolean;
	hasContactSignals: boolean;
	hasStrongCta: boolean;
	hasLocalIntentCopy: boolean;
	hasServicePages: boolean;
	isSecure: boolean;
};

function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value));
}

function testPattern(content: string, pattern: RegExp): boolean {
	return pattern.test(content);
}

function analyzeHtml(html: string, websiteUrl: string) {
	const parsedUrl = new URL(websiteUrl);
	const normalizedHtml = html.replace(/\s+/g, ' ');
	const lowercaseHtml = normalizedHtml.toLowerCase();

	const signals: AuditSignalMap = {
		hasTitle: testPattern(normalizedHtml, /<title>[^<]{8,}<\/title>/i),
		hasMetaDescription: testPattern(normalizedHtml, /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{20,}["']/i),
		hasH1: testPattern(normalizedHtml, /<h1[^>]*>[^<]{8,}<\/h1>/i),
		hasFaqContent: testPattern(lowercaseHtml, /faq|frequently asked|question|answer|common questions/),
		hasLocalSchema: testPattern(lowercaseHtml, /localbusiness|professionalservice|servicearea|areaserved|postaladdress/),
		hasContactSignals: testPattern(lowercaseHtml, /tel:|call now|contact us|request a quote|get estimate|free estimate|phone/),
		hasStrongCta: testPattern(lowercaseHtml, /request a quote|get estimate|call now|book now|schedule now|contact us/),
		hasLocalIntentCopy: testPattern(lowercaseHtml, /near me|service area|county|pa\b|pennsylvania|city|town|local/),
		hasServicePages: testPattern(
			lowercaseHtml,
			/services|service areas|areas we serve|locations|roofing|plumbing|hvac|electrical|landscaping|contractor|painting|concrete|yoga|photography|salon|barber|restaurant|coffee|gym|fitness|med spa|massage|cleaning|auto repair|pet grooming|dental|chiropractor|real estate|event venue/,
		),
		isSecure: parsedUrl.protocol === 'https:',
	};

	const localSeo = clamp(
		30 +
			(signals.isSecure ? 10 : 0) +
			(signals.hasLocalSchema ? 18 : 0) +
			(signals.hasLocalIntentCopy ? 18 : 0) +
			(signals.hasServicePages ? 12 : 0) +
			(signals.hasMetaDescription ? 8 : 0),
		28,
		92,
	);

	const clarity = clamp(
		32 + (signals.hasTitle ? 16 : 0) + (signals.hasH1 ? 18 : 0) + (signals.hasMetaDescription ? 12 : 0) + (signals.hasServicePages ? 10 : 0),
		30,
		94,
	);

	const aiReadability = clamp(
		28 + (signals.hasTitle ? 10 : 0) + (signals.hasH1 ? 12 : 0) + (signals.hasFaqContent ? 18 : 0) + (signals.hasLocalSchema ? 18 : 0) + (signals.hasServicePages ? 8 : 0),
		25,
		94,
	);

	const conversion = clamp(
		30 + (signals.hasStrongCta ? 18 : 0) + (signals.hasContactSignals ? 16 : 0) + (signals.hasH1 ? 10 : 0) + (signals.hasServicePages ? 8 : 0),
		28,
		93,
	);

	const overall = clamp(Math.round((localSeo + clarity + aiReadability + conversion) / 4), 30, 94);

	return {
		scores: { overall, localSeo, clarity, aiReadability, conversion },
		summary:
			'Preview based on live page signals that affect visibility in Google, ChatGPT, Perplexity, Gemini, and other AI search tools, including headings, metadata, local intent, and conversion cues.',
	};
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const { websiteUrl } = (await request.json().catch(() => ({}))) as { websiteUrl?: string };

		if (!websiteUrl) {
			return Response.json({ message: 'Please provide a website URL.' }, { status: 400 });
		}

		let parsedUrl: URL;
		try {
			parsedUrl = new URL(websiteUrl);
		} catch {
			return Response.json({ message: 'Please enter a valid URL.' }, { status: 400 });
		}

		if (!/^https?:$/.test(parsedUrl.protocol)) {
			return Response.json({ message: 'Please use an http or https URL.' }, { status: 400 });
		}

		const response = await fetch(parsedUrl.toString(), {
			headers: {
				'user-agent': 'Mozilla/5.0 (compatible; AIWiseSpacesAuditBot/1.0; +https://aiwisespaces.com)',
				accept: 'text/html,application/xhtml+xml',
			},
			redirect: 'follow',
		});

		if (!response.ok) {
			return Response.json({ message: 'We could not load that website for preview analysis.' }, { status: 502 });
		}

		const html = await response.text();
		const audit = analyzeHtml(html, parsedUrl.toString());

		return Response.json(audit, { status: 200 });
	} catch (error) {
		console.error('QuickAuditFailed', error);
		return Response.json({ message: 'The quick preview is unavailable right now.' }, { status: 500 });
	}
};

export const GET: APIRoute = async () => Response.json({ message: 'Method not allowed.' }, { status: 405 });