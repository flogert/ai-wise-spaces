# Improve Codebase Architecture

Guidelines for evolving the codebase into a clean, scalable, and maintainable system.

See also: `docs/UBIQUITOUS_LANGUAGE.md`

## Goals

- Clear separation of concerns
- Domain-driven structure aligned with the platform's ubiquitous language
- Testable and predictable code
- Minimal coupling between layers
- Easy extension without breaking existing features

## High-Level Structure

This project is Astro-based, so the target structure should reflect Astro routes and server endpoints rather than Next.js App Router conventions.

```text
src/
├── components/     # Shared UI components (pure or mostly presentational)
├── data/           # Shared content and domain copy
├── features/       # Feature-based modules
│   └── contact/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── domain/
│       ├── server/
│       └── tests/
├── layouts/        # Shared page shells
├── lib/            # Shared utilities (API clients, helpers)
├── pages/          # Astro pages and API routes
│   └── api/
├── styles/         # Global styles
├── types/          # Shared types when needed
└── server/         # Cross-feature server-only integrations
docs/               # Architecture and workflow documents
```

## Feature-Driven Design

Each feature should be self-contained and isolated.

Example:

```text
src/features/contact/
├── components/   # UI such as forms and field groups
├── hooks/        # Client interaction orchestration
├── services/     # Request/response handling
├── domain/       # Business rules and validation
├── server/       # Server-only feature integrations
└── tests/        # Unit and integration tests
```

Core rule:

If a file only relates to one feature, it must live inside that feature.

## Layer Responsibilities

### 1. UI Layer

Location:

- `src/components/`
- `src/features/*/components/`

Responsibilities:

- Displays data only
- Avoids business logic
- Avoids direct API calls
- Delegates interaction to hooks or feature services

### 2. Hooks Layer

Location:

- `src/features/*/hooks/`

Responsibilities:

- Manages state and side effects
- Connects UI to services
- Orchestrates flow between UI, domain, and services

Example:

- `useContactSubmission`

### 3. Services Layer

Location:

- `src/features/*/services/`

Responsibilities:

- Handles API communication
- Normalizes responses
- Maps transport or provider failures into consistent application errors

Example:

- `submitContactSubmission()`

### 4. Domain Layer

Location:

- `src/features/*/domain/`

Responsibilities:

- Core business rules
- Validation logic
- Pure deterministic functions
- No side effects

Examples:

- `validateInquiry`
- `buildLeadPayload`
- `isQualifiedLead`

### 5. Server Layer

Location:

- `src/server/`
- `src/features/*/server/`
- `src/pages/api/`

Responsibilities:

- External integrations such as Resend
- Secrets and environment variables
- Provider-specific logging and failure handling
- Never exposed to client-side code

Example flow:

`UI -> Hook -> Service -> API Route -> Server Integration -> External API`

Domain logic can be used anywhere in the flow but should remain pure.

## Naming Conventions

Use consistent, domain-specific terms from the platform language.

Preferred:

- `ContactSubmission`
- `Lead`
- `QualifiedLead`
- `SubmitContactForm`
- `SendLeadNotification`
- `AIVisibility`
- `SemanticClarity`

Avoid vague names:

- `handleStuff`
- `processData`
- `utilsHelper`
- `payload` when a more precise term exists
- `data` when a more precise term exists

Rule:

If a name cannot be understood without surrounding context, rename it.

## API Design

### Primary Route

`POST /api/contact`

### Success Response

```json
{ "message": "Inquiry submitted successfully." }
```

### Error Responses

```json
{ "message": "Please fill out name, email, and inquiry." }
```

```json
{ "message": "Email provider rejected the lead notification." }
```

### Rules

- Normalize all errors at the service layer.
- Never expose raw provider internals directly to the UI unless there is an explicit debugging need.
- Always return consistent response shapes.
- Log detailed errors only on the server.

## Testing Strategy

### Domain

- Unit tests for pure logic such as validation and transformation rules

### Services

- Mock API calls
- Test success and failure cases

### UI

- Component tests for rendering and trust states

### End-to-End

- Full contact submission flow
- Webhook event handling flow when test infrastructure exists

## Refactoring Strategy

When improving architecture:

1. Identify tightly coupled code.
2. Extract code into the correct layer.
3. Add or update tests before moving logic.
4. Rename using the ubiquitous language.
5. Remove duplication.

Rule:

Refactor only when tests are passing.

## Anti-Patterns To Avoid

- Business logic inside UI components or `.astro` pages
- API calls directly in presentational UI
- Global `utils` dumping ground
- Massive files over roughly 300 lines without a good reason
- Poor or ambiguous naming
- Hidden side effects
- Provider-specific logic leaking into unrelated layers

## Future Improvements

- Introduce schema validation with Zod
- Add structured logging and monitoring
- Introduce background jobs or queues for email sending
- Add rate limiting for `/api/contact`
- Introduce feature flags for controlled rollouts
- Add observability such as metrics and tracing
- Move contact submission validation into a dedicated domain module
- Move Resend integration into a dedicated server module

## Clean Mental Model

### Contact Flow

`User -> Contact Submission -> Validation -> Lead Capture -> Email -> Review -> Qualification`

### AI Visibility Layer

`Website -> Structured Content -> Semantic Clarity -> AI Visibility -> Lead Generation`

The architecture should make those flows obvious in both code and naming.