# General information and guidelines for AI agents

## What this repository is

This is the public website for the **Bio-GO-SHIP** program. It started from the [Astro Stardrive](https://github.com/peltmonger/stardrive) boilerplate, but the boilerplate setup flow is finished and its demo content has been removed. Treat this as a normal project: adjust and extend it to the user's specifications.

The only remaining guide in `./.ai/` is [`FAVICON_GUIDE.md`](./.ai/FAVICON_GUIDE.md), which is still open. Read it when (and only when) working on the favicon or web manifest.

## This is an Astro project

Validate whether you are connected to the Astro Docs MCP server (https://mcp.docs.astro.build/mcp).
If not, connect to it, or ask the user to add the config, if you are not allowed to do it directly.
See https://docs.astro.build/de/guides/build-with-ai/#installation for guidance.

## Further tech stack

- Astro
- Vite
- TypeScript
- JavaScript
- TailwindCSS
- ESLint
- Prettier
- GitHub Pages (deployed via the workflow in `./.github/workflows/deploy.yml`)
- Additional things that got added after the initial setup of this project

## General guidelines

The following guidelines are specific to this setup and always need to be respected.
They extend any existing general Agent guidelines, profiles, or skills.

- The [`package.json`](./package.json) holds all information about available scripts and dependencies.
- Astro is a **frontend** framework (static + optional on-demand SSR). Never store secrets or backend logic here. Sensitive work belongs in a real backend service.
- Use svg files alwas as components and never via Astro's <Image> component. The latter one would break in some cases.
- Always mind accessibility (create proper aria-labels, use semantic tags, consider keyboard + mouse + touch navigation, consider contrast colors when working with text).
- Always try to use what is native to Astro and can be found in its documentation, before creating own logic.
- Astro comes with an [Island Architecture](https://docs.astro.build/en/concepts/islands/), which means that you can also create dynamic components with React, Vue, Svelte, or SolidJS. However, they add a lot of complexity, so try to avoid it. Decision tree (use what fits first):
  1. Can the functionality by achieved with Astro defaults or existing HTML?
  2. Would it be <50 lines with VanillaJS?
  3. Ask the user whether React, Vue, Svelte, or SolidJS is prefered for more complex things.
- Several boilerplate features have been dropped. They are listed in `droppedFeatures` in [`theme.config.ts`](./theme.config.ts). If you plan to build one of them, first look at the [official repository](https://github.com/peltmonger/stardrive) and ask the user whether restoring the original files is preferable to building from scratch.
- In case you want to upgrade the Astro Stardrive boilerplate, you can manually check the changes at the [official repository's releases](https://github.com/peltmonger/stardrive/releases) and compare it to the local version. The local Stardrive version is pinned in the package.json under the key `stardriveVersion`. Update this number after your manual upgrade as well.
- Before implementing:
  - State your assumptions explicitly. If uncertain, ask.
  - If multiple interpretations exist, present them - don't pick silently.
  - If a simpler approach exists, say so. Push back when warranted.
  - If something is unclear, stop. Name what's confusing. Ask.
- Simplicity First. Minimum code that solves the problem. Nothing speculative. When working on a new project, try to stay as close as possible to what the boilerplate ships with - this also applies to structure.
- Styling: follow the same conventions and patterns that you detect in the surrounding code. Run `npm run check` to check and lint everything or pick a more specific linter. Run `npm run fix` to fix everything (astro, eslint, prettier) or pick a more specific script.

## Deciding: component vs. inline in the page

Keep markup inline in the page by default. Extract a component into `./src/components/` only when at least one of these is true:

- **Reuse:** the same block is needed on more than one page.
- **Size/complexity:** the block is a large, self-contained design element with its own logic or state, and lifting it out makes the page readable.
- **Clear responsibility:** the block is a reusable design primitive (callout, step, accordion, tabbed code, …) that other pages will plausibly want.

Do not create a component for a one-off snippet, and do not over-split into tiny atoms - this repo intentionally keeps components coarse (see the structure notes in the `README.md`). Group related components in a topical subfolder (e.g. `./src/components/protocols/`).

When a component only styles slot-provided prose (links, inline code, lists), prefer a shared CSS file in `./src/styles/` (imported via the `@styles/...` alias in the component frontmatter) over repeating the same scoped `<style>` block in every component.

Note on scoped `<style>` + Tailwind: inside an Astro `<style>` block, the Tailwind `@reference` directive must use a **relative** path (e.g. `@reference "../../styles/tailwind.config.css";`), not the `@styles/...` alias. The alias only resolves in JS/TS `import` statements, not in the CSS `@reference` context.

## This site is single-locale

The multi-language scaffolding (`./src/pages/[lang]/`, the `de`/`es`/`fr` translation files, hreflang tags, and the language selector) has been removed. Only `en` remains in `themeConfig.i18n`, and all routes live directly under `./src/pages/`.

Keep using `useTranslations` and `./src/i18n/en.json` for UI strings - that is how the existing pages read their copy, and it keeps the door open if another locale is added back later. Do not reintroduce `[lang]` routes without asking first.

> [!TIP]
> When hard-coding large code samples in a page's frontmatter that themselves contain a line that is literally `---` (e.g. YAML frontmatter examples in a template literal), build that fence from a constant (`const fence = "---"; ... \`${fence}\n...\n${fence}\``). A bare `---` line inside the script block is otherwise mistaken for the closing fence of the Astro component's own frontmatter and breaks parsing.
