(() => {
  const { $, $$, copy, download, store, debounce, tabs } = Prism;
  const EX = { name: "Prism AI", eyebrow: "New · Free while in beta", tagline: "Chat with your docs, *instantly.*", sub: "Drop in PDFs, Notion pages or a GitHub repo and get cited answers in seconds. No setup, no vector database to babysit.", cta: "Start free", ctaUrl: "https://prism-ai-umber.vercel.app", cta2: "View on GitHub", cta2Url: "https://github.com/krishyaa06/prism-ai", features: "Cited answers - Every reply links to the exact paragraph it came from.\nAny source - PDFs, Markdown, Notion exports and public repos.\nFast - Streaming responses powered by Groq.\nPrivate - Your files never train a model.\nShareable - Send a read-only chat link to your team.\nOpen source - MIT licensed, self-host in one click.", faq: "Is it free? Yes, free during the beta.\nWhich models? Llama 3.3 70B via Groq by default; bring your own key for others.\nCan I self-host? Yes — deploy the repo to Vercel and add your API key.", planName: "Pro", price: "$0", period: "/month during beta", perks: "Unlimited chats\n100 documents\nShare links\nPriority support on Discord", footer: "Built by Prism Protocol", theme: "prism", sections: { features: true, pricing: false, faq: true, cta: true } };
  const F = ["name", "eyebrow", "tagline", "sub", "cta", "ctaUrl", "cta2", "cta2Url", "features", "faq", "planName", "price", "period", "perks", "footer"];
  let C = { ...EX, ...store.get("lk:c", {}) };
  $("#themes").innerHTML = Object.entries(Core.THEMES).map(([k, t]) => `<button data-t="${k}"><i style="background:linear-gradient(135deg,${t.a},${t.b})"></i>${k}</button>`).join("");
  function fill() { F.forEach((f) => ($("#" + f).value = C[f] || "")); $$("[data-s]").forEach((c) => (c.checked = C.sections[c.dataset.s] !== false && (c.dataset.s !== "pricing" || !!C.sections.pricing))); $$("#themes button").forEach((b) => b.classList.toggle("on", b.dataset.t === C.theme)); }
  const render = debounce(() => { store.set("lk:c", C); $("#frame").srcdoc = Core.build(C); }, 150);
  F.forEach((f) => $("#" + f).addEventListener("input", () => { C[f] = $("#" + f).value; render(); }));
  $$("[data-s]").forEach((c) => (c.onchange = () => { C.sections = { ...C.sections, [c.dataset.s]: c.checked }; render(); }));
  $$("#themes button").forEach((b) => (b.onclick = () => { C.theme = b.dataset.t; fill(); render(); }));
  tabs($("#dev"), (v) => ($("#frame").style.width = v));
  $("#reset").onclick = () => { C = JSON.parse(JSON.stringify(EX)); fill(); render(); };
  $("#copy").onclick = () => copy(Core.build(C));
  $("#dl").onclick = () => download("index.html", Core.build(C), "text/html");
  fill(); render();
})();
