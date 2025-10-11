const phone = "201017421891"; // رقم الواتساب

// إرسال رسالة واتساب
document.querySelectorAll('.order-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const msg = encodeURIComponent(`السلام عليكم .. كنت عايز استفسر عن كتاب ${btn.dataset.book}`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  });
});

// حركة التمرير يمين وشمال
const wrapper = document.querySelector('.books-wrapper');
document.querySelector('.scroll-btn.left').addEventListener('click', () => {
  wrapper.scrollBy({ left: -300, behavior: 'smooth' });
});
document.querySelector('.scroll-btn.right').addEventListener('click', () => {
  wrapper.scrollBy({ left: 300, behavior: 'smooth' });
});

// ===== حفظ في المفضلة =====
const savedBooks = JSON.parse(localStorage.getItem("favorites")) || [];

document.querySelectorAll(".save-btn").forEach(btn => {
  const card = btn.closest(".book-card");
  const title = card.dataset.title;

  // لو الكتاب محفوظ قبل كده
  if (savedBooks.some(book => book.title === title)) {
    btn.classList.add("saved");
    btn.textContent = "✅";
  }

  btn.addEventListener("click", () => {
    const bookData = {
      title: card.dataset.title,
      price: card.dataset.price,
      img: card.dataset.img
    };

    const index = savedBooks.findIndex(b => b.title === bookData.title);
    if (index === -1) {
      savedBooks.push(bookData);
      btn.classList.add("saved");
      btn.textContent = "✅";
    } else {
      savedBooks.splice(index, 1);
      btn.classList.remove("saved");
      btn.textContent = "💾";
    }

    localStorage.setItem("favorites", JSON.stringify(savedBooks));
  });
});
