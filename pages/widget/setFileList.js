import { getWidgetDomElement } from "./widgetRenderer.js";

export async function setFileList() {
    // Get the div which holds files
    const fileListDiv = getWidgetDomElement("file-list");

    // Get tracked project files
    const project = await window.api.getProject();
    const trackedFiles = project.files;

    // Add these files to the widget
    trackedFiles.forEach((file) => {
        const fileDiv = document.createElement("div");

        // Extract the depth based on directory structure
        const pathSegments = file.name.split("/");
        const depth = pathSegments.length - 1;

        // Set indentation for subdirectory files
        fileDiv.style.marginLeft = `${depth * 20}px`;

        // // Set file name and apply color coding based on status
        fileDiv.textContent = file.name;
        // if (file.status === "new") {
        //     fileDiv.style.color = "green";
        // } else if (file.status === "updated") {
        //     fileDiv.style.color = "blue";
        // }

        // Append the file to the file list
        fileListDiv.appendChild(fileDiv);
    });
}
