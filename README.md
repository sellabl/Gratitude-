# Gratitude Giving Foundation: website redo

A static rebuild of gratitudegivingfoundation.org. The layout follows the NGO Framer template (ngo-template.framer.website). The colors, text, photos and links come from the foundation's current site.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `about.html` | Who are we? (mission, pillars, team bios, 6 causes) |
| `projects.html` | Current Projects (each card opens the full project write-up) |
| `faq.html` | FAQ |
| `contact.html` | Contact + survey for foundations |
| `es/index.html`, `es/about.html`, `es/projects.html`, `es/faq.html`, `es/contact.html` | Spanish version of each page (same names, inside `es/`) |

### Languages

The site is bilingual. English pages are in the root, Spanish pages are in `es/`. Every page has an **EN | ES** switch in the header that opens the same page in the other language. Both versions share the same `assets/` folder, so photos, styles and scripts are not duplicated. The page language comes from `<html lang>`, and `assets/js/main.js` uses it for the few texts written by script (menu button labels and the contact form message).

When changing wording, edit both versions. Text is written directly in each HTML file (the Spanish copy mirrors the English one section by section).

The site is plain HTML, CSS and JS with no build step and no dependencies. Fonts (Nunito Sans and Fraunces, SIL OFL) are self-hosted in `assets/fonts`.

## Preview

```bash
# from the repo root
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Upload the contents of this repo to the web root of any static host, for example Netlify, Vercel, Cloudflare Pages or the current hosting's `public_html`.

## Spanish version

Open `es/index.html`, or use the **ES** button in the header. On a deployed site it lives at `/es/`.

Once the final domain is live, add `hreflang` links so search engines pair the two versions. In the `<head>` of each English page add `<link rel="alternate" hreflang="es" href="https://YOUR-DOMAIN/es/PAGE.html">` and `hreflang="en"` for the root page. Do the reverse in the Spanish pages.

## Brand colors

The color variables are at the top of `assets/css/styles.css`:

- `--crimson #e21e51`: primary accent (buttons, highlights)
- `--navy #040037`: dark sections and text
- `--violet #4d40ff`: focus states
- `--slate #514d7c`: secondary text
- `--lavender`, `--mist`, `--snow`: light tints

## To confirm with the client

- **Email.** The old site shows `contact@gratitudegivingfoundation.org`, but its email link actually goes to `gratitudegivingfoundation@gmail.com`. The contact page also misspells the address as "gratitudgiving…". The new site uses `contact@…` everywhere, so check that this inbox receives mail.
- **Contact form.** The form has no server. It opens the visitor's email app with the message filled in. To receive submissions directly, connect it to Formspree, Netlify Forms or a similar service.
- **Instagram.** The link points to a single post (`/p/CyM9iSHOB53/`), not the profile. Swap in the profile URL.
- **Past dates.** The NGO Sustainability Forum (Feb 27, 2025) and the photo contest (Apr–Aug 2025) are past. They are kept as on the old site. The Bingo Brunch Bazar text no longer says "see you in November 2025".
- **Deeper pages not rebuilt.** The old site's per-country Vistiendo Sueños pages and the Cambiando mentes sub-pages are not rebuilt. Their content is summarized in the project pop-ups.
- **Spanish wording.** The Spanish text is a new translation, not taken from the old site, which only has English text and Spanish project names. Please have a Spanish speaker on the team read it before launch. Job titles use neutral forms ("Presidencia", "Dirección de…", "Equipo voluntario") because the bios do not state each person's gender. Jackie Bunuelos is shown as "Embajador/a" for the same reason. Swap in the preferred form if known.
- **Project names.** The Spanish page uses "Direcciona tu futuro" and "Conectando mi mente con el lente". These are translations of the English names on the old site. Confirm the official Spanish names.
