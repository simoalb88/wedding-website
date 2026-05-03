# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static wedding website for Emily & Simo (July 24, 2026, La Rampolina, Stresa, Italy). No build system — plain HTML, CSS, and vanilla JS. Open any `.html` file directly in a browser to preview.

## Architecture

**Pages:** `index.html`, `our-story.html`, `travel.html`, `things-to-do.html`, `registry.html`, `faqs.html`, `rsvp.html`, `password.html`

Every page (except `password.html`) loads `auth.js` as the first `<script>` in `<head>`, then `styles.css`, and `clink.js` just before `</body>`.

**Auth flow:** `auth.js` is a self-invoking function that checks `sessionStorage` for `wedding_authenticated === 'true'`. If absent, it immediately redirects to `password.html`. The password page hashes input with SHA-256 via the Web Crypto API and compares against a stored hash — the plaintext password is never in the code.

**RSVP backend:** The RSVP page calls a **Google Apps Script** deployed as a web app. The script source is `google-apps-script-updated.js` — this file is not executed locally; changes must be manually copy-pasted into the Google Apps Script editor and redeployed. The script reads/writes a Google Sheet (ID in `SHEET_ID` constant) where the guest list lives. Guest lookup is by first+last name match; plus-ones are stored as columns on the primary guest's row.

**Styling:** Single `styles.css` shared by all pages. CSS custom properties at `:root` define the two main colors (`--beige`, `--dark-blue`). Custom fonts (`Breezeblocks`, `Radiograph`, `MrsEaves`, `Modernist`) are loaded via `@font-face` from local font files.

**Clink effect:** `clink.js` attaches a document-level click listener that spawns an animated champagne glass + sparkles at every click position.

## Patterns to Follow

**Adding content to an existing page:** Use the `.section-card` pattern — a `<div class="section-card">` containing a `.section-label` (small caps subtitle), an `<h2 class="section-title">` (Radiograph font heading), then `<p>` tags. See `travel.html` for examples.

**Adding a new page:** Copy the header/footer/nav block from any existing page. Add `<script src="auth.js"></script>` as the first element in `<head>` and `<script src="clink.js"></script>` before `</body>`. Add the page link to the `<nav>` in every other page.

**Inline page scripts** (like the RSVP logic) go in a `<script>` block just before `clink.js`.

## RSVP / Google Apps Script

- The deployed Apps Script URL is hardcoded in `rsvp.html` as `API_URL`
- Guest data starts at row 7 of the sheet (`DATA_START_ROW`); columns A/B = first/last name, K = RSVP response, L/M = plus-one first/last name
- After editing `google-apps-script-updated.js`, redeploy from the Google Apps Script editor as a new deployment (or update the existing one) — the URL may change and must be updated in `rsvp.html`

## Deployment

The site is hosted via GitHub Pages (or similar static host) from this repo. Push to `main` to deploy:

```bash
git add <files>
git commit -m "description"
git push
```
