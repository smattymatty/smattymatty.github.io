export class Sidebar {
  constructor(sideBarSetup) {
    this.sideBarSetup = sideBarSetup;
    this.currentPage = "home"; // Default page
    this.setupSideBar();
  }

  setupSideBar() {
    this.updateSidebarLinks();
    this.updateContent();
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

  updateContent(contentKey = "1") {
    const contentDiv = document.querySelector(`#${this.currentPage}-content`);
    const welcomeMessage = document.querySelector(".welcome-message");

    const currentPageSetup = this.sideBarSetup[this.currentPage];
    welcomeMessage.textContent = currentPageSetup.welcomeMessage;

    contentDiv.innerHTML = currentPageSetup[contentKey].content;
  }

  changePage(newPage) {
    console.log("🔄 Sidebar: Changing page to:", newPage);
    this.currentPage = newPage;
    this.setupSideBar();
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
