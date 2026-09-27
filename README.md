# DemClubs Bylaws Builder

A bilingual, privacy-first tool for San Diego County Democratic clubs to audit existing bylaws or produce a complete working draft from recorded governance decisions. The existing DemClubs landing page remains at `/`; the builder is published at `/bylaws/`.

## What is included

- Deterministic 28-decision questionnaire with English and Spanish output
- Introductory overview, editable recommended-language alternatives, and live draft impact
- Existing-bylaws audit for text-based PDF, DOCX, TXT, or pasted text
- Device-only project storage and portable JSON project files
- DOCX and Markdown bylaws export plus a separate readiness report
- Optional, explicit-consent enhanced review through a server-side Netlify Function
- Reproducible aggregate analysis of every publicly linked club bylaws document

The tool is educational drafting assistance. It does not provide legal advice or County Party approval.

## Local development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm test
npm run build
npm run research
```

`npm run research` reads the official public club directory and linked documents. It stores retrieval metadata, hashes, and aggregate topic matches in `research/`; it does not retain the source bylaws text.

## Netlify

The repository is configured by `netlify.toml`: build command `npm run build`, publish directory `dist`, and functions directory `netlify/functions`. The build preserves the original landing-page assets at the site root and emits the Vite application beneath `dist/bylaws/`.

The site works without any environment variables. To enable enhanced review, set `OPENAI_API_KEY` in Netlify and optionally set `OPENAI_MODEL`. Review requests require explicit consent, are limited to 45,000 characters, use the Responses API with `store: false`, and never expose the API key to the browser.

For `demclubs.org`, attach the domain to the Netlify site and configure DNS using the values Netlify provides for that site. Keep the apex and `www` behavior explicit in Netlify’s domain settings.

## Sources and methodology

- [San Diego County Democratic Party club directory](https://www.sddemocrats.org/clubs.html)
- [County Party club resources](https://www.sddemocrats.org/resources.html)
- [SDCDP Bylaws](https://docs.google.com/document/u/0/d/1n47aKUdh-cEpVpC7N_-2_w5dCZZxz255/)
- [SDCDP Policies and Procedures](https://docs.google.com/document/u/0/d/1xtEULc3GuBF_zxGOwzMUj4u4dL0LZiJF/)
- [California Democratic Party Bylaws & Rules — October 2025](https://cadem.org/wp-content/uploads/2026/02/CDP-BYLAWS-October-2025-FINAL.pdf)
- SDCDP Manual for Democratic Clubs model bylaws (Appendix A, November 21, 2015)
- [Published 2026 chartered-clubs sheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vTK6eJsO_TeNWWHjY26LgV-OijUmdtK5STsKWvZCZlJQcG5-9cqXmdSuf_XuIBZzcAS9FPWfx_DGk2F/pubhtml?gid=2054796545&single=true)

Keyword coverage establishes that a topic appears; it does not establish legal sufficiency, internal consistency, or current adoption. See `research/README.md` and `research/corpus-summary.json` for aggregate results and per-link retrieval status.
