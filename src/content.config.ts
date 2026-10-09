import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { themeConfig } from '../theme.config';

const httpUrl = z.url().refine((value) => ['http:', 'https:'].includes(new URL(value).protocol), {
  message: 'Must be an http or https URL',
});

// Collections marked as on-demand in `themeConfig.onDemandRenderedCollections` are
// assumed to be large — that is the only reason to opt out of prerendering. For
// those, we also enable `deferRender` so the glob loader skips
// eager rendering during sync and renders entries on demand instead. This
// trades cached render output for lower memory usage during sync, which is the
// right trade for large collections. See https://astro.build/blog/astro-710/
const onDemandCollections = new Set<string>(themeConfig.onDemandRenderedCollections ?? []);

const articles = defineCollection({
  loader: glob({ pattern: ['**/[^_]**.md'], base: './src/content/articles', deferRender: onDemandCollections.has('articles') }),
  schema: ({ image }) =>
    z.object({
      publishDate: z.date(),
      updateDate: z.date().optional(),
      draft: z.boolean().optional(),
      featured: z.boolean().optional(),
      llmsTxt: z.boolean().optional(), // set true while setting `addArticles` to `selected` in the theme settings, to have this article show up in the llms.txt file
      slug: z.string().optional(), // If you have a lot of articles, we recommend adding a random hash to the md file to prevent duplication. In this case, you can set a nicer slug via this option. Mind that a custom slug needs to include the language code - like "de/abc-german"
      i18nSlug: z.record(z.string(), z.string()).optional(), // if you use different custom slugs or file names for different languages, you need to define them per language on each article like { de: 'de/abc-german', en: 'en/abc-english' }
      externalCanonical: httpUrl.optional(),
      title: z.string(),
      excerpt: z.string().optional(),
      image: z
        .object({
          file: image().optional(), // file would be a relative path to the src/images/content/articles folder. You can use the alias @images to reference this folder. The article list-item.astro and [...article].astro elements hold a fallback option, if no file or url is set.
          url: httpUrl.optional(), // url would be an optional url to any image
          alt: z.string().optional(), // this defines the alt text for the image
          size: z.enum(['small', 'medium', 'large']).optional(),
        })
        .optional(),
      tags: z.array(z.string()).optional(),
      categories: z.array(z.string()).optional(),
      author: z
        .object({
          name: z.string(),
          url: httpUrl.optional(),
        })
        .optional(),
      tocDepth: z.number().optional(),
      // meta data for the blog overview page. Do not specify this in the frontmatter!
      url: z.string().optional(),
    }),
});

const faq_answers = defineCollection({
  loader: glob({ pattern: ['**/[^_]**.md'], base: './src/content/faq-answers', deferRender: onDemandCollections.has('faq_answers') }),
  schema: () =>
    z.object({
      publishDate: z.date().optional(),
      updateDate: z.date().optional(),
      draft: z.boolean().optional(),
      question: z.string(),
      category: z.string().optional(),
      llmsTxt: z.boolean().optional(),
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: ['**/[^_]**.md'], base: './src/content/publications' }),
  schema: () =>
    z.object({
      title: z.string(),
      authors: z.string(),
      year: z.number().optional(),
      source: z.string().optional(),
      doi: z.string().optional(),
      url: httpUrl.optional(),
      draft: z.boolean().optional(),
    }),
});

const cruises = defineCollection({
  loader: glob({ pattern: ['**/[^_]**.md'], base: './src/content/cruises' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date().optional(),
      caption: z.string().optional(),
      draft: z.boolean().optional(),
      image: z
        .object({
          file: image().optional(),
          url: httpUrl.optional(),
          alt: z.string().optional(),
        })
        .optional(),
      map: z
        .object({
          points: z
            .array(
              z.object({
                lat: z.number(),
                lng: z.number(),
                title: z.string().optional(),
              }),
            )
            .optional(),
          line: z
            .array(
              z.object({
                lat: z.number(),
                lng: z.number(),
              }),
            )
            .optional(),
        })
        .optional(),
    }),
});

const team = defineCollection({
  loader: glob({ pattern: ['**/[^_]**.md'], base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string().optional(),
      affiliation: z.string().optional(),
      group: z.enum(['international', 'usa', 'staff']),
      order: z.number().optional(),
      draft: z.boolean().optional(),
      photo: z
        .object({
          file: image().optional(),
          url: httpUrl.optional(),
          alt: z.string().optional(),
        })
        .optional(),
    }),
});

const post_categories = defineCollection({
  loader: glob({ pattern: ['**/[^_]**.md'], base: './src/content/post-categories' }),
  schema: () =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      color: z.preprocess(
        (value) => (value == null || value === '' ? undefined : String(value)),
        z
          .string()
          .regex(/^#?[0-9A-Fa-f]{6}$/)
          .optional(),
      ),
      // Cruise-line pills are grouped together wherever categories are listed.
      cruise: z.boolean().optional(),
    }),
});

const post_tags = defineCollection({
  loader: glob({ pattern: ['**/[^_]**.md'], base: './src/content/post-tags' }),
  schema: () =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
    }),
});

const protocols = defineCollection({
  loader: glob({ pattern: ['**/[^_]**.md'], base: './src/content/protocols' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      draft: z.boolean().optional(),
      file: z.string().optional(), // public path from Pages CMS, e.g. /data/protocols/sampling.pdf
      url: httpUrl.optional(), // external PDF or Word file, if it is not stored in this repo
      publishDate: z.date().optional(),
      updateDate: z.date().optional(),
    }),
});

const carousel = defineCollection({
  loader: glob({ pattern: ['**/[^_]**.md'], base: './src/content/carousel' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      alt: z.string(),
      order: z.number().optional(),
      draft: z.boolean().optional(),
      image: z.object({
        file: image(),
      }),
    }),
});

export const collections = { articles, faq_answers, publications, cruises, team, protocols, post_categories, post_tags, carousel };
