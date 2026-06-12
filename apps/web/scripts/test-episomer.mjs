import assert from "node:assert/strict";

const rss = await import("../src/lib/episomerRss.ts");
const status = await import("../src/lib/episomerStatus.ts");

const fixture = `
<rss><channel>
  <item>
    <title><![CDATA[Measles &amp; outbreak - Example News]]></title>
    <link>https://www.example.pt/news/measles</link>
    <pubDate>Thu, 11 Jun 2026 10:00:00 GMT</pubDate>
  </item>
  <item>
    <title>Duplicate measles item</title>
    <link>https://www.example.pt/news/measles</link>
    <pubDate>Thu, 11 Jun 2026 11:00:00 GMT</pubDate>
  </item>
  <item>
    <title>Pertussis cluster</title>
    <link>https://health.example.org/pertussis</link>
    <pubDate>Thu, 11 Jun 2026 12:00:00 GMT</pubDate>
  </item>
  <item>
    <title>Missing URL should be ignored</title>
    <pubDate>Thu, 11 Jun 2026 13:00:00 GMT</pubDate>
  </item>
</channel></rss>`;

function run(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

run("parseGoogleNewsRss decodes XML, drops unusable items and counts duplicates", () => {
  const parsed = rss.parseGoogleNewsRss(fixture);

  assert.equal(parsed.totalItems, 3);
  assert.equal(parsed.uniqueItems, 2);
  assert.equal(parsed.duplicateItems, 1);
  assert.equal(parsed.articles[0].title, "Measles & outbreak - Example News");
  assert.equal(parsed.articles[0].source_domain, "example.pt");
});

run("toAggregateRows marks RSS preview aggregates and approximate review triggers", () => {
  const parsed = rss.parseGoogleNewsRss(fixture);
  const rows = rss.toAggregateRows("measles", parsed.articles, "2026-06-11");

  assert.equal(rows.length, 1);
  assert.equal(rows[0].source, "OpenNews");
  assert.equal(rows[0].evidence_mode, "rss_preview");
  assert.equal(rows[0].date, "2026-06-11");
  assert.equal(rows[0].posts_observed, 2);
});

run("resolveEpisomerReadiness separates preview from production readiness", () => {
  assert.equal(status.resolveEpisomerReadiness({
    rssReady: true,
    topicConfigReady: false,
    rWorkerReady: false,
    governanceReady: false
  }), "preview_ready");

  assert.equal(status.resolveEpisomerReadiness({
    rssReady: true,
    topicConfigReady: true,
    rWorkerReady: false,
    governanceReady: false
  }), "preview_ready");

  assert.equal(status.resolveEpisomerReadiness({
    rssReady: true,
    topicConfigReady: true,
    rWorkerReady: true,
    governanceReady: false
  }), "production_blocked");

  assert.equal(status.resolveEpisomerReadiness({
    rssReady: true,
    topicConfigReady: true,
    rWorkerReady: true,
    governanceReady: true
  }), "production_ready");
});

console.log("episomer tests passed");
