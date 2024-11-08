import { ContentLoader } from "./modules/loaders.mjs";

const contentLoader = new ContentLoader();

export const SPELLBOOK_URL =
  "https://lobster-app-ftxys.ondigitalocean.app/spellbook";
/**
 * Sidebar Setup
 *
 * A JS object that cointains the sidebar's setup for each page, and it's corresponding content.
 *
 */
export const sidebarSetup = {
  home: {
    welcomeMessage: "About",
    1: {
      title: "About",
      content: await contentLoader.loadContent(`${SPELLBOOK_URL}/introduction`),
      path: "/introduction",
    },
    2: {
      title: "home 2",
      content: await contentLoader.loadContent(`${SPELLBOOK_URL}/ff/sb_intro`),
    },
    3: {
      title: "home 3",
      content: "home 3 content",
    },
  },

  projects: {
    welcomeMessage: "Welcome to my projects",
    1: {
      title: "Django Spellbook",
      content: await contentLoader.loadContent(
        `${SPELLBOOK_URL}/spellbook/sb_intro`
      ),
      path: "/spellbook/sb_intro",
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
  tools: {
    welcomeMessage: "Welcome to my tools",
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
  blog: {
    welcomeMessage: "Welcome to my Blog",
    1: {
      title: "blog 1",
      content: "blog 1 content",
    },
    2: {
      title: "blog 2",
      content: "blog 2 content",
    },
    3: {
      title: "blog 3",
      content: "blog 3 content",
    },
  },
};
