/**
 * Collection entries with real ranking inputs.
 *
 * `recordsToCollectionEntries` reads `scores.activity`, `scores.curation`
 * and a top-level `pushedAt` — editorial fields no record here carries —
 * and maps `status` from `visibility`, which is always `keep`. Left
 * alone, every ranking preset scores 0 and `excludeStatuses` excludes
 * nothing, so collections render in file order.
 *
 * This fills those inputs from data the weekly GitHub sync already
 * writes, so a collection's `selectionNote` describes what actually
 * happens:
 *
 *   status         `health.status` (active / quiet / mature / stale / …)
 *   pushedAt       `github.repository.pushed_at`
 *   activityScore  mean of release freshness (180 days), push freshness
 *                  (90 days) and — where commit history is synced — the
 *                  share of the last 100 commits made in the most recent
 *                  three synced months
 *   curationScore  adoption: GitHub stars on a log scale (100k ≈ 1)
 */
import { recordsToCollectionEntries } from '@grove-dev/astro/server';
import type { CollectionEntry } from '@grove-dev/core';

interface SyncedRecord {
  slug?: string;
  health?: { status?: string };
  github?: {
    latestReleaseAt?: string | null;
    repository?: { pushed_at?: string; stargazers_count?: number };
    activity?: { monthlyCommits?: { month: string; commits: number }[] };
  };
}

const DAY = 24 * 3600 * 1000;

function freshness(date: string | null | undefined, windowDays: number, now: number): number {
  const time = date ? Date.parse(date) : Number.NaN;
  if (!Number.isFinite(time)) return 0;
  return Math.min(1, Math.max(0, 1 - (now - time) / (windowDays * DAY)));
}

function activityScore(record: SyncedRecord, now: number): number {
  const signals = [
    freshness(record.github?.latestReleaseAt, 180, now),
    freshness(record.github?.repository?.pushed_at, 90, now),
  ];
  const months = record.github?.activity?.monthlyCommits;
  if (months?.length) {
    const total = months.reduce((sum, month) => sum + month.commits, 0);
    const recent = months.slice(-3).reduce((sum, month) => sum + month.commits, 0);
    if (total > 0) signals.push(recent / total);
  }
  return signals.reduce((sum, value) => sum + value, 0) / signals.length;
}

function adoptionScore(record: SyncedRecord): number {
  const stars = record.github?.repository?.stargazers_count ?? 0;
  return Math.min(1, Math.log10(stars + 1) / 5);
}

export function collectionEntries(
  records: unknown[],
  site: Parameters<typeof recordsToCollectionEntries>[1],
): CollectionEntry[] {
  const now = Date.now();
  const bySlug = new Map(
    (records as SyncedRecord[]).map((record) => [record.slug, record] as const),
  );
  return recordsToCollectionEntries(records as never, site).map((entry) => {
    const record = bySlug.get(entry.slug);
    if (!record) return entry;
    return {
      ...entry,
      status: record.health?.status ?? entry.status,
      pushedAt: entry.pushedAt ?? record.github?.repository?.pushed_at,
      activityScore: entry.activityScore ?? activityScore(record, now),
      curationScore: entry.curationScore ?? adoptionScore(record),
    };
  });
}
