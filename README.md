# Personal Website

A minimal static landing page for [GitHub Pages](https://pages.github.com/). Fork or clone this repo, edit a single config file, and deploy your own site.

## Getting started

1. **Use this repo**
   - **Fork** it on GitHub, or **clone** it locally:
     ```bash
     git clone https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
     cd YOUR_USERNAME.github.io
     ```
2. **Personalize** — see [Customize](#customize) below.
3. **Deploy** — see [Deploy to GitHub Pages](#deploy-to-github-pages) below.

## Customize

Most content is driven by `js/config.js`. Update:

- Name, tagline, location, and timezone
- Profile links (LinkedIn, employer, Google Scholar, portfolio, email, etc.)
- Typing animation phrases
- Countries visited on the world map (ISO 3166-1 alpha-3 codes)

For the page title and search/social preview text, also edit the `<title>` and `<meta name="description">` tags in `index.html`.

Styles live in `css/style.css` if you want to adjust colors or layout.

## Local preview

From the project root:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Deploy to GitHub Pages

For a user site at `https://YOUR_USERNAME.github.io`, create a repository named **`YOUR_USERNAME.github.io`** (it must match your GitHub username exactly).

Push your changes:

```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_USERNAME.github.io.git
git add .
git commit -m "Add personal website"
git push -u origin main
```

Then in the repo: **Settings → Pages → Build and deployment**

- Source: **Deploy from a branch**
- Branch: **main** / **/ (root)**

The site is usually live within a few minutes at **https://YOUR_USERNAME.github.io**.
