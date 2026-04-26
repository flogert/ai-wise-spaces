# AI Wise Spaces Website Build Skill

## Role
You are GitHub Copilot GPT 5.4 acting as a senior frontend engineer and product-minded UI designer. Build a premium, fast, SEO-focused Astro + Vite website for **AI Wise Spaces**, a company that creates AI-ready websites that help businesses become visible, understandable, and recommended by AI assistants.

The website should feel intelligent, trustworthy, calm, futuristic, and conversion-focused. Avoid generic startup clutter. The design should look like a polished SaaS/AI agency website with strong above-the-fold impact.

---

## Core Tech Stack

Use:

- Astro
- Vite
- Tailwind CSS
- JavaScript or Astro components
- Minimal client-side JavaScript
- Static-first pages
- SEO-friendly semantic HTML
- Astro image optimization where useful
- Astro sitemap integration

Preferred setup:

```bash
npm create astro@latest ai-wise-spaces
cd ai-wise-spaces
npx astro add tailwind sitemap
npm run dev
```

---

## Brand Direction

### Brand name
AI Wise Spaces

### Brand promise
We help businesses build websites that are easy for people to trust and easy for AI assistants to understand, cite, and recommend.

### Tone
- Premium
- Clear
- Strategic
- Trustworthy
- Calm
- Forward-thinking
- Not gimmicky

### Visual style
- Dark luxury tech theme
- Deep navy / black background
- Soft blue and violet gradients
- Glassmorphism cards
- Thin borders
- Subtle glow effects
- Geometric node patterns
- AI/webpage connection motif
- Spacious layout
- Rounded cards
- Large confident typography

---

## Color System

Use CSS variables in `src/styles/global.css`.

```css
:root {
  --color-bg: #050816;
  --color-bg-soft: #080d1f;
  --color-card: rgba(15, 23, 42, 0.72);
  --color-card-strong: rgba(17, 24, 39, 0.92);
  --color-border: rgba(148, 163, 184, 0.18);
  --color-border-bright: rgba(96, 165, 250, 0.35);
  --color-text: #f8fafc;
  --color-muted: #a7b0c2;
  --color-soft: #cbd5e1;
  --color-blue: #4f7cff;
  --color-cyan: #38bdf8;
  --color-violet: #7c3aed;
  --color-purple: #a78bfa;
  --color-success: #22c55e;
}
```

Tailwind theme should map these values where practical.

---

## Typography

Use a premium sans-serif such as:

- Inter
- Geist
- Satoshi
- Manrope

Recommended hierarchy:

- Hero headline: 56px–76px desktop, 42px mobile
- Section headings: 36px–48px desktop
- Body text: 16px–18px
- Eyebrow labels: uppercase, letter-spaced, blue/violet

Hero headline style:

```txt
Make Your Business
Visible. Understandable.
Recommended by AI.
```

The final line should use a blue-to-cyan gradient text treatment.

---

## Layout Requirements

Create a homepage similar to the provided reference design.

### Page sections

1. Header / Navigation
2. Hero above-the-fold
3. Trusted-by logo strip
4. Services cards
5. AI visibility stats strip
6. Process section
7. Case study / example result section
8. Pricing preview
9. FAQ
10. Final CTA
11. Footer

---

## Header

### Behavior
- Sticky or fixed near top
- Transparent/dark background with blur
- Desktop nav links
- Mobile hamburger menu
- CTA button on desktop

### Navigation links

```txt
Services
Process
Case Studies
Pricing
About
Blog
```

### CTA

```txt
Book a Free Audit
```

### Logo
Use a simple geometric icon placeholder if no image is available:

- Hexagon outline
- Small connected nodes inside
- Minimal blue/violet glow
- Text: AI WISE SPACES

---

## Hero Section

### Structure
Two-column desktop layout.

Left column:
- Eyebrow: `AI VISIBILITY. REAL RESULTS.`
- Large headline
- Supporting paragraph
- Two CTA buttons
- Social proof row

Right column:
- Large abstract visual showing stacked web pages / panels inside a glowing AI network sphere
- Floating labels around the visual
- Subtle dots, nodes, orbit lines, and grid effects

### Hero copy

Eyebrow:

```txt
AI VISIBILITY. REAL RESULTS.
```

Headline:

```txt
Make Your Business Visible. Understandable. Recommended by AI.
```

Subheadline:

```txt
We help businesses build AI-ready websites that are easy for people to trust and easy for AI assistants to understand, cite, and recommend.
```

Primary CTA:

```txt
Book a Free Audit
```

Secondary CTA:

```txt
Explore Services
```

Social proof examples:

```txt
Trusted by businesses building their AI visibility
5.0 from 30+ reviews
```

### Floating labels
Use small glass cards around the abstract hero visual:

```txt
Understood by AI Assistants
Structured for Clarity
Recommended to Your Customers
```

---

## Hero Visual Implementation

