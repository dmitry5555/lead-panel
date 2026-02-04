import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, ".env");

function loadEnvFromFile() {
  if (!fs.existsSync(ENV_PATH)) return;
  const content = fs.readFileSync(ENV_PATH, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFromFile();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_KEY in .env");
  process.exit(1);
}

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const UTM_SOURCES = ["yandex"];
const UTM_MEDIUMS = ["cpc", "cpm", "rsya"];
const UTM_CAMPAIGNS = ["rsya_spring", "search_brand", "search_generic"];
const UTM_CONTENT = ["banner_1", "banner_2", "video_1", "text_1"];

function buildUrl() {
  const params = new URLSearchParams({
    utm_source: randomItem(UTM_SOURCES),
    utm_medium: randomItem(UTM_MEDIUMS),
    utm_campaign: randomItem(UTM_CAMPAIGNS),
    utm_content: randomItem(UTM_CONTENT),
    utm_id: `camp_${randomInt(100, 999)}`,
    yclid: `${randomInt(1000000000, 9999999999)}`,
  });
  return `http://localhost:3000/landing?${params.toString()}`;
}

async function postEvent(url) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/events`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST failed: ${res.status} ${text}`);
  }
}

async function run() {
  const count = 30;
  for (let i = 0; i < count; i += 1) {
    const url = buildUrl();
    await postEvent(url);
    process.stdout.write(`✔ ${i + 1}/${count}\r`);
  }
  process.stdout.write("\nDone\n");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
