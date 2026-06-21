# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static wedding website for Emily & Simo (July 24, 2026, La Rampolina, Stresa, Italy). No build system — plain HTML, CSS, and vanilla JS. Open any `.html` file directly in a browser to preview.

## Architecture

**Pages:** `index.html`, `our-story.html`, `travel.html`, `things-to-do.html`, `registry.html`, `faqs.html`, `schedule.html`, `welcome.html`. (`rsvp.html` and `aperitivo/index.html` are now thin redirects to `schedule.html`.)

Every gated page loads `auth.js` as the first `<script>` in `<head>`, then `styles.css`, then `lang.js` (deferred), and `clink.js` just before `</body>`. `welcome.html` is the entry page and does NOT load `auth.js`.

**Auth / identity flow:** Entry is a **name lookup**, not a password. `welcome.html` takes first + last name, calls the Apps Script `profile` action, and stores the returned guest profile as JSON in `sessionStorage['wedding_guest']`. `auth.js` checks for that profile; if absent it redirects to `welcome.html`. The profile holds the guest's per-event invite/RSVP status and plus-one, and is read by `schedule.html` and the home greeting (no extra API calls).

**Bilingual (EN/IT):** `lang.js` holds the full translation dictionary and engine. Elements use `data-i18n="key"` (swaps innerHTML) or `data-i18n-ph="key"` (placeholder). Preference saved in `localStorage['wedding_lang']`. `WeddingLang.t(key)` / `WeddingLang.tf(key, {vars})` are used by inline scripts; a `langchange` event fires on toggle so dynamic pages (schedule) re-render.

**Events / RSVP backend:** `schedule.html` is a personalized itinerary — it reads the cached profile and renders only the events the guest is invited to (Lunch if Col Q=TRUE, Aperitivo if Col O=TRUE, Wedding if Col K=Y), each with a status chip and an inline per-event RSVP. It calls a **Google Apps Script** (`google-apps-script-updated.js`, source-only — copy into the Apps Script editor and redeploy). Actions: `profile` (full guest lookup) and `rsvpEvent` (per-event write). The script reads/writes a Google Sheet (`SHEET_ID`); guest lookup is by first+last name; plus-ones are separate rows with their own per-event flags.

**Styling:** Single `styles.css` shared by all pages. CSS custom properties at `:root` define the two main colors (`--beige`, `--dark-blue`). Custom fonts (`Breezeblocks`, `Radiograph`, `MrsEaves`, `Modernist`) are loaded via `@font-face` from local font files.

**Clink effect:** `clink.js` attaches a document-level click listener that spawns an animated champagne glass + sparkles at every click position.

## Patterns to Follow

**Adding content to an existing page:** Use the `.section-card` pattern — a `<div class="section-card">` containing a `.section-label` (small caps subtitle), an `<h2 class="section-title">` (Radiograph font heading), then `<p>` tags. See `travel.html` for examples.

**Adding a new page:** Copy the header/footer/nav block from any existing page. Add `<script src="auth.js"></script>` as the first element in `<head>` and `<script src="clink.js"></script>` before `</body>`. Add the page link to the `<nav>` in every other page.

**Inline page scripts** (like the RSVP logic) go in a `<script>` block just before `clink.js`.

## RSVP / Google Apps Script

- The deployed Apps Script URL is hardcoded as `API_URL` in `welcome.html` and `schedule.html`
- Guest data is rows 7–129 (`DATA_START_ROW`/`DATA_END_ROW`). Columns (0-based): A/B(0/1) names, K(10) wedding RSVP, L/M(11/12) plus-one names, O(14) aperitivo invited, P(15) aperitivo RSVP, Q(16) lunch invited, R(17) lunch RSVP. Invite flags are TRUE/FALSE; RSVPs are Y/N.
- After editing `google-apps-script-updated.js`, redeploy by **updating the existing deployment** (Manage deployments → edit → new version) so the URL stays the same. **A redeploy is required before the new `profile`/`rsvpEvent` actions work** — without it, the name-lookup entry will fail for everyone.

## Deployment

The site is hosted via GitHub Pages (or similar static host) from this repo. Push to `main` to deploy:

```bash
git add <files>
git commit -m "description"
git push
```
