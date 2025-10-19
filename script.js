и скрипт // ===== Константы/элементы
const header = document.querySelector("header");
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const yearEl = document.getElementById("year");
const form = document.getElementById("contact-form");
const formMsg = document.getElementById("form-msg");

// ===== Год в футере
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Тень у шапки при прокрутке
const onScrollHeaderShadow = () => {
  if (window.scrollY > 4) {
    header?.classList.add("header--shadow");
  } else {
    header?.classList.remove("header--shadow");
  }
};
onScrollHeaderShadow();
window.addEventListener("scroll", onScrollHeaderShadow, { passive: true });

// ===== Бургер-меню (мобайл)
const toggleMenu = () => {
  menu?.classList.toggle("hidden");         // Tailwind: показать/скрыть
  document.body.classList.toggle("no-scroll"); // Запрет прокрутки под меню
  // меняем символ для наглядности
  if (burger) burger.textContent = menu?.classList.contains("hidden") ? "☰" : "✕";
};
burger?.addEventListener("click", toggleMenu);

// Закрытие меню по клику на ссылку
menu?.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", () => {
    if (window.innerWidth < 768 && !menu.classList.contains("hidden")) {
      toggleMenu();
    }
  });
});

// ===== Плавный скролл с учётом высоты шапки
const HEADER_OFFSET = 72; // ~ h-16 (64px) + небольшой зазор
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id  id === "#"  id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const rect = target.getBoundingClientRect();
    const top = window.scrollY + rect.top - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    // Обновим hash в адресе (без резкого прыжка)
    history.pushState(null, "", id);
  });
});

// ===== FAQ: делаем аккордеон (только один открыт)
const faqRoot = document.getElementById("faq-list");
if (faqRoot) {
  const items = faqRoot.querySelectorAll("details");
  items.forEach((el) => {
    el.addEventListener("toggle", () => {
      if (el.open) {
        items.forEach((other) => other !== el && (other.open = false));
      }
    });
  });
}

// ===== Анимации появления секций (IntersectionObserver)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

// Пометим крупные блоки для reveal
document.querySelectorAll("section, .card, article, figure, .rounded-2xl").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

// ===== Форма (демо-обработка без отправки)
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (formMsg) {
    formMsg.textContent = "Спасибо! Сообщение отправлено 🚀";
    formMsg.style.color = "rgb(2,132,199)";
  }
  form.reset();
});
