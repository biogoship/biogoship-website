# Bio-GO-SHIP

Public site for [Bio-GO-SHIP](https://biogoship.org): plankton observations collected with GO-SHIP hydrographic sections.

Live preview: [biogoship.github.io/biogoship-website](https://biogoship.github.io/biogoship-website/)

This is a static site. Posts, team, cruises, publications, FAQ, and homepage photos live in markdown. Day-to-day edits happen in **Pages CMS**, not in code.

Started from [Astro Stardrive](https://github.com/peltmonger/stardrive). Built with Astro, TypeScript, Tailwind, and GitHub Pages. A push to `main` deploys.

## Editing content (Pages CMS)

Use this for posts, team, cruises, publications, FAQ, and homepage photos. You do not need Node or a local clone.

1. Be a **collaborator with write access** on `biogoship/biogoship-website`. Without that, Pages CMS can show the project but cannot save.
2. Open [Pages CMS](https://app.pagescms.org/), sign in with GitHub, and pick this repo. Collections come from [`.pages.yml`](./.pages.yml).

| Collection   | What you edit                                               | Page           |
| ------------ | ----------------------------------------------------------- | -------------- |
| Posts        | News / blog entries                                         | `/posts`       |
| Team         | Name, role, affiliation, photo, bio (USA or International)  | `/team`        |
| Cruise plans | Title, date, caption, photo, writeup, map pins, cruise line | `/cruises`     |
| Publications | Citation fields and optional notes                          | `/publications`|
| FAQ          | Question, category, answer                                  | `/faq`         |
| Homepage photos | Photo, alt text, order                                   | Home carousel  |

Open an item, fill the fields, attach a photo if needed, save. Pages CMS commits to GitHub. After Actions finishes, the live site updates.

Mark something **draft** to keep it in the repo without showing it on the site.

**Images** are attached on the item (post, cruise, team member, homepage photo). There is no Images library in the CMS sidebar. Do not rearrange files in GitHub after they are attached unless you also update the path in the markdown. Dropping a file into a folder does not add it to the homepage. Use **Homepage photos** in Pages CMS.

Leave code for new page types, nav, styling, favicons, `.pages.yml`, and site-wide copy (`src/pages/`, `theme.config.ts`).

## Run locally (code / layout)

Only for pages, styling, or config. Not for Posts, cruises, publications, and so on.

You need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) **22.12+**.

```sh
git clone https://github.com/biogoship/biogoship-website.git
cd biogoship-website
npm install
npm run dev
```

Astro prints a local URL (usually `http://localhost:4321`). The site reloads when you save.

```sh
npm run build      # production build into dist/
npm run preview    # serve that build
npm run check      # Astro, TypeScript, ESLint, Prettier
git pull           # before you start, if others or Pages CMS have committed
```

## Dependabot

[`.github/dependabot.yml`](./.github/dependabot.yml) opens PRs. Nothing deploys until you merge.

- **One weekly PR** for npm minor and patch updates. Merge it.
- **Majors** (TypeScript 6 → 7, and the like) get their own PR. Close those unless you are ready to upgrade. Being a version behind is fine here.
- **GitHub Actions** get one monthly PR. Merge it.

If you close the weekly grouped PR without merging, Dependabot just opens it again.

Turn on **Dependabot alerts** and **Dependabot security updates** under Settings → Code security if you want the vulnerability emails. Those are repo settings, not the yaml file.

There is no server or database. Most `npm audit` noise is build-only tooling. The ones that matter are packages that ship to the browser (`leaflet`) and `astro` (it fetches remote images at build time).

## Other notes

[`.gitattributes`](./.gitattributes) forces LF. If `npm run check` floods with `Delete ␍`, a Windows checkout picked up CRLF.

Now and then, bump Node in [`deploy.yml`](./.github/workflows/deploy.yml) and `engines` in `package.json` when a version goes EOL. Compare [Stardrive releases](https://github.com/peltmonger/stardrive/releases) to `stardriveVersion` in `package.json` if you want upstream fixes.

## License

MIT. See [LICENSE.txt](LICENSE.txt).
