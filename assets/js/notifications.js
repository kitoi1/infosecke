// notifications.js
window.InfoSecKeNotify = function (message, type = "info") {
  const containerId = "infosecke-notifications";
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.style.position = "fixed";
    container.style.bottom = "1rem";
    container.style.right = "1rem";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "0.4rem";
    container.style.zIndex = "1000";
    document.body.appendChild(container);
  }
  const el = document.createElement("div");
  el.className = "card";
  el.style.maxWidth = "260px";
  el.innerHTML = `<div class="card-title">${type.toUpperCase()}</div><p>${message}</p>`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 250);
  }, 4000);
};
