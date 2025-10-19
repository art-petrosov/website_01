// Бургер-меню
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
burger?.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Год в футере
document.getElementById("year").textContent = new Date().getFullYear();

// Форма
const form = document.getElementById("contact-form");
const msg = document.getElementById("form-msg");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  msg.textContent = "Спасибо! Сообщение отправлено 🚀";
  form.reset();
});
