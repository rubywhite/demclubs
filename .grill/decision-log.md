# DemClubs decision log

## Intent

Build a public, bilingual workspace that helps a club audit existing bylaws or create a complete new draft.

## Constraints

- San Diego County launches first, with extensible jurisdiction profiles.
- No accounts; projects stay on the current device.
- AI is optional and document transmission requires explicit consent.
- Output includes editable DOCX and Markdown bylaws plus a separate recommendations report.
- Public research is aggregate; clubs are not ranked or individually graded.
- The product displays a readiness profile rather than an overall score.
- Netlify hosts demclubs.org.

## Key decisions

- Deterministic rules and clause modules are authoritative; AI may ask follow-ups or suggest wording.
- English and Spanish are first-class working and export languages.
- Uploaded text-based PDF, DOCX, TXT, and pasted text are supported; OCR is deferred.
- The San Diego rule pack distinguishes county requirements, safeguards, common practice, and preferences.
- A working draft may contain visible unresolved markers; a review-ready label requires all mandatory decisions resolved.

## Surfaced assumptions

- County-party governing documents outrank patterns in individual club bylaws.
- The 53 linked documents may include inaccessible or obsolete sources; retrieval failures are reported rather than silently excluded.
- The installed Codex skills guide development but do not run inside the deployed application.
- A strong educational-use disclaimer is the release safeguard; formal legal or party approval is not a v1 gate.

## Out of scope for v1

- Authentication, shared editing, server-side project storage, OCR, and direct Google Drive editing.
- Public club-by-club scores or republication of complete third-party bylaws.
- Automatic adoption or filing workflows.
