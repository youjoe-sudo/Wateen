document.addEventListener("DOMContentLoaded", () => {
  const phone = "201017421891"; // رقم الواتساب

  // ===== إرسال رسالة واتساب عند الضغط على "اطلب الآن" =====
  document.querySelectorAll(".order-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const bookName = btn.dataset.book;
      const msg = encodeURIComponent(`السلام عليكم 🌿، كنت عايز استفسر عن كتاب "${bookName}"`);
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    });
  });

  // ===== حركة تمرير يمين وشمال (لو عندك أزرار التمرير) =====
  const wrapper = document.querySelector(".books-wrapper");
  const leftBtn = document.querySelector(".scroll-btn.left");
  const rightBtn = document.querySelector(".scroll-btn.right");

  if (wrapper && leftBtn && rightBtn) {
    leftBtn.addEventListener("click", () => {
      wrapper.scrollBy({ left: -300, behavior: "smooth" });
    });
    rightBtn.addEventListener("click", () => {
      wrapper.scrollBy({ left: 300, behavior: "smooth" });
    });
  }

  // ===== نظام المفضلات =====
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // تحديث شكل الأزرار لو الكتاب محفوظ
  document.querySelectorAll(".save-btn").forEach(btn => {
    const card = btn.closest(".book-card");
    const title = card.dataset.title;

    if (favorites.some(book => book.title === title)) {
      btn.classList.add("saved");
      btn.innerHTML = '<i class="fas fa-check"></i>';
    }

    // عند الضغط على زر الحفظ
    btn.addEventListener("click", () => {
      const book = {
        title: card.dataset.title,
        price: card.dataset.price,
        img: card.dataset.img
      };

      const exists = favorites.some(b => b.title === book.title);

      if (!exists) {
        favorites.push(book);
        btn.classList.add("saved");
        btn.innerHTML = '<i class="fas fa-check"></i>';
        showToast(`📚 تمت إضافة "${book.title}" إلى المفضلة`);
      } else {
        favorites = favorites.filter(b => b.title !== book.title);
        btn.classList.remove("saved");
        btn.innerHTML = '<i class="fas fa-bookmark"></i>';
        showToast(`❌ تمت إزالة "${book.title}" من المفضلة`);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  });

  // ===== تنبيه صغير (Toast) عند الحفظ أو الإزالة =====
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "25px";
    toast.style.right = "25px";
    toast.style.background = "rgba(212,175,55,0.95)";
    toast.style.color = "#000";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "8px";
    toast.style.fontWeight = "bold";
    toast.style.boxShadow = "0 0 15px rgba(212,175,55,0.4)";
    toast.style.zIndex = "9999";
    toast.style.transition = "opacity 0.4s ease";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 400);
    }, 1600);
  }
});
