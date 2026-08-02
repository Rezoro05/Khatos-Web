import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Khatuna's complete landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Khatuna Goguadze \| Executive Function Trainer<\/title>/i,
  );
  assert.match(html, /Where attention goes, neural firing flows/);
  assert.match(html, /Book a free 15-minute consultation/);
  assert.match(html, /Children/);
  assert.match(html, /Older adults/);
  assert.match(html, /MSc[\s\S]*Educational Neuroscience/);
  assert.match(html, /Selected projects/);
  assert.match(html, /Sample testimonials/);
  assert.match(html, /ADHD/);
  assert.match(html, /mailto:khato\.goguadze@gmail\.com/);
  assert.doesNotMatch(html, /Personalized support for memory, focus/i);
  assert.doesNotMatch(html, /Park Slope, Brooklyn/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("removes the starter and retains accessibility safeguards", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /SkeletonPreview|_sites-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(page, /aria-hidden="true"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width:\s*760px\)/);

  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
});