Do not require a 3D library. Create the visual with CSS and HTML.

Suggested elements:

- A `hero-visual` wrapper
- A glowing radial background
- A pseudo 3D stack of 3–4 rounded rectangles using absolute positioning
- Thin lines and node dots
- Rotating or static orbit ring using CSS border/radial gradients
- Floating glass cards

Example class idea:

```html
<div class="hero-visual">
  <div class="orbit-ring"></div>
  <div class="panel-stack">
    <span class="panel panel-1"></span>
    <span class="panel panel-2"></span>
    <span class="panel panel-3"></span>
  </div>
  <div class="floating-card card-ai">Understood by AI Assistants</div>
  <div class="floating-card card-structured">Structured for Clarity</div>
  <div class="floating-card card-recommended">Recommended to Your Customers</div>
</div>
```

Keep it responsive. On mobile, move the visual below the text and reduce its height.

---

## Trusted Logo Strip

Create a bordered glass container below the hero.

Eyebrow:

```txt
TRUSTED BY FORWARD-THINKING BUSINESSES
```

Use placeholder customer names:

```txt
Nexora
BrightPath Solutions
Elevate Digital
Pulse Fitness
CoreBuild Construction
Lumen Health
```

Use muted logos/text marks in gray-blue.

---

## Services Section

### Section copy

Eyebrow:

```txt
OUR SERVICES
```

Heading:

```txt
Everything Your Business Needs to Get Seen by AI
```

Intro:

```txt
From audits to full website builds and content systems, we make your business AI-ready at every layer.
```

### Service cards
Create four cards:

1. **AI Visibility Audit**
   - We analyze how AI systems read and interpret your website and give you a clear action plan.

2. **AI-Ready Website Build**
   - Lightning-fast, SEO-optimized websites built with Astro. Structured, semantic, and built for AI discovery.

3. **Structured Content Strategy**
   - We create content that answers real questions, earns trust, and gets cited by AI assistants.

4. **Technical SEO for AI Discovery**
   - From schema to site speed, we handle the technical foundation that AI systems depend on.

Each card should include:
- Icon badge
- Title
- Description
- `Learn more →` link
- Hover glow/border effect

---

## Stats Strip

Create a large horizontal glass card.

Eyebrow:

```txt
WHY AI VISIBILITY MATTERS
```

Stats:

```txt
64% — of consumers now use AI assistants for recommendations
3.8x — more visibility for brands optimized for AI discovery
70% — of AI answers come from structured, trustworthy content
1 Step — We monitor competitors who ignore AI optimization
```

Important: These are placeholder marketing stats unless replaced with verified numbers. Keep them in data objects so they are easy to update.

---

## Process Section

### Copy

Eyebrow:

```txt
OUR PROCESS
```

Heading:

```txt
Simple. Strategic. Effective.
```

Steps:

1. **Discover & Audit**
   - We audit your website, content, and technical structure for AI readiness.

2. **Strategy & Plan**
   - We create a tailored roadmap to improve visibility across AI systems.

3. **Implement & Build**
   - We optimize, build, and structure your website and content for AI and SEO.

4. **Optimize & Grow**
   - We monitor, refine, and scale your visibility for long-term growth.

Design as a timeline with circular icon nodes connected by dotted lines on desktop. Stack vertically on mobile.

---

## Case Studies Section

Create a premium section showing example outcomes.

Heading:

```txt
Built for the New Search Era
```

Cards:

- Local service business
- Health and wellness brand
- Professional services firm

Each case study card should show:
- Industry
- Problem
- Solution
- Result placeholder

Example result text:

```txt
Improved content structure, stronger service pages, and clearer AI-readable business context.
```

Avoid fake hard claims unless clearly labeled as examples.

---

## Pricing Preview

Create three pricing cards:

1. **AI Visibility Audit**
   - Starting at $750

2. **AI-Ready Website Build**
   - Starting at $3,500

3. **AI Growth System**
   - Monthly from $1,250

Each should include:
- Best for label
- 4–6 bullet features
- CTA button

Mark the middle option as `Most Popular`.

---

## FAQ Section

Include these questions:

```txt
What is an AI-ready website?
How is this different from traditional SEO?
Can you improve my existing website?
Do I need a blog?
How long does an AI visibility audit take?
What platforms do you build with?
```

Use accessible accordion behavior if using JavaScript. Otherwise, simple static FAQ cards are acceptable.

---

## Final CTA

Copy:

```txt
Ready to make your website AI-ready?
```

Subcopy:

```txt
Book a free audit and see how clearly AI assistants can understand, cite, and recommend your business.
```

CTA:

```txt
Book a Free Audit
```

---

## Footer

Include:

- Logo
- Short brand description
- Services links
- Company links
- Legal links
- Newsletter/email capture optional

Footer text:

```txt
AI Wise Spaces builds fast, structured, AI-ready websites for businesses that want to be found in the next generation of search.
```

