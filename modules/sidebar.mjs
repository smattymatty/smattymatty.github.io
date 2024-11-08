import { state } from "./state.mjs";
import { URLManager } from "./urlManager.mjs";
import { SPELLBOOK_URL } from "../sidebarSetup.mjs";
import { slugify, getKeyFromSlug } from "./utils/slugify.mjs";
export class Sidebar {
  constructor(
    sideBarSetup,
    { initialPage = "home", initialContent = "1" } = {}
  ) {
    if (state.isInitialized()) {
      console.warn("🚫 Attempted to create duplicate Sidebar");
      return state.sidebar;
    }

    console.log(`🏗️ Initializing Sidebar for ${initialPage}/${initialContent}`);
    this.sideBarSetup = sideBarSetup;
    this.currentPage = initialPage;
    this.currentContent = initialContent; // Add this line

    const urlManager = new URLManager(sideBarSetup);
    state.initialize(this, urlManager);

    this.setupSideBar(initialContent);
  }

  updateContent(contentKey, skipUrlUpdate = false) {
    try {
      console.log(`📝 Updating content with key/slug: ${contentKey}`);

      const contentDiv = document.querySelector(`#${this.currentPage}-content`);
      const welcomeMessage = document.querySelector(".welcome-message");

      if (!contentDiv || !welcomeMessage) {
        throw new Error("Required DOM elements not found");
      }

      const currentPageSetup = this.sideBarSetup[this.currentPage];
      if (!currentPageSetup) {
        throw new Error(`No setup found for page: ${this.currentPage}`);
      }

      // Check if contentKey is a slug and convert to numeric key if needed
      let actualKey = contentKey;
      if (isNaN(contentKey)) {
        actualKey = getKeyFromSlug(
          this.sideBarSetup,
          this.currentPage,
          contentKey
        );
        if (!actualKey) {
          throw new Error(`No content found for slug: ${contentKey}`);
        }
      }

      if (!currentPageSetup[actualKey]) {
        throw new Error(`No content found for key: ${actualKey}`);
      }

      welcomeMessage.textContent = currentPageSetup.welcomeMessage;
      contentDiv.innerHTML = currentPageSetup[actualKey].content;

      if (!skipUrlUpdate) {
        // Use the slug for the URL
        const slug = slugify(currentPageSetup[actualKey].title);
        state.urlManager.updateURL(this.currentPage, slug);
      }
    } catch (error) {
      console.error("❌ Error updating content:", error);
      this.handleUpdateError(error);
    }
  }

  handleConstructorError(error) {
    document.body.innerHTML = `
            <div class="critical-error">
                <h2>⚠️ Critical Error</h2>
                <p>The application failed to initialize properly.</p>
                <pre>${error.message}</pre>
                <button onclick="window.location.reload()">Reload Page</button>
            </div>
        `;
  }

  handleUpdateError(error) {
    const errorMessage = `
            <div class="content-error">
                <h3>⚠️ Update Error</h3>
                <p>${error.message}</p>
                <button onclick="window.location.reload()">Reload Page</button>
            </div>
        `;

    document.querySelectorAll(".content").forEach((div) => {
      div.innerHTML = errorMessage;
    });
  }

  getContentPath(page, contentKey) {
    // Extract the path from the content URL if it exists
    const content = this.sideBarSetup[page][contentKey].content;
    if (typeof content === "string" && content.includes(SPELLBOOK_URL)) {
      return content.split(SPELLBOOK_URL)[1];
    }
    return null;
  }

  setupSideBar(contentKey) {
    console.log(`🔧 Setting up sidebar with content: ${contentKey}`);
    this.updateSidebarLinks();

    // If contentKey is a slug, convert it to the numeric key
    let actualKey = contentKey;
    if (isNaN(contentKey)) {
      actualKey = getKeyFromSlug(
        this.sideBarSetup,
        this.currentPage,
        contentKey
      );
    }

    // Set active link using the actual key
    const activeLink = document.querySelector(
      `#${this.currentPage}-${actualKey}-link`
    );

    if (activeLink) {
      console.log(`🎯 Activating link: ${this.currentPage}-${actualKey}-link`);
      document.querySelectorAll(".sidebar a").forEach((link) => {
        link.classList.remove("active");
      });
      activeLink.classList.add("active");
    } else {
      console.warn(
        `⚠️ No link found for ${this.currentPage}-${actualKey}-link`
      );
    }

    this.updateContent(contentKey);
    this.addEventListeners();
  }

  updateSidebarLinks() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.innerHTML = ""; // Clear existing links

    const currentPageSetup = this.sideBarSetup[this.currentPage];
    for (let key in currentPageSetup) {
      if (key !== "welcomeMessage") {
        const link = document.createElement("a");
        link.id = `${this.currentPage}-${key}-link`;

        link.textContent = currentPageSetup[key].title;
        link.addEventListener("click", () => {
          this.updateContent(key);
        });
        sidebar.appendChild(link);
      }
    }
  }

  changePage(newPage, contentKey = null) {
    console.log(
      `🔄 Sidebar: Changing page to: ${newPage} with content: ${contentKey}`
    );
    this.currentPage = newPage;
    // If no contentKey provided, maintain current one from URL
    const actualContentKey =
      contentKey || state.urlManager.getCurrentContentKey();
    this.currentContent = actualContentKey;
    this.setupSideBar(actualContentKey);
  }

  addEventListeners() {
    const sidebar = document.querySelector(".sidebar");
    // on clicking any sidebar link, add active to the clicked link and remove active from all other links
    sidebar.addEventListener("click", (e) => {
      const clickedLink = e.target;
      if (clickedLink.tagName !== "A") {
        return;
      }
      const clickedLinkId = clickedLink.id;
      const clickedLinkPage = clickedLinkId.split("-")[0];
      const clickedLinkContent = clickedLinkId.split("-")[1];
      // remove active class from all links
      sidebar.querySelectorAll("a").forEach((link) => {
        link.classList.remove("active");
      });
      // add active class to the clicked link
      clickedLink.classList.add("active");
      // update the content div
      this.updateContent(clickedLinkContent);
    });
  }
}
