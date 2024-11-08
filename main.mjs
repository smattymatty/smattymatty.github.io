// main.mjs
import { setupNavLinks } from "./modules/navigation.mjs";
import { Sidebar } from "./modules/sidebar.mjs";
import { sidebarSetup } from "./sidebarSetup.mjs";

async function initializeApp() {
  console.log("🚀 Initializing application");

  // Get initial route from URL hash
  const hash = window.location.hash.slice(1) || "home/1";
  const [initialPage, initialContent] = hash.split("/");

  console.log(`📍 Initial route: ${initialPage}/${initialContent}`);

  // First create the sidebar with initial state
  const sidebar = new Sidebar(sidebarSetup, {
    initialPage,
    initialContent,
  });

  // Then setup navigation, passing the sidebar instance
  setupNavLinks(initialPage, sidebar);
}

initializeApp();
