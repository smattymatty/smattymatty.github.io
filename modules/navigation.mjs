import { Sidebar } from "./sidebar.mjs";
import { sidebarSetup } from "../sidebarSetup.mjs";

const TIME_TO_REMOVE_CLICK_ANIMATION = 370;

export function setupNavLinks(initialActive = "home") {
  const sidebar = new Sidebar(sidebarSetup);
  const navLinks = document.querySelectorAll(".nav-links button, .nav-title");
  const contentDivs = document.querySelectorAll(".content");
  // each nav link should have a corresponding content div
  navLinks.forEach((link) => {
    link.addEventListener("mousedown", (e) => {
      e.preventDefault();

      // click animation
      link.classList.add("click-animation");
      const content = document.querySelector(`#${link.id}-content`);
      if (!content) {
        throw new Error(`No content with id ${link.id}-content`);
      }

      // hide all content divs
      contentDivs.forEach((content) => {
        content.classList.add("hidden");
      });
      // show the content div for the clicked nav link
      content.classList.remove("hidden");
      // Update the sidebar for the new page
      sidebar.changePage(link.id);
      // remove active class from all nav links
      navLinks.forEach((navLink) => {
        navLink.classList.remove("active");
      });
      // add active class to the clicked nav link
      link.classList.add("active");
      // remove click animation
      setTimeout(() => {
        link.classList.remove("click-animation");
      }, TIME_TO_REMOVE_CLICK_ANIMATION);
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
