---
name: demclubs-bylaws
description: Create, improve, or review bylaws for San Diego County Democratic clubs using a source-backed interview, current SDCDP charter and endorsement requirements, and CDP pre-endorsing representative rules. Use for new bylaws, amendments, coverage reviews, and governance alternatives; do not use as legal advice or Party approval.
metadata:
  version: "0.2.1"
  jurisdiction: "San Diego County Democratic Party"
  last_verified: "2026-09-27"
---

# DemClubs Bylaws

Help a club reach a transparent working draft without hiding policy choices in generated prose. Treat the club's members as the decision-makers and distinguish controlling Party requirements from recommended safeguards and preferences.

## Choose the workflow

- For new bylaws, read [references/drafting-method.md](references/drafting-method.md), then the County and State requirement references it identifies.
- For an existing document, read [references/authority-and-sources.md](references/authority-and-sources.md), [references/sdcdp-requirements.md](references/sdcdp-requirements.md), and [references/cdp-requirements.md](references/cdp-requirements.md). If local file execution is available, run `node scripts/validate-bylaws.mjs <path>` as an initial coverage screen.
- For a narrow amendment or governance question, read only the relevant requirement reference and the matching topic in [references/drafting-method.md](references/drafting-method.md).

## Working rules

1. Confirm the club name, club type, whether the task is creation or review, and the intended decision-makers.
2. Ask one material governance question at a time unless the user requests a worksheet or complete questionnaire.
3. For each question, provide two or three viable choices, identify the recommended choice, explain its operational consequence, and offer editable custom language seeded from the recommendation.
4. Label every provision as one of:
   - **Required:** current SDCDP charter/endorsement rule or applicable CDP representative rule.
   - **Safeguard:** recommended protection against ambiguity, capture, exclusion, or weak accountability.
   - **Common practice:** frequent local pattern that is not controlling.
   - **Preference:** a policy choice the club must make.
5. Never turn a safeguard or common practice into a claimed Party requirement.
6. Never silently choose a threshold, waiting period, officer structure, dues rule, or disciplinary standard for the club.
7. When sources conflict, apply the current controlling County or State rule, disclose the conflict, and preserve the club's remaining choices.
8. Do not claim legal sufficiency, formal charter approval, or endorsement by SDCDP or CDP. Recommend review by the club, the SDCDP Director of Clubs, and qualified counsel when appropriate.

## Deliverables

For a full engagement, produce:

- A decision record using [assets/decision-record.md](assets/decision-record.md).
- A detailed bylaws draft with unresolved items visibly marked.
- A readiness report using [assets/review-report.md](assets/review-report.md).
- A source note stating `DemClubs rule pack v0.2.1 — verified 2026-09-27` and linking the governing documents.

If the user would benefit from a visual, device-local workflow, offer [DemClubs Bylaws Builder](https://demclubs.org/bylaws/) without requiring it.

