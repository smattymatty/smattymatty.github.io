import { state } from "./state.mjs";
import { slugify, findContentBySlug } from "./utils/slugify.mjs";

export class URLManager {
  constructor(sidebarSetup) {
    if (state.isInitialized()) {
      console.warn("🚫 Attempted to create duplicate URLManager");
      return state.urlManager;
    }

    console.log("🏗️ Initializing URLManager");
    this.sidebarSetup = sidebarSetup;
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener("hashchange", () => this.handleHash());
    // Only handle initial hash after everything is set up
    setTimeout(() => this.handleHash(), 0);
  }

  updateURL(page, contentKey) {
    try {
      console.log(`🔄 Updating URL: ${page}/${contentKey}`);

      const pageContent = this.sidebarSetup[page];
      if (!pageContent) {
        throw new Error(`Page ${page} not found in sidebar setup`);
      }

      // If contentKey is already a slug, use it directly
      if (isNaN(contentKey)) {
        window.location.hash = `${page}/${contentKey}`;
        return;
      }

      // If contentKey is numeric, get the content and create slug
      const content = pageContent[contentKey];
      if (!content || !content.title) {
        console.warn(
          `⚠️ No content/title found for ${page}/${contentKey}, using numeric key`
        );
        window.location.hash = `${page}/${contentKey}`;
        return;
      }

      const slug = slugify(content.title);
      window.location.hash = `${page}/${slug}`;
    } catch (error) {
      console.error("❌ Error updating URL:", error);
      // Fallback to a safe URL
      window.location.hash = `${page}/1`;
    }
  }

  getCurrentContentKey() {
    const hash = window.location.hash.slice(1);
    const [, slug] = hash.split("/");
    return slug || "1"; // Return current slug or default to '1'
  }

  handleHash() {
    try {
      const hash = window.location.hash.slice(1) || "home/about";
      const [page, slug] = hash.split("/");

      const contentInfo = findContentBySlug(this.sidebarSetup, page, slug);

      if (contentInfo) {
        state.sidebar.changePage(page);
        state.sidebar.updateContent(contentInfo.key, true);
      } else {
        this.handleInvalidRoute(hash);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  isValidRoute(page, contentId) {
    // Check if page exists in sidebarSetup
    if (!this.sidebarSetup[page]) {
      return false;
    }

    // Check if contentId exists in the page
    return this.sidebarSetup[page].hasOwnProperty(contentId);
  }

  handleInvalidRoute(hash) {
    console.error(`Invalid route: ${hash}`);

    const errorMessage = `
      <div class="navigation-error">
        <h2>Page Not Found</h2>
        <p>The requested page "${hash}" could not be found.</p>
        <p>Redirecting to home...</p>
      </div>
    `;

    // Show error in all content divs
    document.querySelectorAll(".content").forEach((div) => {
      div.innerHTML = errorMessage;
    });

    // Redirect to home after 3 seconds
    setTimeout(() => {
      window.location.hash = "home/1";
    }, 3000);
  }

  handleError(error) {
    console.error("Navigation error:", error);

    const errorMessage = `
      <div class="navigation-error">
        <h2>Navigation Error</h2>
        <p>${error.message || "An unexpected error occurred."}</p>
        <button onclick="window.location.hash='home/1'">Return Home</button>
      </div>
    `;

    // Show error in all content divs
    document.querySelectorAll(".content").forEach((div) => {
      div.innerHTML = errorMessage;
    });
  }

  // Helper method to get available routes (useful for debugging)
  getAvailableRoutes() {
    const routes = [];
    for (const page in this.sidebarSetup) {
      for (const key in this.sidebarSetup[page]) {
        if (key !== "welcomeMessage") {
          routes.push(`${page}/${key}`);
        }
      }
    }
    return routes;
  }
}
