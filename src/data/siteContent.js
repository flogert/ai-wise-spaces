export const navigation = [
	{ label: 'Services', href: '/services', match: '/services' },
	{ label: 'Process', href: '/#process' },
	{ label: 'Case Studies', href: '/case-studies', match: '/case-studies' },
	{ label: 'Pricing', href: '/#pricing' },
	{ label: 'About', href: '/about', match: '/about' },
	{ label: 'Blog', href: '/blog', match: '/blog' },
];

export const proofAvatars = ['AL', 'BM', 'CR', 'DS'];

export const logos = [
	{ name: 'Nexora', sublabel: '' },
	{ name: 'BrightPath', sublabel: 'Solutions' },
	{ name: 'Elevate', sublabel: 'Digital' },
	{ name: 'Pulse', sublabel: 'Fitness' },
	{ name: 'CoreBuild', sublabel: 'Construction' },
	{ name: 'Lumen', sublabel: 'Health' },
];

export const services = [
	{
		icon: 'search',
		title: 'AI Visibility Audit',
		description:
			'We analyze how AI systems read and interpret your website and give you a clear action plan.',
		bestFor: 'Best for businesses that need clarity before investing further.',
		deliverables: [
			'AI-readiness review of your current website',
			'Schema, speed, and trust-signal assessment',
			'Competitor visibility snapshot',
			'Clear action plan with next priorities',
		],
	},
	{
		icon: 'window',
		title: 'AI-Ready Website Build',
		description:
			'Lightning-fast, SEO-optimized websites built with Astro. Structured, semantic, and built for AI discovery.',
		bestFor: 'Best for businesses ready to replace a slow or unclear site.',
		deliverables: [
			'Custom Astro site architecture',
			'Clear service-page hierarchy and messaging',
			'Conversion-focused layout and calls to action',
			'Performance, SEO, and AI-readable markup',
		],
	},
	{
		icon: 'document',
		title: 'Structured Content Strategy',
		description:
			'We create content that answers real questions, earns trust, and gets cited by AI assistants.',
		bestFor: 'Best for brands that need clearer authority and more useful content.',
		deliverables: [
			'Service-page messaging frameworks',
			'FAQ and knowledge content planning',
			'Content briefs shaped around real search intent',
			'Citeable page structures for AI and SEO',
		],
	},
	{
		icon: 'gear',
		title: 'Technical SEO for AI Discovery',
		description:
			'From schema to site speed, we handle the technical foundation that AI systems depend on.',
		bestFor: 'Best for sites that already have content but weak technical foundations.',
		deliverables: [
			'Technical SEO cleanup and diagnostics',
			'Structured data and internal-linking improvements',
			'Performance tuning for key templates',
			'Ongoing technical recommendations',
		],
	},
];

export const stats = [
	{ icon: 'chart', value: '64%', label: 'of consumers now use AI assistants for recommendations' },
	{ icon: 'search', value: '3.8x', label: 'more visibility for brands optimized for AI discovery' },
	{ icon: 'star', value: '70%', label: 'of AI answers come from structured, trustworthy content' },
	{ icon: 'shield', value: '1 Step', label: 'We monitor competitors who ignore AI optimization' },
];

export const process = [
	{
		step: '01',
		icon: 'search',
		title: 'Discover & Audit',
		description: 'We audit your website, content, and technical structure for AI readiness.',
	},
	{
		step: '02',
		icon: 'bulb',
		title: 'Strategy & Plan',
		description: 'We create a tailored roadmap to improve visibility across AI systems.',
	},
	{
		step: '03',
		icon: 'code',
		title: 'Implement & Build',
		description: 'We optimize, build, and structure your website and content for AI and SEO.',
	},
	{
		step: '04',
		icon: 'trend',
		title: 'Optimize & Grow',
		description: 'We monitor, refine, and scale your visibility for long-term growth.',
	},
];

