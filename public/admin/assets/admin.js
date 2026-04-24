/* ==========================================================================
   COVIA Admin — minimal JS for sidebar, image previews and confirms.
   Pure JS, no frameworks. Ready to be replaced/augmented by PHP-rendered data.
   ========================================================================== */

(function () {
  // -- Sidebar toggle (mobile) ---------------------------------------------
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const sidebar = document.querySelector("[data-sidebar]");
  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => sidebar.classList.toggle("is-open"));
  }

  // -- Image upload previews (up to 4 slots) -------------------------------
  document.querySelectorAll("[data-upload-slot]").forEach((slot) => {
    const input = slot.querySelector('input[type="file"]');
    const preview = slot.querySelector(".upload-slot__preview");
    const removeBtn = slot.querySelector(".upload-slot__remove");

    if (input) {
      input.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
          alert("Por favor selecione um ficheiro de imagem.");
          input.value = "";
          return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
          preview.style.backgroundImage = `url(${ev.target.result})`;
          slot.classList.add("has-image");
        };
        reader.readAsDataURL(file);
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (input) input.value = "";
        preview.style.backgroundImage = "";
        slot.classList.remove("has-image");
      });
    }
  });

  // -- Delete confirmations ------------------------------------------------
  document.querySelectorAll("[data-confirm]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const msg = el.getAttribute("data-confirm") || "Tem a certeza?";
      if (!confirm(msg)) e.preventDefault();
    });
  });

  // -- Simple table search filter ------------------------------------------
  const searchInput = document.querySelector("[data-table-search]");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase();
      document.querySelectorAll("[data-row]").forEach((row) => {
        const text = row.getAttribute("data-search") || row.textContent;
        row.style.display = text.toLowerCase().includes(q) ? "" : "none";
      });
    });
  }
})();