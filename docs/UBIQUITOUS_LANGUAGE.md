# Ubiquitous Language

A shared glossary for AI Wise Spaces. These terms define how we think, build, and communicate across product, code, and business.

## Core Domain Concepts

| Term | Definition | Example |
| --- | --- | --- |
| User | A visitor interacting with the website or system. | A business owner browsing services. |
| Lead | A potential client who expresses interest via inquiry. | Someone submitting a contact submission. |
| Qualified Lead | A lead that meets business criteria after review. | A business ready to invest in optimization. |
| AI Visibility | The likelihood that a business is surfaced or recommended by AI systems. | Appearing in ChatGPT or voice assistant suggestions. |
| AI Presence | The overall footprint of a business across AI-consumable content sources. | Website plus structured data plus knowledge mentions. |
| AI-Optimized Website | A website intentionally structured for machine understanding and recommendation. | Clean hierarchy, schema, and semantic clarity. |
| Structured Content | Content formatted for machine parsing, not just humans. | FAQs, headings, schema markup. |
| Semantic Clarity | How easily meaning can be interpreted by AI systems. | Clear service descriptions without fluff. |
| Contact Submission | A structured inquiry sent via the website. | Name, email, business, and inquiry. |
| Inquiry | The intent expressed by a lead. | "I want better AI visibility." |
| Service Offering | A defined solution provided by AI Wise Spaces. | AI optimization package. |

## System And Technical Terms

| Term | Definition | Example |
| --- | --- | --- |
| Email Provider | External service used to send emails. | Resend |
| Email Delivery | Successful transmission of an email. | Lead notification arrives in inbox. |
| Email Rejection | Failure from provider to send email. | Rejection from the Resend API. |
| Webhook | A system callback triggered by events. | Receiving email lifecycle events from Resend. |
| API Route | Backend endpoint handling requests. | `/api/contact` |
| Validation | Ensuring input meets requirements. | Email format check. |

## Business Rules

- A contact submission must include a valid email.
- A contact submission must include a non-empty inquiry.
- A lead becomes a qualified lead only after manual review.
- All structured content must prioritize clarity over persuasion.
- Every page must contribute to AI visibility, not just human UX.
- Email delivery failures must be logged and retryable.
- The system must gracefully handle email rejection from providers.

## Domain Events

| Event | Meaning |
| --- | --- |
| ContactSubmitted | A user submits a contact submission. |
| ContactValidated | Submission passes validation rules. |
| ContactRejected | Submission fails validation. |
| LeadCaptured | A valid lead is stored or accepted by the system. |
| EmailQueued | Email is prepared for sending. |
| EmailSent | Email successfully delivered or accepted by the provider. |
| EmailRejected | Email provider rejects the request. |
| EmailReceived | Inbound email or webhook event captured. |
| LeadReviewed | Business evaluates the lead. |
| LeadQualified | Lead marked as high-value. |

## Commands And Actions

| Command | Purpose |
| --- | --- |
| SubmitContactForm | Create a new inquiry from a user. |
| ValidateContactForm | Ensure submission meets rules. |
| CaptureLead | Store lead in the system. |
| SendLeadNotification | Notify the business of a new lead. |
| RetryEmailDelivery | Attempt resend after failure. |
| ReceiveInboundEmail | Handle webhook email events. |
| QualifyLead | Mark lead as qualified. |
| ReplyToLead | Send response to lead. |

## Value Layer

| Term | Definition |
| --- | --- |
| AI Readiness | How prepared a website is to be consumed by AI systems. |
| Machine-Readable Design | Designing content primarily for AI parsing first and humans second. |
| Recommendation Surface | Places where AI may suggest a business. |
| Knowledge Fit | How well a business aligns with AI knowledge structures. |
| Content Signals | Structured indicators that help AI interpret a business. |

## Avoided And Replaced Terms

| Avoid | Use Instead | Why |
| --- | --- | --- |
| Customer | Lead or Client | More accurate lifecycle |
| AI SEO | AI Visibility | Differentiated positioning |
| Message | Contact Submission or Inquiry | More precise |
| Marketing Copy | Structured Content | Focus on clarity |
| Traffic | Visibility | Aligns with AI discovery |
| Conversion | Lead Capture | More concrete |

## Naming Conventions

- Events use past tense: `ContactSubmitted`
- Commands use imperative verbs: `SubmitContactForm`
- API routes are resource-based: `/api/contact`
- Variables use domain-specific terms such as `lead`, `contactSubmission`, and `inquiry`
- Avoid generic names like `data`, `info`, and `payload` when a more specific term exists

## Clean Mental Model

### Contact Flow

`User -> Contact Submission -> Validation -> Lead Capture -> Email -> Review -> Qualification`

### AI Visibility Layer

`Website -> Structured Content -> Semantic Clarity -> AI Visibility -> Lead Generation`

This vocabulary should guide both business communication and code design.