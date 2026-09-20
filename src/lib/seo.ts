/**
 * Search-intent titles and descriptions for this site.
 *
 * `@grove-dev/astro` builds safe generic SEO copy ("Apps built with
 * Flutter on …", "… — Open-source Business app"). Nobody searches for
 * those phrases, so the pages this site owns compose their own copy
 * here and keep everything else (OG image, JSON-LD, canonical) from
 * the package model.
 *
 * Editorial copy wins over every template below: a record's
 * `seo.title`, or a taxonomy term's `seoTitle` / `heading` /
 * `description` in `data/taxonomy/*.yml`.
 */
import { recordSeoDescriptor, seoDescription, seoTitle } from '@grove-dev/astro/server';

/** Room left for the main part of a title before `seoTitle` drops the suffix. */
const TITLE_MAX = 65;

export const HOME_TITLE = 'Open Source Apps & Production Codebases';

interface RecordTitleInput {
  name: string;
  summary?: string | undefined;
  seoTitle?: string | undefined;
  categoryLabel?: string | undefined;
  stackLabel?: string | undefined;
  singular: string;
}

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * `{name} – Open Source {use case}`.
 *
 * Order: the record's hand-written `seo.title`, then a short first
 * clause of its summary, then category + stack — the stack is the
 * part people actually search for ("open source Flutter app").
 */
export function recordTitle(input: RecordTitleInput, siteName: string): string {
  if (input.seoTitle?.trim()) return input.seoTitle.trim();

  const generic = recordSeoDescriptor({ singular: input.singular });
  const clause = recordSeoDescriptor({ summary: input.summary, singular: input.singular });
  if (clause !== generic) return seoTitle(`${input.name} – ${clause}`, siteName);

  const category =
    input.categoryLabel && input.categoryLabel.toLowerCase() !== 'uncategorized'
      ? `${input.categoryLabel} `
      : '';
  const base = `${input.name} – Open Source ${category}${titleCase(input.singular)}`;
  const withStack = input.stackLabel ? `${base} Built with ${input.stackLabel}` : base;
  return seoTitle(withStack.length <= TITLE_MAX ? withStack : base, siteName);
}

export interface TaxonomyTerm {
  id: string;
  name: string;
  count?: number;
  /** `<title>` override. */
  seoTitle?: string;
  /** H1 override. */
  heading?: string;
  /** Lede + meta description override. */
  description?: string;
}

export type TaxonomyKind = 'stacks' | 'categories';

/** "React (web)" reads badly inside a sentence; "React" does not. */
function plainName(term: TaxonomyTerm): string {
  return term.name.replace(/\s*\(.*\)\s*$/, '');
}

export function taxonomyHeading(term: TaxonomyTerm, plural: string): string {
  return term.heading?.trim() || `Open Source ${plainName(term)} ${titleCase(plural)}`;
}

export function taxonomyTitle(term: TaxonomyTerm, plural: string, siteName: string): string {
  return seoTitle(term.seoTitle?.trim() || taxonomyHeading(term, plural), siteName);
}

export function taxonomyDescription(kind: TaxonomyKind, term: TaxonomyTerm, plural: string): string {
  const name = plainName(term);
  const fallback =
    kind === 'stacks'
      ? `Browse open-source ${plural} built with ${name}. Compare real codebases by activity, license, platform and maturity, with source code you can run and study.`
      : `Discover open-source ${name.toLowerCase()} ${plural} with public source code. Compare them by stack, activity, license and maturity.`;
  return seoDescription(term.description, fallback);
}
