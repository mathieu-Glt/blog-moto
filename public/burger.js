const burgerBtn = document.getElementById("burgerBtn");
const sideNav = document.getElementById("sideNav");
const overlay = document.getElementById("navOverlay");
const closeBtn = document.getElementById("closeBtn");

function openMenu() {
  sideNav.classList.add("open");
  overlay.classList.add("active");
}

function closeMenu() {
  sideNav.classList.remove("open");
  overlay.classList.remove("active");
}

burgerBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);
