(() => {
  const $  = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

  // 年表示
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  // モバイルメニュー
  const nav = $(".nav");
  const toggle = $(".nav-toggle");
  const menu = $("#nav-menu");
  if (toggle && nav && menu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.dataset.open = String(!expanded);
      if (!expanded && typeof menu.focus === "function") menu.focus();
    });
    $$("#nav-menu a").forEach(a =>
      a.addEventListener("click", () => {
        nav.dataset.open = "false";
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // スクロール出現
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => e.target.classList.toggle("revealed", e.isIntersecting));
    }, { threshold: 0.18 });
    $$(".reveal-on-scroll").forEach(el => io.observe(el));
  } else {
    $$(".reveal-on-scroll").forEach(el => el.classList.add("revealed"));
  }

  // モーダル関連
  const modal        = $("#modal");
  const modalImg     = $("#modal-img");
  const modalComment = $("#modal-comment");
  const modalClose   = $(".modal-close");

  const openModal = (img, comment) => {
    if (!modal) return;
    if (modalImg)     modalImg.src = img || "";
    if (modalComment) modalComment.textContent = comment || "";
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // カード
  $$(".card").forEach(card => {
    const show = () => openModal(card.dataset.img, card.dataset.comment);
    card.addEventListener("click", show);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(); }
    });
  });

  // 閉じる操作いろいろ
  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
})();