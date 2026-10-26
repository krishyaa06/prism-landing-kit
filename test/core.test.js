const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");
const cfg = { name: "Acme <X>", tagline: "Ship *faster*", sub: "s", cta: "Go", features: "Fast - very quick\nSafe: no leaks", faq: "Free? Yes it is.", sections: { pricing: true }, perks: "A\nB", price: "$9" };
test("parsers", () => {
  assert.deepEqual(C.parseFeatures("Fast - very quick\nSafe: no leaks\nSolo"), [{ title: "Fast", body: "very quick" }, { title: "Safe", body: "no leaks" }, { title: "Solo", body: "" }]);
  assert.deepEqual(C.parseFaq("Free? Yes.\nNo answer?"), [{ q: "Free?", a: "Yes." }]);
});
test("build escapes and highlights", () => {
  const h = C.build(cfg);
  assert.match(h, /^<!doctype html>/);
  assert.ok(h.includes("Acme &lt;X&gt;")); assert.ok(!h.includes("<X>"));
  assert.ok(h.includes("Ship <span>faster</span>"));
  assert.ok(h.includes('id="features"') && h.includes('id="pricing"') && h.includes('id="faq"'));
  assert.ok(h.includes("<li>A</li><li>B</li>"));
});
test("sections can be turned off + themes", () => {
  const h = C.build({ ...cfg, sections: { features: false, faq: false, cta: false }, theme: "light" });
  assert.ok(!h.includes('id="features"') && !h.includes('id="faq"') && !h.includes('class="cta"') && !h.includes('id="pricing"'));
  assert.ok(h.includes(C.THEMES.light.bg));
});
