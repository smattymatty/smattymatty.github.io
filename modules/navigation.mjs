export function setupNavLinks(initialActive = "home") {
  const navLinks = document.querySelectorAll(".nav-links button, .nav-title");
  const contentDivs = document.querySelectorAll(".content");
  // each nav link should have a corresponding content div
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const content = document.querySelector(`#${link.id}-content`);
      if (!content) {
        throw new Error(`No content with id ${link.id}-content`);
      }
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
  // set up the initial active nav link
  const initialNavLink = document.querySelector(`#${initialActive}`);
  initialNavLink.classList.add("active");
  const content = document.querySelector(`#${initialActive}-content`);
  if (!content) {
    throw new Error(`No content with id ${initialActive}-content`);
  }
  content.classList.remove("hidden");
}
