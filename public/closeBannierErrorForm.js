console.log("hello bannier error");

const buttonBannier = document.querySelector(".close");
const banniers = document.querySelectorAll(".alert-warning");

// Fermeture manuelle
if (buttonBannier) {
  buttonBannier.addEventListener("click", () => {
    banniers.forEach((b) => (b.style.display = "none"));
    console.log("bannier clicked");
  });
}

// Disparition automatique après 3 secondes
setTimeout(() => {
  banniers.forEach((b) => (b.style.display = "none"));
}, 3000);
