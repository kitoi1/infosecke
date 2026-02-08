// modal.js
(function () {
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-modal-open]");
    const closeBtn = e.target.closest("[data-modal-close]");
    if (openBtn) {
      const id = openBtn.getAttribute("data-modal-open");
      const modal = document.getElementById(id);
      if (modal) modal.classList.add("is-open");
    } else if (closeBtn || e.target.classList.contains("modal-backdrop")) {
      const modal = e.target.closest(".modal");
      if (modal) modal.classList.remove("is-open");
    }
  });
})();
