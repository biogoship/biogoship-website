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
    categoryColors: new Map(
      categories.map((entry) => [taxonomySlug(entry.data.slug ?? entry.id), normalizeCategoryColor(entry.data.color)]),
    ),
    cruiseSlugs: new Set(
      categories
        .filter((entry) => entry.data.cruise)
        .map((entry) => taxonomySlug(entry.data.slug ?? entry.id)),
    ),
  };
}

// Keep the order inside each group. Cruise lines move to the end as one block
// so they are not split up by other categories.
export function withCruiseCategoriesLast<T>(items: T[], cruiseSlugs: Set<string>, slugOf: (item: T) => string): T[] {
  const topics: T[] = [];
  const cruises: T[] = [];
  for (const item of items) {
    if (cruiseSlugs.has(taxonomySlug(slugOf(item)))) cruises.push(item);
    else topics.push(item);
  }
  return [...topics, ...cruises];
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

export const DEFAULT_CATEGORY_COLOR = '#282687';

// Store hex without a leading # in markdown. A bare `#282687` in YAML is a comment.

const HEX_COLOR = /^#?([0-9a-f]{6})$/i;

function normalizeCategoryColor(value: string | number | undefined) {
  const match = value == null ? null : String(value).trim().match(HEX_COLOR);
  return match ? `#${match[1].toLowerCase()}` : DEFAULT_CATEGORY_COLOR;
}

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const channel = (part: number) => {
    const scaled = part / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function pillInk(hex: string) {
  return relativeLuminance(hex) > 0.45 ? '#1a2e00' : '#ffffff';
}

export function categoryPillStyle(slug: string, colors: Map<string, string>) {
  const hex = colors.get(taxonomySlug(slug)) ?? DEFAULT_CATEGORY_COLOR;
  return {
    backgroundColor: hex,
    color: pillInk(hex),
  };
}
