// navigation.mjs
import { Sidebar } from "./sidebar.mjs";
import { sidebarSetup } from "../sidebarSetup.mjs";
import { state } from "./state.mjs";

const TIME_TO_REMOVE_CLICK_ANIMATION = 370;

// navigation.mjs
export function setupNavLinks(initialActive = "home", sidebar) {
  const navLinks = document.querySelectorAll(".nav-links button, .nav-title");
  const contentDivs = document.querySelectorAll(".content");

  navLinks.forEach((link) => {
    link.addEventListener("mousedown", (e) => {
      e.preventDefault();
      link.classList.add("click-animation");

      contentDivs.forEach((content) => {
        content.classList.add("hidden");
      });

      const content = document.querySelector(`#${link.id}-content`);
      if (content) {
        content.classList.remove("hidden");
        // Always start with first content when changing pages via nav
        sidebar.changePage(link.id, "1"); // Use "1" instead of current content
      }

      navLinks.forEach((navLink) => {
        navLink.classList.remove("active");
      });

      link.classList.add("active");

      setTimeout(() => {
        link.classList.remove("click-animation");
      }, TIME_TO_REMOVE_CLICK_ANIMATION);
    });
  });

  // Set initial states
  const initialNavLink = document.querySelector(`#${initialActive}`);
  if (initialNavLink) {
    initialNavLink.classList.add("active");
    const content = document.querySelector(`#${initialActive}-content`);
    if (content) {
      content.classList.remove("hidden");
    }
  }
}
