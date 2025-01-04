import { getDomElement } from "../../renderer/renderer.js";
import { formatLongDate, formatShortDate } from "../../globalUtils.js";

export async function setProjectInfo(project) {
    // Get all DOM elements that contain some info that needs to be set
    const projectNameSpan = getDomElement("project-name");
    const projectCreatedOnSpan = getDomElement("project-created-on");
    const projectLocationSpan = getDomElement("project-location");

    // Format the created_on date
    const formattedDate = formatLongDate(project.created_on);

    // Add info
    projectNameSpan.innerText = project.name;
    projectCreatedOnSpan.innerText = formattedDate;
    projectLocationSpan.innerText = project.path;
}

async function setProjectFiles(project) {
    const files = await window.api.getProjectFiles(project.id);
    const fileTree = buildTree(files);
    const fileTreeContainer = getDomElement("file-list");
    renderTree(fileTree, fileTreeContainer);
    trackCheckboxChanges(fileTreeContainer);
}

async function setCommitHistory(project) {
    // Get all commits and needed DOM elements
    const commits = await window.api.getCommits(project.id);
    const commitList = getDomElement("commit-list");

    // Add commits to the list
    commits.forEach((commit) => {
        const listEl = document.createElement("li");
        listEl.innerHTML = `
            <p>${commit.hash}</p> 
            <h3>${commit.message}</h3>
            <p>${formatShortDate(commit.date)}</p>
            <button>View changes</button>
        `;
        commitList.appendChild(listEl);
    });
}

// Function to build the tree structure
function buildTree(files) {
    const tree = {};

    files.forEach((file) => {
        const parts = file.name.split("/");
        let currentLevel = tree;

        parts.forEach((part, index) => {
            if (!currentLevel[part]) {
                currentLevel[part] =
                    index === parts.length - 1
                        ? {
                              name: file.name,
                              path: file.path,
                              is_tracked: file.is_tracked,
                          }
                        : {};
            }
            currentLevel = currentLevel[part];
        });
    });

    return tree;
}

// Recursive function to render the tree as HTML
function renderTree(node, parent) {
    const ul = document.createElement("ul");
    for (const key in node) {
        const li = document.createElement("li");
        const fileName = document.createElement("p");
        fileName.innerText = `${key}`;
        if (typeof node[key] === "object" && !("is_tracked" in node[key])) {
            // Add folder class
            li.classList.add("folder");

            // Add a clickable arrow for toggling
            const arrow = document.createElement("span");
            arrow.classList.add("folder-arrow");
            arrow.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n' +
                '  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>\n' +
                "</svg>";
            fileName.prepend(arrow);

            // Click event to collapse/expand the folder
            fileName.addEventListener("click", () => {
                li.classList.toggle("collapsed");
            });

            li.appendChild(fileName);
            renderTree(node[key], li);
        } else {
            // Create checkbox element
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("data-name", node[key].name);
            checkbox.setAttribute("data-path", node[key].path);
            checkbox.setAttribute("data-is_tracked", node[key].is_tracked);

            // Add class, check / uncheck the box and add checkbox to the list
            li.classList.add("file");
            checkbox.checked = node[key].is_tracked;
            li.appendChild(checkbox);
            li.appendChild(fileName);
        }
        ul.appendChild(li);
    }
    parent.appendChild(ul);
}

function trackCheckboxChanges(container) {
    // Get all checkboxes within the container
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');

    // Store the initial state of all checkboxes
    let initialState = Array.from(checkboxes).map(
        (checkbox) => checkbox.checked,
    );

    function checkForChanges() {
        // Get the current state of all checkboxes
        const currentState = Array.from(checkboxes).map(
            (checkbox) => checkbox.checked,
        );

        // Check if any of the checkboxes changed compared to the initial state
        const hasChanged = currentState.some(
            (checked, index) => checked !== initialState[index],
        );

        if (hasChanged) {
            const actionOptions = getDomElement("action-options");
            if (actionOptions) {
                actionOptions.style.display = "block";
            }
        } else {
            // Hide action options if all checkboxes return to their original state
            const actionOptions = getDomElement("action-options");
            if (actionOptions) {
                actionOptions.style.display = "none";
            }
        }
    }

    // Attach change event listener to all checkboxes
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", checkForChanges);
    });
}

export async function setManageProjectPage() {
    // Get app's state
    const appState = await window.api.getAppState();

    // Get the project
    const project = await window.api.getProject(appState.currentProjectId);

    // Add click listeners to buttons
    const saveButton = getDomElement("save-file-track");
    const cancelButton = getDomElement("cancel-file-track");

    saveButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const fileCheckboxes = document.querySelectorAll(
            '#file-list input[type="checkbox"]',
        );
        const updatedFiles = Array.from(fileCheckboxes).map((checkbox) => {
            const fileName = checkbox.dataset.name;
            const filePath = checkbox.dataset.path;
            return {
                path: filePath,
                name: fileName,
                is_tracked: checkbox.checked,
            };
        });

        await window.api.updateFileTracking(
            appState.currentProjectId,
            updatedFiles,
        );
    });

    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
    });

    // Call all needed functions
    await setProjectInfo(project);
    await setProjectFiles(project);
    await setCommitHistory(project);
}
