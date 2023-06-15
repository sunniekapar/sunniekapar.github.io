const navbar = document.querySelector(".navbar");
let lastScrollPosition = 0;
window.onscroll = () => {
  if (scrollY === 0) {
    navbar.classList.remove("nav-shadow");
    navbar.classList.remove("nav-hide");
  } else if (scrollY > lastScrollPosition) {
    navbar.classList.remove("nav-shadow");
    navbar.classList.add("nav-hide");
  } else {
    navbar.classList.add("nav-shadow");
    navbar.classList.remove("nav-hide");
  }
  lastScrollPosition = scrollY;
};

const tablistButtons = Array.from(
  document.querySelectorAll(".tab-list-button")
);

const tablistPannels = Array.from(document.querySelectorAll(".tab-list-body"));

tablistButtons.forEach((button) => button.addEventListener("click", () => {
  let currentPannel = tablistPannels.at(tablistButtons.indexOf(button));
  if(currentPannel.classList.contains("hidden")) {
    tablistButtons.forEach((b) => b.classList.remove("tab-visible"));
    button.classList.add("tab-visible");
    tablistPannels.forEach((pannel) => pannel.classList.add("hidden"));
    currentPannel.classList.remove("hidden");
  }
}));
