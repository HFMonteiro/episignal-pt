import type { EpisomerAggregate, EpisomerLiveArticle } from "./episomer";

export type RssParseResult = {
  articles: EpisomerLiveArticle[];
  totalItems: number;
  uniqueItems: number;
  duplicateItems: number;
};

export function normaliseEpisomerTopic(value: string | null): string {
  const topic = (value ?? "").trim();
  return topic.length > 0 ? topic.slice(0, 90) : "pertussis OR measles OR outbreak";
}

export function decodeXml(value: string): string {
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

export function textBetween(value: string, tag: string): string {
  const match = value.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

export function extractDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.host.replace(/^www\./, "");
  } catch {
    return "Open news";
  }
}

export function uniqueArticles(articles: EpisomerLiveArticle[]): RssParseResult {
  const seen = new Set<string>();
  const unique = articles.filter((article) => {
    const key = article.url || `${article.title}-${article.source_domain}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    articles: unique,
    totalItems: articles.length,
    uniqueItems: unique.length,
    duplicateItems: Math.max(0, articles.length - unique.length)
  };
}

export function parseGoogleNewsRss(xml: string): RssParseResult {
  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
  const articles = itemMatches.slice(0, 80).map((item) => {
    const url = textBetween(item, "link");
    return {
      title: textBetween(item, "title"),
      url,
      source_domain: extractDomain(url),
      source_country: "Open news",
      language: "mixed",
      seen_at: textBetween(item, "pubDate")
    };
  }).filter((article) => article.url && article.title);

  return uniqueArticles(articles);
}

export function toAggregateRows(topic: string, articles: EpisomerLiveArticle[], date = new Date().toISOString().slice(0, 10)): EpisomerAggregate[] {
  const byLocation = new Map<string, number>();
  for (const article of articles) {
    const location = article.source_country || article.source_domain || "Unknown";
    byLocation.set(location, (byLocation.get(location) ?? 0) + 1);
  }

  const values = [...byLocation.entries()].sort((a, b) => b[1] - a[1]);
  const mean = values.length ? values.reduce((sum, [, count]) => sum + count, 0) / values.length : 0;

  return values.map(([location, observed]) => {
    const expected = Math.max(1, Math.round(mean * 0.75));
    const threshold = Math.max(3, expected + 2);
    return {
      topic,
      location,
      date,
      posts_observed: observed,
      posts_expected: expected,
      threshold,
      alert: observed >= threshold,
      review_status: observed >= threshold ? "watch" : "new",
      source: "OpenNews",
      evidence_mode: "rss_preview",
      geolocation_quality: location === "Unknown" ? "low" : "medium",
      signal_score: Math.min(1, observed / Math.max(1, threshold))
    };
  });
}
