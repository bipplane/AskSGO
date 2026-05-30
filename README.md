# AskSGO

Static multilingual senior-schemes finder for Singapore seniors and caregivers.

## Run locally

```bash
python -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Validate

```bash
npm run validate
```

Validation checks JavaScript syntax, i18n JSON, required files, official SGO-only asset usage, source-link allowlist, and absence of generated-image references.

## Deploy on Netlify

Netlify can deploy this repo as a static site.

- Build command: `npm run build`
- Publish directory: `.`
- Node version: `20`

These settings are already encoded in `netlify.toml`.

## Supervisor Review

The landing screen includes a `Supervisor review guide` button. It summarizes:

- SGO goal alignment
- policy accuracy guardrails
- senior UX choices
- privacy/no-storage behavior
- Netlify deployment readiness
- official asset-only rule

## Accuracy Notes

Information was checked against official sources on 30 May 2026. The app is an eligibility guide, not final approval. CPF, IRAS, Singpass, medical disability assessments, and household checks can change outcomes.