---

## Component Structure

Recommended files:

```txt
src/
  components/
    Header.astro
    Footer.astro
    Hero.astro
    HeroVisual.astro
    TrustedLogos.astro
    ServicesSection.astro
    ServiceCard.astro
    StatsStrip.astro
    ProcessSection.astro
    CaseStudies.astro
    PricingPreview.astro
    FAQSection.astro
    FinalCTA.astro
    Button.astro
    SectionHeader.astro
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    services.astro
    process.astro
    pricing.astro
    contact.astro
    blog/
      index.astro
  data/
    services.js
    pricing.js
    process.js
    faqs.js
  styles/
    global.css
```

---

## SEO Requirements

Every page should include:

- Unique title
- Meta description
- Canonical URL support
- Open Graph title/description/image
- Semantic headings
- Descriptive links
- JSON-LD schema where appropriate

Homepage title:

```txt
AI Wise Spaces | AI-Ready Websites for the New Search Era
```

Homepage description:

```txt
AI Wise Spaces builds fast, structured, AI-ready websites that help businesses become easier for people to trust and easier for AI assistants to understand, cite, and recommend.
```

Suggested schema:

- Organization
- LocalBusiness or ProfessionalService
- WebSite
- FAQPage
- Service

---

## Performance Requirements

Prioritize:

- Static rendering
- Minimal JavaScript
- Optimized images
- CSS gradients instead of heavy videos
- No unnecessary animation libraries
- Lazy-load below-the-fold images
- Accessible contrast
- Keyboard navigation
- Lighthouse-friendly structure

Target:

```txt
Performance: 95+
Accessibility: 95+
SEO: 95+
Best Practices: 95+
```

---

## Interaction Guidelines

Use subtle animations only:

- Card hover border glow
- Button hover gradient shift
- Floating hero labels with slow transform
- Soft background node movement if simple

Avoid:

- Heavy scroll hijacking
- Complex canvas animations
- Excessive neon effects
- Tiny unreadable text
- Fake dashboards with too much detail

---

## Responsive Rules

Desktop:
- Max width: 1180px–1280px
- Two-column hero
- Four-card service grid
- Horizontal process timeline

Tablet:
- Hero becomes balanced stacked/two-column depending width
- Services become two columns

Mobile:
- Single-column layout
- Hero text first, visual second
- Nav collapses
- CTA buttons stack or full-width
- Process timeline stacks vertically

---

## Accessibility Requirements

- Use semantic HTML
- Use `aria-label` for icon-only buttons
- Ensure focus states are visible
- Do not rely only on color to communicate meaning
- Buttons and links must be keyboard accessible
- Maintain good contrast on dark backgrounds
- Use real text, not image text

---

## Data-Driven Content

Put repeatable content into data files.

Example `src/data/services.js`:

```js
export const services = [
  {
    title: 'AI Visibility Audit',
    description:
      'We analyze how AI systems read and interpret your website and give you a clear action plan.',
    icon: 'search',
    href: '/services/ai-visibility-audit',
  },
  {
    title: 'AI-Ready Website Build',
    description:
      'Lightning-fast, SEO-optimized websites built with Astro. Structured, semantic, and built for AI discovery.',
    icon: 'website',
    href: '/services/ai-ready-website-build',
  },
  {
    title: 'Structured Content Strategy',
    description:
      'We create content that answers real questions, earns trust, and gets cited by AI assistants.',
    icon: 'content',
    href: '/services/structured-content-strategy',
  },
  {
    title: 'Technical SEO for AI Discovery',
    description:
      'From schema to site speed, we handle the technical foundation that AI systems depend on.',
    icon: 'settings',
    href: '/services/technical-seo',
  },
];
```

---

## Implementation Order

Build in this order:

1. Project setup
2. Global CSS variables and base styles
3. Base layout with SEO props
4. Header and Footer
5. Hero and HeroVisual
6. Trusted logo strip
7. Services section
8. Stats strip
9. Process section
10. Pricing preview
11. FAQ
12. Final CTA
13. Contact page
14. Service pages
15. Blog framework
16. Schema markup
17. Performance polish

---

## Homepage Acceptance Criteria

The homepage is complete when:

- It visually resembles a premium dark AI/SaaS service website
- The hero clearly communicates the business value
- The design has a strong above-the-fold layout
- The site works on mobile and desktop
- CTAs are visible and repeated naturally
- Sections are componentized
- Content is easy to update from data files
- Page has proper SEO metadata
- No major layout shift
- No dependency bloat
- `npm run dev` works
- `npm run build` passes

---

## Important Design Notes

- The visual reference uses a dark hero, glowing blue layered website panels, AI network sphere, floating glass labels, trusted logo strip, service cards, stats strip, and a clean process timeline.
- Recreate the same feel, not a pixel-perfect clone.
- Keep the page premium, spacious, and calm.
- The website should sell trust and clarity more than hype.

