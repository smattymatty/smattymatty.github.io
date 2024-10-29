import { loadHTMLContent } from "./modules/loaders.mjs";

/**
 * Sidebar Setup
 *
 * A JS object that cointains the sidebar's setup for each page, and it's corresponding content.
 *
 */
export const sidebarSetup = {
  home: {
    welcomeMessage: "Home Page",
    1: {
      title: "About",
      content: await loadHTMLContent(
        "https://lobster-app-ftxys.ondigitalocean.app/spellbook/introduction"
      ),
    },
    2: {
      title: "home 2",
      content: "home 2 content",
    },
    3: {
      title: "home 3",
      content: "home 3 content",
    },
  },

  projects: {
    welcomeMessage: "Welcome to my projects",
    1: {
      title: "projects 1",
      content: "projects 1 content",
    },
    2: {
      title: "projects 2",
      content: "projects 2 content",
    },
    3: {
      title: "projects 3",
      content: "projects 3 content",
    },
  },
  about: {
    welcomeMessage: "Welcome to my about",
    1: {
      title: "about 1",
      content: "about 1 content",
    },
    2: {
      title: "about 2",
      content: "about 2 content",
    },
    3: {
      title: "about 3",
      content: "about 3 content",
    },
  },
  contact: {
    welcomeMessage: "Welcome to my contact",
    1: {
      title: "contact 1",
      content: "contact 1 content",
    },
    2: {
      title: "contact 2",
      content: "contact 2 content",
    },
    3: {
      title: "contact 3",
      content: "contact 3 content",
    },
  },
};
