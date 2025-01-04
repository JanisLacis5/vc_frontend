import { getWidgetDomElement } from "./widgetRenderer.js";

export async function setFileList() {
    // Get the div which holds files
    const fileListDiv = getWidgetDomElement("file-list");

    // Get current active project TODO: *temporary*
    const appState = await window.api.getAppState();
    const activeProjectId = appState.currentProjectId;

    // Display project's id
    const idContainer = document.createElement("p");
    idContainer.textContent = `${activeProjectId}`;
    fileListDiv.appendChild(idContainer);
}
