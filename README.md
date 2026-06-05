# AskSGO

AskSGO is a static, multilingual senior schemes finder for Singapore seniors, caregivers, volunteers, and SGO-style outreach conversations.

<p align="center" height="40%">
  <img width="419" height="595" alt="Screenshot_31" src="https://github.com/user-attachments/assets/861231d6-6c2e-4833-9977-c9b1379b2b38" />

</p>

It asks one plain-language question at a time, then groups relevant schemes into:

- `Likely eligible`
- `May be eligible`
- `Less likely`

AskSGO is a guide, not final approval. Official agencies may still use Singpass, CPF, IRAS, medical disability assessments, property records, household checks, insurer records, and scheme-specific rules.

## Purpose

Singapore senior support schemes are spread across several agencies and care pathways. Seniors and caregivers often need a first-pass view of what is worth checking before they call AIC, visit an Active Ageing Centre, or prepare documents.

AskSGO reduces that first-pass confusion by turning scheme discovery into a short guided flow. It is designed around the Silver Generation Office role of understanding seniors' needs and connecting them to relevant care services, resources, and community support.

## What It Does

- Supports English, Chinese, Malay, and Tamil.
- Uses large font and buttons, and one question per screen, for senior-friendly use.
- Covers age, residency, housing, income, employment, work income, property ownership, home Annual Value, birth cohort, citizenship timing, CPF-at-55 estimate, health and care needs, care services, caregiver training, migrant domestic worker care, long-term care insurance, MediSave balance, living arrangement, and family/caregiver support.
- Shows why each scheme appears, using short reason text.
- Links each scheme card to an official source.
- Provides direct AIC/SGO call action for support.
- Stores no personal data. Answers stay in browser memory and clear on restart or refresh.
- Runs as a static site. No backend, login, cookies, analytics, or database.

## Covered Schemes And Supports

AskSGO currently covers **24 schemes, benefits, and care supports**:

- [Silver Generation Office / Active Ageing Centre support](https://www.aic.sg/Age-Well/Silver-Generation-Office/About-SGO)
- [Senior Citizen Concession Card](https://www.transitlink.com.sg/concession-cards/)
- [CHAS, Pioneer, or Merdeka clinic subsidies](https://www.chas.sg/)
- [GST Voucher - MediSave](https://www.govbenefits.gov.sg/)
- [Silver Support Scheme](https://www.cpf.gov.sg/member/retirement-income/government-support/silver-support-scheme)
- [Pioneer Generation Package](https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/pioneer-generation-package)
- [Merdeka Generation Package](https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/merdeka-generation-package)
- [Majulah Package - Earn and Save Bonus](https://www.govbenefits.gov.sg/)
- [Workfare Income Supplement](https://www.cpf.gov.sg/service/article/what-is-the-workfare-income-supplement-scheme)
- [ComCare Long-Term or Short-to-Medium-Term Assistance](https://supportgowhere.life.gov.sg/)
- [Home Caregiving Grant](https://www.aic.sg/Financial-Assistance/Home-Caregiving-Grant)
- [Seniors' Mobility and Enabling Fund](https://www.aic.sg/financial-assistance/seniors-mobility-and-enabling-fund-assistive-devices/)
- [SMF - Home Healthcare Items](https://www.aic.sg/Financial-Assistance/Seniors-Mobility-and-Enabling-Fund---Home-Healthcare-Items)
- [Caregivers Training Grant](https://www.aic.sg/financial-assistance/caregivers-training-grant-ctg/)
- [MDW Levy Concession for Persons with Disabilities](https://www.aic.sg/financial-assistance/migrant-domestic-worker-levy-concession)
- [Pioneer Generation Disability Assistance Scheme (PioneerDAS)](https://www.aic.sg/financial-assistance/pioneer-generation-disability-assistance-scheme)
- [Interim Disability Assistance Programme for the Elderly (IDAPE)](https://www.aic.sg/Financial-Assistance/Interim-Disability-Assistance-Programme-for-the-Elderly)
- [CareShield Life claims](https://www.aic.sg/Financial-Assistance/CareShield-Life)
- [ElderShield claims](https://www.aic.sg/Financial-Assistance/ElderShield)
- [MediSave Care](https://www.moh.gov.sg/healthcare-schemes-subsidies/careshield-life)
- [ElderFund](https://www.aic.sg/Financial-Assistance/ElderFund)
- [Healthier SG and chronic-care support](https://www.healthiersg.gov.sg/)
- [AIC care services](https://www.aic.sg/Care-Services)
- [SG60 Vouchers](https://www.govbenefits.gov.sg/)

## Question Flow

The app asks only questions needed for the current path. Conditional questions appear when prior answers make them relevant.

Core signals include:

- age range
- residency
- housing type
- household monthly income per person
- employment and work income
- property ownership
- home Annual Value
- birth cohort and citizenship date
- CPF contribution estimate by age 55
- health, disability, mobility, chronic-care, home-care, and social-isolation needs
- current or desired care services
- caregiver training need
- migrant domestic worker care arrangement
- CareShield Life / ElderShield coverage
- MediSave balance threshold
- living arrangement
- family/caregiver support level

## Accuracy Notes

Information in the app is marked as checked against official sources on 1 June 2026. Scheme rules can change. Use linked official sources for final confirmation.

The app deliberately avoids overclaiming eligibility. Some results are marked `May be eligible` when CPF, IRAS, Singpass, medical assessment, insurer, property, citizenship-date, household, or care-provider details need official verification.

## Use Cases

- Seniors checking which schemes to ask about before calling AIC/SGO.
- Caregivers helping a parent or older relative prepare for a support conversation.
- Community volunteers doing lightweight needs discovery.
- SGO-style outreach demos where privacy and low setup matter.
- Supervisors reviewing whether flow, policy guardrails, and deployment readiness are appropriate.

## Supervisor Review

A hidden `/#supervisor` route includes a compact supervisor review guide. It summarises:

- SGO goal alignment
- policy accuracy guardrails
- senior UX choices
- privacy/no-storage behaviour
- Netlify deployment readiness
- official asset-only rule

## Run Locally

```bash
python -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Validate

```bash
npm run validate
```

Validation checks JavaScript syntax, i18n JSON, required files, official source-link allowlist, SGO logo asset usage, absence of generated-image references, and selectable-button CSS rules so hover/focus/tap feedback cannot look like selected state.

## Deploy On Netlify

Netlify can deploy this repo as a static site.

- Build command: `npm run build`
- Publish directory: `.`
- Node version: `20`

These settings are encoded in `netlify.toml`.

## Project Structure

- `index.html` - static app shell
- `app.js` - question flow, scoring logic, results, and supervisor guide
- `styles.css` - responsive senior-friendly UI
- `data/i18n.json` - multilingual copy and scheme text
- `assets/sgo-logo.svg` - official SGO logo asset
- `scripts/validate.mjs` - build-time checks
