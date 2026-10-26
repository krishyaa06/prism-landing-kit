/* Prism Landing Kit · page generator */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const lines = (s) => String(s || "").split("\n").map((l) => l.trim()).filter(Boolean);
  const THEMES = {
    prism: { bg: "#07090f", surface: "#10142a", text: "#eef1ff", muted: "#9aa3c7", a: "#00d2ff", b: "#6c63ff" },
    sunset: { bg: "#100a0d", surface: "#1d1218", text: "#fff3f0", muted: "#c9a7a7", a: "#ff8a5c", b: "#ff3d7f" },
    forest: { bg: "#070d0b", surface: "#0f1c17", text: "#ecfff6", muted: "#9cc2b2", a: "#3ee69a", b: "#00b3a4" },
    light: { bg: "#f7f8fc", surface: "#ffffff", text: "#0d1022", muted: "#5b6283", a: "#4f46e5", b: "#06b6d4" },
  };
  function parseFeatures(s) { return lines(s).map((l) => { const [title, ...rest] = l.split(/\s+[-–|]\s+|:\s+/); return { title: title.trim(), body: rest.join(" — ").trim() }; }); }
  function parseFaq(s) { return lines(s).map((l) => { const [q, ...a] = l.split("?"); return { q: q.trim() + "?", a: a.join("?").replace(/^\s*[-–:]?\s*/, "").trim() }; }).filter((x) => x.a); }
  function build(c) {
    const t = THEMES[c.theme] || THEMES.prism, f = parseFeatures(c.features), faq = parseFaq(c.faq), dark = c.theme !== "light";
    const s = c.sections || {};
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(c.name)} — ${esc(c.tagline)}</title>
<meta name="description" content="${esc(c.sub)}" />
<meta property="og:title" content="${esc(c.name)}" />
<meta property="og:description" content="${esc(c.tagline)}" />
<style>
:root{--bg:${t.bg};--surface:${t.surface};--text:${t.text};--muted:${t.muted};--a:${t.a};--b:${t.b}}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit}.wrap{max-width:1080px;margin:0 auto;padding:0 24px}
nav{position:sticky;top:0;z-index:5;backdrop-filter:blur(12px);background:color-mix(in srgb,var(--bg) 80%,transparent);border-bottom:1px solid ${dark ? "#ffffff12" : "#0000000f"}}
nav .wrap{display:flex;align-items:center;justify-content:space-between;height:64px}
.logo{font-weight:800;letter-spacing:-.02em;text-decoration:none;display:flex;gap:8px;align-items:center}.logo i{width:22px;height:22px;border-radius:7px;background:linear-gradient(135deg,var(--a),var(--b))}
nav .links{display:flex;gap:22px;align-items:center;font-size:14px}nav .links a{text-decoration:none;color:var(--muted)}nav .links a:hover{color:var(--text)}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:12px;font-weight:650;text-decoration:none;transition:transform .15s}.btn:hover{transform:translateY(-2px)}
.btn.p{background:linear-gradient(90deg,var(--a),var(--b));color:${dark ? "#05060b" : "#fff"};box-shadow:0 10px 30px -10px var(--b)}.btn.g{border:1px solid ${dark ? "#ffffff24" : "#00000018"}}
.hero{padding:110px 0 80px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:"";position:absolute;inset:-40% 10% auto;height:600px;background:radial-gradient(closest-side,color-mix(in srgb,var(--b) 35%,transparent),transparent);filter:blur(30px);z-index:-1}
.eyebrow{display:inline-block;padding:6px 14px;border-radius:99px;border:1px solid ${dark ? "#ffffff1f" : "#00000014"};font-size:13px;color:var(--muted);margin-bottom:22px}
h1{font-size:clamp(40px,7vw,76px);line-height:1.02;letter-spacing:-.04em;margin:0 auto 20px;max-width:14ch}
h1 span{background:linear-gradient(90deg,var(--a),var(--b));-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{font-size:clamp(17px,2vw,20px);color:var(--muted);max-width:620px;margin:0 auto 34px}
.ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
section{padding:80px 0}h2{font-size:clamp(28px,4vw,42px);letter-spacing:-.03em;margin:0 0 12px;text-align:center}.lead{color:var(--muted);text-align:center;margin:0 auto 44px;max-width:560px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.card{padding:26px;border-radius:18px;background:var(--surface);border:1px solid ${dark ? "#ffffff12" : "#0000000d"}}
.card .ic{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;margin-bottom:14px;background:linear-gradient(135deg,color-mix(in srgb,var(--a) 30%,transparent),color-mix(in srgb,var(--b) 30%,transparent));font-weight:800}
.card h3{margin:0 0 6px;font-size:18px}.card p{margin:0;color:var(--muted);font-size:15px}
.price{max-width:420px;margin:0 auto;text-align:center}.price b{font-size:56px;letter-spacing:-.04em}.price ul{list-style:none;padding:0;margin:20px 0 26px;color:var(--muted);text-align:left}.price li{padding:6px 0}.price li::before{content:"✓  ";color:var(--a);font-weight:700}
details{border-bottom:1px solid ${dark ? "#ffffff14" : "#00000010"};padding:18px 0}summary{cursor:pointer;font-weight:600;font-size:17px}details p{color:var(--muted);margin:10px 0 0}
.faq{max-width:720px;margin:0 auto}
.cta{text-align:center;border-radius:28px;padding:70px 24px;background:linear-gradient(135deg,color-mix(in srgb,var(--a) 22%,var(--surface)),color-mix(in srgb,var(--b) 22%,var(--surface)))}
footer{padding:40px 0;color:var(--muted);font-size:14px}footer .wrap{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
@media (max-width:640px){nav .links a:not(.btn){display:none}}
</style>
</head>
<body>
<nav><div class="wrap"><a class="logo" href="#"><i></i>${esc(c.name)}</a><div class="links">${f.length && s.features !== false ? `<a href="#features">Features</a>` : ""}${s.pricing ? `<a href="#pricing">Pricing</a>` : ""}${faq.length && s.faq !== false ? `<a href="#faq">FAQ</a>` : ""}<a class="btn p" href="${esc(c.ctaUrl || "#")}">${esc(c.cta || "Get started")}</a></div></div></nav>
<header class="hero"><div class="wrap">
${c.eyebrow ? `<span class="eyebrow">${esc(c.eyebrow)}</span>` : ""}
<h1>${esc(c.tagline).replace(/\*([^*]+)\*/g, "<span>$1</span>")}</h1>
<p class="sub">${esc(c.sub)}</p>
<div class="ctas"><a class="btn p" href="${esc(c.ctaUrl || "#")}">${esc(c.cta || "Get started")} →</a>${c.cta2 ? `<a class="btn g" href="${esc(c.cta2Url || "#")}">${esc(c.cta2)}</a>` : ""}</div>
</div></header>
${f.length && s.features !== false ? `<section id="features"><div class="wrap"><h2>${esc(c.featuresTitle || "Everything you need")}</h2><p class="lead">${esc(c.featuresLead || "")}</p><div class="grid">${f.map((x, i) => `<div class="card"><div class="ic">${i + 1}</div><h3>${esc(x.title)}</h3><p>${esc(x.body)}</p></div>`).join("")}</div></div></section>` : ""}
${s.pricing ? `<section id="pricing"><div class="wrap"><h2>Simple pricing</h2><p class="lead">One plan. Everything included.</p><div class="card price"><div>${esc(c.planName || "Pro")}</div><b>${esc(c.price || "$0")}</b><span style="color:var(--muted)">${esc(c.period || "/month")}</span><ul>${lines(c.perks).map((p) => `<li>${esc(p)}</li>`).join("")}</ul><a class="btn p" href="${esc(c.ctaUrl || "#")}">${esc(c.cta || "Get started")}</a></div></div></section>` : ""}
${faq.length && s.faq !== false ? `<section id="faq"><div class="wrap faq"><h2>Questions</h2><p class="lead"></p>${faq.map((x) => `<details><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join("")}</div></section>` : ""}
${s.cta !== false ? `<section><div class="wrap"><div class="cta"><h2>${esc(c.ctaTitle || `Try ${c.name} today`)}</h2><p class="lead">${esc(c.ctaLead || "")}</p><a class="btn p" href="${esc(c.ctaUrl || "#")}">${esc(c.cta || "Get started")} →</a></div></div></section>` : ""}
<footer><div class="wrap"><span>© ${new Date().getFullYear()} ${esc(c.name)}</span><span>${esc(c.footer || "")}</span></div></footer>
</body>
</html>
`;
  }
  return { build, THEMES, parseFeatures, parseFaq, esc };
});
