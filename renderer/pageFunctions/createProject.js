import { getDomElement } from "../renderer.js";

export function setupCreateProject() {
    const selectFolderButton = getDomElement("select-folder-btn");
    const createProjectButton = getDomElement("create-project-btn");
    const selectedFolderDisplay = getDomElement("selected-folder");

    let folderPath = null;

    // Handle folder selection
    selectFolderButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const folder = await window.api.selectFolder();
        if (folder) {
            selectedFolderDisplay.textContent = `Selected Folder: ${folder}`;
            folderPath = folder; // Optional: store the selected folder
        } else {
            selectedFolderDisplay.textContent = "No folder selected.";
        }
    });

    // Handle project creation
    createProjectButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const button = getDomElement("project-name-inp");
        if (button.value) {
            await window.api.createProject(button.value, folderPath);
        }
    });
}
