import { NextResponse } from "next/server";

import type { EpisomerAggregate, EpisomerLiveArticle, EpisomerLiveResponse } from "@/lib/episomer";
import { normaliseEpisomerTopic, parseGoogleNewsRss, toAggregateRows } from "@/lib/episomerRss";

export const dynamic = "force-dynamic";

async function fetchRssArticles(topic: string): Promise<{
  articles: EpisomerLiveArticle[];
  totalItems: number;
  uniqueItems: number;
  duplicateItems: number;
}> {
  const params = new URLSearchParams({
    q: topic,
    hl: "en-GB",
    gl: "PT",
    ceid: "PT:en"
  });

  const response = await fetch(`https://news.google.com/rss/search?${params.toString()}`, {
    cache: "no-store",
    headers: { "User-Agent": "episignal-pt-live-preview/0.2" }
  });

  if (!response.ok) throw new Error(`Google News RSS returned ${response.status}`);

  const xml = await response.text();
  return parseGoogleNewsRss(xml);
}

export async function GET(request: Request) {
  const started = Date.now();
  const fetchedAt = new Date().toISOString();
  const { searchParams } = new URL(request.url);
  const topic = normaliseEpisomerTopic(searchParams.get("topic"));
  const requestedSeconds = Math.min(10, Math.max(3, Number(searchParams.get("seconds") ?? 10)));

  let aggregates: EpisomerAggregate[] = [];
  let articles: EpisomerLiveArticle[] = [];
  let totalItems = 0;
  let uniqueItems = 0;
  let duplicateItems = 0;
  let emptyReason: string | null = null;
  let rssStatus: EpisomerLiveResponse["rss_status"] = "ok";
  const warning = "Open-news RSS live scan. This is event-based information and not a substitute for validated epidemiological investigation.";

  if (requestedSeconds > 3) {
    await new Promise((resolve) => setTimeout(resolve, Math.min(7000, (requestedSeconds - 3) * 1000)));
  }

  try {
    const parsed = await fetchRssArticles(topic);
    articles = parsed.articles.slice(0, 80);
    totalItems = parsed.totalItems;
    uniqueItems = parsed.uniqueItems;
    duplicateItems = parsed.duplicateItems;
    aggregates = toAggregateRows(topic, articles);
    if (articles.length === 0) {
      rssStatus = "empty";
      emptyReason = "Google News RSS returned no usable article links for this topic.";
    }
  } catch (error) {
    console.error("RSS fetch failed", error);
    rssStatus = "error";
    emptyReason = error instanceof Error ? error.message : "RSS fetch failed";
    articles = [];
    aggregates = [];
  }

  const response: EpisomerLiveResponse = {
    mode: "open_news_live",
    source: "GoogleNewsRSS",
    fetched_at: fetchedAt,
    topic,
    query: topic,
    total_items: totalItems,
    unique_items: uniqueItems,
    duplicate_items: duplicateItems,
    empty_reason: emptyReason,
    rss_status: rssStatus,
    seconds_requested: requestedSeconds,
    seconds_elapsed: Math.round((Date.now() - started) / 100) / 10,
    generated_at: new Date().toISOString(),
    warning,
    aggregates,
    articles
  };

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
