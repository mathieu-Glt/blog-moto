const audio = document.querySelector("audio");

document.addEventListener("click", function playOnce() {
  if (audio) {
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 10000);
  }
  document.removeEventListener("click", playOnce);
});
