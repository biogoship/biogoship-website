---
title: Welcome to the new Bio-GO-SHIP website
publishDate: 2026-09-04
excerpt: How this site is put together, what each page is for, and how to edit content in Pages CMS.
draft: false
featured: true
categories:
  - news
  - announcements
tags:
  - go-ship
  - education
author:
  name: Bayden Willms
---

This is the new public site for Bio-GO-SHIP. I built this first version so the program has a place for news, people, cruises, papers, protocols, and data links. If you have write access to the GitHub repo, you can update most of that yourself.

## How to edit content

Day-to-day edits happen in [Pages CMS](https://app.pagescms.org/). Sign in with GitHub and open this repository (`biogoship/biogoship-website`). You need to be a collaborator with write access or GitHub will reject the save.

In the CMS, pick a collection, open or create an item, fill the fields, and save. That commits markdown (and any uploaded image) to the repo. After GitHub Actions finishes, the live site updates.

Use **draft** if something should stay in the repo but not appear on the site yet.

A few CMS-specific notes:

- **Posts** can have categories and tags. If the one you want is missing, add it under **Post categories** or **Post tags** first, then select it on the post.
- **Images** upload into `src/images/content/`. After a photo is attached, do not drag it to another folder in the Media library. The page still looks up the original path, so the image will break.
- Layout, navigation, and new page types are code changes. Those are not edited in Pages CMS.

## What each page is for

**Home.** The landing page: what Bio-GO-SHIP measures and why it sits alongside GO-SHIP.

**Team.** People on the program, split into USA and International. Edit names, roles, affiliations, photos, and bios in the **Team** collection. The USA / International setting controls which list they appear on.

**Posts.** This feed. Category pills at the top filter the list. Open a post for the full writeup. Add entries in **Posts**.

**Publications.** The paper list. Title, authors, year, source, DOI or URL, and optional notes live in **Publications**.

**Data.** Links out to the archives we point people to (NCEI, CCHDO, SeaBASS, BCO-DMO, OBIS, and the rest on that page), plus a cruise table.

**Cruises.** Planned and past lines. Each cruise can have a date, caption, photo, writeup, map pins, and a track line. Edit those in **Cruise plans**.

**Protocols.** Sample-type overview and downloadable method files. Add a title, short description, category, and a PDF or Word file (upload or external URL) in **Protocols**.

**FAQ.** Short answers grouped by category. Edit questions and answers in **FAQ**.

**Contact.** How to reach the program and a GitHub issues link for site problems. The emails on that page are still placeholders.

If something here is wrong or a page is missing what you need, open a GitHub issue or tell me and we can change it.
