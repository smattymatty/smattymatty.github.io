import { setupNavLinks } from "./modules/navigation.mjs";
import { Sidebar } from "./modules/sidebar.mjs";
import { sidebarSetup } from "./sidebarSetup.mjs";

console.log("Hello World");

setupNavLinks();

const sidebar = new Sidebar(sidebarSetup);
