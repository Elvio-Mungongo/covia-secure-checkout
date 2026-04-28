/* ==========================================================================
   COVIA Admin — SPA logic (sidebar, CRUD produtos, modais, toasts).
   Persistência: localStorage (chave: covia_admin_products).
   ========================================================================== */

(function () {
  // ---------- Storage --------------------------------------------------------
  const STORAGE_KEY = "covia_admin_products";

  const seed = [
    { id: 1, name: "Óleo de Massagem Relax", slogan: "Relaxamento profundo, aroma de lavanda", description: "Óleo natural com lavanda para massagens relaxantes.", price: 12500, compare_price: 0, stock: 48, status: "active", images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400"] },
    { id: 2, name: "Vela Aromática Zen", slogan: "Atmosfera serena para qualquer espaço", description: "Vela artesanal de soja com aroma calmante.", price: 8900, compare_price: 0, stock: 9, status: "active", images: ["https://images.unsplash.com/photo-1602874801007-bd456d22f0d2?w=400"] },
    { id: 3, name: "Kit Pedras Quentes", slogan: "Massagem terapêutica profissional", description: "Conjunto de pedras vulcânicas para terapia.", price: 32000, compare_price: 38000, stock: 0, status: "active", images: ["https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400"] },
    { id: 4, name: "Difusor de Aromaterapia", slogan: "Bem-estar em cada respiração", description: "Difusor ultrassónico com luz ambiente.", price: 18700, compare_price: 0, stock: 23, status: "active", images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400"] },
  ];

  function loadProducts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
        return seed.slice();
      }
      return JSON.parse(raw);
    } catch {
      return seed.slice();
    }
  }
  function saveProducts(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  let products = loadProducts();
  let editingId = null;
  let pendingImages = ["", "", "", ""]; // base64 / url por slot
  let filterText = "";
  let filterStatus = "";

  // ---------- Helpers --------------------------------------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function fmtKz(n) {
    return new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0 }).format(n || 0) + " Kz";
  }
  function stockBadge(stock) {
    if (stock <= 0) return '<span class="badge badge--danger">Esgotado</span>';
    if (stock <= 10) return '<span class="badge badge--warning">Stock baixo</span>';
    return '<span class="badge badge--success">Em stock</span>';
  }
  function stockKey(stock) {
    if (stock <= 0) return "out";
    if (stock <= 10) return "low";
    return "in";
  }
  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // ---------- Toasts ---------------------------------------------------------
  function toast(msg, kind) {
    const stack = $("[data-toast-stack]");
    const el = document.createElement("div");
    el.className = "toast" + (kind ? " toast--" + kind : "");
    el.textContent = msg;
    stack.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity .25s"; }, 2200);
    setTimeout(() => el.remove(), 2600);
  }

  // ---------- Tabs / Sidebar -------------------------------------------------
  const titles = {
    overview: ["Dashboard", "Bem-vindo de volta, Josué"],
    products: ["Produtos", "Admin / Produtos"],
    orders: ["Encomendas", "Admin / Encomendas"],
    payments: ["Pagamentos", "Admin / Pagamentos"],
     users: ["Utilizadores", "Admin / Utilizadores"],
     analytics: ["Analytics", "Admin / Analytics"],
    admins: ["Administradores", "Admin / Administradores"],
  };

  // ---------- Admin Management ---------------------------------------------
  const ADMINS_KEY = "covia_admins";
  const defaultAdmins = [
    { email: "comotastu65@gmail.com", password: "cassiangulo2026" },
    { email: "admin@user.com", password: "admin" }
  ];

  function loadAdmins() {
    const raw = localStorage.getItem(ADMINS_KEY);
    if (!raw) {
      localStorage.setItem(ADMINS_KEY, JSON.stringify(defaultAdmins));
      return defaultAdmins;
    }
    return JSON.parse(raw);
  }

  function saveAdmins(list) {
    localStorage.setItem(ADMINS_KEY, JSON.stringify(list));
  }

  let admins = loadAdmins();

  function renderAdmins() {
    const tbody = $("[data-admin-tbody]");
    if (!tbody) return;
    tbody.innerHTML = admins.map(a => `
      <tr>
        <td><strong>${escapeHtml(a.email)}</strong></td>
        <td style="text-align:right;">
          ${a.email !== 'admin@user.com' && a.email !== 'comotastu65@gmail.com' ? `
            <button class="icon-btn" title="Eliminar" data-del-admin="${escapeHtml(a.email)}">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
            </button>
          ` : ''}
        </td>
      </tr>
    `).join("");
  }

  $("[data-admin-tbody]")?.addEventListener("click", e => {
    const btn = e.target.closest("[data-del-admin]");
    if (!btn) return;
    const email = btn.dataset.delAdmin;
    if (confirm(`Remover acesso para ${email}?`)) {
      admins = admins.filter(a => a.email !== email);
      saveAdmins(admins);
      renderAdmins();
      toast("Administrador removido", "danger");
    }
  });

  $("[data-action='new-admin']")?.addEventListener("click", () => {
    const email = prompt("Email do novo administrador:");
    if (!email) return;
    const password = prompt("Senha do novo administrador:");
    if (!password) return;

    if (admins.some(a => a.email === email)) return toast("Admin já existe", "danger");

    admins.push({ email, password });
    saveAdmins(admins);
    renderAdmins();
    toast("Administrador criado", "success");
  });
  function setTab(name) {
    $$("[data-view]").forEach(v => v.classList.toggle("is-active", v.dataset.view === name));
    $$("[data-tab]").forEach(l => l.classList.toggle("is-active", l.dataset.tab === name));
    const t = titles[name] || ["Dashboard", ""];
    $("[data-page-title]").textContent = t[0];
    $("[data-page-crumbs]").textContent = t[1];
    // close mobile sidebar
    $("[data-sidebar]")?.classList.remove("is-open");
  }

  $$("[data-tab]").forEach(link => link.addEventListener("click", e => {
    e.preventDefault();
    setTab(link.dataset.tab);
  }));
  $$("[data-tab-link]").forEach(link => link.addEventListener("click", e => {
    e.preventDefault();
    setTab(link.dataset.tabLink);
  }));

  $("[data-menu-toggle]")?.addEventListener("click", () =>
    $("[data-sidebar]").classList.toggle("is-open")
  );

  // ---------- Modal ----------------------------------------------------------
  function openModal(name) {
    const m = document.querySelector(`[data-modal="${name}"]`);
    if (m) m.classList.add("is-open");
  }
  function closeModal(el) {
    (el || document.querySelectorAll(".modal-backdrop.is-open")).forEach
      ? document.querySelectorAll(".modal-backdrop.is-open").forEach(m => m.classList.remove("is-open"))
      : el.classList.remove("is-open");
  }
  $$(".modal-backdrop").forEach(bd => {
    bd.addEventListener("click", e => { if (e.target === bd) bd.classList.remove("is-open"); });
  });
  $$("[data-modal-close]").forEach(btn =>
    btn.addEventListener("click", () => btn.closest(".modal-backdrop").classList.remove("is-open"))
  );
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") $$(".modal-backdrop.is-open").forEach(m => m.classList.remove("is-open"));
  });

  // ---------- Image uploader (slots) ----------------------------------------
  function resetUploader(images = []) {
    pendingImages = ["", "", "", ""];
    $$("[data-upload-slot]").forEach(slot => {
      const i = Number(slot.dataset.slot);
      const input = slot.querySelector('input[type="file"]');
      const preview = slot.querySelector(".upload-slot__preview");
      input.value = "";
      const url = images[i] || "";
      if (url) {
        pendingImages[i] = url;
        preview.style.backgroundImage = `url(${url})`;
        slot.classList.add("has-image");
      } else {
        preview.style.backgroundImage = "";
        slot.classList.remove("has-image");
      }
    });
  }

  $$("[data-upload-slot]").forEach(slot => {
    const idx = Number(slot.dataset.slot);
    const input = slot.querySelector('input[type="file"]');
    const preview = slot.querySelector(".upload-slot__preview");
    const removeBtn = slot.querySelector(".upload-slot__remove");

    input.addEventListener("change", e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) { toast("Selecione uma imagem válida.", "danger"); input.value = ""; return; }
      if (file.size > 2 * 1024 * 1024) { toast("Imagem máx. 2MB (limite do navegador).", "danger"); input.value = ""; return; }
      const reader = new FileReader();
      reader.onload = ev => {
        pendingImages[idx] = ev.target.result;
        preview.style.backgroundImage = `url(${ev.target.result})`;
        slot.classList.add("has-image");
      };
      reader.readAsDataURL(file);
    });

    removeBtn.addEventListener("click", e => {
      e.preventDefault(); e.stopPropagation();
      input.value = "";
      pendingImages[idx] = "";
      preview.style.backgroundImage = "";
      slot.classList.remove("has-image");
    });
  });

  // ---------- Render produtos -----------------------------------------------
  function renderProducts() {
    const tbody = $("[data-product-tbody]");
    const filtered = products.filter(p => {
      const okText = !filterText || (p.name + " " + (p.slogan || "")).toLowerCase().includes(filterText);
      const okStatus = !filterStatus || stockKey(p.stock) === filterStatus;
      return okText && okStatus;
    });

    $("[data-product-count]").textContent = filtered.length;

    if (!filtered.length) {
      tbody.innerHTML = `
        <tr class="empty-row"><td colspan="5">
          <strong>Sem produtos</strong>
          ${products.length ? "Nenhum produto corresponde aos filtros." : "Comece por adicionar o primeiro produto."}
        </td></tr>`;
    } else {
      tbody.innerHTML = filtered.map(p => `
        <tr>
          <td>
            <div class="product-cell">
              <div class="product-thumb" style="background-image:url('${escapeHtml(p.images && p.images[0] || "")}')"></div>
              <div>
                <div class="product-name">${escapeHtml(p.name)}</div>
                <div class="product-slogan">${escapeHtml(p.slogan || "")}</div>
              </div>
            </div>
          </td>
          <td><strong>${fmtKz(p.price)}</strong></td>
          <td>${p.stock}</td>
          <td>${stockBadge(p.stock)}</td>
          <td>
            <div class="row-actions">
              <button class="icon-btn" title="Ver" data-act="view" data-id="${p.id}"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
              <button class="icon-btn" title="Editar" data-act="edit" data-id="${p.id}"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></button>
              <button class="icon-btn" title="Eliminar" data-act="delete" data-id="${p.id}"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>
            </div>
          </td>
        </tr>
      `).join("");
    }

    renderStats();
  }

  function renderStats() {
    $("[data-stat='products']").textContent = products.length;
    $("[data-stat='in-stock']").textContent = products.filter(p => p.stock > 10).length;
    $("[data-stat='low-stock']").textContent = products.filter(p => p.stock > 0 && p.stock <= 10).length;
    const value = products.reduce((s, p) => s + (Number(p.price) * Number(p.stock || 0)), 0);
    $("[data-stat='inventory-value']").textContent = fmtKz(value);
  }

  // ---------- Form de produto ------------------------------------------------
  function openProductForm(product) {
    const form = $("[data-product-form]");
    form.reset();
    if (product) {
      editingId = product.id;
      $("[data-modal-title]").textContent = "Editar produto";
      $("[data-submit-label]").textContent = "Atualizar produto";
      form.id.value = product.id;
      form.name.value = product.name || "";
      form.slogan.value = product.slogan || "";
      form.description.value = product.description || "";
      form.price.value = product.price || "";
      form.compare_price.value = product.compare_price || "";
      form.stock.value = product.stock ?? 0;
      form.status.value = product.status || "active";
      resetUploader(product.images || []);
    } else {
      editingId = null;
      $("[data-modal-title]").textContent = "Novo produto";
      $("[data-submit-label]").textContent = "Guardar produto";
      resetUploader([]);
    }
    openModal("product");
    setTimeout(() => form.name.focus(), 50);
  }

  $("[data-product-form]").addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      name: (fd.get("name") || "").toString().trim(),
      slogan: (fd.get("slogan") || "").toString().trim(),
      description: (fd.get("description") || "").toString().trim(),
      price: parseFloat(fd.get("price")) || 0,
      compare_price: parseFloat(fd.get("compare_price")) || 0,
      stock: parseInt(fd.get("stock"), 10) || 0,
      status: fd.get("status") || "active",
      images: pendingImages.filter(Boolean),
    };

    // Validação
    if (!data.name) return toast("Nome obrigatório.", "danger");
    if (!data.description) return toast("Descrição obrigatória.", "danger");
    if (data.price <= 0) return toast("Preço deve ser maior que 0.", "danger");

    if (editingId) {
      products = products.map(p => p.id === editingId ? { ...p, ...data, id: editingId } : p);
      toast("Produto atualizado", "success");
    } else {
      const id = (products.reduce((m, p) => Math.max(m, p.id), 0) || 0) + 1;
      products.push({ id, ...data });
      toast("Produto criado", "success");
    }
    saveProducts(products);
    renderProducts();
    document.querySelector('[data-modal="product"]').classList.remove("is-open");
  });

  // ---------- Acções da tabela ----------------------------------------------
  $("[data-product-tbody]").addEventListener("click", e => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (btn.dataset.act === "edit") openProductForm(product);

    if (btn.dataset.act === "view") {
      const body = $("[data-view-product-body]");
      body.innerHTML = `
        ${product.images && product.images[0] ? `<div style="aspect-ratio:16/10;background:url('${escapeHtml(product.images[0])}') center/cover;border-radius:8px;margin-bottom:14px;"></div>` : ""}
        <h3 style="margin:0 0 4px;">${escapeHtml(product.name)}</h3>
        <p style="margin:0 0 12px;color:var(--text-muted);">${escapeHtml(product.slogan || "")}</p>
        <div style="display:flex;gap:18px;margin-bottom:12px;">
          <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;">Preço</div><strong>${fmtKz(product.price)}</strong></div>
          <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;">Stock</div><strong>${product.stock}</strong></div>
          <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;">Estado</div>${stockBadge(product.stock)}</div>
        </div>
        <p style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(product.description)}</p>
      `;
      openModal("view-product");
    }

    if (btn.dataset.act === "delete") {
      if (confirm(`Eliminar "${product.name}"? Esta ação não pode ser anulada.`)) {
        products = products.filter(p => p.id !== id);
        saveProducts(products);
        renderProducts();
        toast("Produto eliminado", "danger");
      }
    }
  });

  // ---------- Filtros --------------------------------------------------------
  $("[data-product-search]").addEventListener("input", e => {
    filterText = e.target.value.toLowerCase();
    renderProducts();
  });
  $("[data-product-filter]").addEventListener("change", e => {
    filterStatus = e.target.value;
    renderProducts();
  });

  // ---------- Botões "novo produto" -----------------------------------------
  $$("[data-action='new-product']").forEach(b =>
    b.addEventListener("click", () => openProductForm(null))
  );

   // ---------- Logout ---------------------------------------------------------
   document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
     e.preventDefault();
     localStorage.removeItem('covia_admin_logged_in');
     window.location.href = '/login.html';
   });
 
    // ---------- Init -----------------------------------------------------------
    renderAdmins();
    renderProducts();
  })();