# Bio-GO-SHIP

Public website for the [Bio-GO-SHIP](https://biogoship.org) program: plankton observations collected with GO-SHIP hydrographic sections.

This is a static site. Content (posts, team, cruises, publications, FAQ) lives in markdown files in the repo. Most day-to-day edits happen in **Pages CMS**, not in code.

Preview: [biogoship.github.io/biogoship-website](https://biogoship.github.io/biogoship-website/)

## Tech stack

| Piece                                         | What it is                                                |
| --------------------------------------------- | --------------------------------------------------------- |
| [Astro](https://astro.build/)                 | Site framework (pages, layouts, build)                    |
| [TypeScript](https://www.typescriptlang.org/) | Typed JavaScript                                          |
| [Tailwind CSS](https://tailwindcss.com/)      | Styling                                                   |
| Markdown content collections                  | Posts, team, cruises, publications, FAQ                   |
| [Pages CMS](https://pagescms.org/)            | Browser editor that commits markdown and images to GitHub |
| GitHub Pages                                  | Hosting. A push to `main` builds and deploys              |

The project started from the [Astro Stardrive](https://github.com/peltmonger/stardrive) boilerplate and has been adapted for this site.

## Editing content (Pages CMS)

Use this for posts, team members, cruise plans, publications, and FAQ answers. You do **not** need to install Node or clone the repo for those edits.

### Access

1. You must be a **collaborator with write access** on this GitHub repository (`biogoship/biogoship-website`). Ask a repo admin to add you as an editor if you cannot see or save changes.
2. Open [Pages CMS](https://app.pagescms.org/) and sign in with GitHub.
3. Select this repository. The collections come from [`.pages.yml`](./.pages.yml) at the repo root.

If you are not an editor on the repo, Pages CMS can show the project but **cannot save**. GitHub will reject the commit.

### How to add or edit

In Pages CMS, pick a collection:

| Collection   | What it updates                                             | Shows up on                                    |
| ------------ | ----------------------------------------------------------- | ---------------------------------------------- |
| Posts        | News / blog entries                                         | `/posts`                                       |
| Team         | Name, role, affiliation, photo, bio                         | `/team` (set **Team** to USA or International) |
| Cruise plans | Title, date, caption, photo, writeup, map pins, cruise line | `/cruises`                                     |
| Publications | Citation fields and optional notes                          | `/publications`                                |
| FAQ          | Question, category, answer                                  | `/faq`                                         |

Create or open an item, fill the fields, add a photo if needed, and save. Pages CMS commits to GitHub. After GitHub Actions finishes, the live site updates.

Set **draft** if something should stay in the repo but not appear on the site yet.

### Images

Uploads go into `src/images/content/`. When you attach a photo to a post, cruise, or team member, the CMS writes that path into the markdown file. **Do not drag or move images between folders in the Media library** after they are attached — the page still looks up the original path, so the photo will break. Leave files where the upload put them. Folder cleanup is a repo change (move the file and update the path in the markdown).

## Run locally (code / layout)

Use this when you need to change pages, styling, or configuration, NOT for adding or editing Posts, Cruise Plans, Publications, etc.

### What you need

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) **22.12 or newer** (this also installs `npm`)

Confirm:

```sh
node -v
npm -v
```

### Install and run

```sh
git clone https://github.com/biogoship/biogoship-website.git
cd biogoship-website
npm install
npm run dev
```

Astro prints a local URL (usually `http://localhost:4321`). Open it in a browser. The site reloads when you save files.

Other commands:

```sh
npm run build      # production build into dist/
npm run preview    # serve that build locally
npm run check      # Astro, TypeScript, ESLint, Prettier
```

Pull before you start work if others (or Pages CMS) have been committing:

```sh
git pull
```

## What belongs where

| Kind of change                                              | Where                                  |
| ----------------------------------------------------------- | -------------------------------------- |
| Post, team, cruise, publication, FAQ text and photos        | Pages CMS                              |
| New page types, navigation, styling, favicons, `.pages.yml` | Clone the repo and edit in code        |
| Legal notice / privacy copy, site-wide config               | Code (`src/pages/`, `theme.config.ts`) |

## Maintenance

[`.github/dependabot.yml`](./.github/dependabot.yml) opens dependency update PRs: one grouped PR a week for npm minor and patch bumps, majors on their own, GitHub Actions monthly. It only opens PRs. Nothing merges or deploys until you merge it.

Enable **Dependabot alerts** and **Dependabot security updates** under Settings → Code security. Those are repo settings rather than part of the config file, and they're what sends the vulnerability emails.

Grouped PRs: check the build passed, merge. Major bumps are worth building first, since majors can break things:

```sh
git fetch origin && git checkout <dependabot-branch>
npm ci && npm run build
```

Closing a major-bump PR is fine. Staying a version behind rarely matters here.

### Security alerts

Most advisories land on `devDependencies`, which only process files from this repo at build time. The ones worth acting on quickly are packages that ship to the browser (`leaflet`) and `astro` itself, since it fetches remote images during the build. There's no server or database, so a lot of advisory categories don't apply.

If `npm audit` says "No fix available", some package is usually pinning its dependencies to exact versions and blocking the patch. Find it with `npm ls <package>`, then look at `npm view <that-package> dependencies` for versions with no `^`. Removing the offender tends to be cleaner than an `overrides` block in `package.json`, which is easy to add and easy to forget. That's why `astro-compress` is gone; see `droppedFeatures` in [`theme.config.ts`](./theme.config.ts).

### Line endings

[`.gitattributes`](./.gitattributes) forces LF. Without it, Windows checkouts get CRLF and Prettier reports an error on every line of every file. If `npm run check` ever floods with `Delete ␍`, that's the cause.

### Every so often

Bump Node in [`deploy.yml`](./.github/workflows/deploy.yml) and `engines` in `package.json` as versions reach end-of-life, and compare [Astro Stardrive releases](https://github.com/peltmonger/stardrive/releases) against `stardriveVersion` in `package.json` for upstream fixes.

## License

MIT. See [LICENSE.txt](LICENSE.txt).
