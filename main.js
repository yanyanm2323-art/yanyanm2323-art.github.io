// Interactive controls for Yanyan Miao's GitHub Pages personal website

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile navigation toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Light / Dark theme toggle
  const themeBtn = document.getElementById("theme-toggle");
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    htmlEl.setAttribute("data-theme", savedTheme);
    if (themeBtn) themeBtn.textContent = savedTheme === "dark" ? "Light" : "Dark";
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      themeBtn.textContent = next === "dark" ? "Light" : "Dark";
    });
  }

  // 3. Project category filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      projectCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        card.classList.toggle("hidden", category !== "all" && cardCat !== category);
      });
    });
  });

  // 4. Copy-to-clipboard for email addresses
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy");
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        const orig = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => {
          btn.textContent = orig;
        }, 1400);
      } catch {
        btn.textContent = "Select";
      }
    });
  });

  // 5. Dynamic copyright year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
