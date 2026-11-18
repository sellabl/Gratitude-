(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Mobile menu ---- */
  const nav = document.querySelector(".nav");
  const menuBtn = document.querySelector(".menu-btn");
  if (nav && menuBtn) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    menuBtn.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    nav.querySelectorAll(".mobile-menu a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---- Quote slider ---- */
  document.querySelectorAll("[data-quotes]").forEach((root) => {
    const slides = [...root.querySelectorAll(".quote-slide")];
    const photos = [...root.querySelectorAll(".quote-photo img")];
    const count = root.querySelector(".quote-count");
    let i = 0;
    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.classList.toggle("is-active", k === i); s.setAttribute("aria-hidden", String(k !== i)); });
      photos.forEach((p, k) => p.classList.toggle("is-active", k === i));
      if (count) count.textContent = `${String(i + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    };
    root.querySelector(".prev")?.addEventListener("click", () => show(i - 1));
    root.querySelector(".next")?.addEventListener("click", () => show(i + 1));
    show(0);
  });

  /* ---- Dialogs (project details, team bios) ---- */
  document.querySelectorAll("[data-dialog]").forEach((trigger) => {
    const dlg = document.getElementById(trigger.dataset.dialog);
    if (!dlg || typeof dlg.showModal !== "function") return;
    trigger.addEventListener("click", (e) => { e.preventDefault(); dlg.showModal(); });
  });
  document.querySelectorAll("dialog.modal").forEach((dlg) => {
    dlg.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", () => dlg.close()));
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  });

  /* ---- Contact form → opens the visitor's email app ---- */
  const form = document.querySelector("[data-mailto-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const topic = data.get("topic") || "General question";
      const subject = `${topic} — from ${data.get("name")}`;
      const body = `${data.get("message")}\n\n—\n${data.get("name")}\n${data.get("email")}`;
      window.location.href = `mailto:${form.dataset.mailtoForm}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const note = form.querySelector(".form-note");
      if (note) note.textContent = "Your email app should open with the message ready to send.";
    });
  }

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
