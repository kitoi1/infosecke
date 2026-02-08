// tooltip.js
document.addEventListener("mouseover", (e) => {
  const target = e.target.closest("[data-tooltip]");
  if (!target) return;
  // Implement a nicer tooltip later; this is just a placeholder
  target.title = target.getAttribute("data-tooltip");
});
