import { setupCreateProject } from "../pageFunctions/createProject.js";
import { fetchAndDisplayProjects } from "./fetchAndDisplayProjects.js";
import { setManageProjectPage } from "../../pages/manageProject/manageProject.js";
import { contentDiv } from "../renderer.js";

// Dictionary to call functions for each page dynamicaly
const pageFunctions = {
    createProject: setupCreateProject,
    dashboard: fetchAndDisplayProjects,
    manageProject: setManageProjectPage,
};

export async function loadPage(page, newProjectId = null) {
    // In the real app, this function makes some requests to the backend to dynamically
    // set content in the page. Commented parts are the ones that connect to the backend,
    // those are irrelevant as I added placeholder items

    try {
        // Reset app state on each newly loaded page (appState will be changed right after this function if it is needed)
        // await window.api.updateAppState([{ currentProjectId: newProjectId }]);

        // Fetch page HTML
        const response = await fetch(`../pages/${page}/${page}.html`);
        if (!response.ok) new Error("Page not found");

        // Inject content into the main container
        const html = await response.text();
        contentDiv.innerHTML = html;

        // Initialize specific logic for the loaded page
        pageFunctions[page]();
    } catch (error) {
        // contentDiv.innerHTML = `<p>Error loading page: ${error.message}</p>`;
        return;
    }
}
