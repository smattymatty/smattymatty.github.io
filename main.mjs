console.log("Hello World");

const navLinks = document.querySelectorAll(".nav-links button");
const contentDivs = document.querySelectorAll(".content");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const content = document.querySelector(`#${link.id}-content`);
    contentDivs.forEach((content) => {
      content.classList.add("hidden");
    });
    content.classList.remove("hidden");
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });
    link.classList.add("active");
  });
});
