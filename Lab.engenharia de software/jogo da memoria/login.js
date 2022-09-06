const form = document.querySelector(".login-form");

const handleSubmit = (event) => {
  event.preventDefault();
  window.location = "game.html";
};

form.addEventListener("submit", handleSubmit);
