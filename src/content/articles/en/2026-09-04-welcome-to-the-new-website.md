---
title: Welcome to the new Bio-GO-SHIP website
publishDate: 2026-10-23
excerpt: How this site is put together, what each page is for, and how to edit
  content in Pages CMS.
author:
  name: Bayden Willms
  url: https://www.linkedin.com/in/bayden-willms/
draft: false
featured: true
categories:
  - news
  - announcements
tags:
  - go-ship
  - education
---
Welcome to the new public site for Bio-GO-SHIP, where the program has a place for news, team members, cruises, papers, protocols, and data links. If you have write access to the GitHub repo, you can update most of that yourself. I've built this website so it is easy to edit and add content without interacting with any code. 

## How to edit content

Edits can easily be made in [Pages CMS](https://app.pagescms.org/). Sign in with GitHub and open this repository (`biogoship/biogoship-website`). ***You need to be a collaborator with write access or GitHub will reject the save.***

In the CMS, pick a collection, open or create an item, fill the fields, and save. PagesCMS will push a commit to the GitHub repository and run a job to add the edits to the live website. Edits are usually live in less than a minute.

Use **draft** if something should stay in the repo but not appear on the site yet.

- **Posts** can have categories and tags. If the one you want is missing, add it under **Post categories** or **Post tags** first, then select it on the post.
- **Images** upload into `src/images/content/`. After a photo is attached, do not drag it to another folder in the Media library. The page still looks up the original path, so the image will break.
- Layout, navigation, and new page types are code changes. Those are not edited in Pages CMS.

## Website pages

**Home.** The landing page: what Bio-GO-SHIP measures, why it sits alongside GO-SHIP, recent content updates, and a map of all cruise locations. 

**Team.** Edit names, roles, affiliations, photos, and bios in the **Team** collection.

**Posts.** The feed where you found this post. Categories can be used to filter the list of posts. Click on each post to view. Add entries in **Posts**.

**Publications.** The paper list. Title, authors, year, source, DOI or URL, and optional notes live in **Publications**.

**Data.** Links out to the archives we point people to (NCEI, CCHDO, SeaBASS, BCO-DMO, OBIS, etc) with a data table to help navigate. 

**Cruises.** Planned and past lines. Each cruise can have a date, caption, photo, writeup, map pins, and a track line. Edit those in **Cruise plans**.

**Protocols.** Sample-type overview and downloadable method files. Add a title, short description, category, and a PDF or Word file (upload or external URL) in **Protocols**.

**FAQ.** Short answers grouped by category. These can be edited in the **FAQ** section.

**Contact.** How to reach the program and a GitHub issues link for site problems. The emails on that page are still placeholders.

If something here is wrong or a page is missing what you need, open a GitHub issue or tell me and we can change it.

- From: Bayden Willms, Research Engineer / Software Developer at Mississippi State University (Northern Gulf Institute), at NOAA AOML (Atlantic Oceanographic and Meteorological Laboratory) MCB group (Molecular and Computational Biology). 