export const caseStudies = [
	{
		industry: 'Local service business',
		title: 'Clearer service pages for stronger local trust',
		problem: 'Low trust signals and weak service-page structure left the brand hard to interpret.',
		solution: 'Clarified page hierarchy, local entity signals, and answer-focused service content.',
		result:
			'Improved content structure, stronger service pages, and clearer AI-readable business context.',
	},
	{
		industry: 'Health and wellness brand',
		title: 'Reframing expertise into a usable knowledge hub',
		problem: 'Scattered content made expertise difficult for AI tools and readers to evaluate.',
		solution: 'Rebuilt the knowledge architecture around services, FAQs, and trust-building proof.',
		result:
			'Clearer expertise signals, better topical organization, and more citeable educational pages.',
	},
	{
		industry: 'Professional services firm',
		title: 'Turning generic messaging into structured authority',
		problem: "Generic messaging failed to express the firm's specialties in a structured way.",
		solution:
			'Created focused practice-area pages and converted complex expertise into readable service narratives.',
		result:
			'More understandable service positioning and stronger alignment between search intent and site structure.',
	},
];

export const aboutPillars = [
	{
		title: 'Clarity first',
		text: 'We simplify what a business does so people and AI systems can understand it quickly.',
	},
	{
		title: 'Structure that lasts',
		text: 'We prefer fast, durable, semantic websites over fragile, over-engineered marketing stacks.',
	},
	{
		title: 'Business outcomes over hype',
		text: 'Every page and content system is built to support trust, recommendation, and conversion.',
	},
];

export const blogPosts = [
	{
		title: 'What makes a website AI-ready?',
		summary: 'A straightforward explanation of the structural and trust signals that help AI assistants interpret your business accurately.',
	},
	{
		title: 'Why clarity now matters as much as rankings',
		summary: 'How AI search changes the value of messaging, semantic structure, and answer-focused content.',
	},
	{
		title: 'The difference between SEO content and citeable content',
		summary: 'How to create pages that are not only searchable, but understandable and quotable by AI systems.',
	},
];

export const pricing = [
	{
		name: 'AI Audit',
		price: '$150',
		bestFor: 'Best for businesses that need clarity before rebuilding.',
		features: [
			'AI-readiness review',
			'Schema and technical SEO analysis',
			'Content structure recommendations',
			'Action roadmap and priority scoring',
		],
	},
	{
		name: 'AI Builds',
		price: 'Starting from $1,500',
		bestFor: 'Most Popular',
		features: [
			'Custom Astro website',
			'Conversion-focused copy structure',
			'AI-readable semantic markup',
			'Performance and SEO foundations',
			'Launch support and QA',
		],
		featured: true,
	},
	{
		name: 'AI Growth System',
		price: '$450 per month',
		bestFor: 'Best for brands investing in ongoing authority and growth.',
		features: [
			'Content planning and briefs',
			'Page and FAQ expansion',
			'Competitor monitoring',
			'Ongoing technical improvements',
		],
	},
];

export const faqs = [
	{
		question: 'What is an AI-ready website?',
		answer:
			'An AI-ready website is structured so both people and AI systems can understand what you do, why you are credible, and when to recommend you.',
	},
	{
		question: 'How is this different from traditional SEO?',
		answer:
			'Traditional SEO focuses on rankings. AI visibility also depends on clarity, entity signals, semantic structure, trust, and content that can be cited confidently.',
	},
	{
		question: 'Can you improve my existing website?',
		answer:
			'Yes. We can audit and improve an existing site or rebuild only the sections that are blocking clarity, performance, and conversion.',
	},
	{
		question: 'Do I need a blog?',
		answer:
			'Not always. What matters is whether your site answers real customer questions clearly and supports your authority with structured, useful content.',
	},
	{
		question: 'How long does an AI visibility audit take?',
		answer:
			'Most audits are delivered within 5 to 10 business days depending on site size, complexity, and how much existing content needs review.',
	},
	{
		question: 'What platforms do you build with?',
		answer:
			'We prefer Astro for speed, flexibility, and content structure, but we can also improve or advise on existing platforms when that is the better fit.',
	},
];