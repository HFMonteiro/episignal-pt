import { NextResponse } from "next/server";

import type { EpisomerAggregate, EpisomerLiveArticle, EpisomerLiveResponse } from "@/lib/episomer";

export const dynamic = "force-dynamic";

type GdeltArticle = {
  title?: string;
  url?: string;
  domain?: string;
  sourcecountry?: string;
  language?: string;
  seendate?: string;
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normaliseTopic(value: string | null): string {
  const topic = (value ?? "").trim();
  return topic.length > 0 ? topic.slice(0, 90) : "pertussis OR measles OR outbreak";
}

function uniqueArticles(articles: EpisomerLiveArticle[]): EpisomerLiveArticle[] {
  const seen = new Set<string>();
  return articles.filter((article) => {
    const key = article.url || `${article.title}-${article.source_domain}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function decodeXml(value: string): string {
  return value
    .replaceAll("<![CDATA[", "")
    .replaceAll("]]>", "")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .trim();
}

function textBetween(value: string, tag: string): string {
  const match = value.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function inferSourceFromTitle(title: string): string {
  const parts = title.split(" - ");
  return parts.length > 1 ? parts[parts.length - 1].trim() : "Open news";
}

function toAggregateRows(topic: string, articles: EpisomerLiveArticle[]): EpisomerAggregate[] {
  const byLocation = new Map<string, number>();
  for (const article of articles) {
    const location = article.source_country || article.source_domain || "Unknown";
    byLocation.set(location, (byLocation.get(location) ?? 0) + 1);
  }

  const now = new Date().toISOString().slice(0, 10);
  const values = [...byLocation.entries()].sort((a, b) => b[1] - a[1]);
  const mean = values.length ? values.reduce((sum, [, count]) => sum + count, 0) / values.length : 0;

  return values.map(([location, observed]) => {
    const expected = Math.max(1, Math.round(mean * 0.75));
    const threshold = Math.max(3, expected + 2);
    return {
      topic,
      location,
      date: now,
      posts_observed: observed,
      posts_expected: expected,
      threshold,
      alert: observed >= threshold,
      review_status: observed >= threshold ? "watch" : "new",
      source: "OpenNews",
      geolocation_quality: location === "Unknown" ? "low" : "medium",
      signal_score: Math.min(1, observed / Math.max(1, threshold))
    };
  });
}

async function fetchGdeltArticles(topic: string, pass: number): Promise<EpisomerLiveArticle[]> {
  const params = new URLSearchParams({
    query: topic,
    mode: "ArtList",
    format: "json",
    maxrecords: "60",
    sort: "HybridRel",
    timespan: "3d",
    _: String(Date.now() + pass)
  });
  const response = await fetch(`https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`, {
    cache: "no-store",
    headers: { "User-Agent": "episignal-pt-live-preview/0.1" }
  });
  if (!response.ok) throw new Error(`GDELT returned ${response.status}`);
  const payload = await response.json() as { articles?: GdeltArticle[] };
  return (payload.articles ?? []).map((article) => ({
    title: article.title ?? "Untitled",
    url: article.url ?? "",
    source_domain: article.domain ?? "",
    source_country: article.sourcecountry ?? "Unknown",
    language: article.language ?? "",
    seen_at: article.seendate ?? ""
  })).filter((article) => article.url);
}

async function fetchGoogleNewsArticles(topic: string): Promise<EpisomerLiveArticle[]> {
  const params = new URLSearchParams({
    q: topic,
    hl: "pt-PT",
    gl: "PT",
    ceid: "PT:pt-PT"
  });
  const response = await fetch(`https://news.google.com/rss/search?${params.toString()}`, {
    cache: "no-store",
    headers: { "User-Agent": "episignal-pt-live-preview/0.1" }
  });
  if (!response.ok) throw new Error(`Google News RSS returned ${response.status}`);
  const xml = await response.text();
  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
  return itemMatches.slice(0, 60).map((item) => {
    const title = textBetween(item, "title");
    return {
      title,
      url: textBetween(item, "link"),
      source_domain: inferSourceFromTitle(title),
      source_country: "Open news",
      language: "mixed",
      seen_at: textBetween(item, "pubDate")
    };
  }).filter((article) => article.url && article.title);
}

export async function GET(request: Request) {
  const started = Date.now();
  const { searchParams } = new URL(request.url);
  const topic = normaliseTopic(searchParams.get("topic"));
  const requestedSeconds = Math.min(10, Math.max(3, Number(searchParams.get("seconds") ?? 10)));
  const articles: EpisomerLiveArticle[] = [];
  let source: EpisomerLiveResponse["source"] = "GDELT";
  let warning = "Open-news live scan. This is not ECDC Episomer social-media collection and should be reviewed as event-based intelligence.";

  try {
    if (requestedSeconds > 3) await wait(Math.min(7000, (requestedSeconds - 3) * 1000));
    articles.push(...await fetchGdeltArticles(topic, 0));
    if (articles.length === 0) {
      source = "GoogleNewsRSS";
      warning = `${warning} GDELT returned no articles for this query, so open-news RSS was used.`;
      articles.push(...await fetchGoogleNewsArticles(topic));
    }
  } catch (error) {
    source = "GoogleNewsRSS";
    warning = `${warning} GDELT returned an error: ${error instanceof Error ? error.message : "unknown error"}. Falling back to open-news RSS.`;
    try {
      articles.push(...await fetchGoogleNewsArticles(topic));
    } catch (fallbackError) {
      warning = `${warning} RSS fallback also failed: ${fallbackError instanceof Error ? fallbackError.message : "unknown error"}.`;
    }
  }

  const unique = uniqueArticles(articles).slice(0, 80);
  const response: EpisomerLiveResponse = {
    mode: "open_news_live",
    source,
    topic,
    query: topic,
    seconds_requested: requestedSeconds,
    seconds_elapsed: Math.round((Date.now() - started) / 100) / 10,
    generated_at: new Date().toISOString(),
    warning,
    aggregates: toAggregateRows(topic, unique),
    articles: unique.slice(0, 25)
  };

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
