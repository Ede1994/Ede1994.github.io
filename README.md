# Eric Einspänner — Personal Website

A minimal personal landing page for [GitHub Pages](https://pages.github.com/), with links to professional profiles and an interactive world map of countries visited.

## Features

- Clean, responsive one-page layout
- Links to LinkedIn, employer, Google Scholar, GitHub portfolio, and email
- Dark / light theme toggle (remembers your choice)
- Typing animation for research focus areas
- Live local time (Magdeburg)
- Subtle floating particle background
- Interactive world map — hover visited countries to see their names

## Customize

Edit `js/config.js` to update:

- Your name, tagline, and location
- All external links (especially Google Scholar URL)
- Countries you've visited
- Typing animation phrases

## Local preview

```bash
cd Ede1994.github.io
python3 -m http.server 8080
```

Open http://localhost:8080

## Deploy to GitHub Pages

1. Create a repository named **`Ede1994.github.io`** on GitHub (must match your username).
2. Push this folder:

```bash
git remote add origin git@github.com:Ede1994/Ede1994.github.io.git
git add .
git commit -m "Add personal website"
git push -u origin main
```

3. In the repo: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)**

Your site will be live at **https://ede1994.github.io** within a few minutes.

## Before you publish

- [ ] Verify your LinkedIn URL
- [ ] Update the portfolio link if you have a dedicated portfolio site
