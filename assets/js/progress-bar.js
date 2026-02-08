(function () {
  const barId = "readingProgress";
  let bar = document.getElementById(barId);
  if (!bar) {
    bar = document.createElement("div");
    bar.id = barId;
    bar.style.position = "fixed";
    bar.style.top = "0";
    bar.style.left = "0";
    bar.style.height = "3px";
    bar.style.width = "0%";
    bar.style.zIndex = "999";
    bar.style.background =
      "linear-gradient(90deg, #5b8cff, #42e3a4, #facc15)";
    document.body.appendChild(bar);
  }

  function update() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const ratio = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = ratio.toFixed(2) + "%";
  }

  window.addEventListener("scroll", update);
  window.addEventListener("resize", update);
  update();
})();
