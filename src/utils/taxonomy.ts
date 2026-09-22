import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export function taxonomySlug(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, '-');
}

export function humanizeTaxonomy(value: string) {
  return taxonomySlug(value)
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export async function getTaxonomyTitles() {
  const [categories, tags] = await Promise.all([getCollection('post_categories'), getCollection('post_tags')]);
  return {
    categories: new Map(categories.map((entry) => [taxonomySlug(entry.data.slug ?? entry.id), entry.data.title])),
    tags: new Map(tags.map((entry) => [taxonomySlug(entry.data.slug ?? entry.id), entry.data.title])),
  };
}

export function resolveTaxonomyTitle(value: string, titles: Map<string, string>, translated: string) {
  const slug = taxonomySlug(value);
  const fromCms = titles.get(slug);
  if (fromCms) return fromCms;
  if (translated && translated !== slug && translated !== value) return translated;
  return humanizeTaxonomy(slug);
}

export function sortArticlesByDate<T extends CollectionEntry<'articles'>>(items: T[]): T[] {
  return [...items].sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

/** Fixed colors per category so News is always News, not a random hash. */
export const categoryPillClass: Record<string, string> = {
  news: "bg-primary text-white",
  "cruise-updates": "bg-secondary text-secondary-contrast",
  papers: "bg-primary-dark text-white",
  methods: "bg-accent text-accent-contrast",
  training: "bg-secondary-dark text-white",
  general: "bg-stone-600 text-white",
  sampling: "bg-primary-light text-white",
  community: "bg-secondary-dark text-white",
  data: "bg-accent-dark text-white",
  announcements: "bg-primary-light text-white",
  fieldwork: "bg-accent text-accent-contrast",
};

export function categoryPillClasses(slug: string) {
  return categoryPillClass[taxonomySlug(slug)] ?? "bg-primary text-white";
}
