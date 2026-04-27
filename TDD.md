# Test-Driven Development (TDD)

This project follows Test-Driven Development (TDD) to keep behavior reliable as the AI Wise Spaces platform grows.

TDD matters most here because the product depends on trust:

- Contact submissions must always work.
- Lead capture must stay valid and structured.
- Email delivery through Resend must behave predictably.
- Webhook events must be accepted and logged correctly.
- UI feedback must be clear every time.

## Core Philosophy

We write tests before implementation to define behavior clearly and prevent regressions.

Goal:

Build only what is needed, prove it works, then improve it safely.

## The TDD Cycle

### 1. Red

Write a failing test.

- Define expected behavior.
- Ensure it fails for the right reason.

### 2. Green

Make it pass.

- Write the minimum code necessary.
- Avoid overengineering.

### 3. Refactor

Improve safely.

- Clean up structure.
- Improve naming, reuse, and readability.
- Keep all tests passing.

## What We Test

### 1. Contact Submission UI

- Email format validation.
- Required fields: name, email, inquiry.
- Prevent empty submissions.
- Character limits or sanitization behavior when added.
- Disabled submit button while loading.
- Success confirmation and error feedback.

### 2. API Layer

Primary routes:

- `/api/contact`
- `/api/webhook`

Expected coverage:

- Accepts valid payloads.
- Rejects malformed data.
- Handles missing environment variables.
- Returns correct HTTP status codes.
- Logs domain events and failures consistently.

### 3. Email Sending

Resend integration must verify:

- Successful send response.
- Failure handling from provider rejection.
- Correct sender: `contact@aiwisespaces.com`.
- Correct subject, reply-to, and HTML payload.
- Resend acceptance is treated as success only when `error` is absent.

### 4. Lead Processing Logic

- Contact submission transforms into a valid lead payload.
- Invalid or malformed submissions are rejected.
- Logging reflects domain events such as `ContactValidated`, `LeadCaptured`, `EmailSent`, and `EmailRejected`.
- Duplicate handling is covered when persistence is added.

### 5. Webhook Handling

- Accepts valid Resend webhook payloads.
- Rejects malformed JSON.
- Logs event type and recipient.
- Signature verification is tested once webhook security is added.

### 6. UI Trust States

- Loading state during submission.
- Success state after valid submission.
- Error display on validation or server failure.
- No double-submit while request is in flight.

## Test Categories

### Unit Tests

Test small, isolated logic.

Examples:

- `validateEmail`
- `buildLeadPayload`
- `buildResendEmail`
- `normalizeContactSubmission`

### Integration Tests

Test interactions between layers.

Examples:

- Form submission to `/api/contact` with mocked Resend.
- `/api/contact` request and response lifecycle.
- `/api/webhook` parsing and event logging behavior.

### UI Tests

Test user-visible behavior.

Examples:

- Submit button disables during request.
- Success message appears after valid submission.
- Error message appears after rejected submission.

### End-to-End Tests

Optional, but useful later.

Examples:

- User completes inquiry flow successfully.
- Contact submission failure path is visible and understandable.

## Example Test Cases

| Feature | Test |
| --- | --- |
| Contact submission | Rejects invalid email |
| Contact submission | Requires inquiry content |
| Contact submission | Disables submit while loading |
| API `/api/contact` | Returns `400` for invalid payload |
| API `/api/contact` | Returns `500` when env vars are missing |
| API `/api/contact` | Returns `200` for valid submission |
| Email sending | Returns success only when Resend returns `data` without `error` |
| Email sending | Returns error when Resend rejects email |
| Webhook | Returns `200` for valid event payload |
| Webhook | Returns `500` for malformed JSON |
| UI | Shows success message after submission |
| UI | Shows error message on failure |

## Project-Specific Testing Rules

### 1. Test Behavior, Not Implementation

Bad:

```js
expect(resend.emails.send).toHaveBeenCalled();
```

Better:

```js
expect(response.status).toBe(200);
expect(body.message).toBe('Inquiry submitted successfully.');
```

For external services, some call assertions are acceptable inside integration boundaries, but behavior must remain the primary assertion surface.

### 2. Mock External Services

Never hit real Resend APIs in tests.

Example:

```js
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({
        data: { id: '123' },
        error: null,
      }),
    },
  })),
}));
```

### 3. Keep Tests Small and Focused

Each test should verify one thing.

Bad:

```js
it('handles everything', () => {
  // too much responsibility
});
```

Good:

```js
it('rejects invalid email', () => {
  // one behavior
});

it('accepts valid email', () => {
  // one behavior
});
```

### 4. No Implementation Before Tests

Strict rule:

If there is no failing test, do not write code.

### 5. Refactor Only When Green

- All relevant tests must pass before refactoring.
- Refactoring must not change behavior.

### 6. Use Domain Language in Tests

Prefer domain-specific names:

- `lead`
- `inquiry`
- `contactSubmission`
- `emailProviderResult`

Avoid vague names:

- `data`
- `payload` when a more specific term is possible
- `info`

## Example Workflow

### Step 1. Write a failing test

```js
test('rejects invalid email', () => {
  expect(validateEmail('bad-email')).toBe(false);
});
```

### Step 2. Implement minimal code

```js
export function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}
```

### Step 3. Run tests

```sh
npm test
```

### Step 4. Refactor if needed

Improve readability or reuse without changing behavior.

## Suggested Tooling For This Repo

This project is Astro-based, not Next.js-based, so testing guidance should match the actual stack.

- Test runner: Vitest
- UI testing: Testing Library with jsdom
- API mocking: MSW
- E2E testing: Playwright
- Static and type checks: `astro check`

## Recommended Folder Structure

```text
src/
  components/
    ContactForm.test.ts
  lib/
    validation.ts
    validation.test.ts
  pages/
    api/
      contact.ts
      contact.test.ts
      webhook.ts
      webhook.test.ts
tests/
  setupTests.ts
```

Adjust the structure as shared logic moves into `src/lib` or `src/features`.

## Anti-Patterns To Avoid

- Writing tests after implementation.
- Over-mocking everything.
- Testing internal variables instead of outcomes.
- Large unreadable test files.
- Ignoring failing tests.
- Treating manual browser checks as a substitute for repeatable tests.

## Definition Of Done

A feature is complete when:

- Tests were written first.
- Tests pass.
- Code is clean and refactored.
- Edge cases are covered.
- No new console errors are introduced intentionally.
- UI behavior matches expected trust states.

## Why This Matters For AI Wise Spaces

The platform depends on reliability:

- Businesses rely on contact submissions working.
- Lead notifications must send correctly.
- Webhook events must be captured safely.
- Errors must be clear, logged, and recoverable.

TDD gives the team:

- Fewer production bugs.
- Faster iteration.
- Clearer behavior contracts.
- More confidence when scaling AI visibility and lead-capture systems.