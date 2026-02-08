(function () {
  const input = document.querySelector('[data-search="input"]');
  const results = document.querySelector('[data-search="results"]');

  if (!input || !results) return;

  const pagesIndex = [
    { title: "Cybersecurity Basics", url: "/pages/cybersecurity/basics/index.html", tags: ["fundamentals", "beginner"] },
    { title: "Ethical Hacking Methodology", url: "/pages/ethical-hacking/methodology/index.html", tags: ["pentest", "methodology"] },
    { title: "Linux Hardening Guide", url: "/pages/linux/security/hardening-guide.html", tags: ["linux", "hardening"] },
    { title: "DevOps: Kubernetes Security", url: "/pages/devops/kubernetes/security.html", tags: ["kubernetes", "cloud"] },
    { title: "Trading Tech: Algorithmic Trading", url: "/pages/trading-tech/strategies/algorithmic-trading.html", tags: ["trading", "algos"] }
    // expand this array as you go
  ];

  function renderResults(items) {
    results.innerHTML = "";
    if (!items.length) {
      results.innerHTML = '<p class="content-section">No results yet. Try another query.</p>';
      return;
    }
    const ul = document.createElement("ul");
    ul.className = "sidebar-list";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.url}">${item.title}</a>`;
      ul.appendChild(li);
    });
    results.appendChild(ul);
  }

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    if (!q) {
      renderResults([]);
      return;
    }
    const filtered = pagesIndex.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    });
    renderResults(filtered);
  });
})();
