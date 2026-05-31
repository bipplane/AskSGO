import { readFileSync, existsSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";

const root = new URL("..", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const fail = (message) => {
  console.error(`Validation failed: ${message}`);
  process.exit(1);
};

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "data/i18n.json",
  "assets/sgo-logo.svg",
  "netlify.toml"
];

for (const file of requiredFiles) {
  if (!existsSync(new URL(file, root))) fail(`missing ${file}`);
}

const app = read("app.js");
const css = read("styles.css");
const i18n = JSON.parse(read("data/i18n.json"));

const banned = ["senior-couple", "generated_images"];
for (const token of banned) {
  if (app.includes(token) || css.includes(token)) fail(`banned generated-image reference: ${token}`);
}

const cssBlocks = css.matchAll(/([^{}]+)\{([^{}]*)\}/g);
for (const [, selector, declarations] of cssBlocks) {
  const isSelectableFeedback = [":hover", ":active", ":focus"].some((state) =>
    selector.includes(`.choice-button${state}`) || selector.includes(`.lang-button${state}`));
  const isSelectedStyle = selector.includes(".choice-button.selected") || selector.includes(".lang-button.selected");
  if (isSelectableFeedback && isSelectedStyle) fail("selectable feedback and selected styles must stay separate");
  if (isSelectableFeedback && /(?:^|;)\s*(?:border-color|background)\s*:/.test(declarations)) {
    fail("selectable feedback must not look selected");
  }
}

const assets = readdirSync(new URL("assets", root));
for (const asset of assets) {
  const allowed = asset === "sgo-logo.svg";
  if (!allowed) fail(`unexpected asset ${asset}; only official SGO logo asset is allowed`);
}

if (!app.includes("assets/sgo-logo.svg")) fail("app does not reference official SGO logo asset");
if (!app.includes("renderSupervisor")) fail("supervisor review guide missing");

const langs = ["en", "zh", "ms", "ta"];
for (const lang of langs) {
  if (!i18n[lang]) fail(`missing language ${lang}`);
}

function flattenKeys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === "object" && !Array.isArray(value)
      ? flattenKeys(value, path)
      : [path];
  });
}

const referenceKeys = flattenKeys(i18n.en).sort();
for (const lang of langs.slice(1)) {
  const keys = flattenKeys(i18n[lang]).sort();
  const missing = referenceKeys.filter((key) => !keys.includes(key));
  if (missing.length) fail(`${lang} missing i18n keys: ${missing.slice(0, 8).join(", ")}`);
}

const sourceUrls = [...app.matchAll(/https:\/\/[^"',\])]+/g)].map((match) => match[0]);
if (sourceUrls.length < 8) fail("expected official source links in app.js");
for (const url of sourceUrls) {
  const official = url.includes(".gov.sg") || url.includes("aic.sg") || url.includes("cpf.gov.sg") || url.includes("supportgowhere.life.gov.sg") || url.includes("transitlink.com.sg") || url.includes("healthiersg.gov.sg") || url.includes("chas.sg");
  if (!official) fail(`non-official source URL found: ${url}`);
}

const expectedExts = new Set([".html", ".css", ".js", ".json", ".svg", ".toml", ".md", ".yml"]);
for (const file of requiredFiles) {
  if (!expectedExts.has(extname(file))) fail(`unexpected required file type ${file}`);
}

console.log("Validation passed.");
